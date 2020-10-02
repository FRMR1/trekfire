import { useContext } from "react";
import { withApollo } from "../util/apollo";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import Search from "../components/Search";
import { GET_TOURS } from "../util/gql";
import Logo from "../components/Logo";
import { Context } from "../context/context";

const Home = (props) => {
    const HomeContainer = styled.div`
        background-image: url("/images/img1.jpg");
        width: 100%;
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        position: fixed;
        top: 0;
    `;

    const SearchBar = styled(Search)`
        width: 10px !important;
    `;

    const HomeH2 = styled.h2`
        color: #ff5c6e;
        position: relative;
        top: 25%;
        text-align: center;
        font-size: 35px;
        font-family: "NeoTech";
    `;

    const { data, loading, error } = useQuery(GET_TOURS);
    const { tours, setTours } = useContext(Context);

    if (loading)
        return (
            <HomeContainer>
                <Logo />
                <HomeH2>Your next adventure begins here.</HomeH2>
                <SearchBar tourData={tours} theme={"home"} loading={true} />
            </HomeContainer>
        );

    if (error) return `Error! ${error.message}`;

    setTours(data);

    return (
        <HomeContainer>
            <Logo />
            <HomeH2>Your next adventure begins here.</HomeH2>
            <SearchBar tourData={tours} home={true} />
        </HomeContainer>
    );
};

export default withApollo(Home);
