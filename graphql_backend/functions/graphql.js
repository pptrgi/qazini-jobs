import express from "express";
import { ApolloServer } from "@apollo/server";
import {
  startServerAndCreateLambdaHandler,
  handlers,
} from "@as-integrations/aws-lambda";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { typeDefs } from "./graphql_schema.js";
import { resolvers } from "./resolvers/resolvers_parent.js";
import { verifyAuthToken } from "./middleware/verifyAuthToken.js";

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// app.use(cors());
app.use(express.json());

export default startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler({
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

console.log("GraphQL server ready at 4444");
