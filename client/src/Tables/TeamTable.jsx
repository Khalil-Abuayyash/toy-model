import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../axios";
import Table from "../components/Table";
import { AuthContext } from "../Context/AuthenticationContext";
import AdminComponent from "../HOCs/AdminComponent";
import { isAdmin } from "../HOCs/AdminComponent";
import { navigate } from "@reach/router";
import Pagination from "../components/Pagination";

const TeamTable = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(false);
  const { isAuthenticated, user } = useContext(AuthContext);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableBodies, setTableBodies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);

  const onDelete = (id) => {
    axiosInstance.delete(`/user/teams/${id}`);
  };

  const onEdit = (id) => {
    navigate(`/forms/teams/edit/${id}`);
  };

  useEffect(() => {
    axiosInstance.get(`/user/teams?page=${currentPage}`).then((res) => {
      // console.log(res.data);
      setTeams(
        res.data.results.map((team) => ({
          ...team,
          sitesNum: team.sites.length,
        }))
      );
      setPageNumbers(
        [...Array(Math.ceil(res.data.count / 10)).keys()].map((i) => i + 1)
      );
    });
  }, [currentPage]);

  useEffect(() => {
    axiosInstance
      .get(`/user/teams?page=${currentPage}`)
      .then((res) => {
        // console.log(res.data);
        setTeams(
          res.data.results.map((team) => ({
            ...team,
            sitesNum: team.sites.length,
          }))
        );
        setPageNumbers(
          [...Array(Math.ceil(res.data.count / 10)).keys()].map((i) => i + 1)
        );
        if (isAdmin(user.role.name)) {
          setTableHeaders([
            "Team ID",
            "Team Name",
            "Organization",
            "Sites",
            "Actions",
          ]);
        } else {
          setTableHeaders(["Team ID", "Team Name", "Organization", "Sites"]);
        }

        setTableBodies(["id", "name", "organization.name", "sitesNum"]);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Table
        isAdmin={isAdmin(user.role.name)}
        category="teams"
        onDelete={onDelete}
        onEdit={onEdit}
        data={teams}
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

export default TeamTable;
