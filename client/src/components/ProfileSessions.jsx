import { navigate } from "@reach/router";
import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../axios";
import Table from "../components/Table";
import { AuthContext } from "../Context/AuthenticationContext";
import { isAdmin } from "../HOCs/AdminComponent";
import Pagination from "../components/Pagination";

const ProfileSessions = ({ path, setCurrentIcon }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState(false);
  const { isAuthenticated, user } = useContext(AuthContext);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableBodies, setTableBodies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [search, setSearch] = useState("");

  const onDelete = (id) => {
    axiosInstance.delete(`/user/sessions/${id}`);
  };

  const onEdit = (id) => {
    navigate(`/forms/sessions/edit/${id}`);
  };

  useEffect(() => {
    setCurrentIcon(path);
  }, [path]);

  useEffect(() => {
    let url;
    if (search !== "") {
      url = `/user/sessions?search=${search}&page=${currentPage}`;
    } else {
      url = `/user/sessions?page=${currentPage}`;
    }
    axiosInstance.get(url).then((res) => {
      console.log(res.data);
      console.log(url);
      setSessions(
        res.data.results.map((session) => ({
          ...session,
        }))
      );
      setPageNumbers(
        [...Array(Math.ceil(res.data.count / 10)).keys()].map((i) => i + 1)
      );
    });
  }, [currentPage, search]);

  useEffect(() => {
    axiosInstance
      .get(`/user/sessions`)
      .then((res) => {
        setSessions(
          res.data.results.map((session) => ({
            ...session,
          }))
        );
        setPageNumbers(
          [...Array(Math.ceil(res.data.count / 10)).keys()].map((i) => i + 1)
        );
        if (isAdmin(user.role.name)) {
          setTableHeaders([
            "Browser & OS",
            "IP Address",
            "Logged on",
            // "Last Seen",
            "",
          ]);
        } else {
          setTableHeaders([
            "Browser & OS",
            "IP Address",
            "Logged on",
            // "Last Seen",
            "",
          ]);
        }
        setTableBodies(["browser", "ip", "logged_on"]);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Table
        isAdmin={isAdmin(user.role.name)}
        onDelete={onDelete}
        onEdit={onEdit}
        data={sessions}
        tableHeaders={tableHeaders}
        tableBodies={tableBodies}
        category="sessions"
      />
      <Pagination
        pageNumbers={pageNumbers}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ProfileSessions;
