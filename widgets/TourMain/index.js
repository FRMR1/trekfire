import styled from "styled-components";
import Map from "../../components/Map";
import TourBody from "./TourBody";

const MainContainer = styled.div`
    margin-top: 70px;
    flex-direction: row;
    display: flex;
    // overflow: hidden;
    // width: 100%;
`;

const DescContainer = styled.div`
    margin: 30px 40px 50px;
    width: 50%;
`;

const MapContainer = styled.div`
    position: relative;
    height: 100% !important;
    width: 50% !important;
`;

const SubH3 = styled.h3`
    font-family: Roboto Mono;
    font-weight: 300;
    text-transform: uppercase;
    font-size: 13px;
    margin-top: 0;
`;

const TourTitle = styled.h2`
    font-size: 30px;
    margin-bottom: 5px;
`;

const TourMain = (props) => {
    return (
        <MainContainer>
            <DescContainer>
                <TourTitle>{props.tour.name}</TourTitle>
                <SubH3>
                    {props.itin.days.length} days, {props.tour.startCity} to{" "}
                    {props.tour.endCity}
                </SubH3>
                <TourBody tour={props.tour} itin={props.itin} />
            </DescContainer>
            <MapContainer>
                <Map
                    mapRoutes={props.mapRoutes}
                    mapAccom={props.mapAccom}
                    mapActivities={props.mapActivities}
                    mapTransport={props.mapTransport}
                />
            </MapContainer>
        </MainContainer>
    );
};

export default TourMain;
