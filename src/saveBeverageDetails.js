const fs = require("fs");
const loadData = require("./utils").loadData;
const writeData = require("./utils").writeData;

const createNewTransaction = function(beverageDetails, date) {
  const empBeverageData = {
    empId: beverageDetails[beverageDetails.indexOf("--empId") + 1],
    beverage: beverageDetails[beverageDetails.indexOf("--beverage") + 1],
    qty: beverageDetails[beverageDetails.indexOf("--qty") + 1],
    date: date().toJSON()
  };
  return empBeverageData;
};

// const isFileExist = function(filePath) {
//   return fs.existsSync(filePath);
// };

const createUsage = function() {
  const usage = [
    "Usage :,node beverage.js ,--save,[--empId employId],[--beverage beveragename],[qty quantity]"
      .split(",")
      .join("\n"),
    []
  ];
  return usage;
};

const isIncludesDetails = function(beverageDetails) {
  const requiredDetails = ["--beverage", "--qty", "--empId"];
  let flag = true;
  for (let index = 0; index < requiredDetails.length; index++) {
    if (
      !beverageDetails.includes(requiredDetails[index]) ||
      beverageDetails.indexOf(requiredDetails[index]) % 2 == 1
    ) {
      flag = false;
    }
  }
  return flag;
};

const isValidDetails = function(beverageDetails) {
  let flag = true;
  flag = isIncludesDetails(beverageDetails) && beverageDetails.length == 6;
  return flag;
};

const saveBeverageDetails = function(beverageDetails, requiredProperties) {
  const {
    loader,
    writer,
    encoding,
    date,
    isFileExists,
    filePath
  } = requiredProperties;
  const empBeverageData = createNewTransaction(beverageDetails, date);
  if (!isValidDetails(beverageDetails)) return createUsage();
  transactionData = loadData(filePath, loader, isFileExists, encoding);
  transactionData.push(empBeverageData);
  writeData(filePath, writer, transactionData, encoding);
  return [
    "transaction recorded:\nemploy id,beverage,quantity,date",
    [empBeverageData]
  ];
};

exports.saveBeverageDetails = saveBeverageDetails;
