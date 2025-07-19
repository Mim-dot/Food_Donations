import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../LayOut/AuthContext';
import useCheckRole from '../Hook/useCheckRole';
import { Navigate, useLocation } from 'react-router';
import loadingAnimation from '../assets/loadingAnimation.json'
import Lottie from 'lottie-react';

const AdminRoutes = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const {role, isRoleLoader} = useCheckRole();
    const location = useLocation();
    
    if (loading || isRoleLoader) {
      <div className="h-screen flex justify-center items-center">
        <Lottie animationData={loadingAnimation} loop={true} className="w-48" />
      </div>
    }
    
    if (!user || role !== "admin") {
        return <Navigate to="/forbidden" state={{from: location}} replace />;
    }
    
    return children;
};

export default AdminRoutes;