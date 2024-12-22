import React from "react";
import { Button } from "antd";
import printJS from "print-js";

const slipStyles = {};

const PackingSlips = () => {
  const printSlip = () => {
    printJS({ printable: "slip", type: "html" });
  };

  return (
    <div>
      <div id="slip">
        <h1>Order 1001</h1>
      </div>
      <Button type="primary" onClick={printSlip}>
        Print
      </Button>
    </div>
  );
};

export default PackingSlips;
