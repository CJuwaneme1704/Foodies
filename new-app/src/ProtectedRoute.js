import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = sessionStorage.getItem('token'); // Check if JWT token exists

  // If token doesn't exist, redirect to the login page
  if (!token) {
    return <Navigate to="/Login" />;
  }

  // If the token exists, render the child components (protected pages)
  return <Outlet />;
};

export default ProtectedRoute;
