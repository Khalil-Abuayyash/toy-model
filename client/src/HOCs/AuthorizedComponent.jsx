import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthenticationContext";
import { Redirect } from "@reach/router";

const AuthorizedComponent = ({ Component, org_id }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <>
      {user.role.name === "admin" ||
      user.adminOrgs.filter((item) => item.organization.id === 1).length === 1
        ? Component
        : null}
    </>
  );
};

export default AuthorizedComponent;
