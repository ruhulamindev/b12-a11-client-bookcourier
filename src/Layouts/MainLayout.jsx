import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Shared/Navbar';
import Footer from '../Components/Shared/Footer';


const MainLayout = () => {
    return (
    <div className="max-w-7xl mx-auto">
      <Navbar />
        <Outlet />
      <Footer />
    </div>
    );
};

export default MainLayout;