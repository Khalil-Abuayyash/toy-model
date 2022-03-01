import { navigate } from "@reach/router";
import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../axios";
import Table from "../components/Table";
import { AuthContext } from "../Context/AuthenticationContext";
import { isAdmin } from "../HOCs/AdminComponent";
import Pagination from "../components/Pagination";
import Button from "../components/subComponents/Button";
import Search from "../components/Search";
import Download from "../components/Download";
import AuthorizedComponent from "../HOCs/AuthorizedComponent";

const OrganizationTable = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [error, setError] = useState(false);
  const { isAuthenticated, user } = useContext(AuthContext);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableBodies, setTableBodies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [search, setSearch] = useState("");

  // postPerPage, lastRowIndex, firstRowIndex, currentRows, PageNumbers

  const onDelete = (id) => {
    axiosInstance.delete(`/user/organizations/${id}`);
  };

  const onEdit = (id) => {
    navigate(`/forms/organizations/edit/${id}`);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    let url;
    if (search !== "") {
      url = `/user/organizations?search=${search}&page=${currentPage}`;
    } else {
      url = `/user/organizations?page=${currentPage}`;
    }
    axiosInstance.get(url).then((res) => {
      setOrganizations(
        res.data.results.map((org) => ({
          ...org,
          teamsNames: org.teams.map((team) => team.name).join(","),
          sitesNum: org.sites.length,
        }))
      );
      setPageNumbers(
        [...Array(Math.ceil(res.data.count / 10)).keys()].map((i) => i + 1)
      );
    });
  }, [currentPage, search]);

  useEffect(() => {
    // axiosInstance;
    // .get(`/user/organizations`)
    // .then((res) => {
    // setOrganizations(
    //   res.data.results.map((org) => ({
    //     ...org,
    //     teamsNames: org.teams.map((team) => team.name).join(","),
    //     sitesNum: org.sites.length,
    //   }))
    // );
    // setPageNumbers(
    //   [...Array(Math.ceil(res.data.count / 10)).keys()].map((i) => i + 1)
    // );
    if (isAdmin(user.role.name)) {
      setTableHeaders([
        "Org ID",
        "Organization",
        "Sites",
        "Teams",
        "DISCO",
        "Actions",
      ]);
    } else {
      setTableHeaders(["Org ID", "Organization", "Sites", "Teams", "DISCO"]);
    }
    setTableBodies(["id", "name", "sitesNum", "teamsNames", "disco"]);
    setIsLoaded(true);
    // })
    // .catch((err) => {
    //   console.log(err);
    //   setError(true);
    // });
  }, []);

  return (
    <>
      <div
        // containing search , add button
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "20px",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Search
          search={search}
          handleSearch={handleSearch}
          placeholder="Search ( ID, Organization Name, DISCO )"
        />
        <Download />
        <AuthorizedComponent
          Component={
            <Button
              style={{ width: "19%" }}
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
        category="organizations"
        onDelete={onDelete}
        onEdit={onEdit}
        data={organizations}
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

export default OrganizationTable;
