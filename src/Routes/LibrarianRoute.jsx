import React from "react";
import { Navigate } from "react-router";
import Loading from "../Components/Loading";
import useRole from './../Hooks/useRole';

const LibrarianRoute = ({ children }) => {
    const [role,isRoleLoading]=useRole()

  if (isRoleLoading) return <Loading/>;

  if (role === "seller")   return children;
  return <Navigate to="/" replace={true} />;

};
export default LibrarianRoute;
