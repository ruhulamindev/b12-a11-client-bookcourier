import React from "react";
import Banner from "./../Banner";
import LatestBooks from "./LatestBooks";
import CoverageSection from "./CoverageSection";

const HomePage = () => {
  return (
    <div>
        <Banner />
        <LatestBooks/>
        <CoverageSection/>
    </div>
  );
};

export default HomePage;
