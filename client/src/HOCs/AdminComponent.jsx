import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthenticationContext";

export const isAdmin = (role) => {
  return role === "admin" ? true : false;
};

const AdminComponent = ({ Component }) => {
  const { user } = useContext(AuthContext);
  return <>{user.role.name === "admin" ? Component : null}</>;
};

export default AdminComponent;
