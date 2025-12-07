import React from "react";
import Banner from "./../Banner";
import LatestBooks from "./LatestBooks";
import CoverageSection from "./CoverageSection";
import WhyChoose from "./WhyChoose";
import Review from "./Review";

const HomePage = () => {
  return (
    <div>
        <Banner />
        <LatestBooks/>
        <CoverageSection/>
        <WhyChoose/>
        <Review/>
    </div>
  );
};

export default HomePage;
