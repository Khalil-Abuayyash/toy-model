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

const TicketTable = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(false);
  const { isAuthenticated, user } = useContext(AuthContext);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableBodies, setTableBodies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [search, setSearch] = useState("");
  const [isOld, setIsOld] = useState(false);

  const onDelete = (id) => {
    axiosInstance.delete(`/user/tickets/${id}`);
  };

  const onEdit = (id) => {
    navigate(`/forms/tickets/edit/${id}`);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const toggleDone = (id) => {
    axiosInstance.patch(`/user/tickets/${id}/`, { done: true });
  };
  const toggleNotDone = (id) => {
    axiosInstance.patch(`/user/tickets/${id}/`, { done: false });
  };

  useEffect(() => {
    let url;
    if (search !== "") {
      url = `/user/tickets?search=${search},${isOld}&page=${currentPage}`;
    } else {
      url = `/user/tickets?page=${currentPage}&search=${isOld}`;
    }
    axiosInstance.get(url).then((res) => {
      console.log(res.data);
      console.log(url);
      setTickets(
        res.data.results.map((ticket) => ({
          ...ticket,
        }))
      );
      setPageNumbers(
        [...Array(Math.ceil(res.data.count / 10)).keys()].map((i) => i + 1)
      );
    });
  }, [currentPage, search, isOld]);

  useEffect(() => {
    axiosInstance
      .get(`/user/tickets?search=${isOld}`)
      .then((res) => {
        setTickets(
          res.data.results.map((ticket) => ({
            ...ticket,
          }))
        );
        setPageNumbers(
          [...Array(Math.ceil(res.data.count / 10)).keys()].map((i) => i + 1)
        );
        if (isAdmin(user.role.name)) {
          setTableHeaders(["Name", "Dashboard", "Description", "Actions"]);
        } else {
          setTableHeaders(["Name", "Dashboard", "Description"]);
        }
        setTableBodies(["id", "title", "user.nickname"]);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ width: " 69vw" }}>
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
        <Download Icon={BsClock} style={{ marginRight: "2%" }} />
        <AuthorizedComponent
          Component={
            <Button
              style={{ width: "19%" }}
              onClick={() =>
                // navigate(`/${props.listOf.slice(0, props.listOf.length - 1)}`)
                navigate(`/forms/alerts/create`)
              }
              title={`New Alert`}
            />
          }
        />
      </div>
      <Table
        isAdmin={isAdmin(user.role.name)}
        category="tickets"
        isOld={isOld}
        onDelete={onDelete}
        onEdit={onEdit}
        toggleDone={toggleDone}
        toggleNotDone={toggleNotDone}
        data={tickets}
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

export default TicketTable;
