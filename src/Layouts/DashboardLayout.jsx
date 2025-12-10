import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import Logo from "../Components/Logo/logo";
import useAuth from "../Hooks/useAuth";
import {
  FaChartBar,
  FaShoppingCart,
  FaFileInvoice,
  FaHeart,
  FaUserShield,
  FaPlusCircle,
  FaBook,
  FaClipboardList,
  FaUsers,
  FaTools,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const DashboardLayout = () => {
  const { logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    logOut()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };
  const links = [
    { to: "/dashboard", label: "Statistics", icon: <FaChartBar /> },
    {
      to: "/dashboard/my-orders",
      label: "My Orders",
      icon: <FaShoppingCart />,
    },
    { to: "/dashboard/invoices", label: "Invoices", icon: <FaFileInvoice /> },
    { to: "/dashboard/wishlist", label: "My Wishlist", icon: <FaHeart /> },
    {
      to: "/dashboard/seller-request",
      label: "Become A Seller",
      icon: <FaUserShield />,
    },

    // Librarian
    { to: "/dashboard/add-book", label: "Add Book", icon: <FaPlusCircle /> },
    { to: "/dashboard/my-books", label: "My Books", icon: <FaBook /> },
    {
      to: "/dashboard/manage-orders",
      label: "Manage Orders",
      icon: <FaClipboardList />,
    },

    // Admin
    { to: "/dashboard/all-users", label: "All Users", icon: <FaUsers /> },
    { to: "/dashboard/manage-books", label: "Manage Books", icon: <FaTools /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-300">
      {/* sidebar top logo */}
      <div className="lg:hidden w-full bg-white shadow p-4 flex justify-between items-center fixed z-50">
        <Logo />
        <button onClick={() => setIsOpen(true)}>
          <FaBars className="text-2xl" />
        </button>
      </div>
      {/* left sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen overflow-y-auto w-64 bg-white shadow-lg p-6 transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static lg:block z-50`}
      >
        <div className="lg:hidden flex justify-end pb-2">
          <button onClick={() => setIsOpen(false)}>
            <FaTimes className="text-2xl" />
          </button>
        </div>

        <div className="hidden lg:flex items-center pb-2 border-b-2 gap-3 mb-8">
          <Logo />
        </div>

        {/* sidebar menu option */}
        <ul className="space-y-2 mt-5 lg:mt-0">
          {links.map((item, index) => (
            <li key={index}>
              <NavLink
                onClick={() => setIsOpen(false)}
                to={item.to}
                className={({ isActive }) =>
                  `block p-2 rounded-lg ${
                    isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                  }`
                }
              >
                <span className="flex items-center gap-2">
                  {item.icon && <span className="text-xl">{item.icon}</span>}
                  {item.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* profile and logout */}
        <div className="p-2 border-t-2 mt-2 space-y-2">
          {/* My Profile Button */}
          <NavLink
            to="/dashboard/profile"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block text-center p-2 rounded-lg font-medium border ${
                isActive
                  ? "bg-blue-500 text-white border-blue-500"
                  : "text-gray-700 bg-gray-100 hover:bg-gray-200"
              }`
            }
          >
            My Profile
          </NavLink>

          {/* Logout */}
          <button
            onClick={handleSignOut}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-bold"
          >
            Logout
          </button>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0  bg-opacity-40 lg:hidden z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* right content */}
      <main className="flex-1 p-6 mt-16 h-screen overflow-y-auto lg:mt-0">
        <div className="bg-[#e9ecef] rounded-lg shadow p-2">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
