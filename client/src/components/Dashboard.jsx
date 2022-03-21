import React, { useEffect } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import _ from "lodash";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import CustomizedChart from "./CustomizedChart";

const RefCustomizedChart = React.forwardRef((props, ref) => (
  <CustomizedChart innerRef={ref} {...props} />
));
const ReactGridLayout = WidthProvider(RGL);

const Dashboard = ({ children, items = 20, layout }) => {
  // const generateLayout = () => {
  //   return _.map(new Array(items - 5), function (item, i) {
  //     const y = Math.ceil(Math.random() * 4) + 1;
  //     return {
  //       x: (i * 2) % 12,
  //       y: Math.floor(i / 6) * y,
  //       w: 2,
  //       h: y,
  //       i: i.toString(),
  //     };
  //   });
  // };

  // const generateDOM = () => {
  //   return _.map(_.range(items), function (i) {
  //     return (
  //       <div key={i}>
  //         <span className="text">{i}</span>
  //       </div>
  //     );
  //   });
  // };

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
          console.log(e);
        }}
      >
        {/* {generateDOM()} */}
        {children}
      </ReactGridLayout>
    </div>
  );
};

export default Dashboard;
