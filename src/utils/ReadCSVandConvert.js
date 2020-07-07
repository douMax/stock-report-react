const csv = require("@fast-csv/parse");
const { getLocations } = require("./GetDirections");

const buildOrderWithShipInfo = async (csvRow, postcode) => {
  let suburb = csvRow["Shipping City"].trim(); // shipping city
  suburb = suburb.toLowerCase();
  suburb = suburb.charAt(0).toUpperCase() + suburb.substr(1);
  let phone = csvRow["Shipping Phone"].trim();
  if (phone[0] === "'") {
    phone = phone.substr(1);
  }
  //35 - 42, 44 - notes
  let streetAdd = csvRow["Shipping Street"].trim();
  let customerName = csvRow["Shipping Name"].trim();
  let stateName = "NSW";
  let shipAddText = `${streetAdd} \n${suburb} ${postcode}`;
  let location = await getLocations(shipAddText);
  let position = location.position;

  let orderObj = {
    customerName,
    phone,
    shipAddText,
    suburb,
    postcode,
    stateName,
    location,
    position,
  };
  return orderObj;
};

export const fastConvert = (file, setFunc) => {
  const reader = new FileReader();
  const stocksArray = [];
  const quantityByProduct = {};
  const ordersArray = [];

  reader.onload = () => {
    const CSV_STRING = reader.result;

    csv
      .parseString(CSV_STRING, { headers: true })
      .on("error", (error) => console.error(error))
      .on("data", async (row) => {
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

        let postcode = row["Shipping Zip"].trim();
        // check if there is a postcode

        if (postcode && postcode.length > 0) {
          if (postcode[0] === "'") {
            postcode = postcode.substr(1);
          }

          let orderObj = await buildOrderWithShipInfo(row, postcode);

          ordersArray.push({ ...orderObj, orderNumber });
        }
      })
      .on("end", (rowCount) => {
        console.log(`Parsed ${rowCount} rows`);

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
        console.log(ordersArray);
        setFunc({ stocksArray, ordersArray });
      });
  };

  reader.readAsText(file);
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
