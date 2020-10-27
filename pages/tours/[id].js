import { useEffect } from "react";
import { initializeApollo } from "../../apollo/client";
import NavBar from "../../widgets/NavBar";
import { useRouter } from "next/router";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
    GET_TOURS,
    GET_TOUR_DOSSIER,
    GET_ITIN_DOSSIER,
    GET_MAP_ROUTES,
    GET_MAP_ACTIVITIES,
    GET_MAP_TRANSPORT,
    GET_MAP_ACCOM,
} from "../../util/gql";
import TourMain from "../../widgets/TourMain";

const Tour = () => {
    const router = useRouter();

    const tourDossier = useQuery(GET_TOUR_DOSSIER, {
        variables: { id: router.query.id },
    });

    const itinVars = {
        id: tourDossier.data?.tourDossier.itinerary[0].id,
        variationId: tourDossier.data?.tourDossier.itinerary[0].variationId,
    };
    const skipItin = itinVars === undefined;
    const itinDossier = useQuery(GET_ITIN_DOSSIER, {
        variables: itinVars,
        skipItin,
    });
    const mapAccom = useQuery(GET_MAP_ACCOM, { variables: itinVars }, skipItin);
    const mapActivities = useQuery(
        GET_MAP_ACTIVITIES,
        {
            variables: itinVars,
        },
        skipItin
    );
    const mapTransport = useQuery(
        GET_MAP_TRANSPORT,
        {
            variables: itinVars,
        },
        skipItin
    );

    const coords =
        mapTransport?.data &&
        mapTransport.data.mapTransport.map((route) =>
            route
                .reduce(
                    (str, place) =>
                        `${str};${place.coordinates[0]},${place.coordinates[1]}`,
                    ""
                )
                .substring(1)
        );

    const routesVars = { coords };
    const [getMapRoutes, mapRoutes] = useLazyQuery(GET_MAP_ROUTES, {
        variables: routesVars,
    });

    useEffect(() => {
        // if tour dossier is updated, set mapRoutes.called to 'false'
        // to refetch map routes
        mapRoutes.called === false;
    }, [tourDossier]);

    useEffect(() => {
        // only fetch map routes if the query has not already been called
        // and the coordinates have been fetched
        if (!mapRoutes.called && coords) {
            getMapRoutes();
        }
    }, [coords]);

    return (
        <div>
            <NavBar />
            {tourDossier?.data &&
                itinDossier?.data &&
                mapAccom?.data &&
                mapActivities?.data &&
                mapTransport?.data &&
                mapRoutes?.data && (
                    <TourMain
                        tour={tourDossier.data.tourDossier}
                        itin={itinDossier.data.itinDossier}
                        mapAccom={mapAccom.data.mapAccom}
                        mapActivities={mapActivities.data.mapActivities}
                        mapTransport={mapTransport.data.mapTransport}
                        mapRoutes={mapRoutes.data.mapRoutes}
                    />
                )}
        </div>
    );
};

export async function getStaticPaths() {
    const apolloClient = initializeApollo();

    const tours = await apolloClient.query({
        query: GET_TOURS,
    });

    const paths = tours.data.tours.map((tour) => `/tours/${tour.id}`);

    // { fallback: false } means other routes should 404.
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const apolloClient = initializeApollo();

    const tourVars = { id: params.id };
    const tourDossier = await apolloClient.query({
        query: GET_TOUR_DOSSIER,
        variables: tourVars,
    });

    const itinVars = {
        id: tourDossier.data.tourDossier.itinerary[0].id,
        variationId: tourDossier.data.tourDossier.itinerary[0].variationId,
    };

    await apolloClient.query({
        query: GET_ITIN_DOSSIER,
        variables: itinVars,
    });

    await apolloClient.query({
        query: GET_MAP_ACCOM,
        variables: itinVars,
    });

    await apolloClient.query({
        query: GET_MAP_ACTIVITIES,
        variables: itinVars,
    });

    const mapTransport = await apolloClient.query({
        query: GET_MAP_TRANSPORT,
        variables: itinVars,
    });

    // Pass tour and itinerary data to the page via props.
    return {
        props: {
            initialApolloState: apolloClient.cache.extract(),
        },
    };
}

export default Tour;
