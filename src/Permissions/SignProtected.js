import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ user, redirectPath = '/' }) => {
  if (user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  redirectPath: PropTypes.string,
};

export default ProtectedRoute;