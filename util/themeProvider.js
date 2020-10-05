import { lightTheme, darkTheme } from "./theme";
import { ThemeProvider } from "styled-components";
import { Context } from "../context/context";
import { useContext } from "react";

export default ({ children }) => {
    const { darkMode } = useContext(Context);
    const theme = darkMode.value ? darkTheme : lightTheme;

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
