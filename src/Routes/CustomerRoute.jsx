import React from "react";
import { Navigate } from "react-router";
import Loading from "../Components/Loading";
import useRole from './../Hooks/useRole';

const CustomerRoute = ({ children }) => {
    const [role,isRoleLoading]=useRole()

  if (isRoleLoading) return <Loading/>;

  if (role === "customer")   return children;
  return <Navigate to="/" replace={true} />;

};
export default CustomerRoute;