import React from "react";
import LatestBooks from "./LatestBooks";
import CoverageSection from "./CoverageSection";
import WhyChoose from "./WhyChoose";
import Review from "./Review";
import About from "./About ";
import Banner from "./Banner";

const HomePage = () => {
  return (
    <div>
        <Banner />
        <LatestBooks/>
        <CoverageSection/>
        <WhyChoose/>
        <Review/>
        <About/>
    </div>
  );
};

export default HomePage;
