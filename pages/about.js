import Link from "next/link";
import styled from "styled-components";
import Logo from "../components/Logo";
import HomeNav from "../widgets/HomeNav";

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
    text-align: center;
`;

const AboutP = styled.p`
    color: #ff5c6e;
    max-width: 600px;
    text-align: center;
    font-size: 25px;
    font-family: "NeoTech";
    line-height: 40px;
    margin: 0 auto;
    margin-bottom: 50px;
`;

const GithubBtn = styled.a`
    display: inline-block;
    text-transform: uppercase;
    border: 1px solid #ff5c6e;
    line-height: 40px;
    color: #ff5c6e;
    text-decoration: none;
    padding: 5px 25px;
    text-align: center;
    margin: 20px 15px 0 0;
    border-radius: 3px;
    --webkit-transition: background-color 0.2s ease;
    -moz-transition: background-color 0.2s ease;
    -ms-transition: background-color 0.2s ease;
    -o-transition: background-color 0.2s ease;
    transition: background-color 0.2s ease;
    &:hover {
        background-color: rgba(255, 92, 111, 0.1);
        --webkit-transition: background-color 0.2s ease;
        -moz-transition: background-color 0.2s ease;
        -ms-transition: background-color 0.2s ease;
        -o-transition: background-color 0.2s ease;
        transition: background-color 0.2s ease;
    }
`;

const About = (props) => {
    return (
        <HomeContainer>
            <LogoContainer>
                <Logo />
            </LogoContainer>
            <HomeNav />
            <SubContainer>
                <AboutP>
                    Tripwire is an open-source project which uses the
                    G-Adventures API to map locational trip itinerary data to a
                    Mapbox instance.
                </AboutP>
                <GithubBtn
                    href="https://github.com/FRMR1/tripwire"
                    target="_blank"
                >
                    View On Github
                </GithubBtn>
            </SubContainer>
        </HomeContainer>
    );
};

export default About;
