import { gql } from "@apollo/client";

export const typeDefs = gql`
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
    type Routes {
        routes: [Route]
    }
    type Route {
        legs: [Leg]
    }
    type Leg {
        steps: [Step]
    }
    type Step {
        geometry: Geometry
    }
    type Geometry {
        coordinates: [[Float]]
        type: String
    }
`;
