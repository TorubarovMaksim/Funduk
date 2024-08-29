import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component, adminOnly }) => {
  const token = localStorage.getItem('token');
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null;

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && userRole !== 'admin') {
    return <Navigate to="/" />;
  }

  return component;
};

export default PrivateRoute;
