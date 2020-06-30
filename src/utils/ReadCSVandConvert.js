const csv = require("@fast-csv/parse");
const fs = require("fs");

export const fastConvert = (file, setFunc) => {
  const reader = new FileReader();
  const stocksArray = [];
  const quantityByProduct = {};
  const customersBySub = {};

  reader.onload = () => {
    const CSV_STRING = reader.result;

    csv
      .parseString(CSV_STRING, { headers: true })
      .on("error", (error) => console.error(error))
      .on("data", (row) => {
        let productName = row["Lineitem name"];
        let quantity = Number(row["Lineitem quantity"]);
        let orderNumber = row["Name"];
        if (!productName) {
          return;
        }
        if (quantityByProduct[productName]) {
          quantityByProduct[productName].quantity += quantity;
          quantityByProduct[productName].orders += ` | ${orderNumber}`;
        } else {
          quantityByProduct[productName] = { quantity: 0, orders: "" };
          quantityByProduct[productName].quantity = quantity;
          quantityByProduct[productName].orders = orderNumber;
        }

        let customerName = row["Shipping Name"].trim();
        // check if there is a customer
        if (customerName && customerName.length > 0) {
          let suburb = row["Shipping City"].trim(); // shipping city
          suburb = suburb.toLowerCase();
          suburb = suburb.charAt(0).toUpperCase() + suburb.substr(1);
          let phone = row["Shipping Phone"].trim();
          if (phone[0] === "'") {
            phone = phone.substr(1);
          }
          //35 - 42, 44 - notes
          let shipAdd1 = row["Shipping Address1"].trim();
          let shipAdd2 = row["Shipping Address2"].trim();
          let shipStreet = row["Shipping Street"].trim();
          let shipZip = row["Shipping Zip"].trim();
          if (shipZip[0] === "'") {
            shipZip = shipZip.substr(1);
          }
          let shipState = "NSW";

          let orderObj = {
            orderNumber,
            customerName,
            phone,
            shipStreet,
            shipAdd1,
            shipAdd2,
            suburb,
            shipZip,
            shipState,
          };

          if (customersBySub[suburb] === undefined) {
            customersBySub[suburb] = [];
          }

          customersBySub[suburb].push(orderObj);
        }
      })
      .on("end", (rowCount) => {
        // sort output object by key name alphabetically
        const keys = Object.keys(quantityByProduct);
        const sortedKeys = keys.sort((a, b) => {
          return (a > b) - 0.5;
        });

        // flat the structure, conver quantityByProduct object to array for futhur csv export
        sortedKeys.forEach((key) => {
          let value = quantityByProduct[key];
          let tempObj = {
            product: key,
            qty: value.quantity,
            orders: value.orders,
          };
          stocksArray.push(tempObj);
        });

        setFunc({ stocksArray, customersBySub });
        console.log(`Parsed ${rowCount} rows`);
      });
  };

  reader.readAsText(file);
};

export const readCsvData = (file, setFunc) => {
  const reader = new FileReader();
  reader.onload = () => {
    const data = reader.result;
    const ordersGroupBySuburb = groupDataBySuburb(data);
    const stockArray = convertDataToStockArray(data);
    setFunc({ stockArray, ordersGroupBySuburb });
  };

  reader.readAsText(file);
};

const groupDataBySuburb = (data) => {
  const result = {};
  const lines = data.split("\n");

  lines.forEach((line, index) => {
    if (index > 0) {
      let lineArr =
        line.match(/(".*?"|[^\s",][^",]+[^\s",])(?=\s*,|\s*$)/g) || [];

      let customerName = lineArr[34];
      // check if there is a customer
      if (customerName && customerName.length > 0) {
        let orderNumber = lineArr[0];
        let suburb = lineArr[39]; // shipping city
        let phone = lineArr[43];

        //35 - 42, 44 - notes
        let shipAdd1 = lineArr[36];
        let shipAdd2 = lineArr[37];
        let shipCompany = lineArr[38];
        let shipZip = lineArr[40];
        let shipState = "NSW";

        let orderObj = {
          orderNumber,
          customerName,
          phone,
          shipAdd1,
          shipAdd2,
          shipCompany,
          shipZip,
          shipState,
        };
        if (result[suburb] === undefined) {
          result[suburb] = [];
        }
        result[suburb].push(orderObj);
      }
    }
  });

  return result;
};

const convertDataToStockArray = (data) => {
  const outputArr = [];
  const output = {};
  const lines = data.split("\n");
  const headerLine = lines[0].split(",");
  console.log(
    "Target columns: ",
    headerLine,
    headerLine[1],
    headerLine[16],
    headerLine[17]
  );

  lines.forEach((line, index) => {
    if (index > 0) {
      let lineArr =
        line.match(/(".*?"|[^\s",][^",]+[^\s",])(?=\s*,|\s*$)/g) || [];

      let productName = lineArr[17];
      let quantity = Number(lineArr[16]);
      let orderNumber = lineArr[0];

      if (!productName) {
        return;
      }

      if (output[productName]) {
        output[productName].quantity += quantity;
        output[productName].orders += ` | ${orderNumber}`;
      } else {
        output[productName] = { quantity: 0, orders: "" };
        output[productName].quantity = quantity;
        output[productName].orders = orderNumber;
      }
    }
  });

  // sort output object by key name alphabetically
  const keys = Object.keys(output);
  const sortedKeys = keys.sort((a, b) => {
    return (a > b) - 0.5;
  });

  // flat the structure, conver output object to array for futhur csv export
  sortedKeys.forEach((key) => {
    let value = output[key];
    let tempObj = {
      product: key,
      qty: value.quantity,
      orders: value.orders,
    };
    outputArr.push(tempObj);
  });

  return outputArr;
};

export const exportToCsv = (arrayOfObjects, columns) => {
  let csvString = "";
  const newLineSymbol = "\r\n";

  const headerStr = columns.map((c) => c.title).join(",") + newLineSymbol;
  csvString += headerStr;

  arrayOfObjects.forEach((obj) => {
    columns.forEach(({ dataIndex }) => {
      csvString += obj[dataIndex] + ",";
    });
    csvString += newLineSymbol;
  });
  csvString =
    "data:text/csv;charset=utf-8,\uFEFF" + encodeURIComponent(csvString);
  return csvString;
};
