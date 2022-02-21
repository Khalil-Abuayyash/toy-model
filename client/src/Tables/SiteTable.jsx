import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../axios";
import Table from "../components/Table";
import { AuthContext } from "../Context/AuthenticationContext";
import AdminComponent from "../HOCs/AdminComponent";
import { isAdmin } from "../HOCs/AdminComponent";
import { navigate } from "@reach/router";
import Pagination from "../components/Pagination";

const SiteTable = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [sites, setSites] = useState([]);
  const [error, setError] = useState(false);
  const { isAuthenticated, user } = useContext(AuthContext);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableBodies, setTableBodies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);

  const onDelete = (id) => {
    axiosInstance.delete(`/user/sites/${id}`);
  };

  const onEdit = (id) => {
    navigate(`/forms/sites/edit/${id}`);
  };

  useEffect(() => {
    axiosInstance.get(`/user/sites?page=${currentPage}`).then((res) => {
      setSites(
        res.data.results.map((site) => ({
          ...site,
          teamsNames: site.teams.map((team) => team.name).join(","),
          projectsNames: site.projects.map((project) => project.name).join(","),
        }))
      );
      setPageNumbers(
        [...Array(Math.ceil(res.data.count / 10)).keys()].map((i) => i + 1)
      );
    });
  }, [currentPage]);

  useEffect(() => {
    axiosInstance
      .get(`/user/sites?page=${currentPage}`)
      .then((res) => {
        setSites(
          res.data.results.map((site) => ({
            ...site,
            teamsNames: site.teams.map((team) => team.name).join(","),
            projectsNames: site.projects
              .map((project) => project.name)
              .join(","),
          }))
        );
        setPageNumbers(
          [...Array(Math.ceil(res.data.count / 10)).keys()].map((i) => i + 1)
        );
        if (isAdmin(user.role.name)) {
          setTableHeaders([
            "Site ID",
            "Site Name",
            "Organization",
            "Projects",
            "Teams",
            "Actions",
          ]);
        } else {
          setTableHeaders([
            "Site ID",
            "Site Name",
            "Organization",
            "Projects",
            "Teams",
          ]);
        }
        setTableBodies([
          "id",
          "name",
          "organization.name",
          "projectsNames",
          "teamsNames",
        ]);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Table
        isAdmin={isAdmin(user.role.name)}
        category="sites"
        onDelete={onDelete}
        onEdit={onEdit}
        data={sites}
        tableHeaders={tableHeaders}
        tableBodies={tableBodies}
      />
      <Pagination
        pageNumbers={pageNumbers}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default SiteTable;
