export const resolvers = {
    Query: {
        tours: async (_, __, { dataSources }) => {
            console.log("DATA SOURCES: ", dataSources);
            return dataSources.GAdventuresAPI.getAllTours();
        },
        tourDossier: (_, { id }, { dataSources }) => {
            return dataSources.GAdventuresAPI.getTourDossierByID({
                tourID: id,
            });
        },
        itinDossier: async (_, { id }, { dataSources }) => {
            return dataSources.GAdventuresAPI.getItinerary({ itineraryID: id });
        },
        mapAccom: async (_, { id }, { dataSources }) => {
            return dataSources.GAdventuresAPI.getMapAccom({ itineraryID: id });
        },
        mapActivities: async (_, { id }, { dataSources }) => {
            return dataSources.GAdventuresAPI.getMapActivities({
                itineraryID: id,
            });
        },
        mapTransport: async (_, { id }, { dataSources }) => {
            return dataSources.GAdventuresAPI.getMapTransport({
                itineraryID: id,
            });
        },
        mapRoutes: async (_, { coords }, { dataSources }) => {
            return dataSources.DirectionsAPI.getMapRoutes({
                coordsArr: coords,
            });
        },
    },
};
