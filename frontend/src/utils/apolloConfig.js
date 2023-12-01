import { createHttpLink } from "@apollo/client/link/http";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

// define a pipeline of requests
// apollo client first checks if there's an error, then sets auth headers and finally goes through
export const httpLink = createHttpLink({
  uri: "http://qazini-backend.vercel.app/graphql",
});

export const authLink = setContext(() => {
  const token = localStorage.getItem("userToken");

  console.log(token);

  return {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(graphQLErrors);
  }
  if (networkError) {
    console.log("Not connected to the internet");
  }
});
