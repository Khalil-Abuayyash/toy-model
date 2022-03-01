import { navigate } from "@reach/router";
import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../axios";
import Table from "../components/Table";
import { AuthContext } from "../Context/AuthenticationContext";
import AdminComponent from "../HOCs/AdminComponent";
import { isAdmin } from "../HOCs/AdminComponent";
import Pagination from "../components/Pagination";
import Button from "../components/subComponents/Button";
import Search from "../components/Search";
import AuthorizedComponent from "../HOCs/AuthorizedComponent";
import Download from "../components/Download";
import H2 from "../components/headers/H2";
import ArrowBack from "../components/arrows/ArrowBack";

const TeamUserTable = ({ teamId }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const { isAuthenticated, user } = useContext(AuthContext);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableBodies, setTableBodies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [search, setSearch] = useState("");
  const [team, setTeam] = useState({ name: "" });

  const onDelete = (teamId, userId) => {
    axiosInstance
      .get(`user/teammemberships?team__id=${teamId}&user__id=${userId}`)
      .then((res) => {
        axiosInstance.delete(`user/teammemberships/${res.data.results[0].id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    axiosInstance.get(`/user/teams/${teamId}`).then((res) => {
      setTeam(res.data);
    });
  }, [teamId]);

  useEffect(() => {
    let url;
    if (search !== "") {
      url = `/user/users?search=${search}&page=${currentPage}&teams__id=${teamId}`;
    } else {
      url = `/user/users?page=${currentPage}&teams__id=${teamId}`;
    }
    axiosInstance.get(url).then((res) => {
      setUsers(
        res.data.results.map((user) => ({
          ...user,
          teamsNames: user.teams.map((team) => team.name).join(","),
          organizationsNames: user.organizations
            .map((org) => org.name)
            .join(","),
        }))
      );
      setPageNumbers(
        [...Array(Math.ceil(res.data.count / 10)).keys()].map((i) => i + 1)
      );
    });
  }, [currentPage, search]);

  useEffect(() => {
    axiosInstance
      .get(`/user/users?teams__id=${teamId}`)
      .then((res) => {
        setUsers(
          res.data.results.map((user) => ({
            ...user,
          }))
        );
        setPageNumbers(
          [...Array(Math.ceil(res.data.count / 10)).keys()].map((i) => i + 1)
        );
        if (isAdmin(user.role.name)) {
          setTableHeaders([
            // "ID",
            "Name",
            "Email",
            "Phone",
            // "Org",
            // "Teams",
            "Seen",
            "Action",
          ]);
        } else {
          setTableHeaders([
            // "ID",
            "Name",
            "Email",
            "Phone",
            // "Org",
            // "Teams",
            "Seen",
          ]);
        }
        setTableBodies([
          //   "id",
          "nickname",
          "email",
          "telephone",
          //   "organizationsNames",
          //   "teamsNames",
          "last_login",
        ]);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <ArrowBack onClick={() => navigate("/tables/teams")} />
        <H2
          style={{ fontWeight: "600" }}
        >{`${team.name.toUpperCase()} Users`}</H2>
      </div>

      <div
        // containing search , add button
        style={{
          display: "flex",
          marginBottom: "20px",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Search
          search={search}
          handleSearch={handleSearch}
          placeholder="Search ( ID, Name, Email )"
        />
        <Download />
        <AuthorizedComponent
          Component={
            <Button
              style={{ width: "20%" }}
              onClick={() => navigate(`/forms/user_to_team/${teamId}`)}
              title={`Add User`}
            />
          }
        />
      </div>
      <Table
        isAdmin={isAdmin(user.role.name)}
        category="teamUsers"
        onDelete={onDelete}
        teamId={teamId}
        data={users}
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

export default TeamUserTable;
