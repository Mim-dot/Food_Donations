import React, { use } from 'react';

import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../LayOut/AuthContext';
import loadingAnimation from '../assets/loadingAnimation.json'
import Lottie from 'lottie-react';
const Privet = ({children}) => {
 
 const {user,loading}=use(AuthContext)
 //console.log(user);
 const location = useLocation();
 //console.log(location);
  if (loading) {
    return
 ( <div className="h-screen flex justify-center items-center">
        <Lottie animationData={loadingAnimation} loop={true} className="w-48" />
      </div>) 
  }
    if (user ) {
         return children;
    }

    return <Navigate state={location.pathname} to="/auth/login"></Navigate>
};

export default Privet;