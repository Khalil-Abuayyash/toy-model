import React, { useState } from "react";
import GoogleMapReact from "google-map-react";

const GoogleMap = ({ children, onClick }) => {
  const [center, setCenter] = useState({ lat: 31, lng: 35 });
  const [zoom, setZoom] = useState(8);
  return (
    <GoogleMapReact
      // style={{ borderRadius: "8px", hegiht: "100%", width: "100%" }}
      onClick={onClick}
      width="100%"
      height="100%"
      bootstrapURLKeys={{ key: "AIzaSyCqudq9hriZVoMBMqEd0-QRDA2dQYJx-l4" }}
      defaultCenter={center}
      defaultZoom={zoom}
    >
      {children}
    </GoogleMapReact>
  );
};

export default GoogleMap;
