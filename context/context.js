import React, { createContext, useState } from "react";
import useDarkMode from "use-dark-mode";

export const Context = createContext();

const ContextProvider = (props) => {
    const darkMode = useDarkMode();
    const [tours, setTours] = useState({});
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <Context.Provider
            value={{
                tabIndex,
                setTabIndex,
                tours,
                setTours,
                darkMode,
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
