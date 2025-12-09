import React from "react";
import { useNavigate } from "react-router";
import { Zoom, Fade } from "react-awesome-reveal";
import { WarningCircle } from "phosphor-react";
import { Typewriter } from "react-simple-typewriter";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white text-center px-5">
      <Zoom duration={800}>
        <WarningCircle className="w-24 h-24 text-purple-500 mx-auto mb-6 animate-bounce" />
      </Zoom>

      <Fade direction="up" delay={200}>
        <h1 className="text-6xl font-extrabold mb-3">404</h1>
        <h2 className="text-2xl font-semibold mb-4">
          <Typewriter
            words={[
              "Oops! 404 Error 😅",
              "This page doesn't exist!",
              "Let's take you back home 🏠",
            ]}
            loop={true}
            cursor
            cursorStyle="_"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h2>
      </Fade>

      <Fade delay={500}>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          Hmmm… looks like this page went missing 🕵️‍♂️. Don't worry, we'll help
          you get back on track!
        </p>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 transition rounded-2xl font-semibold shadow-md"
        >
          Back to Home
        </button>
      </Fade>

      <Fade delay={1000}>
        <p className="mt-16 text-sm text-gray-500 opacity-70">
          &copy; {new Date().getFullYear()} | Designed by Ruhul Amin
        </p>
      </Fade>
    </div>
  );
};

export default ErrorPage;
