import React from "react";
import App from "next/app";
import Head from "next/head";
import Aux from "../hoc/Aux";
import { withRouter } from "next/router";
import ContextProvider from "../context/context";
import NProgress from "nprogress";
import "../styles/globals.css";
import "mapbox-gl/dist/mapbox-gl.css";

class Trekfire extends App {
    componentDidMount() {
        this.props.router.events.on("routeChangeStart", (url) => {
            NProgress.start();
        });
        this.props.router.events.on("routeChangeComplete", () =>
            NProgress.done()
        );
        this.props.router.events.on("routeChangeError", () => NProgress.done());
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <Aux>
                <Head>
                    <title>Trekfire</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <ContextProvider>
                    <Component {...pageProps} />
                </ContextProvider>
            </Aux>
        );
    }
}

export default withRouter(Trekfire);
