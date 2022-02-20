import { Link } from "@reach/router";
import React, { useState } from "react";
import styles from "../styles/sideBar.module.css";
import IconButton from "./Buttons/IconButton";
import { VscNote } from "react-icons/vsc";
import { AiOutlineUser } from "react-icons/ai";
import { RiBuildingLine } from "react-icons/ri";
import { BiMapPin } from "react-icons/bi";
import { GrProjects } from "react-icons/gr";
import { BsLayers } from "react-icons/bs";
import { AiOutlineTeam } from "react-icons/ai";

const SideBarButton = (props) => {
  const [isClicked, setisClicked] = useState(false);
  return (
    <Link
      to={props.to}
      getProps={({ isCurrent }) => {
        isCurrent ? setisClicked(true) : setisClicked(false);
        return { style: { textDecoration: "none" } };
      }}
    >
      <div
        className={`${styles.sideButton} ${
          isClicked ? styles.clicked : styles.unclicked
        }`}
      >
        <IconButton isClicked={isClicked} Icon={props.Icon} />
        <span
          className={`${isClicked ? styles.clicked : styles.unclicked} ${
            styles.media
          }`}
          style={{ marginLeft: "8px" }}
        >
          {props.label}
        </span>
      </div>
    </Link>
  );
};

const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      {/* <SideBarButton to="/dashboard" label="Dashboard" Icon={GrProjects} /> */}
      <SideBarButton to="/tables/users" label="Users" Icon={AiOutlineUser} />
      <SideBarButton
        to="/tables/organizations"
        label="Organizations"
        Icon={RiBuildingLine}
      />
      <SideBarButton to="/tables/sites" label="Sites" Icon={BiMapPin} />
      <SideBarButton to="/tables/projects" label="Projects" Icon={BsLayers} />
      <SideBarButton to="/tables/teams" label="Teams" Icon={AiOutlineTeam} />
    </div>
  );
};

export default SideBar;
