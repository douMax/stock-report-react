import React from "react";
import LocationMap from "./LocationMap";

const LocationMapContainer = (props) => {
  return (
    <div>
      <LocationMap markers={props.markers} />
    </div>
  );
};

export default LocationMapContainer;
