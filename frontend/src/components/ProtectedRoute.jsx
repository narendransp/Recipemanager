// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If no token → redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children; // show page if logged in
};

export default ProtectedRoute;

