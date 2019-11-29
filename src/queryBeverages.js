const fs = require("fs");

const countJuices = function(employBeverageData) {
  return employBeverageData.reduce(function(noOfJuices, record) {
    return noOfJuices + +record.qty;
  }, 0);
};

const isFileExists = function(filePath) {
  return fs.existsSync(filePath);
};

const isValidArguments = function(userArguments) {
  let flag = true;
  const argumentsNeeded = "--empId,--beverage,--date".split(",");
  for (let index = 0; index < userArguments.length; index += 2) {
    if (!argumentsNeeded.includes(userArguments[index])) flag = false;
  }
  return flag && userArguments.length % 2 == 0;
};

const getPairedArguments = function(userArguments) {
  const pairedArguments = {};
  for (let index = 0; index < userArguments.length; index += 2) {
    pairedArguments[userArguments[index]] = userArguments[index + 1];
  }
  return pairedArguments;
};

const queryBeverages = function(userArguments, loadData, filePath) {
  if (!isFileExists(filePath)) return ["file not found", []];
  if (!isValidArguments(userArguments))
    return ["usage :\nnode beverage.js --query [--empId id] [--date date]", []];
  const pairedArguments = getPairedArguments(userArguments);

  const employId = pairedArguments["--empId"];

  const date = pairedArguments["--date"];
  const beverage = pairedArguments["--beverage"];
  const beverageData = loadData(filePath);
  let employBeverageData = getDataByDate(
    getDataByBeverage(getDataById(beverageData, employId), beverage),
    date
  );
  if (employBeverageData.length == 0) {
    return ["no previous records", []];
  }
  return [
    "employId,beverage,quantity,date",
    employBeverageData,
    "Total juices :" + countJuices(employBeverageData)
  ];
};

getDataById = function(beveragesData, empId) {
  if (empId == undefined) return beveragesData;
  return beveragesData.filter(function(beverageData) {
    return beverageData.empId == empId;
  });
};

getDataByDate = function(beveragesData, date) {
  if (date == undefined) return beveragesData;
  return beveragesData.filter(function(beverageData) {
    return beverageData.date.includes(date);
  });
};

getDataByBeverage = function(beveragesData, beverage) {
  if (beverage == undefined) return beveragesData;
  return beveragesData.filter(function(beverageData) {
    return beverageData.beverage == beverage;
  });
};

exports.queryBeverages = queryBeverages;
exports.getDataByDate = getDataByDate;
exports.getDataByBeverage = getDataByBeverage;
exports.getDataById = getDataById;
