import React from 'react';

import { NavLink } from 'react-router';

const Charity = () => {
    const baseClasses =
    "py-3 rounded-lg font-semibold text-[#5C3B1D] shadow-md text-center transition";

    return (
        <div>
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
          to="charity-profile"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-[#D4A373] text-white"
                : "hover:bg-[#F5EFE6] border border-[#E0D6CC]"
            }`
          }
        >
         Charity Profile
        </NavLink>

        {/* ➕ Add Donation */}
        <NavLink
          to="charityRequests"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-[#D4A373] text-white"
                : "hover:bg-[#F5EFE6] border border-[#E0D6CC]"
            }`
          }
        >
         Charity Requests
        </NavLink>

        {/* 📦 My Donations */}
        <NavLink
          to="myPickups"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-[#D4A373] text-white"
                : "hover:bg-[#F5EFE6] border border-[#E0D6CC]"
            }`
          }
        >
          📦Charity Pick-up
        </NavLink>

        {/* 📥 Requested Donations */}
        <NavLink
          to="resi-donation"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-[#D4A373] text-white"
                : "hover:bg-[#F5EFE6] border border-[#E0D6CC]"
            }`
          }
        >
          Received Donations
        </NavLink>
         <NavLink
          to="charity-transaction"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-[#D4A373] text-white"
                : "hover:bg-[#F5EFE6] border border-[#E0D6CC]"
            }`
          }
        >
         Transaction History
        </NavLink>
      </nav>
    </div>
        </div>
    );
};

export default Charity;