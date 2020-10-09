import { RESTDataSource } from "apollo-datasource-rest";

class DirectionsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "https://api.mapbox.com/directions/v5/mapbox/";
        this.initialize({});
    }

    async getMapRoutes({ coordsArr }) {
        try {
            const routesPromises = coordsArr.map((route) =>
                this.get(
                    `driving/${route}?alternatives=true&geometries=geojson&steps=true&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
                )
            );
            const routes = await Promise.all(routesPromises);

            return Array.isArray(routes)
                ? routes.map((route) => this.mapRouteReducer(route))
                : [];
        } catch (err) {
            console.log(err);
        }
    }

    mapRouteReducer(response) {
        return {
            routes: response.routes.map((route) => ({
                legs: route.legs.map((leg) => ({
                    steps: leg.steps.map((step) => ({
                        geometry: {
                            coordinates: step.geometry.coordinates.map(
                                (coords) => [coords[0], coords[1]]
                            ),
                            type: step.geometry.type,
                        },
                    })),
                })),
            })),
        };
    }
}

export default DirectionsAPI;
