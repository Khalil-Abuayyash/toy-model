import React from "react";
import { AuthContext } from "../Context/AuthenticationContext";
import { Redirect } from "@reach/router";

const AuthenticatedComponent = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <>{isAuthenticated ? <Component /> : <Redirect to="/login" noThrow />}</>
  );
};

export default AuthenticatedComponent;
