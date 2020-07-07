import React from "react";
import { Col, Row } from "antd";
import LocationMapContainer from "./Maps/LocationMapContainer";
import GroupedOrdersList from "./GroupedOrdersList";

const GroupBySuburb = (props) => {
  const { orders } = props;

  return (
    <Row gutter={8} style={{ width: "100%" }}>
      <Col span={12}>
        <GroupedOrdersList orders={orders} />
      </Col>
      <Col span={12}>
        <LocationMapContainer markers={orders} />
      </Col>
    </Row>
  );
};

export default GroupBySuburb;
