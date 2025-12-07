import React from "react";
import Banner from "./../Banner";
import LatestBooks from "./LatestBooks";
import CoverageSection from "./CoverageSection";
import WhyChoose from "./WhyChoose";
import Review from "./Review";
import About from "./About ";

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
