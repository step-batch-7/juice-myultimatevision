const fs = require("fs");
const isFileExists = function(filePath) {
  return fs.existsSync(filePath);
};

const queryBeverages = function(userArguments, loadData, filePath) {
  if (!isFileExists(filePath)) return "file not found";
  if (!userArguments.includes("--empId") || userArguments.length != 2)
    return "usage :\nnode beverage.js --query [empId id]";

  const employId = userArguments[userArguments.indexOf("--empId") + 1];
  const beverageData = loadData(filePath);
  const employBeverageData = beverageData[employId];

  if (employBeverageData == undefined) return "no previous records";

  return formatData(employBeverageData);
};

const formatData = function(employBeverageData) {
  const formatedBeverageDetails = [];
  const headers = "empId,beverage,qty,date";
  let noOfJuices = 0;
  formatedBeverageDetails.push(headers);

  for (let index = 0; index < employBeverageData.length; index++) {
    let empBeverageData = Object.values(employBeverageData[index]).join(",");
    noOfJuices = noOfJuices + +employBeverageData[index]["qty"];
    formatedBeverageDetails.push(empBeverageData);
  }
  formatedBeverageDetails.push("juices: " + noOfJuices);
  return formatedBeverageDetails.join("\n");
};

exports.queryBeverages = queryBeverages;
