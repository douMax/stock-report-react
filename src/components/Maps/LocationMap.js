import React from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import { HomeOutlined, ShopOutlined } from "@ant-design/icons";

const googleMapsApiKey =
  process.env.GOOGLE_MAPS_API_KEY || "AIzaSyBgKZZIlL3e4eQxPlmls23GaObu0yqCmUg";
const home = { lat: -33.8620303, lng: 151.0697581 };

const LocationMap = (props) => {
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: googleMapsApiKey }}
      defaultCenter={home}
      defaultZoom={13}
    >
      <Marker lat={home.lat} lng={home.lng} labelText="Home" tagColor="red" />
      {(props.markers || []).map((order, index) => (
        <Marker
          lat={order.location.lat}
          lng={order.location.lng}
          labelText={order.orderNumber}
          tagColor="Orange"
        />
      ))}
    </GoogleMapReact>
  );
};

export default LocationMap;
