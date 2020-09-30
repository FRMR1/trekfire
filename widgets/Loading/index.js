import NavBar from "../NavBar";
import styled, { keyframes } from "styled-components";
import Map from "../../components/Map";
import Aux from "../../hoc/Aux";

const loading = keyframes`
    0% {
        background-position: -100px;
    }
    40%,
    100% {
        background-position: 500px;
    }
`;

const MainContainer = styled.div`
    margin-top: 70px;
    flex-direction: row;
    display: flex;
`;

const MapContainer = styled.div`
    position: relative;
    overflow: hidden;
    height: 100% !important;
    width: 50% !important;
`;

const DescContainer = styled.div`
    margin: 30px 40px 50px;
    position: relative;
    width: 50%;
`;

const TourTitle = styled.div`
    max-width: 400px;
    width: 80%;
    position: relative;
    height: 30px;
    overflow: hidden;
    margin: 55px 0 10px;
    background-color: #eeeeee;
    border-radius: 5px;
    background-image: linear-gradient(90deg, #eee 0px, #ddd 200px, #eee 400px);
    background-size: 600px;
    animation: ${loading} 1.5s infinite linear 0.1s;
`;

const SubTitle = styled.div`
    max-width: 200px;
    width: 40%;
    position: relative;
    height: 18px;
    overflow: hidden;
    margin: 10px 0 10px;
    background-color: #eeeeee;
    border-radius: 5px;
    background-image: linear-gradient(90deg, #eee 0px, #ddd 200px, #eee 400px);
    background-size: 600px;
    animation: ${loading} 1.5s infinite linear 0.1s;
`;

const Image = styled.div`
    width: 100%;
    position: relative;
    height: 220px;
    overflow: hidden;
    margin: 45px 0 30px;
    background-color: #eeeeee;
    border-radius: 10px;
    background-image: linear-gradient(90deg, #eee 0px, #ddd 200px, #eee 400px);
    background-size: 600px;
    animation: ${loading} 1.5s infinite linear 0.1s;
`;

const ParagraphLine = styled.div`
    width: 100%;
    height: 15px;
    overflow: hidden;
    position: relative;
    margin: 8px 0;
    background-color: #eeeeee;
    border-radius: 5px;
    background-image: linear-gradient(90deg, #eee 0px, #ddd 200px, #eee 400px);
    background-size: 600px;
    animation: ${loading} 1.5s infinite linear 0.1s;
`;

const InfoTitle = styled.div`
    width: 100px;
    position: relative;
    overflow: hidden;
    height: 20px;
    margin: 40px 0 20px;
    border-radius: 5px;
    background-color: #eeeeee;
    background-image: linear-gradient(90deg, #eee 0px, #ddd 200px, #eee 400px);
    background-size: 600px;
    animation: ${loading} 1.5s infinite linear 0.1s;
`;

const InfoLine = styled.div`
    width: 200px;
    overflow: hidden;
    height: 15px;
    position: relative;
    margin: 15px 0;
    border-radius: 5px;
    background-color: #eeeeee;
    background-image: linear-gradient(90deg, #eee 0px, #ddd 200px, #eee 400px);
    background-size: 600px;
    animation: ${loading} 1.5s infinite linear 0.1s;
`;

const Loading = () => {
    return (
        <Aux>
            <NavBar />
            <MainContainer>
                <DescContainer>
                    <TourTitle />
                    <SubTitle />
                    <Image />
                    <ParagraphLine />
                    <ParagraphLine />
                    <ParagraphLine />
                    <ParagraphLine />
                    <ParagraphLine />
                    <InfoTitle />
                    <InfoLine />
                    <InfoLine />
                    <InfoLine />
                    <InfoLine />
                </DescContainer>
                <MapContainer>
                    <Map />
                </MapContainer>
            </MainContainer>
        </Aux>
    );
};

export default Loading;
