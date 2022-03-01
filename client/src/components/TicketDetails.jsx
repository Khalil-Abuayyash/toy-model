import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";
import H2 from "./headers/H2";
import H4 from "./headers/H4";
import styling from "../styles/details.module.css";

const styles = {
  margin: "2% auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "start",
  width: "40vw",
};

const TicketDetails = ({ id }) => {
  const [ticket, setTicket] = useState({
    title: "Problem1",
    user: {
      nickname: "khalil abuayyash",
    },
    organization: { name: "qudra" },
    site: { name: "shufat" },
    project: { name: "weather station" },
    description: "a new ticket",
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`/user/tickets/${id}`)
      .then((res) => {
        // console.log(res.data);
        setTicket(res.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    isLoaded && (
      <div style={styles}>
        <H2 style={{ fontWeight: "600", marginBottom: "0%" }}>
          {ticket.title.toUpperCase()}-
          <span style={{ color: "#e84088" }}>
            {ticket.user.nickname.toUpperCase()}
          </span>
        </H2>
        <div
          className={styling.responsiveContiner}
          style={{
            marginTop: "1.71vh",
            width: "100%",
          }}
        >
          <H4
            style={{
              fontWeight: "normal",
              marginTop: "0%",
              marginBottom: "0%",
              marginRight: "3%",
            }}
          >
            Organization :
            <span style={{ color: "#e84088", fontWeight: "bold" }}>
              {` ${ticket.organization.name.toUpperCase()}`}
            </span>
          </H4>
          <H4
            style={{
              fontWeight: "normal",
              marginTop: "0%",
              marginBottom: "0%",
              marginRight: "3%",
            }}
          >
            Site :
            <span style={{ color: "#e84088", fontWeight: "bold" }}>
              {` ${ticket.site.name.toUpperCase()}`}
            </span>
          </H4>
          <H4
            style={{
              fontWeight: "normal",
              marginTop: "0%",
              marginBottom: "0%",
            }}
          >
            Project :
            <span style={{ color: "#e84088", fontWeight: "bold" }}>
              {` ${ticket.project.name.toUpperCase()}`}
            </span>
          </H4>
        </div>
        <H4
          style={{
            fontWeight: "normal",
            marginTop: "13px",
            marginBottom: "0%",
          }}
        >
          Time :
          <span
            style={{ color: "#e84088", fontWeight: "bold" }}
          >{` Time`}</span>
        </H4>
        <H4
          style={{
            fontWeight: "normal",
            marginTop: "13px",
            marginBottom: "0%",
          }}
        >
          Message :
        </H4>
        <H4
          style={{
            fontWeight: "normal",
            marginTop: "0%",
            lineHeight: "2.5",
          }}
        >
          {ticket.description}
        </H4>
      </div>
    )
  );
};

export default TicketDetails;
