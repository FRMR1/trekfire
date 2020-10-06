import React, { useContext } from "react";
import Toggle from "react-toggle";
import { Context } from "../../context/context";
import Moon from "./Moon";
import Sun from "./Sun";
import styled from "styled-components";

const DarkMode = styled.div`
    position: absolute;
    top: 22px;
    right: 20px;
`;

const DarkModeToggle = (props) => {
    const { darkMode } = useContext(Context);

    return (
        <DarkMode>
            <Toggle
                defaultChecked={darkMode.value}
                className="reactToggle"
                onChange={darkMode.toggle}
                icons={{
                    checked: <Moon />,
                    unchecked: <Sun />,
                }}
            />
        </DarkMode>
    );
};

export default DarkModeToggle;
