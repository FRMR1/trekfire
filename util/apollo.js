// import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
// import Head from "next/head";

// export function withApollo(PageComponent) {
//     const WithApollo = (props) => {
//         const client = initApolloClient();

//         return (
//             <ApolloProvider client={client}>
//                 <PageComponent {...props} />
//             </ApolloProvider>
//         );
//     };

//     WithApollo.getInitialProps = async (ctx) => {
//         const { AppTree } = ctx;
//         const apolloClient = (ctx.apolloClient = initApolloClient());

//         let pageProps = {};
//         if (PageComponent.getInitialProps) {
//             pageProps = await PageComponent.getInitialProps(ctx);
//         }

//         // If on server.
//         if (typeof window === "undefined") {
//             if (ctx.res && ctx.res.finished) {
//                 return pageProps;
//             }

//             try {
//                 const { getDataFromTree } = await import(
//                     "@apollo/client/react/ssr"
//                 );
//                 await getDataFromTree(
//                     <AppTree
//                         pageProps={{
//                             ...pageProps,
//                             apolloClient,
//                         }}
//                     />
//                 );
//             } catch (e) {
//                 console.error(e);
//             }

//             Head.rewind();
//         }

//         const apolloState = apolloClient.cache.extract();

//         return {
//             ...pageProps,
//             apolloState,
//         };
//     };

//     return WithApollo;
// }

// const initApolloClient = () => {
//     const client = new ApolloClient({
//         uri: "/api/graphql",
//         cache: new InMemoryCache({
//             typePolicies: {
//                 Tour: {
//                     keyFields: ["id"],
//                 },
//             },
//         }),
//     });

//     return client;
// };
