import React from "react";
import Logo from "../Logo/logo";

const Footer = () => {
  return (
    <footer className="bg-gray-800 rounded mt-4 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Logo />
          <p className="font-bold text-sm">
            We deliver your favorite books carefully to any location in the
            country.
            <br /> A reliable book shipment solution—easy, fast, and
            trustworthy.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Social Link</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-blue-400">
                Home
              </a>
            </li>
            <li>
              <a href="/books" className="hover:text-blue-400">
                Books
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-blue-400">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-400">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Contact</h3>
          <p className="text-sm">Email: support@bookcourier.com</p>
          <p className="text-sm">Phone: +880123456789</p>
          <p className="text-sm">Address: Dhaka, Bangladesh</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
                href="https://www.facebook.com/profile.php?id=61566534111401"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 hover:bg-blue-600 transition-colors"
              >
                <img
                  src="/facebook.jpeg"
                  alt="Facebook"
                  className="rounded-full p-2"
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 hover:bg-blue-400 transition-colors"
              >
                <img
                  src="/twetter.png"
                  alt="X / Twitter"
                  className="rounded-full p-2"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/md-ruhul-amin-a71b58352"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 hover:bg-blue-700 transition-colors"
              >
                <img
                  src="/Linkedin.png"
                  alt="LinkedIn"
                  className="rounded-full p-2"
                />
              </a>
          </div>
        </div>
      </div>
      <hr className="m-6"/>
      <p className="mt-8 text-center text-sm text-gray-400">
        Copyright © {new Date().getFullYear()} - All right reserved
      </p>
    </footer>
  );
};

export default Footer;
