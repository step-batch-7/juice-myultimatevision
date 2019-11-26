const fs = require("fs");
const createNewTransaction = function(beverageDetails, getDate, date) {
  const empBeverageData = {
    empId: beverageDetails[beverageDetails.indexOf("--empId") + 1],
    beverage: beverageDetails[beverageDetails.indexOf("--beverage") + 1],
    qty: beverageDetails[beverageDetails.indexOf("--qty") + 1],
    date: getDate(date)
  };
  return empBeverageData;
};

const isFileExists = function(filePath) {
  return fs.existsSync(filePath);
};

const createUsage = function() {
  const usage = [
    "Usage :",
    "node beverage.js ",
    "--query",
    "[--empId employId]",
    "[--beverage beveragename]",
    "[qty quantity]"
  ].join("\n");
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

const saveBeverageDetails = function(
  beverageDetails,
  loadData,
  filePath,
  writeData,
  getDate,
  date
) {
  const empBeverageData = createNewTransaction(beverageDetails, getDate, date);
  let transactionData = {};

  if (!isValidDetails(beverageDetails)) return createUsage();
  if (isFileExists(filePath)) transactionData = loadData(filePath);
  newTransactionData = modifyTransactionData(transactionData, empBeverageData);
  writeData(filePath, JSON.stringify(newTransactionData));
  return formatData(empBeverageData);
};

const modifyTransactionData = function(TransactionData, empBeverageData) {
  employId = empBeverageData["empId"];
  if (TransactionData[employId] == undefined) {
    TransactionData[employId] = [empBeverageData];
  } else {
    TransactionData[employId].push(empBeverageData);
  }
  return TransactionData;
};

const formatData = function(beverageDetails) {
  const formatedBeverageDetails = [];
  const headers = "empId,beverage,qty,date";
  const message = "transaction recorded :";
  let beverageData = Object.values(beverageDetails).join(",");
  formatedBeverageDetails.push(message);
  formatedBeverageDetails.push(headers);
  formatedBeverageDetails.push(beverageData);
  return formatedBeverageDetails.join("\n");
};

exports.saveBeverageDetails = saveBeverageDetails;
exports.modifyTransactionData = modifyTransactionData;
