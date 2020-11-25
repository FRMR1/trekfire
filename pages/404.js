import styled from "styled-components";
import HomeNav from "../widgets/HomeNav";
import Logo from "../components/Logo";

const HomeContainer = styled.div`
    background-image: url("/images/img1.jpg");
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    top: 0;
    overflow: hidden;
`;

const LogoContainer = styled.div`
    position: absolute;
`;

const SubContainer = styled.div`
    position: relative;
    margin: 50vh auto;
    text-align: center;
`;

const Heading404 = styled.div`
    color: #ff5c6e;
    font-size: 24px;
`;

export default function Custom404() {
    return (
        <HomeContainer>
            <LogoContainer>
                <Logo />
            </LogoContainer>
            <HomeNav />
            <SubContainer>
                <Heading404>404: Page not found</Heading404>
            </SubContainer>
        </HomeContainer>
    );
}
