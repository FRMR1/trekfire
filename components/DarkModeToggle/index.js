import React from "react";
import { useContext } from "react";
import useDarkMode from "use-dark-mode";
import Toggle from "./Toggle";
import { Context } from "../../context/context";
import styled from "styled-components";

const DarkModeToggle = (props) => {
    const { darkMode } = useContext(Context);

    const DarkMode = styled.div`
        position: absolute;
        top: 0;
        right: 20px;
    `;

    return (
        <DarkMode>
            <button type="button" onClick={darkMode.disable}>
                ☀
            </button>
            {/* <Toggle checked={darkMode.value} onChange={darkMode.toggle} /> */}
            <button type="button" onClick={darkMode.enable}>
                ☾
            </button>
        </DarkMode>
    );
};

export default DarkModeToggle;
