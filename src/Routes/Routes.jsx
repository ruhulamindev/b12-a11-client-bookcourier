import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../Pages/ErrorPage";
import HomePage from "../Pages/Home/HomePage";
import AllBooks from "../Pages/Books/AllBooks";
import Signin from "../Pages/AuthenticationPage/Signin";
import Signup from "../Pages/AuthenticationPage/Signup";
import PrivateRoute from "./PrivateRoute";
import DetailsPage from "../Pages/DetailsPage";
import Profile from "../Pages/Profile";
import AddBook from "../Pages/Dashboard/Librarian/AddBook";
import DashboardLayout from "../Layouts/DashboardLayout";
import Statistics from "../Pages/Dashboard/Statistics";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "all-books",
        element: (
          <PrivateRoute>
            <AllBooks />
          </PrivateRoute>
        ),
      },
      {
        path: "details",
        element: (
          <PrivateRoute>
            <DetailsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
  // dashboardLayout
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // --- User Routes ---
    { index: true, element: <Statistics/> },
    { path: "my-orders", element: <p>My Orders Page</p> },
    { path: "invoices", element: <p>Invoices Page</p> },
    { path: "wishlist", element: <p>My Wishlist Page</p> },
    { path: "seller-request", element: <p>Become A Seller</p> },
    
    // --- Librarian Routes ---
    { path: "add-book", element: <AddBook /> },
    { path: "my-books", element: <p>My Books Page</p> },
    { path: "manage-orders", element: <p>Librarian Orders Page</p> },
    
    // --- Admin Routes ---
    { path: "all-users", element: <p>All Users Page</p> },
    { path: "manage-books", element: <p>Manage Books Page</p> },
    { path: "profile", element: <Profile /> },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
