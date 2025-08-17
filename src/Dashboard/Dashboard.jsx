import React, { useContext, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router";
import User from "./User/User";
import ProfileDes from "./User/ProfileDes";
import Restauran from "./Restaurant/Restauran";
import Charity from "./Charity/Charity";
import Admin from "./Admin/Admin";
import useCheckRole from "../Hook/useCheckRole";

const Dashboard = () => {
  const location = useLocation();
  const { role, loading } = useCheckRole();
  const isActive = (path) => location.pathname === path;
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  return (
    <div className="flex nav flex-col md:flex-row min-h-screen bg-[#F5EFE6] p-4 md:p-6 gap-4">
      {/* Sidebar */}
      <aside className="w-full nav md:w-65 bg-white rounded-2xl shadow-xl border border-[#E0D6CC] p-6 md:p-4 flex flex-col items-center space-y-6">
        {/* Profile Picture */}
        <ProfileDes />

        {/* Navigation Links */}
        {role === "user" && <User />}
        {role === "restaurant" && <Restauran />}
        {role === "charity" && <Charity />}
        {role === "admin" && <Admin />}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 nav bg-white rounded-2xl shadow-lg border border-[#E0D6CC] p-2 md:p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
