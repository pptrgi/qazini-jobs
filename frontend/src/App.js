import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";

import { authLink, errorLink, httpLink } from "./utils/apolloConfig";
import { JobsUserProvider } from "./context/jobsUserContext";
import Layout from "./components/Layout";
import OpenRoute from "./components/routesProtection/OpenRoutes";
import ProtectedRoute from "./components/routesProtection/ProtectedRoutes";
const Home = lazy(() => import("./pages/Home.js"));
const JobDetailPage = lazy(() => import("./pages/JobDetailPage.js"));
const Signin = lazy(() => import("./pages/Signin.js"));
const Register = lazy(() => import("./pages/Register.js"));
const Board = lazy(() => import("./pages/Board.js"));
const Contact = lazy(() => import("./pages/Contact.js"));
const About = lazy(() => import("./pages/About.js"));
const PageNotFound = lazy(() => import("./pages/PageNotFound.js"));
const NoInternet = lazy(() => import("./pages/NoInternet.js"));

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
          element: (
            <ProtectedRoute>
              <Board />
            </ProtectedRoute>
          ),
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
