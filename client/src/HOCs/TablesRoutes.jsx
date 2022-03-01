import React from "react";
import TableScreen from "../screens/TableScreen";
import Header from "../components/Header";
import { Router } from "@reach/router";
import TeamUserTable from "../Tables/TeamUserTable";

const TablesRoutes = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <Header isOpen={isOpen} setIsOpen={setIsOpen} category="table" />
      <Router>
        <TableScreen isOpen={isOpen} path="/:listOf" />
        <TableScreen isOpen={isOpen} path="/:listOf/:id" />
      </Router>
    </>
  );
};

export default TablesRoutes;
