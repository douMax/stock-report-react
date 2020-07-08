import React from "react";
import { List, Avatar, Collapse, Space } from "antd";
import {
  PrinterOutlined,
  UnorderedListOutlined,
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
  const tempGrouped = groupBy(orders, "postcode");
  const tempObject = Object.keys(tempGrouped).map((p) => {
    let position = tempGrouped[p][0].position;
    let postcode = p;
    let orders = tempGrouped[p];
    return { postcode, position, orders };
  });
  const ordersGrouped = groupBy(tempObject, "position");
  return (
    <div>
      {ordersGrouped &&
        Object.keys(ordersGrouped).map((position) => {
          return (
            <Collapse defaultActiveKey={Object.keys(ordersGrouped)}>
              <Panel header={<strong>{position}</strong>} key={position}>
                {ordersGrouped[position].map((obj) => {
                  const { postcode } = obj;
                  const bottomOrders = obj.orders;
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
                              key="list-line-items-o"
                            />,
                            <IconText
                              icon={PrinterOutlined}
                              text="Packing Slip"
                              key="list-packing-slip-o"
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
