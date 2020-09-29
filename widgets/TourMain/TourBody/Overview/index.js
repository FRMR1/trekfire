import Aux from "../../../../hoc/Aux";
import styled from "styled-components";
import styles from "./styles.module.css";

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
`;

const CategoryTitle = styled.h5`
    font-weight: 400;
`;

const Overview = (props) => {
    return (
        <Aux>
            <ImageContainer>
                <img
                    src={props.tour.images[1].href}
                    className={styles.tourImage}
                />
            </ImageContainer>
            <Description>{props.tour.description}</Description>
            <h3>Trip Info</h3>
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
        </Aux>
    );
};

export default Overview;
