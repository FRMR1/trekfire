import React from "react";
import App from "next/app";
import Head from "next/head";
import Aux from "../hoc/Aux";
import { withRouter } from "next/router";
import ContextProvider from "../context/context";
import NProgress from "nprogress";
import "../styles/globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Loading from "../widgets/Loading";

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

    render() {
        const { Component, pageProps } = this.props;
        const { isLoading } = this.state;

        return (
            <Aux>
                <Head>
                    <title>Trekfire</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <ContextProvider>
                    {isLoading ? <Loading /> : <Component {...pageProps} />}
                </ContextProvider>
            </Aux>
        );
    }
}

export default withRouter(Trekfire);
