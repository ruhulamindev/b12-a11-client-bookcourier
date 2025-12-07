import React from "react";
import { Fade } from "react-awesome-reveal";

const About = () => {
  return (
    <div className="mt-12 p-2">
    <div className="max-w-7xl mx-auto px-4 py-12 bg-[#f8f7ff] shadow-xl rounded border-gray-300">
      <Fade direction="up" cascade damping={0.2} triggerOnce={false}>
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
          About BookCourier
        </h2>
        <p className="text-justify text-gray-700 max-w-3xl mx-auto mb-6">
          BookCourier is your one-stop online bookstore, delivering books to
          your doorstep across multiple cities. We are dedicated to providing
          a seamless and enjoyable reading experience, offering fast delivery,
          affordable prices, a large collection of books, and easy returns.
        </p>
        <p className="text-justify text-gray-700 max-w-3xl mx-auto">
          Our mission is to make reading accessible to everyone, whether you
          are a student, professional, or casual reader. With BookCourier,
          you can explore your favorite genres, discover new authors, and stay
          updated with the latest releases without leaving your home.
        </p>
      </Fade>
    </div>
    </div>
  );
};

export default About;
