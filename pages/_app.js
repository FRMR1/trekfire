import React, { createContext } from "react";
import App from "next/app";
import Head from "next/head";
import Aux from "../hoc/Aux";
import NProgress from "nprogress";
import ContextProvider from "../context/context";
import ThemeProvider from "../util/themeProvider";
import { withRouter } from "next/router";
import "../styles/globals.css";
import "mapbox-gl/dist/mapbox-gl.css";

export const LoadingContext = createContext(false);

class Trekfire extends App {
    state = {
        isLoading: false,
    };

    componentDidMount() {
        this.props.router.events.on("routeChangeStart", (url) => {
            NProgress.start();
            this.setState({ isLoading: true });
        });
        this.props.router.events.on("routeChangeComplete", () => {
            NProgress.done();
            this.setState({ isLoading: false });
        });
        this.props.router.events.on("routeChangeError", () => {
            NProgress.done();
            this.setState({ isLoading: false });
        });
    }

    setIsLoading = (isLoading) => {
        this.setState({ isLoading });
    };

    render() {
        const { Component, pageProps } = this.props;

        return (
            <Aux>
                <Head>
                    <title>Trekfire</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <LoadingContext.Provider
                    value={{
                        isLoading: this.state.isLoading,
                        setIsLoading: this.setIsLoading,
                    }}
                >
                    <ContextProvider>
                        <ThemeProvider>
                            <Component {...pageProps} />
                        </ThemeProvider>
                    </ContextProvider>
                </LoadingContext.Provider>
            </Aux>
        );
    }
}

export default withRouter(Trekfire);
