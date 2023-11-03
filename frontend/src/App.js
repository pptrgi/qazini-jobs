import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";

import { JobsUserProvider } from "./context/jobsUserContext";
import { authLink, errorLink, httpLink } from "./utils/apolloConfig";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import JobDetailPage from "./pages/JobDetailPage";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import Board from "./pages/Board";

// create apollo client with a pipeline of requests
const client = new ApolloClient({
  link: errorLink.concat(authLink).concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/job/:alien_job_id",
          element: <JobDetailPage />,
        },
        {
          path: "/signin",
          element: <Signin />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/board",
          element: <Board />,
        },
      ],
    },
  ]);
  return (
    <ApolloProvider client={client}>
      <JobsUserProvider>
        <div className="main">
          <RouterProvider router={router} />
        </div>
      </JobsUserProvider>
    </ApolloProvider>
  );
};

export default App;
