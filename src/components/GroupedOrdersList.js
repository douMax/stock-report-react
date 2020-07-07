import React from "react";
import { List, Avatar, Collapse, Space } from "antd";
import {
  StarOutlined,
  LikeOutlined,
  UnorderedListOutlined,
  MessageOutlined,
  UserOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { groupBy } from "lodash";

const { Panel } = Collapse;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const GroupedOrdersList = (props) => {
  const { orders } = props;
  const ordersGrouped = groupBy(orders, "position");
  Object.keys(ordersGrouped).map((p) => {
    let ungrouped = ordersGrouped[p];
    ordersGrouped[p] = groupBy(ungrouped, "postcode");
  });
  return (
    <div>
      {ordersGrouped &&
        Object.keys(ordersGrouped).map((position) => {
          return (
            <Collapse defaultActiveKey={Object.keys(ordersGrouped)}>
              <Panel header={<strong>{position}</strong>} key={position}>
                {Object.keys(ordersGrouped[position]).map((postcode) => {
                  const bottomOrders = ordersGrouped[position][postcode];
                  const qty = bottomOrders.length;
                  const suburbName = bottomOrders[0].suburb;
                  return (
                    <List
                      itemLayout="vertical"
                      bordered
                      header={` ${suburbName} | ${postcode} (${qty})`}
                      dataSource={bottomOrders}
                      renderItem={(item) => (
                        <List.Item
                          extra={`${item.orderNumber}`}
                          actions={[
                            <IconText
                              icon={UnorderedListOutlined}
                              text="Line Items"
                              key="list-vertical-star-o"
                            />,
                          ]}
                        >
                          <List.Item.Meta
                            avatar={
                              <Avatar size="large" icon={<UserOutlined />} />
                            }
                            title={item.customerName}
                            description={
                              <IconText
                                icon={PhoneOutlined}
                                text={item.phone}
                              />
                            }
                          />
                          {item.shipAddText}
                        </List.Item>
                      )}
                    />
                  );
                })}
              </Panel>
            </Collapse>
          );
        })}
    </div>
  );
};

export default GroupedOrdersList;
