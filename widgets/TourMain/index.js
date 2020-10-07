import styled from "styled-components";
import Map from "../../components/Map";
import Loading from "../../widgets/Loading";
import TourBody from "./TourBody";
import { useContext } from "react";
import { LoadingContext } from "../../pages/_app";

const MainContainer = styled.div`
    margin-top: 70px;
    position: relative;
    min-height: calc(100vh - 70px);
`;

const DescContainer = styled.div`
    padding: 30px 40px 50px;
    width: 640px !important;
`;

const MapContainer = styled.div`
    inset: 0;
    left: 640px;
    position: absolute;
`;

const SubH3 = styled.h3`
    font-family: Roboto Mono;
    font-weight: 300;
    text-transform: uppercase;
    font-size: 13px;
    margin-top: 0;
    transition: color 0.3s ease;
    color: ${(props) => props.theme.tourSubtitle};
`;

const TourTitle = styled.h2`
    font-size: 30px;
    margin-bottom: 5px;
    transition: color 0.3s ease;
    color: ${(props) => props.theme.heading};
`;

const TourMain = (props) => {
    const { isLoading, setIsLoading } = useContext(LoadingContext);

    return (
        <MainContainer>
            {isLoading ? (
                <Loading />
            ) : (
                <DescContainer>
                    <TourTitle>{props.tour.name}</TourTitle>
                    <SubH3>
                        {props.itin.days.length} days, {props.tour.startCity} to{" "}
                        {props.tour.endCity}
                    </SubH3>
                    <TourBody tour={props.tour} itin={props.itin} />
                </DescContainer>
            )}

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
