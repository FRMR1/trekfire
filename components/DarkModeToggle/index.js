import React, { useState } from "react";
import { useContext } from "react";
import Toggle from "react-toggle";
import { Context } from "../../context/context";
import styled from "styled-components";
import Moon from "./Moon";
import Sun from "./Sun";

const DarkModeToggle = (props) => {
    const { darkMode } = useContext(Context);

    const DarkMode = styled.div`
        position: absolute;
        top: 22px;
        right: 20px;
    `;

    return (
        <DarkMode>
            <Toggle
                defaultChecked={darkMode.value}
                aria-label="No label tag"
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
