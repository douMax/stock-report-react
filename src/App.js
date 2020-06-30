import React, { useState, useEffect } from "react";
import { Card, Space, Tabs, Upload, message } from "antd";
import "antd/dist/antd.css";
import StockReport from "./components/StockReport";
import GroupBySuburb from "./components/GroupBySuburb";

import UploadToolBar from "./components/UploadToolBar";
import {
  readCsvData,
  exportToCsv,
  fastConvert,
} from "./utils/ReadCSVandConvert";
import { StockReportColumns } from "./utils/Columns";
import { InboxOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const { Dragger } = Upload;

const containerStyles = {
  width: "100%",
  height: "100%",
  padding: "15px",
};

const App = () => {
  const [activeTab, setActiveTab] = useState("stocks");
  const [data, setdata] = useState({});
  const [downDisable, setDownloadDisable] = useState(true);
  const [downUrl, setDownUrl] = useState("");

  useEffect(() => {
    const { stocksArray } = data;

    if (stocksArray && stocksArray.length > 0) {
      const str = exportToCsv(stocksArray, StockReportColumns);
      setDownloadDisable(false);
      setDownUrl(str);
    }
  }, [data]);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handleUpload = (info) => {
    const { status } = info.file;
    console.log(status);

    fastConvert(info.file, setdata);
  };

  return (
    <Space direction="vertical" style={containerStyles}>
      <Card title="NNG Reports">
        <UploadToolBar onUploadChange={handleUpload} />

        <Tabs defaultActiveKey="stocks" onChange={handleTabChange}>
          <TabPane tab="Stocks" key="stocks">
            <StockReport
              data={data.stocksArray}
              downDisable={downDisable}
              downUrl={downUrl}
            />
          </TabPane>
          <TabPane tab="Suburbs" key="suburbs">
            <GroupBySuburb data={data.customersBySub} />
          </TabPane>
        </Tabs>
      </Card>
    </Space>
  );
};

export default App;
