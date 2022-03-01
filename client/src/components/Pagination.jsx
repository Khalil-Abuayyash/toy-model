import React from "react";

const Number = ({ number, currentPage, setCurrentPage }) => {
  return (
    <div
      onClick={() => setCurrentPage(number)}
      style={{
        width: "2.85vw",
        height: "2.85vw",
        backgroundColor: currentPage == number ? "#ea3c88" : "#ffffff",
        color: currentPage == number ? "#ffffff" : "#000000",
        borderRadius: "0.63vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      {number}
    </div>
  );
};

const Pagination = ({ pageNumbers, currentPage, setCurrentPage }) => {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        width: "100%",
        height: "fit-content",
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
      <div
        style={{
          width: "2.85vw",
          height: "2.85vw",
          backgroundColor: "#ffffff",
          borderRadius: "0.63vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {"<"}
      </div>
      {pageNumbers.map((number) => (
        <Number
          key={number}
          number={number}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ))}
      <div
        style={{
          width: "2.85vw",
          height: "2.85vw",
          backgroundColor: "#ffffff",
          borderRadius: "0.63vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {">"}
      </div>
    </div>
  );
};

export default Pagination;
