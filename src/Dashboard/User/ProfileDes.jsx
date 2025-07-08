import React from 'react';
import { AuthContext } from '../../LayOut/AuthContext';
import { useContext } from 'react';

const ProfileDes = () => {
      const { user } = useContext(AuthContext);
    return (
      <div className="flex flex-col items-center gap-2 p-4  rounded-xl ">
  <img
    className="w-20 h-20 rounded-full ring-4 ring-[#D4A373] hover:ring-[#b97b42] transition-all duration-300"
    src={
      user?.photoURL ||
      "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
    }
    alt={user?.displayName || "User"}
  />

  <h2 className="text-xl font-extrabold text-[#7B4F28] mt-2">
    {user?.displayName || "User"}
  </h2>

  <p className="text-sm text-[#5C3B1D] text-center break-words max-w-xs">
    {user?.email}
  </p>
</div>

    );
};

export default ProfileDes;