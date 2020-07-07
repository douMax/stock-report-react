import React, { useState, useEffect } from "react";
import { Marker } from "react-google-maps";
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";
import { Tag } from "antd";

const OrderMarker = (props) => {
  const [isOpen, setOpen] = useState(true);

  const onToggleOpen = () => {
    setOpen(!isOpen);
  };

  return (
    <Marker position={props.location} onClick={onToggleOpen}>
      {isOpen && (
        <InfoBox
          onCloseClick={onToggleOpen}
          options={{ closeBoxURL: ``, enableEventPropagation: true }}
        >
          <Tag color="orange">{props.orderNumber}</Tag>
        </InfoBox>
      )}
    </Marker>
  );
};

export default OrderMarker;
