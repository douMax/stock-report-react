import React from "react";
import LocationMap from "./LocationMap";

const LocationMapContainer = (props) => {
  return (
    <div style={{ width: "100%", height: "70vh" }}>
      <LocationMap markers={props.markers} />
    </div>
  );
};

export default LocationMapContainer;
