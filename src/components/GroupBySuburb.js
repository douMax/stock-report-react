import React, { useState } from "react";
import { Divider, Space, Card, Col, Row } from "antd";

const GroupBySuburb = (props) => {
  const { data } = props;
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {data &&
        Object.keys(data).map((suburb) => {
          const customers = data[suburb];
          const qty = customers.length;
          return (
            <div>
              <Divider orientation="left">
                {customers[0].shipZip} - {suburb}: {qty}
              </Divider>
              <Row gutter={16}>
                {customers &&
                  customers.map((c) => {
                    return (
                      <Col span={6}>
                        <Card title={`${c.customerName} - ${c.phone}`}>
                          <p>{c.shipStreet}</p>
                          <p>
                            {c.suburb}, {c.shipZip}
                          </p>
                        </Card>
                      </Col>
                    );
                  })}
              </Row>
            </div>
          );
        })}
    </Space>
  );
};

export default GroupBySuburb;
