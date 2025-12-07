import React from "react";
import Banner from "./../Banner";
import LatestBooks from "./LatestBooks";
import CoverageSection from "./CoverageSection";
import WhyChoose from "./WhyChoose";

const HomePage = () => {
  return (
    <div>
        <Banner />
        <LatestBooks/>
        <CoverageSection/>
        <WhyChoose/>
    </div>
  );
};

export default HomePage;
