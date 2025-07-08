import { createBrowserRouter } from "react-router";
import About from "../Component/About";
import Home from "../Home/Home";
import Login from "../Component/Login";
import Register from "../Component/Register";
import Layout from "../LayOut/Layout";
import Privet from "../Provider/Privet";
import Dashboard from "../Dashboard/Dashboard";
import Error from "../Component/Error";
import Alldones from "../Component/Alldones";
import Contact from "../Component/Contact";
import Overview from "../Dashboard/Overview";
import DonatDetails from "../Component/DonatDetails";
import Request_Charity from "../Dashboard/User/Request_Charity";
import Favorites from "../Dashboard/User/Favorites";
import My_Reviews from "../Dashboard/User/My_Reviews";
import Transaction_History from "../Dashboard/User/Transaction_History";
import Restaurant_Pro from "../Dashboard/Restaurant/Restaurant_Pro";
import Add_Donation from "../Dashboard/Restaurant/Add_Donation";
import My_Donations from "../Dashboard/Restaurant/My_Donations";
import Requested_Donations from "../Dashboard/Restaurant/Requested_Donations";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    hydrateFallbackElement: (
      <div className="flex items-center justify-center w-full h-screen space-x-2 text-4xl animate-pulse">
        <span
          role="img"
          aria-label="sparkle"
          className="animate-bounce delay-0"
        >
          ✨
        </span>
        <span role="img" aria-label="star" className="animate-bounce delay-100">
          🌟
        </span>
        <span
          role="img"
          aria-label="sparkle"
          className="animate-bounce delay-200"
        >
          ✨
        </span>
        <span role="img" aria-label="star" className="animate-bounce delay-300">
          🌟
        </span>
        <span
          role="img"
          aria-label="sparkle"
          className="animate-bounce delay-500"
        >
          ✨
        </span>
      </div>
    ),

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/alldonations",
        element: <Alldones />,
      },
       {
        path: "/donatdetails",
        element: <DonatDetails />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <Privet>
        {" "}
        <Dashboard />
      </Privet>
    ),
    children: [
      {
        index: true,
        Component: Overview,
      },
      {
        path: "overview",
        Component: Overview,
      },
       {
        path: "request_charity",
        element: < Request_Charity/>,
      },
       {
        path: "favorites",
        element: <Favorites/>,
      },
       {
        path: "my-reviews",
        element: <My_Reviews/>,
      },
       {
        path: "transactions",
        element: <Transaction_History/>,
      },
       {
        path: "resturent-profile",
        element: <  Restaurant_Pro/>,
      },
       {
        path: "add-donation",
        element: <Add_Donation/>,
      },
       {
        path: "my-donation",
        element: <My_Donations/>,
      },
       {
        path: "req-donation",
        element: <Requested_Donations/>,
      },
    ],
  },
]);
