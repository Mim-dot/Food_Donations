import React, { useEffect } from "react";
import { NavLink } from "react-router"; // keep this corrected

const Admin = () => {
  const baseClasses =
    "py-3 rounded-lg font-semibold text-[#5C3B1D] shadow-md text-center transition";
  useEffect(() => {
    document.title = "Admin";
  }, []);

  return (
    <div className="p-6 nav  bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl  nav-bite font-bold mb-5 text-gray-800 dark:text-white">
        Admin Dashboard
      </h2>
      <div className="flex  flex-col gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-[#D4A373] text-white"
                : "hover:bg-[#F5EFE6] border border-[#E0D6CC]"
            }`
          }
        >
          🏠 Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-[#D4A373] text-white"
                : "hover:bg-[#F5EFE6] border border-[#E0D6CC]"
            }`
          }
          to="/dashboard/manageDonations"
        >
          📦 Manage Donations
        </NavLink>
        <NavLink
          to="/dashboard/manageUsers"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-[#D4A373] text-white"
                : "hover:bg-[#F5EFE6] border border-[#E0D6CC]"
            }`
          }
        >
          👥 Manage Users
        </NavLink>
        <NavLink
          to="/dashboard/manageRoleRequests"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-[#D4A373] text-white"
                : "hover:bg-[#F5EFE6] border border-[#E0D6CC]"
            }`
          }
        >
          🧾 Manage Role Requests
        </NavLink>
        <NavLink
          to="/dashboard/manageRequests"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-[#D4A373] text-white"
                : "hover:bg-[#F5EFE6] border border-[#E0D6CC]"
            }`
          }
        >
          📨 Manage Requests
        </NavLink>
        <NavLink
          to="/dashboard/featureDonations"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-[#D4A373] text-white"
                : "hover:bg-[#F5EFE6] border border-[#E0D6CC]"
            }`
          }
        >
          🌟 Feature Donations
        </NavLink>
      </div>
    </div>
  );
};

export default Admin;
