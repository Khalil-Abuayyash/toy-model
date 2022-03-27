import React, { useEffect, useState } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import _ from "lodash";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import CustomizedChart from "./CustomizedChart";

// const RefCustomizedChart = React.forwardRef((props, ref) => (
//   <CustomizedChart innerRef={ref} {...props} />
// ));

const ReactGridLayout = WidthProvider(RGL);

const Dashboard = ({ children, items = 20, layout, setLayout }) => {
  // const isInitialMount = useRef(true);

  return (
    <div style={{ width: "100%", marginBottom: "100px" }}>
      <ReactGridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        // width={1200}
        items={items}
        onLayoutChange={(e) => {
          setLayout(e);
        }}
      >
        {/* {generateDOM()} */}
        {children}
      </ReactGridLayout>
    </div>
  );
};

export default Dashboard;
