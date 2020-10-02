import styled from "styled-components";
import Logo from "../../components/Logo";
import Search from "../../components/Search";
import DarkModeToggle from "../../components/DarkModeToggle";
import { withApollo } from "../../util/apollo";
import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { Context } from "../../context/context";
import { GET_TOURS } from "../../util/gql";

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

        if (loading) {
            return (
                <NavContainer>
                    <Logo />
                    <Search home={false} tourData={tours} loading={true} />
                    <DarkModeToggle />
                </NavContainer>
            );
        }
        if (error) return `Error! ${error.message}`;
        setTours(data);
    }

    return (
        <NavContainer>
            <Logo />
            <Search theme={"navbar"} tourData={tours} />
            <DarkModeToggle />
        </NavContainer>
    );
};

export default withApollo(NavBar);