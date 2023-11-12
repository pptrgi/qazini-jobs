import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";

import { authLink, errorLink, httpLink } from "./utils/apolloConfig";
import { JobsUserProvider } from "./context/jobsUserContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import JobDetailPage from "./pages/JobDetailPage";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import Board from "./pages/Board";
import Contact from "./pages/Contact";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";
import OpenRoute from "./components/routesProtection/OpenRoutes";
import ProtectedRoute from "./components/routesProtection/ProtectedRoutes";
import NoInternet from "./pages/NoInternet";

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
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/no-internet",
          element: <NoInternet />,
        },
        {
          path: "*",
          element: <PageNotFound />,
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
