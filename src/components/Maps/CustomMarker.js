import React from "react";
import { Tag } from "antd";

const labelStyles = {
  fontSize: "16px",
  width: "100px",
  backgroud: "oragne",
};

const CustomMarker = (props) => {
  const { antdIcon, labelText, tagColor } = props;
  return (
    <div style={labelStyles} icon={antdIcon} color={tagColor}>
      {labelText}
    </div>
  );
};

export default CustomMarker;
