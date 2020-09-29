import React, { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
    const [tours, setTours] = useState({});
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <Context.Provider value={{ tabIndex, setTabIndex, tours, setTours }}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
