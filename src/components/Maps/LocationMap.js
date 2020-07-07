import React, { useState } from "react";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

import { Tag } from "antd";
import { HomeOutlined, ShopOutlined } from "@ant-design/icons";

const googleMapsApiKey =
  process.env.GOOGLE_MAPS_API_KEY || "AIzaSyBgKZZIlL3e4eQxPlmls23GaObu0yqCmUg";

const home = { lat: -33.8620303, lng: 151.0697581 };
const containerStyle = {
  width: "100%",
  height: "100%",
};

const LocationMap = (props) => {
  const [activeMarker, setActiveMarker] = useState(null);
  const [hoveredMarkerProps, setHoveredMarkerProps] = useState(null);

  const handleMarkerMouseOver = (props, marker, e) => {
    setActiveMarker(marker);
    setHoveredMarkerProps(props);
  };

  return (
    <Map
      google={props.google}
      zoom={12}
      initialCenter={home}
      containerStyle={containerStyle}
    >
      <InfoWindow marker={activeMarker} visible={true}>
        <Tag color="cyan">{activeMarker && activeMarker.name}</Tag>
      </InfoWindow>
      <Marker
        name={"Home"}
        position={home}
        onMouseover={handleMarkerMouseOver}
      />
      {(props.markers || []).map((order, index) => (
        <Marker
          position={order.location}
          title={order.orderNumber}
          name={order.orderNumber}
          onMouseover={handleMarkerMouseOver}
        />
      ))}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: googleMapsApiKey,
})(LocationMap);
