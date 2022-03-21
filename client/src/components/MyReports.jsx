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
import H4 from "../components/headers/H4";
import Download from "../components/Download";
import { BsClock } from "react-icons/bs";

const MyReports = ({ path, setCurrentIcon }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(false);
  const { isAuthenticated, user } = useContext(AuthContext);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableBodies, setTableBodies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [search, setSearch] = useState("");

  const onDelete = (id) => {
    axiosInstance.delete(`/user/reports/${id}`);
  };

  const onEdit = (id) => {
    navigate(`/forms/reports/edit/${id}`);
  };

  useEffect(() => {
    setCurrentIcon(path);
  }, [path]);

  useEffect(() => {
    let url;
    if (search !== "") {
      url = `/user/reports?search=${search}&page=${currentPage}`;
    } else {
      url = `/user/reports?page=${currentPage}`;
    }
    axiosInstance.get(url).then((res) => {
      console.log(res.data);
      console.log(url);
      setReports(
        res.data.results.map((ticket) => ({
          ...ticket,
        }))
      );
      setPageNumbers(
        [...Array(Math.ceil(res.data.count / 10)).keys()].map((i) => i + 1)
      );
    });
  }, [currentPage, search]);

  useEffect(() => {
    axiosInstance
      .get(`/user/reports`)
      .then((res) => {
        setReports(
          res.data.results.map((ticket) => ({
            ...ticket,
          }))
        );
        setPageNumbers(
          [...Array(Math.ceil(res.data.count / 10)).keys()].map((i) => i + 1)
        );
        if (isAdmin(user.role.name)) {
          setTableHeaders(["Site", "Dashboard", "Time", "Actions"]);
        } else {
          setTableHeaders(["Site", "Dashboard", "Time"]);
        }
        setTableBodies(["site.name", "dashboard", "delivery_time"]);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div
        // containing search , add button
        style={{
          display: "flex",
          marginBottom: "20px",
          justifyContent: "end",
          alignItems: "center",
          width: "100%",
        }}
      >
        <AuthorizedComponent
          Component={
            <Button
              style={{ width: "19%" }}
              onClick={() =>
                // navigate(`/${props.listOf.slice(0, props.listOf.length - 1)}`)
                navigate(`/forms/reports/create`)
              }
              title={`Add Report`}
            />
          }
        />
      </div>
      <Table
        isAdmin={isAdmin(user.role.name)}
        onDelete={onDelete}
        onEdit={onEdit}
        data={reports}
        tableHeaders={tableHeaders}
        tableBodies={tableBodies}
      />
      <Pagination
        pageNumbers={pageNumbers}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default MyReports;
