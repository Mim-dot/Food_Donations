import React from 'react';
import { Link } from 'react-router';
import noData from '../src/assets/noData.json'
import Lottie from 'lottie-react';
const Useable = () => {
    return (
        <div className="text-center mt-20 flex flex-col items-center">
  <div className="w-60 h-60 mb-4">
    <Lottie animationData={noData} loop={true} />
  </div>
  <h2 className="text-2xl font-semibold text-[#7B4F28] mb-4">🚫 No Data Found</h2>
  <Link
    to="/"
    className="inline-block bg-[#7B4F28] text-white px-5 py-2 rounded-md hover:bg-[#5c3b1d] transition"
  >
    ⬅️ Go Home
  </Link>
</div>

    );
};

export default Useable;