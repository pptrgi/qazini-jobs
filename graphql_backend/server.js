import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import jwt from "jsonwebtoken";
import http from "http";
import dotenv from "dotenv";
dotenv.config();

import { typeDefs } from "./graphql_schema.js";
import { resolvers } from "./resolvers/resolvers_parent.js";
import { corsOptions } from "./utils/corsOptions.js";
import { verifyAuthToken } from "./middleware/verifyAuthToken.js";

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  "/graphql",
  cors(corsOptions),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      // NOTE: Even if the token is missing, invalid or expired we're not throwing any errors
      // This way we don't make the context restrictive(require auth headers) to even signin and register public resolvers that do not need it
      // In this case, we'll need to create a guard for private resolvers like get_user, update_user_profile etc that'll throw errors if no decoded user is returned from context and deny access for security reasons

      const auth_headers = req.headers.authorization;
      let content = {};

      if (auth_headers) {
        const token = auth_headers.split("Bearer ")[1];

        if (token) {
          try {
            const decoded_user = jwt.verify(token, process.env.T_SECRET_KEY);

            content.decoded_user = decoded_user;
          } catch (error) {
            content.message = "Invalid/expired token";
          }
        } else {
          content.message = "Token isn't bearer";
        }
      } else {
        content.message = "No auth headers";
      }

      // returns the content's value, an object with either message or decoded_user property
      return content;
    },
  })
);

export default server;
