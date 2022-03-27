import { navigate } from "@reach/router";
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
import { CgNotes } from "react-icons/cg";
import { FaRegStickyNote } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { IoPlaySkipForwardOutline } from "react-icons/io5";

// const SideBarButton = (props) => {
//   const [isClicked, setisClicked] = useState(false);
//   return (
//     <Link
//       to={props.to}
//       getProps={({ isCurrent }) => {
//         isCurrent ? setisClicked(true) : setisClicked(false);
//         return { style: { textDecoration: "none" } };
//       }}
//     >
//       <div
//         className={`${styles.sideButton} ${
//           isClicked ? styles.clicked : styles.unclicked
//         }`}
//       >
//         <IconButton isClicked={isClicked} Icon={props.Icon} />
//         <span
//           className={`${isClicked ? styles.clicked : styles.unclicked} ${
//             styles.media
//           }`}
//           style={{ marginLeft: "8px" }}
//         >
//           {props.label}
//         </span>
//       </div>
//     </Link>
//   );
// };

const SideBarButton = ({ Icon, label, isClicked, onClick }) => {
  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={onClick}
      className={`${styles.sideButton} ${
        isClicked ? styles.clicked : styles.unclicked
      }`}
    >
      <IconButton isClicked={isClicked} Icon={Icon} />
      <span
        className={`${isClicked ? styles.clicked : styles.unclicked}`}
        style={{
          marginLeft: "8px",
          fontSize: "18px",
          fontWeight: 600,
        }}
      >
        {label}
      </span>
    </div>
  );
};

const SideBar = ({ currentIcon, setCurrentIcon }) => {
  return (
    <div className={styles.sidebar}>
      {/* <SideBarButton to="/dashboard" label="Dashboard" Icon={GrProjects} /> */}
      <SideBarButton
        label="Home"
        Icon={MdOutlineDashboard}
        isClicked={currentIcon === "home" ? true : false}
        onClick={() => {
          setCurrentIcon("home");
          navigate("/tables/home");
        }}
      />
      <SideBarButton
        label="Playlist"
        Icon={IoPlaySkipForwardOutline}
        isClicked={currentIcon === "playlists" ? true : false}
        onClick={() => {
          setCurrentIcon("playlists");
          navigate("/tables/playlists");
        }}
      />
      <SideBarButton
        label="Users"
        Icon={AiOutlineUser}
        isClicked={currentIcon === "users" ? true : false}
        onClick={() => {
          setCurrentIcon("users");
          navigate("/tables/users");
        }}
      />
      <SideBarButton
        label="Orgs"
        Icon={RiBuildingLine}
        isClicked={currentIcon === "organizations" ? true : false}
        onClick={() => {
          setCurrentIcon("organizations");
          navigate("/tables/organizations");
        }}
      />
      <SideBarButton
        label="Sites"
        Icon={BiMapPin}
        isClicked={currentIcon === "sites" ? true : false}
        onClick={() => {
          setCurrentIcon("sites");
          navigate("/tables/sites");
        }}
      />
      {/* <SideBarButton to="/tables/projects" label="Projects" Icon={BsLayers} /> */}
      <SideBarButton
        label="Teams"
        Icon={AiOutlineTeam}
        isClicked={currentIcon === "teams" ? true : false}
        onClick={() => {
          setCurrentIcon("teams");
          navigate("/tables/teams");
        }}
      />
      <SideBarButton
        label="Tickets"
        Icon={CgNotes}
        isClicked={currentIcon === "tickets" ? true : false}
        onClick={() => {
          setCurrentIcon("tickets");
          navigate("/tables/tickets");
        }}
      />
      <SideBarButton
        label="Logs"
        Icon={FaRegStickyNote}
        isClicked={currentIcon === "logs" ? true : false}
        onClick={() => {
          setCurrentIcon("logs");
          navigate("/tables/logs");
        }}
      />
    </div>
  );
};

export default SideBar;
