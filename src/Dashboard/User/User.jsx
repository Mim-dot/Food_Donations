import React from 'react';
import { NavLink } from 'react-router';

const User = () => {
  const baseClasses =
    "py-3 rounded-lg font-semibold text-[#5C3B1D] shadow-md text-center transition";

  return (
    <div>
      <nav className="w-full flex flex-col space-y-4 mt-6">
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
            <span className="text-xl">🏠</span> Home
          </NavLink>
       
        <NavLink
          to="request_charity"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-[#D4A373] text-white"
                : "hover:bg-[#F5EFE6] border border-[#E0D6CC]"
            }`
          }
        >
          📝 Request Charity Role
        </NavLink>

        <NavLink
          to="favorites"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-[#D4A373] text-white"
                : "hover:bg-[#F5EFE6] border border-[#E0D6CC]"
            }`
          }
        >
          💖 Favorites
        </NavLink>

        <NavLink
          to="my-reviews"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-[#D4A373] text-white"
                : "hover:bg-[#F5EFE6] border border-[#E0D6CC]"
            }`
          }
        >
          🗣️ My Reviews
        </NavLink>

        <NavLink
          to="transactions"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-[#D4A373] text-white"
                : "hover:bg-[#F5EFE6] border border-[#E0D6CC]"
            }`
          }
        >
          💰 Transaction History
        </NavLink>
      </nav>
    </div>
  );
};

export default User;
