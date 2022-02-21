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

const UserTable = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const { isAuthenticated, user } = useContext(AuthContext);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableBodies, setTableBodies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [search, setSearch] = useState("");

  const onDelete = (id) => {
    axiosInstance.delete(`/user/users/${id}`);
  };

  const onEdit = (id) => {
    navigate(`/forms/users/edit/${id}`);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    let url;
    if (search !== "") {
      url = `/user/users?search=${search}&page=${currentPage}`;
    } else {
      url = `/user/users?page=${currentPage}`;
    }
    axiosInstance.get(url).then((res) => {
      console.log(res.data);
      console.log(url);
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
      .get(`/user/users`)
      .then((res) => {
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
        if (isAdmin(user.role.name)) {
          setTableHeaders([
            "ID",
            "Name",
            "Email",
            "Phone",
            "Org",
            "Teams",
            "Seen",
            "Actions",
          ]);
        } else {
          setTableHeaders([
            "ID",
            "Name",
            "Email",
            "Phone",
            "Org",
            "Teams",
            "Seen",
          ]);
        }
        setTableBodies([
          "id",
          "nickname",
          "email",
          "telephone",
          "organizationsNames",
          "teamsNames",
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
        // containing search , add button
        style={{
          display: "flex",
          marginBottom: "20px",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Search search={search} handleSearch={handleSearch} />
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
        category="users"
        onDelete={onDelete}
        onEdit={onEdit}
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

export default UserTable;
