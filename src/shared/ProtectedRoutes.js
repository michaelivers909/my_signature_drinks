import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { currentUser } from "../contexts/AuthContext";

const ProtectedRoutes = ({ currentUser, authRequired, component, path }) => {
  const redirect = authRequired ? "/Login" : "/Create";

  if ((authRequired && !currentUser) || (!authRequired && currentUser)) {
    return <Redirect to={redirect} />;
  }
  return <Route path={path} component={component} />;
};

export default ProtectedRoutes;


