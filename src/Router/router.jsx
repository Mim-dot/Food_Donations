import { createBrowserRouter } from "react-router";
import About from "../Component/About";
import Home from "../Component/Home";
import Login from "../Component/Login";
import Register from "../Component/Register";
import Layout from "../LayOut/Layout";
import Privet from "../Provider/Privet";
import Dashboard from "../Dashboard/Dashboard";
import Error from "../Component/Error";
import Alldones from "../Component/Alldones";
import Contact from "../Component/Contact";


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
        element: <Home/>,
      },
      {
        path: "/auth/login",
        element: <Login/>,
      },
      {
        path: "/auth/register",
        element: <Register/>,
      },
        {
        path: "/about",
        element: <About/>,
      },
       {
        path: "/alldonations",
        element: <Alldones/>,
      },
       {
        path: "/contact",
        element: <Contact/>,
      },
    ],
  },
 {
        path: "/dashboard",
        element: <Privet> <Dashboard/></Privet>,
        children: [
      {
        
      }
        ]
      },
]);