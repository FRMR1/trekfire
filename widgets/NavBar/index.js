import styled from "styled-components";
import Logo from "../../components/Logo";
import Search from "../../components/Search";
import { withApollo } from "../../lib/apollo";
import UserDropdown from "../../components/UserDropdown";
import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { Context } from "../../context/context";
import { GET_TOURS } from "../../lib/gql";
import { markLoadingError } from "next/dist/next-server/lib/router/router";

const NavContainer = styled.div`
    position: fixed;
    top: 0;
    height: 70px;
    background-color: #fff;
    width: 100%;
    box-shadow: 0 2px 10px rgb(0, 0, 0, 0.1);
    z-index: 2;
`;

const NavBar = (props) => {
    const { tours, setTours } = useContext(Context);

    console.log(tours);

    if (!Object.keys(tours).length) {
        const { data, loading, error } = useQuery(GET_TOURS);

        if (loading) {
            return (
                <NavContainer>
                    <Logo />
                    <Search theme={"navbar"} tourData={tours} loading={true} />
                    <UserDropdown />
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
            <UserDropdown />
        </NavContainer>
    );
};

export default withApollo(NavBar);
