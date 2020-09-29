import { RESTDataSource } from "apollo-datasource-rest";

class DirectionsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "https://api.mapbox.com/directions/v5/mapbox/";
    }

    async getMapRoutes({ coordsArr }) {
        try {
            const routesPromises = coordsArr.map((route) =>
                this.get(
                    `driving/${route}?alternatives=true&geometries=geojson&steps=true&access_token=pk.eyJ1IjoidGhlYmVhdDQyIiwiYSI6ImNrZDdyeTc1MzA1ankydXFhNjV0djZmeW8ifQ.Zdigb6-Plm4-4eGQ0ytngQ`
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
