import Aux from "../../../../../../hoc/Aux";
import styled from "styled-components";

const MealSpan = styled.span`
    font-size: 13px;
    font-weight: 200;
`;

const Meals = (props) => {
    const parsedMeals = props.meals
        .map((meal) => meal.type.toLowerCase())
        .map((meal) => meal.charAt(0).toUpperCase() + meal.slice(1))
        .map((meal) => meal)
        .join(" | ");

    return (
        <Aux>
            <MealSpan>Meals Included: {parsedMeals}</MealSpan>
        </Aux>
    );
};

export default Meals;
