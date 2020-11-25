import Link from "next/link";
import styled from "styled-components";
import MediaQuery from "react-responsive";

const Nav = styled.div`
    position: absolute;
    top: 25px;
    right: 40px;
`;

const HomeNav = (props) => {
    return (
        <Nav>
            <Link href={"/about"}>
                <a>
                    <img src="/images/about.svg" alt="About" width="25" />
                </a>
            </Link>
        </Nav>
    );
};

export default HomeNav;
