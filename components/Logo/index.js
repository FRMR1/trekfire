import Link from "next/link";
import styled from "styled-components";

const LogoContainer = styled.div`
    margin-left: 40px;
    margin-top: 18px;
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
                    <img src="/images/logo.svg" alt="Trekfire" width="120" />
                </a>
            </Link>
        </LogoContainer>
    );
};

export default Logo;
