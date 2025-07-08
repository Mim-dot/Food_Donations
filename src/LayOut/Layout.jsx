import React from 'react';
import Nav from '../Component/Nav';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer'
const Layout = () => {
    return (
        <div>
            <Nav/>
         <div className=""><Outlet/></div>   
            <Footer/>
        </div>
    );
};

export default Layout;