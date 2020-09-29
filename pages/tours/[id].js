import NavBar from "../../widgets/NavBar";
import { useRouter } from "next/router";
import { request } from "graphql-request";
import {
    GET_TOURS,
    GET_TOUR_DOSSIER,
    GET_ITIN_DOSSIER,
    GET_MAP_ROUTES,
    GET_MAP_ACTIVITIES,
    GET_MAP_TRANSPORT,
    GET_MAP_ACCOM,
} from "../../lib/gql";
import TourMain from "../../widgets/TourMain";

const API_URL = process.env.API_URL;

const Tour = ({
    tourDossier,
    itinDossier,
    mapRoutes,
    mapAccom,
    mapActivities,
    mapTransport,
}) => {
    const router = useRouter();
    const { tourId } = router.query;

    return (
        <div>
            <NavBar />
            <TourMain
                tour={tourDossier.tourDossier}
                itin={itinDossier.itinDossier}
                mapRoutes={mapRoutes.mapRoutes}
                mapAccom={mapAccom.mapAccom}
                mapActivities={mapActivities.mapActivities}
                mapTransport={mapTransport.mapTransport}
            />
        </div>
    );
};

export async function getStaticPaths() {
    const tours = await request(API_URL, GET_TOURS);
    const paths = tours.tours.map((tour) => `/tours/${tour.id}`);

    // { fallback: false } means other routes should 404.
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    // params contains the tour `id`.
    const tourVars = { id: params.id };
    const tourDossier = await request(API_URL, GET_TOUR_DOSSIER, tourVars);

    const itinVars = { id: tourDossier.tourDossier.itinerary[0].id };
    const itinDossier = await request(API_URL, GET_ITIN_DOSSIER, itinVars);

    const mapAccom = await request(API_URL, GET_MAP_ACCOM, itinVars);
    const mapActivities = await request(API_URL, GET_MAP_ACTIVITIES, itinVars);
    const mapTransport = await request(API_URL, GET_MAP_TRANSPORT, itinVars);

    const coords = mapTransport.mapTransport.map((route) =>
        route
            .reduce(
                (str, place) =>
                    `${str};${place.coordinates[0]},${place.coordinates[1]}`,
                ""
            )
            .substring(1)
    );
    const routesVars = { coords };
    const mapRoutes = await request(API_URL, GET_MAP_ROUTES, routesVars);

    // Pass tour and itinerary data to the page via props.
    return {
        props: {
            tourDossier,
            itinDossier,
            mapAccom,
            mapRoutes,
            mapActivities,
            mapTransport,
        },
    };
}

export default Tour;
