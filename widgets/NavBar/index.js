import { useContext } from "react";
import { disableExperimentalFragmentVariables, useQuery } from "@apollo/client";
import { withApollo } from "../../util/apollo";
import Logo from "../../components/Logo";
import Search from "../../components/Search";
import DarkModeToggle from "../../components/DarkModeToggle";
import { Context } from "../../context/context";
import { GET_TOURS } from "../../util/gql";
import styled from "styled-components";

const NavContainer = styled.div`
    position: fixed;
    top: 0;
    box-shadow: ${(props) => props.theme.navBarShadow};
    height: 70px;
    background-color: ${(props) => props.theme.background};
    transition: background-color 0.3s ease;
    width: 100%;
    z-index: 2;
`;

const NavBar = (props) => {
    const { tours, setTours } = useContext(Context);

    if (!Object.keys(tours).length) {
        const { data, loading, error } = useQuery(GET_TOURS);

        if (data) {
            setTours(data);
        }

        if (error) return `Error! ${error.message}`;

        return (
            <NavContainer>
                <Logo />
                <Search
                    home={false}
                    tourData={tours}
                    loading={loading ? true : false}
                />
                <DarkModeToggle />
            </NavContainer>
        );
    }

    return (
        <NavContainer>
            <Logo />
            <Search home={false} tourData={tours} loading={false} />
            <DarkModeToggle />
        </NavContainer>
    );
};

export default withApollo(NavBar);
