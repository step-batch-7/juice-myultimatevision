const fs = require("fs");
const { loadData, writeData } = require("./utils");

const createNewTransaction = function(beverageDetails, date) {
  const empBeverageData = {
    empId: beverageDetails[beverageDetails.indexOf("--empId") + 1],
    beverage: beverageDetails[beverageDetails.indexOf("--beverage") + 1],
    qty: beverageDetails[beverageDetails.indexOf("--qty") + 1],
    date: date().toJSON()
  };
  return empBeverageData;
};

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
  if (!isValidDetails(beverageDetails)) return createUsage();
  const transactionData = loadData(filePath, loader, isFileExists, encoding);
  const empBeverageData = createNewTransaction(beverageDetails, date);
  transactionData.push(empBeverageData);
  writeData(filePath, writer, transactionData, encoding);
  return [
    "Transaction Recorded:\nEmployee ID, Beverage, Quantity, Date",
    [empBeverageData]
  ];
};

module.exports = { saveBeverageDetails };
