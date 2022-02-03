import { navigate } from "@reach/router";
import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";
import Button from "../components/subComponents/Button";
import Table from "../components/Table";

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
            "Actions",
            "Teams",
            "Sites",
            "Organization",
            "Org Id",
          ]);
          setTableBodies(["teamsNames", "sitesNum", "name", "id"]);
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
          setTableHeaders(["Actions", "Organization", "Sites", "name", "Id"]);
          setTableBodies(["organization.name", "sitesNum", "name", "id"]);
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
            "Actions",
            "Teams",
            "Projects",
            "Organization",
            "Site",
            "ID",
          ]);
          setTableBodies([
            "teamsNames",
            "projectsNames",
            "organization.name",
            "name",
            "id",
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
            "Actions",
            "Organization",
            "Site Name",
            "Project Type",
            "Project Name",
            "ID",
          ]);
          setTableBodies([
            "site.organization.name",
            "site.name",
            "type",
            "name",
            "id",
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
            "Actions",
            "Teams",
            "Organization",
            "Phone Number",
            "Email",
            "Name",
            "ID",
          ]);
          setTableBodies([
            "teamsNames",
            "organizationsNames",
            "telephone",
            "email",
            "nickname",
            "id",
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
            "Actions",
            "Project",
            "Site",
            "Organization",
            "Ticket Title",
            "User Name",
            "ID",
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
      <>
        <h1>{props.listOf}</h1>
        <Button
          onClick={() =>
            // navigate(`/${props.listOf.slice(0, props.listOf.length - 1)}`)
            navigate(`/${props.listOf}/create`)
          }
          title={`add ${props.listOf}`}
        />
        <Table
          data={data}
          tableHeaders={tableHeaders}
          tableBodies={tableBodies}
        />
      </>
    )
  );
};

export default TableScreen;
