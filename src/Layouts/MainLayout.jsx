import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
