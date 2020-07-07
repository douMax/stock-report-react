import React, { useState } from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const UploadToolBar = (props) => {
  const [fileList, setFileList] = useState();

  const { onUploadChange } = props;

  const beforeUpload = () => {
    return false;
  };

  return (
    <Upload
      fileList={fileList}
      onChange={onUploadChange}
      beforeUpload={beforeUpload}
    >
      <Button>
        <UploadOutlined /> Click to Upload
      </Button>
    </Upload>
  );
};

export default UploadToolBar;
