import { useApollo } from "../../apollo/client";

export const withUseApollo = (Component, { ...pageProps }) => {
    // return ({ ...pageProps }) => {
    // const apolloClient = useApollo(pageProps.initialApolloState);
    const apolloClient = "APOLLO CLIENT";
    // console.log("PAGE PROPS", pageProps);

    return <Component apolloClient={apolloClient} {...pageProps} />;
    // };
};
