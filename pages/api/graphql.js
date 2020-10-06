import { ApolloServer, gql } from "apollo-server-micro";
import connectDb from "../../util/mongoose";
import GAdventuresAPI from "./data/tours";
import DirectionsAPI from "./data/map";

const typeDefs = gql`
    type Query {
        tours: [Tour]!
        tourDossier(id: ID!): TourDossier
        itinDossier(id: ID!): ItinDossier
        mapAccom(id: ID!): [Location]
        mapActivities(id: ID!): [Location]
        mapTransport(id: ID!): [[Location]]
        mapRoutes(coords: [String]): [Routes]
    }
    type Tour {
        id: ID!
        name: String!
    }
    type TourDossier {
        id: ID!
        slug: String!
        name: String!
        description: String
        images: [Image]
        details: [Detail]
        categories: [Category]
        visitedCountries: [Location]
        itinerary: [Itinerary]
        startCity: String
        endCity: String
    }
    type Itinerary {
        id: String!
        href: String!
        variationId: String
    }
    type Routes {
        routes: [Route]
    }
    type Route {
        duration: Float
        distance: Float
        weight: Float
        weightName: String
        geometry: Geometry
        legs: [Leg]
    }
    type Geometry {
        coordinates: [[Float]]
        type: String
    }
    type Leg {
        distance: Float
        duration: Float
        weight: Float
        steps: [Step]
        summary: String
    }
    type Step {
        distance: Float
        drivingSide: String
        duration: Float
        geometry: Geometry
        intersections: [Intersection]
        maneuver: Maneuver
        mode: String
        name: String
        weight: Float
    }
    type Intersection {
        location: [Float]
        bearings: [Float]
        entry: [Boolean]
        geometryIndex: Float
        in: Float
        out: Float
        lanes: [Lane]
    }
    type Maneuver {
        bearingBefore: Float
        bearingAfter: Float
        type: String
        modifier: String
        location: [Float]
        instruction: String
    }
    type Lane {
        valid: String
        indications: [String]
    }
    type ItinDossier {
        days: [Day]
    }
    type Day {
        day: Int
        description: String
        summary: String
        startLocation: String
        endLocation: String
        components: [Component]
        meals: [Meal]
    }
    type Component {
        type: String!
        summary: String
        startLocation: Location
        endLocation: Location
        minDuration: String
        maxDuration: String
        activityName: String
        timePeriod: String
        accomType: String
        accomDossier: AccomDossier
    }
    type AccomDossier {
        name: String
        id: String
    }
    type Location {
        id: String
        name: String
        coordinates: [Float]
    }
    type Image {
        type: String
        href: String
    }
    type Detail {
        id: ID
        label: String
        body: String
    }
    type Category {
        typeId: ID
        type: String
        name: String
    }
    type Meal {
        type: String
    }
`;

const resolvers = {
    Query: {
        tours: async (_, __, { dataSources }) => {
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

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        GAdventuresAPI: new GAdventuresAPI(),
        DirectionsAPI: new DirectionsAPI(),
    }),
    engine: {
        reportSchema: true,
        variant: "current",
    },
});

export const config = {
    api: {
        bodyParser: false,
    },
};

const server = apolloServer.createHandler({ path: "/api/graphql" });

export default server;
