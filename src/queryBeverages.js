const fs = require("fs");
const loadData = require("./utils").loadData;

const countJuices = function(employBeverageData) {
  return employBeverageData.reduce(function(noOfJuices, record) {
    return noOfJuices + +record.qty;
  }, 0);
};

const isValidArguments = function(userArguments) {
  let flag = true;
  const argumentsNeeded = `--empId,--beverage,--date`.split(",");
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

const queryBeverages = function(userArguments, requiredProperties) {
  const { loader, encoding, date, isFileExists, filePath } = requiredProperties;
  if (!isValidArguments(userArguments))
    return ["usage :\nnode beverage.js --query [--empId id] [--date date]", []];
  const pairedArguments = getPairedArguments(userArguments);
  const employId = pairedArguments["--empId"];

  const userDate = pairedArguments["--date"];
  const beverage = pairedArguments["--beverage"];
  const beverageData = loadData(filePath, loader, isFileExists, encoding);

  employBeverageData = getDataByDate(
    getDataByBeverage(getDataById(beverageData, employId), beverage),
    userDate
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
  const filteredTransactionOnId =
    empId &&
    beveragesData.filter(function(beverageData) {
      return beverageData.empId == empId;
    });

  return filteredTransactionOnId || beveragesData;
};

getDataByDate = function(beveragesData, date) {
  const filteredTransactionOnDate =
    date &&
    beveragesData.filter(function(beverageData) {
      return beverageData.date.includes(date);
    });
  return filteredTransactionOnDate || beveragesData;
};

getDataByBeverage = function(beveragesData, beverage) {
  const filteredTransactionOnBeverage =
    beverage &&
    beveragesData.filter(function(beverageData) {
      return beverageData.beverage == beverage;
    });
  return filteredTransactionOnBeverage || beveragesData;
};

exports.queryBeverages = queryBeverages;
exports.getDataByDate = getDataByDate;
exports.getDataByBeverage = getDataByBeverage;
exports.getDataById = getDataById;
exports.isValidArguments = isValidArguments;
