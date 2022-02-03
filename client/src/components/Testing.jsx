import React from "react";
import Form from "./Form";

const Testing = () => {
  return (
    <div>
      <h1>Testing</h1>
      <Form
        inputs={{
          name: { type: "text" },
          site_id: {
            type: "connectedSelect",
            selectors: ["organizations", "sites", "device"],
            organizations: [
              { name: "Qudra", id: 1, sites: [{}] },
              { name: "napco", id: 2, sites: [{}] },
            ],
            sites: { displayValue: "name" },
            device: { displayValue: "name" },
          },
        }}
      />
    </div>
  );
};

export default Testing;
