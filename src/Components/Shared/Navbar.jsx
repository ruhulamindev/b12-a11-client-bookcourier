import React, { useEffect, useState } from "react";
import Logo from "../Logo/Logo";
import { NavLink } from "react-router";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  // Dark/Light Mode
  const [darkMode, setDarkMode] = useState(() => {
    // page load এ check করবে localStorage
    return localStorage.getItem("theme") === "dark";
  });

  // Sync darkMode with document & localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Logout handler
  const handleSignOut = () => {
    logOut()
      .then(() => {
        setDarkMode(false);
      })
      .catch((error) => console.log(error));
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-books">Books</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
    </>
  );
    const authButtons = user ? (
    <div className="dropdown dropdown-end">
      <img
        tabIndex={0}
        src={user.photoURL}
        alt="profile"
        className="w-10 h-10 rounded-full cursor-pointer border"
      />
      <ul
        tabIndex={0}
        className="dropdown-content menu p-4 shadow app-card rounded-box w-56 z-20"
      >
        <li className="mb-4 border-b pb-4">
          <p className="font-bold">{user.displayName}</p>
          <p className="text-xs">{user.email}</p>
        </li>
        <li className="mb-2 border rounded">
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li className="mb-2 border rounded">
          <button onClick={handleSignOut} className="text-red-500">
            Logout
          </button>
        </li>
      </ul>
    </div>
  ) : (
    <>
      <NavLink to="/signin" className="btn hidden lg:inline-block">
        Signin
      </NavLink>
      <NavLink to="/signup" className="btn hidden lg:inline-block">
        Signup
      </NavLink>
    </>
  ); 
  
  return (
    <div className="navbar px-4 w-full app-card shadow-sm fixed top-0 left-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
            {!user && (
              <>
                <li>
                  <NavLink to="/signin">Signin</NavLink>
                </li>
                <li>
                  <NavLink to="/signup">Signup</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <Logo />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end gap-2">
        <div
          onClick={() => setDarkMode(!darkMode)}
          className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
            darkMode
              ? "bg-gray-700 border-2 border-green-500"
              : "bg-sky-100 border-2 border-green-500"
          }`}
        >
          <div
            className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
              darkMode ? "translate-x-7" : "translate-x-0"
            } flex items-center justify-center`}
          >
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-800"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-yellow-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 4.5V2m0 20v-2.5m7.07-7.07H22M2 12h2.5m15.36 4.95l1.77 1.77M4.95 4.95l1.77 1.77m12.02 12.02l1.77 1.77M4.95 19.05l1.77-1.77M12 6a6 6 0 100 12 6 6 0 000-12z" />
              </svg>
            )}
          </div>
        </div>

        {/* Auth Buttons / Profile */}
        {authButtons}
      </div>
    </div>
  );
};

export default Navbar;
