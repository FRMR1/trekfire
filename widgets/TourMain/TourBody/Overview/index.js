import styled from "styled-components";

const ImageContainer = styled.div`
    overflow: hidden;
    border-radius: 10px;
    height: 200px;
`;

const Description = styled.p`
    margin: 50px 0 40px;
`;

const Category = styled.span`
    font-family: Roboto Mono;
    text-transform: uppercase;
    font-weight: 300;
    font-size: 12px;
    margin-left: 5px;
    color: ${(props) => props.theme.heading};
`;

const InfoTitle = styled.h3`
    color: ${(props) => props.theme.heading};
`;

const CategoryTitle = styled.h5`
    font-weight: 400;
    color: ${(props) => props.theme.categoryTitle};
`;

const TourImage = styled.img`
    -webkit-filter: ${(props) => props.theme.imgFilter};
    filter: ${(props) => props.theme.imgFilter};
    transition: filter 0.3s ease;
    transition: -webkit-filter 0.3s ease;
    object-fit: cover;
    width: 100%;
    height: 200px;
`;

const Overview = (props) => {
    return (
        <>
            <ImageContainer>
                <TourImage src={props.tour.images[1].href} />
            </ImageContainer>
            <Description>{props.tour.description}</Description>
            <InfoTitle>Trip Info</InfoTitle>
            <CategoryTitle>
                Travel Style:{" "}
                <Category>
                    {props.tour.categories[0]
                        ? props.tour.categories[0].name
                        : "N/A"}
                </Category>
            </CategoryTitle>
            <CategoryTitle>
                Service Level:{" "}
                <Category>
                    {props.tour.categories[1]
                        ? props.tour.categories[1].name
                        : "N/A"}
                </Category>
            </CategoryTitle>
            <CategoryTitle>
                Physical Rating:{" "}
                <Category>
                    {props.tour.categories[2]
                        ? props.tour.categories[2].name
                        : "N/A"}
                </Category>
            </CategoryTitle>
            <CategoryTitle>
                Trip Type:{" "}
                <Category>
                    {props.tour.categories[3]
                        ? props.tour.categories[3].name
                        : "N/A"}
                </Category>
            </CategoryTitle>
        </>
    );
};

export default Overview;
