import React from "react";
import { Col, Row } from "antd";
import LocationMapContainer from "./Maps/LocationMapContainer";
import GroupedOrdersList from "./GroupedOrdersList";

const GroupBySuburb = (props) => {
  const { orders } = props;

  return (
    <Row gutter={8} style={{ width: "100%", height: "70vh" }}>
      <Col span={12} style={{ overflowY: "scroll", height: "100%" }}>
        <GroupedOrdersList orders={orders} />
      </Col>
      <Col span={12}>
        <LocationMapContainer markers={orders} />
      </Col>
    </Row>
  );
};

export default GroupBySuburb;
