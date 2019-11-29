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

const saveBeverageDetails = function(
  beverageDetails,
  loadData,
  filePath,
  writeData,
  getDate,
  date
) {
  const empBeverageData = createNewTransaction(beverageDetails, getDate, date);
  let transactionData = [];

  if (!isValidDetails(beverageDetails)) return createUsage();
  if (isFileExists(filePath)) transactionData = loadData(filePath);
  transactionData.push(empBeverageData);
  writeData(filePath, JSON.stringify(transactionData));
  return [
    "transaction recorded:\nemploy id,beverage,quantity,date",
    [empBeverageData]
  ];
};

exports.saveBeverageDetails = saveBeverageDetails;
