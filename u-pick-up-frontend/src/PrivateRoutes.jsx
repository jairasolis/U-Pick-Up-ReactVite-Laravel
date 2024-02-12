import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from './auth/useAuth';

const PrivateRoutes = () => {
  const { auth, role } = useAuth();

  const isStudent = role === 'student';

  if (auth) {
    if (isStudent) {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoutes;
