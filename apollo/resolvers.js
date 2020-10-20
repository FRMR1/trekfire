export const resolvers = {
    Query: {
        tours: async (_, __, { dataSources }) => {
            return dataSources.GAdventuresAPI.getAllTours();
        },
        tourDossier: (_, { id }, { dataSources }) => {
            return dataSources.GAdventuresAPI.getTourDossierByID({
                tourID: id,
            });
        },
        itinDossier: async (_, { id, variationId }, { dataSources }) => {
            return dataSources.GAdventuresAPI.getItinerary({
                itineraryID: id,
                variationID: variationId,
            });
        },
        mapAccom: async (_, { id, variationId }, { dataSources }) => {
            return dataSources.GAdventuresAPI.getMapAccom({
                itineraryID: id,
                variationID: variationId,
            });
        },
        mapActivities: async (_, { id, variationId }, { dataSources }) => {
            return dataSources.GAdventuresAPI.getMapActivities({
                itineraryID: id,
                variationID: variationId,
            });
        },
        mapTransport: async (_, { id, variationId }, { dataSources }) => {
            return dataSources.GAdventuresAPI.getMapTransport({
                itineraryID: id,
                variationID: variationId,
            });
        },
        mapRoutes: async (_, { coords }, { dataSources }) => {
            return dataSources.DirectionsAPI.getMapRoutes({
                coordsArr: coords,
            });
        },
    },
};
