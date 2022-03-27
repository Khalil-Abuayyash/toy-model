import React, { useContext, useState } from "react";
// import styles from "../styles/header.module.css";
import IconButton from "./Buttons/IconButton";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineEngineering } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import ProfileMenu from "./ProfileMenu";
import { AuthContext } from "../Context/AuthenticationContext";
import OrganizationDialog from "./OrganizationDialog";

export const OutHeader = () => {
  return (
    <div
      style={{
        // position:"fixed",
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "center",
        width: "100vw",
        height: "87px",
        backgroundImage:
          "linear-gradient(90deg, #a7ba62 , #56b4da 35% , #e84088 )",
        backgroundPosition: "0% 0%",
        backgroundSize: "100%",
      }}
    >
      <img
        src={require("../images/logo.png")}
        width="114px"
        height="49px"
        alt="Logo"
        style={{ marginLeft: "15%" }}
      />
    </div>
  );
};

const TableHeader = ({ isOpen, setIsOpen, form }) => {
  return (
    <div
      style={{
        // position:"fixed",
        width: "100vw",
        height: "99px",
        backgroundImage:
          "linear-gradient(90deg,#a7ba62 , #56b4da 35% , #e84088)",
        backgroundPosition: "100% 100%",
        backgroundSize: form ? "" : isOpen ? "88% 12%" : "",
        backgroundRepeat: "no-repeat",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          boxShadow: "0px 0.22vw 0.44vw #0000001C",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "88%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            // width: "100%",
            // height: "88%",
            marginLeft: "4%",
          }}
        >
          {form ? null : (
            <IconButton
              onClick={() => setIsOpen((open) => !open)}
              style={{ marginRight: "24px", cursor: "pointer" }}
              Icon={GiHamburgerMenu}
            />
          )}

          <img
            src={require("../images/clogo.png")}
            width="114px"
            height="49px"
            alt="Logo"
          />
        </div>

        <div
          style={{
            marginRight: "10%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <OrganizationDialog />
          <IconButton Icon={IoMdNotificationsOutline} />
          <IconButton Icon={MdOutlineEngineering} />
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
};

const FormHeader = () => {
  return <TableHeader form={true} />;
};

const Header = ({ isOpen, setIsOpen, category }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <>
      {isAuthenticated ? (
        category === "table" ? (
          <TableHeader isOpen={isOpen} setIsOpen={setIsOpen} />
        ) : (
          <FormHeader isOpen={false} />
        )
      ) : (
        <OutHeader />
      )}
    </>
  );
};

export default Header;
