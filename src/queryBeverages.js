const fs = require("fs");
const isFileExists = function(filePath) {
  return fs.existsSync(filePath);
};

const queryBeverages = function(userArguments, loadData, filePath) {
  if (!isFileExists(filePath)) return ["file not found", []];
  if (!userArguments.includes("--empId") || userArguments.length != 2)
    return ["usage :\nnode beverage.js --query [empId id]", []];

  const employId = userArguments[userArguments.indexOf("--empId") + 1];
  const beverageData = loadData(filePath);
  const employBeverageData = beverageData[employId];

  if (employBeverageData == undefined) return ["no previous records", []];
  return [
    "employId,beverage,quantity,date",
    employBeverageData,
    countJuices(employBeverageData)
  ];
};

const countJuices = function(employBeverageData) {
  let noOfJuices = 0;
  for (let index = 0; index < employBeverageData.length; index++) {
    noOfJuices = noOfJuices + +employBeverageData[index]["qty"];
  }
  return "Total juices :" + noOfJuices;
};

exports.queryBeverages = queryBeverages;
