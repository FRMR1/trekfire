import Aux from "../../../../hoc/Aux";
import Day from "./Day";

const Itinerary = (props) => {
    return (
        <Aux>
            {props.itin.days.map((day) => (
                <Day
                    key={day.day}
                    number={day.day}
                    summary={day.summary}
                    description={day.description}
                    startLocation={day.startLocation}
                    endLocation={day.endLocation}
                    meals={day.meals}
                    components={day.components}
                />
            ))}
        </Aux>
    );
};

export default Itinerary;
