import { useContext } from "react";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import styled from "styled-components";
import Search from "../components/Search";
import HomeNav from "../widgets/HomeNav";
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

const Nav = styled.div`
    float: right;
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
            <HomeNav />
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

export default Home;
