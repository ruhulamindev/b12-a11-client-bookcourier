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
import LibrarianRoute from "./LibrarianRoute";
import AdminRoute from "./AdminRoute";
import CustomerRoute from "./CustomerRoute";

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
        path: "payment",
        element: (
          <PrivateRoute>
            <PaymentPage />
          </PrivateRoute>
        ),
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
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },

      // --- Customer Routes ---
      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            <CustomerRoute>
              <MyOrders />
            </CustomerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "invoices",
        element: (
          <PrivateRoute>
            <CustomerRoute>
              <Invoices />
            </CustomerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <PrivateRoute>
            <CustomerRoute>
              <Wishlist />
            </CustomerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "librarian-requests",
        element: (
          <PrivateRoute>
            <CustomerRoute>
              <LibrarianRequest />
            </CustomerRoute>
          </PrivateRoute>
        ),
      },

      // --- Librarian Routes ---
      {
        path: "add-book",
        element: (
          <PrivateRoute>
            <LibrarianRoute>
              <AddBook />
            </LibrarianRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-books",
        element: (
          <PrivateRoute>
            <LibrarianRoute>
              <MyBooks />
            </LibrarianRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-orders",
        element: (
          <PrivateRoute>
            <LibrarianRoute>
              <ManageOrders />
            </LibrarianRoute>
          </PrivateRoute>
        ),
      },

      // --- Admin Routes ---
      {
        path: "all-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-books",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageBooks />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
