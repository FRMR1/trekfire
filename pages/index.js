import { useContext } from "react";
// import { withApollo } from "../util/apollo";
import { initializeApollo } from "../apollo/client";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import Search from "../components/Search";
import { GET_TOURS } from "../util/gql";
import Logo from "../components/Logo";
import { Context } from "../context/context";

const HomeContainer = styled.div`
    background-image: url("/images/img1.jpg");
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    top: 0;
`;

const LogoContainer = styled.div`
    position: absolute;
`;

const SubContainer = styled.div`
    position: relative;
    margin: 28vh 20px 0;
`;

const SearchBar = styled(Search)`
    width: 10px !important;
`;

const HomeH2 = styled.h2`
    color: #ff5c6e;
    text-align: center;
    font-size: 35px;
    font-family: "NeoTech";
`;

const Home = (props) => {
    const { data, loading, error } = useQuery(GET_TOURS);
    const { tours, setTours } = useContext(Context);

    if (data) {
        setTours(data);
    }

    if (error) return `Error! ${error.message}`;

    return (
        <HomeContainer>
            <LogoContainer>
                <Logo />
            </LogoContainer>
            <SubContainer>
                <HomeH2>Your next adventure begins here.</HomeH2>
                <SearchBar
                    tourData={data ? tours : null}
                    home={true}
                    loading={loading ? true : false}
                />
            </SubContainer>
        </HomeContainer>
    );
};

export async function getStaticPaths() {
    console.log("GET STATIC PATHS");

    const queryResult = await apolloClient.query({
        query: GET_TOUR_DOSSIER,
        variables: tourVars,
    });

    console.log(queryResult);
    // const paths = tours.tours.map((tour) => `/tours/${tour.id}`);
    const paths = null;

    // { fallback: false } means other routes should 404.
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    console.log("GET STATIC PROPS");

    const apolloClient = initializeApollo();

    const tourVars = { id: params.id };

    await apolloClient.query({
        query: GET_TOUR_DOSSIER,
        variables: tourVars,
    });

    await apolloClient.query({
        query: GET_ITIN_DOSSIER,
        variables: itinVars,
    });

    await apolloClient.query({
        query: GET_MAP_ACTIVITIES,
        variables: itinVars,
    });

    await apolloClient.query({
        query: GET_MAP_TRANSPORT,
        variables: itinVars,
    });

    // params contains the tour `id`.
    // const tourVars = { id: params.id };
    // const tourDossier = await request(API_URL, GET_TOUR_DOSSIER, tourVars);

    // const itinVars = { id: tourDossier.tourDossier.itinerary[0].id };
    // const itinDossier = await request(API_URL, GET_ITIN_DOSSIER, itinVars);

    // const mapAccom = await request(API_URL, GET_MAP_ACCOM, itinVars);
    // const mapActivities = await request(API_URL, GET_MAP_ACTIVITIES, itinVars);
    // const mapTransport = await request(API_URL, GET_MAP_TRANSPORT, itinVars);

    // Parse mapTransport array to coordinate string which can be consumed
    // by Mapbox Directions API.
    // const coords = mapTransport.mapTransport.map((route) =>
    //     route
    //         .reduce(
    //             (str, place) =>
    //                 `${str};${place.coordinates[0]},${place.coordinates[1]}`,
    //             ""
    //         )
    //         .substring(1)
    // );
    // const routesVars = { coords };
    // const mapRoutes = await request(API_URL, GET_MAP_ROUTES, routesVars);

    // Pass tour and itinerary data to the page via props.
    return {
        props: {
            tourDossier,
            itinDossier,
            mapAccom,
            mapRoutes,
            mapActivities,
            // mapTransport,
            initialApolloState: apolloClient.cache.extract(),
        },
    };
}

export default Home;
