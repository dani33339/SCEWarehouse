import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ user, redirectPath = '/Sign-in' }) => {
  if (!user) {
    alert("Access Denied, you are not allowed there");
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  redirectPath: PropTypes.string,
};

export default ProtectedRoute;
