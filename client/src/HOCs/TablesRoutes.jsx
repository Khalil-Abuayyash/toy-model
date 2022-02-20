import React from "react";
import TableScreen from "../screens/TableScreen";
import Header from "../components/Header";
import { Router } from "@reach/router";

const TablesRoutes = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <Header isOpen={isOpen} setIsOpen={setIsOpen} category="table" />
      <Router>
        <TableScreen isOpen={isOpen} path="/:listOf" />
      </Router>
    </>
  );
};

export default TablesRoutes;
