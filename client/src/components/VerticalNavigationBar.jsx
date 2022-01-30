import React from "react";
import { Link } from "@reach/router";
import styles from "../styles/verticalNavigationBar.module.css";

const VerticalNavigationBar = () => {
  return (
    <div className={styles.verticalNav}>
      <nav>
        <Link to="/">Home</Link> | <Link to="/register">Register</Link> |{" "}
        <Link to="/google">Google</Link> | <Link to="/login">Login</Link> | |{" "}
        <Link to="/logout">Logout</Link> | <Link to="chart">Chart</Link> |{" "}
        <Link to="/dashboard">Dashboard</Link> |<Link to="users">Users</Link> |{" "}
        <Link to="organizations">Organizations</Link> |{" "}
        <Link to="sites">Sites</Link> | <Link to="projects">Projects</Link> |{" "}
        <Link to="teams">teams</Link> | <Link to="tickets">Tickets</Link>
      </nav>
    </div>
  );
};

export default VerticalNavigationBar;
