import React, { useState, useContext, useEffect } from "react";
import Search from "./Search";
import BigIcon from "./arrows/BigIcon";
import { ImMap2 } from "react-icons/im";
import { BsTable } from "react-icons/bs";
import { isAdmin } from "../HOCs/AdminComponent";
import { AuthContext } from "../Context/AuthenticationContext";
import Pagination from "../components/Pagination";
import GoogleMap from "../components/GoogleMap";
import Marker from "./arrows/Marker";
import OrganizationSummaryTable from "./OrganizationSummaryTable";

const Card = ({ isHidden, site }) => {
  return (
    <div
      style={{
        fontFamily: "Cairo",
        position: "absolute",
        top: "-155px",
        left: "-45px",
        display: isHidden ? "none" : "flex",
        backgroundColor: "#ffffff",
        width: "120px",
        height: "fit-content",
        borderRadius: "0.63vh",
        // marginTop: "-14vh",
        padding: "1vw 0vw 1vw 1vw",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "center",
        cursor: "auto",
      }}
    >
      <span style={{ fontSize: "11px", color: "#e84088", fontWeight: "bold" }}>
        {site.name.toUpperCase()} Site
      </span>
      <span> Alert: {site.name.toUpperCase()} </span>
      <span> Total Capacity: {site.name.toUpperCase()} </span>
      <span> Production: {site.name.toUpperCase()} </span>
      <span> Active Power: {site.name.toUpperCase()} </span>
      <span> Irradiance: {site.name.toUpperCase()} </span>
      <span> Weather: {site.name.toUpperCase()} </span>
    </div>
  );
};

const SiteOnMap = ({ site }) => {
  const [isHidden, setIsHidden] = useState(true);
  return (
    <div
      style={{
        cursor: "pointer",
        height: "fit-content",
        width: "fit-content",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "center",
      }}
    >
      <Marker
        style={{
          position: "absolute",
          left: "0px",
          top: "0px",
        }}
        onClick={() => {
          setIsHidden(!isHidden);
        }}
      />
      <Card isHidden={isHidden} site={site} />
    </div>
  );
};

const SitesSummary = () => {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        width: "100%",
        minHeight: "6.65vh",
        // minHeight: "85px",
        // height: "fit-content",
        boxSizing: "border-box",
        borderRadius: "0.63vh",
        marginTop: "2.7vh",
        padding: "0.95vw",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Summary
    </div>
  );
};

const OrganizationSummary = () => {
  const { isAuthenticated, user, organization } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [current, setCurrent] = useState("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableBodies, setTableBodies] = useState([]);

  useEffect(() => {}, []);

  useEffect(() => {
    setTableHeaders([
      "Site Name",
      "Today Vs 7-days",
      "Now",
      "Weather",
      "Expected KW",
      "Path 24h Actual vs Expected",
      "This Month",
      "System Size",
      "Last Upload",
    ]);
    setTableBodies(["name", "", "", "", "", "", "", "", ""]);
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div
        // containing search , add button
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "20px",
          justifyContent: "start",
          alignItems: "center",
          width: "100%",
          minWidth: "79.9vw",
        }}
      >
        <Search
          style={{ width: "33.6vw", marginRight: "21px" }}
          search={search}
          handleSearch={handleSearch}
          placeholder="Search ( ID, Organization Name, DISCO )"
        />
        <BigIcon
          Icon={BsTable}
          current={current}
          onClick={() => setCurrent("table")}
          isClicked={current === "table"}
          style={{ marginRight: "21px" }}
        />
        <BigIcon
          Icon={ImMap2}
          current={current}
          onClick={() => setCurrent("map")}
          isClicked={current === "map"}
        />
      </div>
      {current === "table" ? (
        <>
          <OrganizationSummaryTable
            isAdmin={isAdmin(user.role.name)}
            category="organizations"
            // onDelete={onDelete}
            // onEdit={onEdit}
            data={organization.sites}
            tableHeaders={tableHeaders}
            tableBodies={tableBodies}
          />
          <SitesSummary />
          <Pagination
            pageNumbers={pageNumbers}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <div style={{ width: "100%", height: "70vh", borderRadius: "8px" }}>
          <GoogleMap
            onClick={(e) => {
              console.log(e.lng);
            }}
          >
            {organization.sites.map((site) => {
              return (
                <SiteOnMap
                  key={site.id}
                  lng={site.lng}
                  lat={site.lat}
                  site={site}
                />
              );
            })}
          </GoogleMap>
        </div>
      )}
    </>
  );
};

export default OrganizationSummary;
