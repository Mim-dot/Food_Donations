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
import CharityProfile from "../Dashboard/Charity/CharityProfile";
import CharityRequests from "../Dashboard/Charity/CharityRequests";
import MyPickups from "../Dashboard/Charity/MyPickups";
import ReceivedDonati from "../Dashboard/Charity/ReceivedDonati";
import Cha_transactionHistory from "../Dashboard/Charity/Cha_transactionHistory";
import Payment from "../Dashboard/Payment";
import FeatureDonations from "../Dashboard/Admin/FeatureDonations";
import ManageDonations from "../Dashboard/Admin/ManageDonations";
import ManageRequests from "../Dashboard/Admin/ManageRequests";
import ManageRoleRequests from "../Dashboard/Admin/ManageRoleRequests";
import ManageUsers from "../Dashboard/Admin/ManageUsers";
import Forbidden from "../Component/Forbidden";
import UserRoutes from "./UserRoutes";
import CharityRoutes from "./CharityRoutes";
import AdminRoutes from "./AdminRoutes";
import ResturantRoutes from "./ResturantRoutes";
import StatisticsChart from "../Dashboard/Restaurant/StatisticsChart";

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
        path: "/donations/:id",
        element: <DonatDetails />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/forbidden",
        element: <Forbidden />,
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
        path: "payment/:id",
        element: <Payment />,
      },
      //-----------------------resturant-----------------
      {
        path: "restaurant-profile",
        element: (
          <ResturantRoutes>
            {" "}
            <Restaurant_Pro />
          </ResturantRoutes>
        ),
      },
      {
        path: "add-donation",
        element: (
          <ResturantRoutes>
            <Add_Donation />
          </ResturantRoutes>
        ),
      },
      {
        path: "my-donation",
        element: (
          <ResturantRoutes>
            {" "}
            <My_Donations />
          </ResturantRoutes>
        ),
      },
      {
        path: "req-donation",
        element: (
          <ResturantRoutes>
            <Requested_Donations />
          </ResturantRoutes>
        ),
      },
       {
        path: "statistic",
        element: (
          <ResturantRoutes>
            <StatisticsChart/>
          </ResturantRoutes>
        ),
      },
      ////-----------user------------
      {
        path: "request_charity",
        element: (
          <UserRoutes>
            <Request_Charity />
          </UserRoutes>
        ),
      },

      {
        path: "favorites",
        element: (
          <UserRoutes>
            <Favorites />
          </UserRoutes>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <UserRoutes>
            {" "}
            <My_Reviews />
          </UserRoutes>
        ),
      },
      {
        path: "transactions",
        element: (
          <UserRoutes>
            <Transaction_History />
          </UserRoutes>
        ),
      },
      //------charity------------------
      {
        path: "charity-profile",
        element: (
          <CharityRoutes>
            <CharityProfile />
          </CharityRoutes>
        ),
      },
      {
        path: "charityRequests",
        element: (
          <CharityRoutes>
            <CharityRequests />
          </CharityRoutes>
        ),
      },
      {
        path: "myPickups",
        element: (
          <CharityRoutes>
            <MyPickups />
          </CharityRoutes>
        ),
      },
      {
        path: "resi-donation",
        element: (
          <CharityRoutes>
            <ReceivedDonati />
          </CharityRoutes>
        ),
      },
      {
        path: "charity-transaction",
        element: (
          <CharityRoutes>
            <Cha_transactionHistory />
          </CharityRoutes>
        ),
      },
      //----------admin----------------
      {
        path: "featureDonations",
        element: (
          <AdminRoutes>
            <FeatureDonations />
          </AdminRoutes>
        ),
      },
      {
        path: "manageDonations",
        element: (
          <AdminRoutes>
            <ManageDonations />
          </AdminRoutes>
        ),
      },
      {
        path: "manageRequests",
        element: (
          <AdminRoutes>
            <ManageRequests />
          </AdminRoutes>
        ),
      },
      {
        path: "manageRoleRequests",
        element: (
          <AdminRoutes>
            <ManageRoleRequests />
          </AdminRoutes>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <AdminRoutes>
            <ManageUsers />
          </AdminRoutes>
        ),
      },
      //  {
      //   path: "makeadmin",
      //   element: <MakeAdmin />,
      // },
    ],
  },
]);
