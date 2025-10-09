import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem("authToken");

  // If user is not logged in, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render protected child routes
  return <Outlet />;
};
