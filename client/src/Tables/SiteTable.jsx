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

const SiteTable = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [sites, setSites] = useState([]);
  const [error, setError] = useState(false);
  const { isAuthenticated, user } = useContext(AuthContext);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableBodies, setTableBodies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [search, setSearch] = useState("");

  const onDelete = (id) => {
    axiosInstance.delete(`/user/sites/${id}`);
  };

  const onEdit = (id) => {
    navigate(`/forms/sites/edit/${id}`);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    let url;
    if (search !== "") {
      url = `/user/sites?search=${search}&page=${currentPage}`;
    } else {
      url = `/user/sites?page=${currentPage}`;
    }
    axiosInstance.get(url).then((res) => {
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
  }, [currentPage, search]);

  useEffect(() => {
    axiosInstance
      .get(`/user/sites`)
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
          placeholder="Search ( ID, Site Name, Org )"
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
