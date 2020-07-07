import React from "react";
import { List, Divider } from "antd";
import { groupBy } from "lodash";

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
            <>
              <Divider>{position}</Divider>
              {Object.keys(ordersGrouped[position]).map((postcode) => {
                const bottomOrders = ordersGrouped[position][postcode];
                const qty = bottomOrders.length;
                const suburbName = bottomOrders[0].suburb;
                return (
                  <List
                    itemLayout="horizontal"
                    bordered
                    header={`${position} -> ${postcode} | ${suburbName} (${qty})`}
                    dataSource={bottomOrders}
                    renderItem={(item) => (
                      <List.Item extra={`${item.orderNumber}`}>
                        <List.Item.Meta
                          title={`${item.customerName} Phone:${item.phone}`}
                          description={item.shipAddText}
                        />
                      </List.Item>
                    )}
                  />
                );
              })}
            </>
          );
        })}
    </div>
  );
};

export default GroupedOrdersList;
