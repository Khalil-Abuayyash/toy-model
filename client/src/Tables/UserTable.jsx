import { navigate } from "@reach/router";
import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../axios";
import Table from "../components/Table";
import { AuthContext } from "../Context/AuthenticationContext";
import AdminComponent from "../HOCs/AdminComponent";
import { isAdmin } from "../HOCs/AdminComponent";

const UserTable = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const { isAuthenticated, user } = useContext(AuthContext);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableBodies, setTableBodies] = useState([]);

  const onDelete = (id) => {
    axiosInstance.delete(`/user/users/${id}`);
  };

  const onEdit = (id) => {
    navigate(`/forms/users/edit/${id}`);
  };

  useEffect(() => {
    axiosInstance
      .get("/user/users")
      .then((res) => {
        setUsers(
          res.data.map((user) => ({
            ...user,
            teamsNames: user.teams.map((team) => team.name).join(","),
            organizationsNames: user.organizations
              .map((org) => org.name)
              .join(","),
          }))
        );
        if (isAdmin(user.role.name)) {
          setTableHeaders([
            "ID",
            "Name",
            "Email",
            "Phone",
            "Org",
            "Teams",
            "Actions",
          ]);
        } else {
          setTableHeaders(["ID", "Name", "Email", "Phone", "Org", "Teams"]);
        }
        setTableBodies([
          "id",
          "nickname",
          "email",
          "telephone",
          "organizationsNames",
          "teamsNames",
        ]);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Table
      isAdmin={isAdmin(user.role.name)}
      category="users"
      onDelete={onDelete}
      onEdit={onEdit}
      data={users}
      tableHeaders={tableHeaders}
      tableBodies={tableBodies}
    />
  );
};

export default UserTable;
