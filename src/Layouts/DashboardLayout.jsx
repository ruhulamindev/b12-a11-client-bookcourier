import React from "react";
import { NavLink, Outlet } from "react-router";
import Logo from "../Components/Logo/logo";
import Statistics from "../Pages/Dashboard/Statistics";
import useAuth from "../Hooks/useAuth";

const DashboardLayout = () => {
  const { logOut } = useAuth();

  const handleSignOut = () => {
    logOut()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };
  const links = [
    { to: "/dashboard", label: "Statistics" },
    { to: "/dashboard/my-orders", label: "My Orders" },
    { to: "/dashboard/invoices", label: "Invoices" },
    { to: "/dashboard/wishlist", label: "My Wishlist" },
    { to: "/dashboard/seller-request", label: "Become A Seller" },

    // Librarian
    { to: "/dashboard/add-book", label: "Add Book" },
    { to: "/dashboard/my-books", label: "My Books" },
    { to: "/dashboard/manage-orders", label: "Manage Orders" },

    // Admin
    { to: "/dashboard/all-users", label: "All Users" },
    { to: "/dashboard/manage-books", label: "Manage Books" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-300">
      {/* left sidebar */}
      <aside className="h-screen overflow-y-auto fixed w-64 bg-white shadow-lg p-6">
        {/* sidebar top logo */}
        <div className="flex items-center pb-2 border-b-2 gap-3 mb-8">
          <Logo />
        </div>

        {/* sidebar menu option */}
        <ul className="space-y-2">
          {links.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `block p-2 rounded-lg ${
                    isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* profile and logout */}
        <div className="p-2 border-t-2 mt-2 space-y-2">
          {/* My Profile Button */}
          <NavLink
            to="/dashboard/profile"
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

      {/* right content */}
      <main className="flex-1 p-8 ml-64">
        <div className="bg-[#e9ecef] rounded-lg shadow p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
