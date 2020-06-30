import React, { useState, useEffect } from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
const { Dragger } = Upload;

const UploadToolBar = (props) => {
  const [fileList, setFileList] = useState();

  const { onUploadChange } = props;

  const beforeUpload = () => {
    return false;
  };

  return (
    <Dragger
      fileList={fileList}
      onChange={onUploadChange}
      beforeUpload={beforeUpload}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Export Orders from Shopify admin console and upload the CSV format file
        here to generate report.
      </p>
    </Dragger>
  );
};

export default UploadToolBar;
