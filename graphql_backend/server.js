import express from "express";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { typeDefs } from "./graphql_schema.js";
import { resolvers } from "./resolvers/resolvers_parent.js";
import { verifyAuthTokenContext } from "./utils/verifyAuthTokenContext.js";
import { corsOptions } from "./utils/corsOptions.js";

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(cors(corsOptions));
app.use(express.json());

const { url } = await startStandaloneServer(server, {
  listen: { port: 4444, path: "/graphql" },
  context: verifyAuthTokenContext,
});

console.log("GraphQL server ready at 4444");
