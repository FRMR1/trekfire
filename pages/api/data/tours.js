import { RESTDataSource } from "apollo-datasource-rest";

class GAdventuresAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "https://rest.gadventures.com/";
    }

    willSendRequest(request) {
        request.headers.set(
            "X-Application-Key",
            process.env.G_ADVENTURES_LIVE_TOKEN
        );
    }

    async getAllTours() {
        const allTours = [];
        const response = await this.get("/tour_dossiers");
        const totalTours = response.count;
        const totalPages = Math.ceil(totalTours / response.max_per_page);
        const promiseArray = [];
        for (let i = 0; i < totalPages + 1; i++) {
            promiseArray.push(this.get(`/tour_dossiers?page=${i}`));
        }
        let resolvedPromises = await Promise.all(promiseArray);
        for (let i = 0; i < resolvedPromises.length; i++) {
            allTours.push(...resolvedPromises[i].results);
        }
        return Array.isArray(allTours)
            ? allTours.map((tour) => this.tourReducer(tour))
            : [];
    }

    async getTourDossierById({ tourId }) {
        const response = await this.get(`tour_dossiers/${tourId}`);
        return this.tourDossierReducer(response);
    }

    async getItinerary({ itineraryId }) {
        const response = await this.get(`itineraries/${itineraryId}`);
        return this.itineraryReducer(response);
    }

    async getMapAccom({ itineraryId }) {
        // Get array of all accommodation dossier ID's.
        const response = await this.get(`itineraries/${itineraryId}`);
        const nestedAccomArr = response.days.map((day) =>
            day.components
                .filter((component) => component.type === "ACCOMMODATION")
                .filter((component) => component.accommodation_dossier)
                .map((component) => component.accommodation_dossier.id)
        );

        console.log("NESTED ACCCOM ARRAY", nestedAccomArr);

        const accomArr = nestedAccomArr.flat(1).filter((el) => el);

        console.log("FLAT ACCOM ARRAY", accomArr);

        // Return array of all accommodation place ID's.
        const accomPromises = accomArr.map((id) =>
            this.get(`accommodation_dossiers/${id}`)
        );
        const accomResolved = await Promise.all(accomPromises);
        const placeIds = accomResolved
            .filter((accom) => accom.location)
            .map((accom) => accom.location.id);

        console.log("ACCOM RESOLVED", placeIds);

        // Return array of all accommodation coordinates.
        const placesPromises = placeIds.map((id) => this.get(`places/${id}`));
        const accomPlaces = await Promise.all(placesPromises);

        return Array.isArray(accomPlaces)
            ? accomPlaces.map((place) => this.mapAccomReducer(place))
            : [];
    }

    async getMapActivities({ itineraryId }) {
        // Get array of all activity place ID's.
        const response = await this.get(`itineraries/${itineraryId}`);
        const activityArr = response.days.map((day) =>
            day.components
                .filter((component) => component.type === "ACTIVITY")
                .filter((component) => component.start_location)
                .map((component) => component.start_location.id)
        );
        const idArr = activityArr.flat(1);

        // Return array of all activity coordinates.
        const placesPromises = idArr.map((id) => this.get(`places/${id}`));
        const activityPlaces = await Promise.all(placesPromises);

        const filteredPlaces = activityPlaces.filter(
            (place) =>
                parseFloat(place.latitude) >= -90 &&
                parseFloat(place.latitude) <= 90 &&
                parseFloat(place.longitude) >= -180 &&
                parseFloat(place.longitude) <= 180
        );

        return Array.isArray(filteredPlaces)
            ? filteredPlaces.map((place) => this.mapActivityReducer(place))
            : [];
    }

    async getMapTransport({ itineraryId }) {
        // Get array of all transport place ID's.
        const response = await this.get(`itineraries/${itineraryId}`);
        const transportArr = response.days.map((day) =>
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
        const idArr = transportArr.flat(1);

        // Return array of all transport coordinates.
        const routesPromises = idArr.map((route) =>
            route.map((id) => this.get(`places/${id}`))
        );
        const routes = await Promise.all(
            routesPromises.map(async (route) => await Promise.all(route))
        );
        // Filter out invalid coodinate values
        const filteredRoutes = routes.filter(
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

        return Array.isArray(filteredRoutes)
            ? filteredRoutes.map((route) =>
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
