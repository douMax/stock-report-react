import React from "react";
import { Tag } from "antd";

const Marker = (props) => {
  const { antdIcon, labelText, tagColor } = props;
  return (
    <div
      style={{ fontSize: "16px", width: "100px", backgroud: "oragne" }}
      icon={antdIcon}
      color={tagColor}
    >
      {labelText}
    </div>
  );
};

export default Marker;
