import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../axios";
import Table from "../components/Table";
import { AuthContext } from "../Context/AuthenticationContext";
import AdminComponent from "../HOCs/AdminComponent";
import { isAdmin } from "../HOCs/AdminComponent";
import { navigate } from "@reach/router";
import Pagination from "../components/Pagination";
import Button from "../components/subComponents/Button";
import Search from "../components/Search";
import AuthorizedComponent from "../HOCs/AuthorizedComponent";

const TeamTable = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(false);
  const { isAuthenticated, user } = useContext(AuthContext);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableBodies, setTableBodies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [search, setSearch] = useState("");

  const onDelete = (id) => {
    axiosInstance.delete(`/user/teams/${id}`);
  };

  const onEdit = (id) => {
    navigate(`/forms/teams/edit/${id}`);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    let url;
    if (search !== "") {
      url = `/user/teams?search=${search}&page=${currentPage}`;
    } else {
      url = `/user/teams?page=${currentPage}`;
    }
    axiosInstance.get(url).then((res) => {
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
  }, [currentPage, search]);

  useEffect(() => {
    axiosInstance
      .get(`/user/teams`)
      .then((res) => {
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
          placeholder="Search ( ID, Team Name, Organization, Sites )"
        />
        <AuthorizedComponent
          Component={
            <Button
              style={{ width: "500px" }}
              onClick={() =>
                // navigate(`/${props.listOf.slice(0, props.listOf.length - 1)}`)
                navigate(`/forms/organizations/create`)
              }
              title={`Add Organization`}
            />
          }
        />
      </div>
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
