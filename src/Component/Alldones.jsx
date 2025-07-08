import React from "react";
import { Link } from "react-router";

const Alldones = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6 bg-[#F5EFE6] min-h-screen">
     <div className="bg-[#F5EFE6] border border-[#E0D6CC] rounded-xl p-4 w-full max-w-sm shadow-md mt-20">
      <img
        src= "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
        alt="Fresh Bread Donation"
        className="w-full h-40 object-cover rounded-md mb-3"
      />

      <h3 className="text-lg font-bold text-[#7B4F28] mb-1">Fresh Bread Donation</h3>

      <p className="text-sm text-[#5C3B1D] mb-1">🍽️ Restaurant: Tasty Treats, Dhaka</p>
      <p className="text-sm text-[#5C3B1D] mb-1">🏥 Charity: FoodCare BD</p>
      <p className="text-sm text-[#5C3B1D] mb-1">📦 Status: Available</p>
      <p className="text-sm text-[#5C3B1D] mb-3">🔢 Quantity: 20 kg</p>

      <Link to='/donatdetails' className="bg-[#7B4F28] text-white px-4 py-2 rounded-md hover:bg-[#5c3b1d] transition">
        View Details
      </Link>
    </div>
   </section>
   
  
    
  );
};

export default Alldones;
