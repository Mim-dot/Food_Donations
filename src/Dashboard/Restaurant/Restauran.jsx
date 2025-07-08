import React from "react";
import { NavLink } from "react-router";

const Restauran = () => {
  const baseClasses =
    "py-3 rounded-lg font-semibold text-[#5C3B1D] shadow-md text-center transition";

  return (
    <div>
      <nav className="w-full flex flex-col space-y-4 mt-6">
        {/* 🏠 Home */}
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
        {/* 🍽️ Restaurant Profile */}
        <NavLink
          to="resturent-profile"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-[#D4A373] text-white"
                : "hover:bg-[#F5EFE6] border border-[#E0D6CC]"
            }`
          }
        >
          🍽️ Restaurant Profile
        </NavLink>

        {/* ➕ Add Donation */}
        <NavLink
          to="add-donation"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-[#D4A373] text-white"
                : "hover:bg-[#F5EFE6] border border-[#E0D6CC]"
            }`
          }
        >
          ➕ Add Donation
        </NavLink>

        {/* 📦 My Donations */}
        <NavLink
          to="my-donation"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-[#D4A373] text-white"
                : "hover:bg-[#F5EFE6] border border-[#E0D6CC]"
            }`
          }
        >
          📦 My Donations
        </NavLink>

        {/* 📥 Requested Donations */}
        <NavLink
          to="req-donation"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-[#D4A373] text-white"
                : "hover:bg-[#F5EFE6] border border-[#E0D6CC]"
            }`
          }
        >
          📥 Requested Donations
        </NavLink>
      </nav>
    </div>
  );
};

export default Restauran;
