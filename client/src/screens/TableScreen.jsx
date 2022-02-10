import { navigate } from "@reach/router";
import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";
import SideBar from "../components/SideBar";
import Button from "../components/subComponents/Button";
import Table from "../components/Table";
import Search from "../components/Search";

const TableScreen = (props) => {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableBodies, setTableBodies] = useState([]);

  useEffect(() => {
    if (props.listOf === "organizations") {
      axiosInstance
        .get("/user/organizations")
        .then((res) => {
          console.log(res.data[0]);
          setData(
            res.data.map((org) => ({
              ...org,
              teamsNames: org.teams.map((team) => team.name).join(","),
              sitesNum: org.sites.length,
            }))
          );
          setTableHeaders([
            "Org ID",
            "Organization",
            "Sites",
            "Teams",
            "Actions",
          ]);
          setTableBodies(["id", "name", "sitesNum", "teamsNames"]);
          setIsLoaded(true);
        })
        .catch((err) => console.log(err));
    } else if (props.listOf === "teams") {
      axiosInstance
        .get("/user/teams")
        .then((res) => {
          console.log(res.data[0]);
          setData(
            res.data.map((team) => ({
              ...team,
              sitesNum: team.sites.length,
            }))
          );
          setTableHeaders([
            "Team ID",
            "Team Name",
            "Organization",
            "Sites",
            "Actions",
          ]);
          setTableBodies(["id", "name", "organization.name", "sitesNum"]);
          setIsLoaded(true);
        })
        .catch((err) => console.log(err));
    } else if (props.listOf === "sites") {
      axiosInstance
        .get("/user/sites")
        .then((res) => {
          console.log(res.data[0]);
          setData(
            res.data.map((site) => ({
              ...site,
              teamsNames: site.teams.map((team) => team.name).join(","),
              projectsNames: site.projects
                .map((project) => project.name)
                .join(","),
            }))
          );
          setTableHeaders([
            "Site ID",
            "Site Name",
            "Organization",
            "Projects",
            "Teams",
            "Actions",
          ]);
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
    } else if (props.listOf === "projects") {
      axiosInstance
        .get("/user/projects")
        .then((res) => {
          console.log(res.data[0]);
          setData(
            res.data.map((project) => ({
              ...project,
            }))
          );
          setTableHeaders([
            "Project ID",
            "Project Name",
            "Site",
            "Project Type",
            "Organization",
            "Actions",
          ]);
          setTableBodies([
            "id",
            "name",
            "site.name",
            "type",
            "site.organization.name",
          ]);
          setIsLoaded(true);
        })
        .catch((err) => console.log(err));
    } else if (props.listOf === "users") {
      axiosInstance
        .get("/user/users")
        .then((res) => {
          console.log(res.data[0]);
          setData(
            res.data.map((user) => ({
              ...user,
              teamsNames: user.teams.map((team) => team.name).join(","),
              organizationsNames: user.organizations
                .map((org) => org.name)
                .join(","),
            }))
          );
          setTableHeaders([
            "ID",
            "Name",
            "Email",
            "Phone",
            "Org",
            "Teams",
            "Actions",
          ]);
          setTableBodies([
            "id",
            "nickname",
            "email",
            "telephone",
            "organizationsNames",
            "teamsNames",
          ]);
          setIsLoaded(true);
        })
        .catch((err) => console.log(err));
    } else if (props.listOf === "tickets") {
      axiosInstance
        .get("/user/tickets")
        .then((res) => {
          console.log(res.data[0]);
          setData(res.data);
          setTableHeaders([
            "Project",
            "Site",
            "Organization",
            "Ticket Title",
            "User Name",
            "ID",
            "Actions",
          ]);
          setTableBodies([
            "project.name",
            "project.site.name",
            "project.site.organization.name",
            "title",
            "user.user_name",
            "id",
          ]);
          setIsLoaded(true);
        })
        .catch((err) => console.log(err));
    } else if (props.listOf === "logs") {
      axiosInstance
        .get("/user/logs")
        .then((res) => {
          console.log(res.data[0]);
          setData(res.data);
          setTableHeaders(["Actions", "Time", "Title", "Username"]);
          setTableBodies(["time", "title", "user.user_name"]);
          setIsLoaded(true);
        })
        .catch((err) => console.log(err));
    }
  }, [props.listOf]);

  return (
    isLoaded && (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
        }}
      >
        <SideBar />

        <div style={{ marginLeft: "30px", marginTop: "50px" }}>
          {" "}
          {/* containing serach and table */}
          <div
            style={{
              display: "flex",
              marginBottom: "20px",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* containing search , add button*/}
            {/* <h1>{props.listOf}</h1> */}
            <Search />
            <Button
              style={{ width: "500px" }}
              onClick={() =>
                // navigate(`/${props.listOf.slice(0, props.listOf.length - 1)}`)
                navigate(`/${props.listOf}/create`)
              }
              title={`add ${props.listOf}`}
            />
          </div>
          <Table
            data={data}
            tableHeaders={tableHeaders}
            tableBodies={tableBodies}
          />
        </div>
      </div>
    )
  );
};

export default TableScreen;
