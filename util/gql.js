import { gql } from "@apollo/client";

export const GET_TOURS = gql`
    query GetTours {
        tours {
            id
            name
        }
    }
`;

export const GET_TOUR_DOSSIER = gql`
    query GetTourDossier($id: ID!) {
        tourDossier(id: $id) {
            id
            slug
            name
            description
            images {
                type
                href
            }
            details {
                id
                label
                body
            }
            categories {
                typeId
                type
                name
            }
            visitedCountries {
                name
            }
            itinerary {
                id
            }
            startCity
            endCity
        }
    }
`;

export const GET_ITIN_DOSSIER = gql`
    query GetItinDossier($id: ID!) {
        itinDossier(id: $id) {
            days {
                day
                summary
                description
                startLocation
                endLocation
                meals {
                    type
                }
                components {
                    type
                    summary
                    startLocation {
                        name
                    }
                    endLocation {
                        name
                    }
                    minDuration
                    maxDuration
                    activityName
                    timePeriod
                    accomType
                    accomDossier {
                        id
                        name
                    }
                }
            }
        }
    }
`;

export const GET_MAP_ACCOM = gql`
    query GetMapAccom($id: ID!) {
        mapAccom(id: $id) {
            name
            coordinates
        }
    }
`;

export const GET_MAP_ACTIVITIES = gql`
    query GetMapActivities($id: ID!) {
        mapActivities(id: $id) {
            name
            coordinates
        }
    }
`;

export const GET_MAP_TRANSPORT = gql`
    query GetMapTransport($id: ID!) {
        mapTransport(id: $id) {
            name
            coordinates
        }
    }
`;

export const GET_MAP_ROUTES = gql`
    query GetMapRoutes($coords: [String]) {
        mapRoutes(coords: $coords) {
            routes {
                legs {
                    steps {
                        geometry {
                            coordinates
                            type
                        }
                    }
                }
            }
        }
    }
`;
