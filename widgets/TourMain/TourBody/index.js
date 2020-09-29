import styled from "styled-components";
import { Context } from "../../../context/context";
import { useContext, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Overview from "./Overview";
import Itinerary from "./Itinerary";
import Details from "./Details";
import Bookings from "./Bookings";

const TourNavUl = styled.ul`
    list-style: none;
    margin: 30px 0 55px;
`;

const TourNavLi = styled.li`
    display: inline;
    padding-right: 50px;
    font-weight: 200;
    font-size: 13px;
    padding: 0 15px 5px;
    margin-right: 20px;
    border-bottom: 3px solid #ff615e;
    cursor: pointer;
`;

const TourNav = (props) => {
    const { tabIndex, setTabIndex } = useContext(Context);

    useEffect(() => {
        setTabIndex(0);
    }, [props.tour]);

    return (
        <Tabs onSelect={(index) => setTabIndex(index)} selectedIndex={tabIndex}>
            <TabList>
                <Tab>Overview</Tab>
                <Tab>Itinerary</Tab>
                <Tab>Details</Tab>
                <Tab>Bookings</Tab>
            </TabList>
            <TabPanel>
                <Overview tour={props.tour} />
            </TabPanel>
            <TabPanel>
                <Itinerary itin={props.itin} />
            </TabPanel>
            <TabPanel>
                <Details tour={props.tour} />
            </TabPanel>
            <TabPanel>
                <Bookings tour={props.tour} />
            </TabPanel>
        </Tabs>
    );
};

export default TourNav;
