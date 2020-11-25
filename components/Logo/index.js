import Link from "next/link";
import styled from "styled-components";
import MediaQuery from "react-responsive";

const LogoContainer = styled.div`
    margin-left: 20px;
    margin-top: 18px;
    @media only screen and (min-width: 1024px) {
        margin-left: 40px;
    }
`;

const LogoText = styled.h1`
    color: #ff615e;
    cursor: default;
    letter-spacing: -1px;
`;

const Logo = () => {
    return (
        <LogoContainer>
            <Link href="/">
                <a>
                    <MediaQuery query="(min-width: 1024px)">
                        <img
                            src="/images/logo.svg"
                            alt="Tripwire"
                            width="110"
                        />
                    </MediaQuery>
                    <MediaQuery query="(max-width: 1023px)">
                        <img
                            src="/images/logo-mobile.svg"
                            alt="Tripwire"
                            width="40"
                        />
                    </MediaQuery>
                </a>
            </Link>
        </LogoContainer>
    );
};

export default Logo;
