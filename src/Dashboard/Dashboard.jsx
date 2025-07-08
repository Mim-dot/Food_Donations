import React, { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router";
import User from "./User/User";
import ProfileDes from "./User/ProfileDes";
import Restauran from "./Restaurant/Restauran";

const Dashboard = () => {

  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F5EFE6] p-4 md:p-6 gap-4">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-white rounded-2xl shadow-xl border border-[#E0D6CC] p-6 md:p-8 flex flex-col items-center space-y-6">
        {/* Profile Picture */}
       <ProfileDes/>

        {/* Navigation Links */}
        {/* <User/> */}
        <Restauran/>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-white rounded-2xl shadow-lg border border-[#E0D6CC] p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
