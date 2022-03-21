import React from "react";
import TableScreen from "../screens/TableScreen";
import Header from "../components/Header";
import { Router } from "@reach/router";

const TablesRoutes = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <Header isOpen={isOpen} setIsOpen={setIsOpen} category="table" />
      <Router>
        {/* <TableScreen isOpen={isOpen} path="/:listOf" /> */}
        <TableScreen isOpen={isOpen} path="/*" />
        {/* <TableScreen isOpen={isOpen} path="/:listOf/:id" /> */}
      </Router>
    </>
  );
};

export default TablesRoutes;
