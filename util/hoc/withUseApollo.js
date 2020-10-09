import { useApollo } from "../../apollo/client";

export const withUseApollo = (Component) => {
    return ({ ...pageProps }) => {
        const apolloClient = useApollo(pageProps.initialApolloState);

        return <Component apolloClient={apolloClient} {...pageProps} />;
    };
};
