import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

export const verifyAuthToken = ({ req, res }) => {
  // check if the request has authorization/Authorization headers
  const authHeaders = req.headers.authorization || req.headers.Authorization;

  // the headers should start with 'Bearer ' && authHeaders.startsWith("Bearer ")
  if (authHeaders) {
    // extract the token from the auth headers
    const token = authHeaders.split("Bearer ");

    if (token) {
      // verify the validity of the token
      jwt.verify(token, process.env.T_SECRET_KEY, (error, decoded) => {
        if (error)
          // token exists but may not be valid, or it's expired
          throw new GraphQLError("Invalid/expired token");

        console.log(decoded);
        return decoded;
      });
    } else {
      // no token or doesn't start with 'Bearer ', throw an error
      throw new GraphQLError("Bearer authentication token is required");
    }
  } else {
    // no authorization headers, throw an error
    throw new GraphQLError("You need authorization headers to proceed");
  }
};
