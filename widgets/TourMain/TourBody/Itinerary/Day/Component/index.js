import Aux from "../../../../../../hoc/Aux";
import styled from "styled-components";

const MetaSpan = styled.span`
    display: inline;
    float: right;
    font-size: 11px;
    color: ${(props) => props.theme.componentMeta};
`;

const SummaryP = styled.p`
    margin-bottom: 0 !important;
    margin-top: 25px;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 12px;
    color: ${(props) => props.theme.componentP};
`;

const ComponentContainer = styled.div`
    background-color: ${(props) => props.theme.componentBg};
    padding: 25px;
    margin: 20px 0;
    border-left: 3px solid #ff615e;
    border-radius: 0 5px 5px 0;
`;

const ComponentH5 = styled.h5`
    display: inline;
    margin: 0;
    font-weight: 500;
    color: ${(props) => props.theme.componentH5};
`;

const Component = (props) => {
    const renderTitle = (e) => {
        switch (e) {
            case "ACTIVITY":
                return props.activityName;
            case "ACCOMMODATION":
                return "Accommodation";
            case "TRANSPORT":
                return "Transport";
            case "FREE_TIME":
                return "Free Time";
        }
    };

    const renderTimePeriod = (e) => {
        switch (e) {
            case "MORNING":
                return "- Morning";
            case "AFTERNOON":
                return "- Afternoon";
            case "FULL_DAY":
                return "- Full Day";
            default:
                return "";
        }
    };

    const renderMeta = (e) => {
        switch (e) {
            case "ACTIVITY":
                if (props.startLocation) {
                    return props.startLocation.name;
                } else if (props.duration) {
                    return `${props.minDuration}`;
                } else {
                    return "";
                }
            case "ACCOMMODATION":
                return props.accommType;
            case "TRANSPORT":
                if (props.startLocation && props.endLocation) {
                    return `${props.startLocation.name} - ${props.endLocation.name}`;
                } else if (props.startLocation && !props.endLocation) {
                    return props.startLocation.name;
                } else if (!props.startLocation && props.endLocation) {
                    return props.endLocation.name;
                } else {
                    return null;
                }
            case "FREE_TIME":
                return `${props.startLocation.name} ${renderTimePeriod(
                    props.timePeriod
                )}`;
        }
    };

    return (
        <ComponentContainer>
            <ComponentH5>{renderTitle(props.type)}</ComponentH5>
            <MetaSpan>{renderMeta(props.type)}</MetaSpan>
            <SummaryP>{props.summary}</SummaryP>
        </ComponentContainer>
    );
};

export default Component;
