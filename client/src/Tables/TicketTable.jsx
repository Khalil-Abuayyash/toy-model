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
          setTableHeaders([
            "Ticket ID",
            "Ticket Title",
            "User",
            "Organization",
            "Site",
            "Project",
            "Actions",
          ]);
        } else {
          setTableHeaders([
            "Ticket ID",
            "Ticket Title",
            "User",
            "Organization",
            "Site",
            "Project",
          ]);
        }
        setTableBodies([
          "id",
          "title",
          "user.nickname",
          "organization.name",
          "site.name",
          "project.name",
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
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          marginBottom: "10px",
        }}
      >
        <H4
          style={{
            marginBottom: "0px",
            marginRight: "10px",
          }}
        >
          <span
            onClick={() => setIsOld(false)}
            style={{
              color: isOld ? "#464545" : "#E84088",
              fontWeight: isOld ? "normal" : "bold",
              cursor: "pointer",
            }}
          >
            New Tickets
          </span>
        </H4>
        <H4 style={{ marginBottom: "0px" }}>
          <span
            onClick={() => setIsOld(true)}
            style={{
              cursor: "pointer",
              color: isOld ? "#E84088" : "#464545",
              fontWeight: isOld ? "bold" : "normal",
            }}
          >
            Old Tickets
          </span>
        </H4>
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
          placeholder="Search ( ID , Name , Orgs , Sites , Projects )"
        />
        <Download />
        <AuthorizedComponent
          Component={
            <Button
              style={{ width: "19%" }}
              onClick={() =>
                // navigate(`/${props.listOf.slice(0, props.listOf.length - 1)}`)
                navigate(`/forms/tickets/create`)
              }
              title={`New Ticket`}
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
    </>
  );
};

export default TicketTable;
