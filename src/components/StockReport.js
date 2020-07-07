import React from "react";
import { Table, Space, Button } from "antd";

import { StockReportColumns } from "../utils/Columns";

const StockReport = (props) => {
  const { data, downDisable, downUrl } = props;
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <a href={downUrl} download="StockReport.csv">
        <Button type="primary" disabled={downDisable}>
          Download
        </Button>
      </a>
      <Table
        columns={StockReportColumns}
        dataSource={data}
        pagination={{ pageSize: 50 }}
        size="small"
      />
    </Space>
  );
};

export default StockReport;
