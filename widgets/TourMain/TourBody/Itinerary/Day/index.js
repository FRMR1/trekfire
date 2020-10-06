import Component from "./Component";
import Meals from "./Meals";
import styled from "styled-components";

const DayContainer = styled.div`
    margin-bottom: 70px;
`;

const DayP = styled.p`
    margin-bottom: 35px;
    font-weight: 200;
`;

const DayH4 = styled.h4`
    font-size: 20px;
    color: ${(props) => props.theme.heading};
`;

const Day = (props) => {
    const keyGenerator = (e) => {
        return props.components.indexOf(e);
    };

    return (
        <DayContainer>
            <DayH4>
                Day {props.number}: {props.startLocation}
            </DayH4>
            <DayP>{props.summary}</DayP>
            <DayP>{props.description}</DayP>
            {props.components.map((component) => (
                <Component
                    key={keyGenerator(component)}
                    type={component.type}
                    duration={component.duration}
                    startLocation={component.startLocation}
                    endLocation={component.endLocation}
                    summary={component.summary}
                    activityName={component.activityName}
                    accommType={component.accommType}
                    timePeriod={component.timePeriod}
                />
            ))}
            {props.meals.length > 0 ? <Meals meals={props.meals} /> : null}
        </DayContainer>
    );
};

export default Day;
