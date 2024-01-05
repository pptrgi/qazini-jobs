import { GraphQLError } from "graphql";

export const private_resolvers_guard = (contextValue) => {
  // receives the content's value which is an object with either message or decoded_user property passed by private resolvers
  // since no errors were thrown in context to make context available to all resolvers including the public ones i.e. signin and register unrestrictively, a switch statement will throw errors based on context content's message property, if any

  if (contextValue == {}) {
    console.log("from guard, content", contextValue);
    throw new GraphQLError("You're not allowed to proceed");
  } else {
    switch (contextValue.message) {
      case "Invalid/expired token":
        throw new GraphQLError("Invalid/expired token, signin again", {
          extensions: {
            code: "FORBIDDEN",
            http: 403,
          },
        });
      case "Token isn't bearer":
        throw new GraphQLError("A bearer authentication token is required", {
          extensions: {
            code: "FORBIDDEN",
            http: 403,
          },
        });
      case "No auth headers":
        throw new GraphQLError("Authorization headers are required", {
          extensions: {
            code: "FORBIDDEN",
            http: 403,
          },
        });
      default:
        return contextValue.decoded_user;
    }
  }
};
