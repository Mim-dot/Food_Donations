import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../LayOut/AuthContext';
import loadingAnimation from '../assets/loadingAnimation.json';
import Lottie from 'lottie-react';

const Private = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Lottie animationData={loadingAnimation} loop={true} className="w-48" />
      </div>
    );
  }

  if (user && localStorage.getItem("access-token")) {
    return children;
  }

  return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default Private;
