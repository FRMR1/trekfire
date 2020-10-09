import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../apollo/schema";
import GAdventuresAPI from "./data/tours";
import DirectionsAPI from "./data/map";

const apolloServer = new ApolloServer({
    schema,
    dataSources: () => {
        return {
            GAdventuresAPI: new GAdventuresAPI(),
            DirectionsAPI: new DirectionsAPI(),
        };
    },
    engine: {
        reportSchema: true,
        variant: "current",
    },
});

export const config = {
    api: {
        bodyParser: false,
    },
};

const server = apolloServer.createHandler({ path: "/api/graphql" });

export default server;
