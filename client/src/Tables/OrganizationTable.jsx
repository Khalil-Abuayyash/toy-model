import { navigate } from "@reach/router";
import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../axios";
import Table from "../components/Table";
import { AuthContext } from "../Context/AuthenticationContext";
import AdminComponent from "../HOCs/AdminComponent";
import { isAdmin } from "../HOCs/AdminComponent";

const OrganizationTable = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [error, setError] = useState(false);
  const { isAuthenticated, user } = useContext(AuthContext);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableBodies, setTableBodies] = useState([]);

  const onDelete = (id) => {
    axiosInstance.delete(`/user/organizations/${id}`);
  };

  const onEdit = (id) => {
    navigate(`/forms/organizations/edit/${id}`);
  };

  useEffect(() => {
    axiosInstance
      .get("/user/organizations")
      .then((res) => {
        setOrganizations(
          res.data.map((org) => ({
            ...org,
            teamsNames: org.teams.map((team) => team.name).join(","),
            sitesNum: org.sites.length,
          }))
        );
        if (isAdmin(user.role.name)) {
          setTableHeaders([
            "Org ID",
            "Organization",
            "Sites",
            "Teams",
            "Actions",
          ]);
        } else {
          setTableHeaders(["Org ID", "Organization", "Sites", "Teams"]);
        }
        setTableBodies(["id", "name", "sitesNum", "teamsNames"]);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);

  return (
    <Table
      isAdmin={isAdmin(user.role.name)}
      category="organizations"
      onDelete={onDelete}
      onEdit={onEdit}
      data={organizations}
      tableHeaders={tableHeaders}
      tableBodies={tableBodies}
    />
  );
};

export default OrganizationTable;
