import { RESTDataSource } from "apollo-datasource-rest";

class GAdventuresAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "https://rest.gadventures.com/";
        this.initialize({});
    }

    willSendRequest(request) {
        request.headers.set(
            "X-Application-Key",
            process.env.G_ADVENTURES_LIVE_TOKEN
        );
    }

    async getAllTours() {
        // Get total number of tours with pagination.
        const tourDossiers = await this.get("/tour_dossiers");
        const totalTours = tourDossiers.count;
        const totalPages = Math.ceil(totalTours / tourDossiers.max_per_page);

        // Create array of all tour dossiers by page.
        const toursPagesPromises = [...Array(totalPages)].map((_, page) => {
            return this.get(`/tour_dossiers?page=${page}`);
        });
        const toursPages = await Promise.all(toursPagesPromises);

        // Map through pages to get flattened array of tour dossier results.
        const allTours = toursPages.flatMap((page) =>
            page.results.map((result) => result)
        );

        return Array.isArray(allTours)
            ? allTours.map((tour) => this.tourReducer(tour))
            : [];
    }

    async getTourDossierByID({ tourID }) {
        const response = await this.get(`tour_dossiers/${tourID}`);
        return this.tourDossierReducer(response);
    }

    async getItinerary({ itineraryID, variationID }) {
        const response = await this.get(
            `itineraries/${itineraryID}/${variationID}`
        );
        return this.itineraryReducer(response);
    }

    async getMapAccom({ itineraryID, variationID }) {
        // Get array of all accommodation dossier IDs.
        const itinerary = await this.get(
            `itineraries/${itineraryID}/${variationID}`
        );
        const accomIDs = itinerary.days.flatMap((day) =>
            day.components
                .filter((component) => component.type === "ACCOMMODATION")
                .filter((component) => component.accommodation_dossier)
                .map((component) => component.accommodation_dossier.id)
        );

        // Get array of all accommodation "place" IDs.
        const accomDossiersPromises = accomIDs.map((id) =>
            this.get(`accommodation_dossiers/${id}`)
        );
        const accomDossiers = await Promise.all(accomDossiersPromises);
        const placeIDs = accomDossiers
            .filter((accom) => accom.location) // some accomomodation dossiers don't include locations
            .map((accom) => accom.location.id);

        // Return array of all accommodation coordinates.
        const accomPlaces = [];
        for (const id of placeIDs) {
            accomPlaces.push(await this.get(`places/${id}`));
        }

        return Array.isArray(accomPlaces)
            ? accomPlaces.map((place) => this.mapAccomReducer(place))
            : [];
    }

    async getMapActivities({ itineraryID, variationID }) {
        // Get array of all activity place IDs.
        const itinerary = await this.get(
            `itineraries/${itineraryID}/${variationID}`
        );
        const activityLocationIDs = itinerary.days.flatMap((day) =>
            day.components
                .filter((component) => component.type === "ACTIVITY")
                .filter((component) => component.start_location)
                .map((component) => component.start_location.id)
        );

        // Return array of all activity coordinates.
        const activityPlaces = [];
        for (const id of activityLocationIDs) {
            activityPlaces.push(await this.get(`places/${id}`));
        }

        // Filter out any invalid coordinate values which would cause
        // Mapbox Directions API to err.
        const activityCoordinates = activityPlaces.filter(
            (place) =>
                parseFloat(place.latitude) >= -90 &&
                parseFloat(place.latitude) <= 90 &&
                parseFloat(place.longitude) >= -180 &&
                parseFloat(place.longitude) <= 180
        );

        return Array.isArray(activityCoordinates)
            ? activityCoordinates.map((place) => this.mapActivityReducer(place))
            : [];
    }

    async getMapTransport({ itineraryID, variationID }) {
        // Get array of all transport place IDs.
        const itinerary = await this.get(
            `itineraries/${itineraryID}/${variationID}`
        );
        const transportPlaceIDs = itinerary.days.flatMap((day) =>
            day.components
                .filter((component) => component.type === "TRANSPORT")
                .filter(
                    (component) =>
                        component.start_location && component.end_location
                )
                .map((component) => [
                    component.start_location.id,
                    component.end_location.id,
                ])
        );

        // Return array of all transport coordinates.
        const transportPlaces = [];
        for (let i = 0; i < transportPlaceIDs.length; i++) {
            transportPlaces.push([]);
            for (let j = 0; j < transportPlaceIDs[i].length; j++) {
                transportPlaces[i].push(
                    await this.get(`places/${transportPlaceIDs[i][j]}`)
                );
            }
        }

        // Filter out invalid coodinate values.
        const transportCoordinates = transportPlaces.filter(
            (route) =>
                parseFloat(route[0].latitude) >= -90 &&
                parseFloat(route[0].latitude) <= 90 &&
                parseFloat(route[0].longitude) >= -180 &&
                parseFloat(route[0].longitude) <= 180 &&
                parseFloat(route[1].latitude) >= -90 &&
                parseFloat(route[1].latitude) <= 90 &&
                parseFloat(route[1].longitude) >= -180 &&
                parseFloat(route[1].longitude) <= 180
        );

        return Array.isArray(transportCoordinates)
            ? transportCoordinates.map((route) =>
                  route.map((route) => this.mapTransportReducer(route))
              )
            : [];
    }

    tourReducer(tour) {
        return {
            id: tour.id,
            name: tour.name,
        };
    }

    tourDossierReducer(tour) {
        return {
            id: tour.id,
            slug: tour.slug,
            name: tour.name,
            description: tour.description,
            images: tour.images.map((image) => ({
                type: image.type,
                href: image.image_href,
            })),
            details: tour.details.map((detail) => ({
                id: detail.detail_type.id,
                label: detail.detail_type.label,
                body: detail.body,
            })),
            categories: tour.categories.map((category) => ({
                typeId: category.category_type.id,
                type: category.category_type.label,
                name: category.name,
            })),
            visitedCountries: tour.geography.visited_countries.map(
                (visitedCountry) => ({
                    name: visitedCountry.name,
                })
            ),
            itinerary: tour.structured_itineraries.map((itinerary) => ({
                id: itinerary.id,
                href: itinerary.href,
                variationId: itinerary.variation_id,
            })),
            startCity: tour.geography.start_city.name,
            endCity: tour.geography.finish_city.name,
            bookings: tour.site_links[2].href,
        };
    }

    itineraryReducer(itin) {
        return {
            days: itin.days.map((day) => ({
                day: day.day,
                summary: day.summary,
                description: day.description,
                ...(day.start_location && {
                    startLocation: day.start_location.name,
                }),
                ...(day.end_location && { endLocation: day.end_location.name }),
                ...(day.meals && { meals: day.meals }),
                components: day.components.map((component) => ({
                    type: component.type,
                    summary: component.summary,
                    timePeriod: component.time_period,
                    ...(component.accommodation_dossier && {
                        accomType:
                            component.accommodation_dossier.property_type.label,
                    }),
                    ...(component.duration && {
                        minDuration: component.duration.min_hr,
                    }),
                    ...(component.duration && {
                        maxDuration: component.duration.max_hr,
                    }),
                    ...(component.activity_dossier && {
                        activityName: component.activity_dossier.name,
                    }),
                    ...(component.start_location && {
                        startLocation: {
                            name: component.start_location.name,
                            ...(component.start_location.id && {
                                id: component.start_location.id,
                            }),
                        },
                    }),
                    ...(component.end_location && {
                        endLocation: {
                            name: component.end_location.name,
                            ...(component.end_location.id && {
                                id: component.end_location.id,
                            }),
                        },
                    }),
                    ...(component.accommodation_dossier && {
                        accomDossier: {
                            name: component.accommodation_dossier.name,
                            ...(component.accommodation_dossier.id && {
                                id: component.accommodation_dossier.id,
                            }),
                        },
                    }),
                })),
            })),
        };
    }

    mapAccomReducer(place) {
        return {
            coordinates: [place.longitude, place.latitude],
        };
    }

    mapActivityReducer(activity) {
        return {
            coordinates: [activity.longitude, activity.latitude],
        };
    }

    mapTransportReducer(transport) {
        return {
            coordinates: [transport.longitude, transport.latitude],
        };
    }
}

export default GAdventuresAPI;
