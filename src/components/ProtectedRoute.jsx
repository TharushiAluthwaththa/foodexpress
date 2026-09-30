import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ type, children }) {

  const token =
    type === "admin"
      ? localStorage.getItem("admin_token")
      : localStorage.getItem("customer_token");

  if (!token) {

    return (
      <Navigate
        to={
          type === "admin"
            ? "/admin/login"
            : "/login"
        }
        replace
      />
    );

  }

  return children;
}

export default ProtectedRoute;