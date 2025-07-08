import React, { use } from 'react';

import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../LayOut/AuthContext';

const Privet = ({children}) => {
 
 const {user,loading}=use(AuthContext)
 //console.log(user);
 const location = useLocation();
 //console.log(location);
  if (loading) {
    return <div><span className="loading loading-spinner loading-xs"></span>
    <span className="loading loading-spinner loading-sm"></span>
    <span className="loading loading-spinner loading-md"></span>
   </div> 
  }
    if (user ) {
         return children;
    }

    return <Navigate state={location.pathname} to="/auth/login"></Navigate>
};

export default Privet;