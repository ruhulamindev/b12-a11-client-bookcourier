import React from "react";
import useRole from "../../Hooks/useRole";
import Loading from "./../../Components/Loading";
import AdminStats from "../../Components/StatisticsComponent/AdminStats";
import CustomerStats from "../../Components/StatisticsComponent/CustomerStats";
import LibrarianStats from "../../Components/StatisticsComponent/LibrarianStats";

const Statistics = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-1 mb-4">
     {role === "admin" && <AdminStats />}
      {role === "customer" && <CustomerStats />}
      {role === "seller" && <LibrarianStats />}
    </div>
  );
};

export default Statistics;
