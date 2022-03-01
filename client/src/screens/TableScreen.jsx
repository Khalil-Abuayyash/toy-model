import { navigate } from "@reach/router";
import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";
import SideBar from "../components/SideBar";
import Button from "../components/subComponents/Button";
import Search from "../components/Search";
import OrganizationTable from "../Tables/OrganizationTable";
import UserTable from "../Tables/UserTable";
import SiteTable from "../Tables/SiteTable";
import TeamTable from "../Tables/TeamTable";
import AuthorizedComponent from "../HOCs/AuthorizedComponent";
import TicketTable from "../Tables/TicketTable";
import LogTable from "../Tables/LogTable";
import Home from "../components/Home";
import Playlist from "../components/Playlist";
import TeamUserTable from "../Tables/TeamUserTable";

const TableScreen = (props) => {
  const { isOpen } = props;
  const [isLoaded, setIsLoaded] = useState(true);

  const onDelete = (id, category) => {
    axiosInstance.delete(`/user/${category}/${id}`);
  };

  return (
    isLoaded && (
      <div // sidebar + table(serach,create,rows,pagination)
        style={{
          width: "100vw",
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
        }}
      >
        {isOpen ? <SideBar /> : null}

        <div // containing search and table and pagination
          style={{
            marginRight: "0px",
            marginLeft: "2.85vw",
            marginTop: "50px",
            width: "79.9vw",
            // overflowX: "scroll",
          }}
        >
          {/* Table --containing search and table and pagination-- */}
          {props.listOf === "organizations" ? (
            <OrganizationTable />
          ) : props.listOf === "users" ? (
            <UserTable />
          ) : props.listOf === "sites" ? (
            <SiteTable />
          ) : props.listOf === "teams" ? (
            props.id ? (
              <TeamUserTable teamId={props.id} />
            ) : (
              <TeamTable />
            )
          ) : props.listOf === "tickets" ? (
            <TicketTable />
          ) : props.listOf === "logs" ? (
            <LogTable />
          ) : props.listOf === "home" ? (
            <Home />
          ) : props.listOf === "playlists" ? (
            <Playlist />
          ) : null}
        </div>
      </div>
    )
  );
};

export default TableScreen;
