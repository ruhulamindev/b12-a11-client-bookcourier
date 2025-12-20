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
import MyOrders from "../Pages/Dashboard/User/MyOrders";
import MyBooks from "../Pages/Dashboard/Librarian/MyBooks";
import ManageOrders from "../Pages/Dashboard/Librarian/ManageOrders";
import Invoices from "../Pages/Dashboard/User/Invoices";
import Wishlist from "../Pages/Dashboard/User/Wishlist";
import LibrarianRequest from "../Pages/Dashboard/User/LibrarianRequest";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers";
import ManageBooks from "../Pages/Dashboard/Admin/ManageBooks";
import PaymentPage from "../Pages/PaymentPage";

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
        path: "details/:id",
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
        path:"payment",
        element:<PaymentPage/>
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
    { path: "my-orders", element: <MyOrders/> },
    { path: "invoices", element: <Invoices/> },
    { path: "wishlist", element: <Wishlist/> },
    { path: "librarian-requests", element: <LibrarianRequest/> },
    
    // --- Librarian Routes ---
    { path: "add-book", element: <AddBook /> },
    { path: "my-books", element: <MyBooks/> },
    { path: "manage-orders", element:<ManageOrders/> },
    
    // --- Admin Routes ---
    { path: "all-users", element: <AllUsers/> },
    { path: "manage-books", element: <ManageBooks/> },
    { path: "profile", element: <Profile /> },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
