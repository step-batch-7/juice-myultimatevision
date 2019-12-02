const { loadData } = require("./utils");

const countJuices = function(employBeverageData) {
  const noOfJuices = employBeverageData.reduce(function(noOfJuices, record) {
    return noOfJuices + +record.qty;
  }, 0);
  const suffix = noOfJuices == 1 ? " Juice" : " Juices";
  return "Total :" + noOfJuices + suffix;
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

const getDataById = function(beveragesData, empId) {
  const filteredTransactionOnId =
    empId &&
    beveragesData.filter(function(beverageData) {
      return beverageData.empId == empId;
    });

  return filteredTransactionOnId || beveragesData;
};

const getDataByDate = function(beveragesData, date) {
  const filteredTransactionOnDate =
    date &&
    beveragesData.filter(function(beverageData) {
      return beverageData.date.includes(date);
    });
  return filteredTransactionOnDate || beveragesData;
};

const getDataByBeverage = function(beveragesData, beverage) {
  const filteredTransactionOnBeverage =
    beverage &&
    beveragesData.filter(function(beverageData) {
      return beverageData.beverage == beverage;
    });
  return filteredTransactionOnBeverage || beveragesData;
};

const queryBeverages = function(userArguments, requiredProperties) {
  const { loader, encoding, date, isFileExists, filePath } = requiredProperties;
  if (!isValidArguments(userArguments))
    return ["usage :\nnode beverage.js --query [--empId id] [--date date]", []];
  const pairedArguments = getPairedArguments(userArguments);
  const employId = pairedArguments["--empId"];

  const userDate = pairedArguments["--date"];
  const beverage = pairedArguments["--beverage"];
  const TransactionData = loadData(filePath, loader, isFileExists, encoding);
  const filteredTxnOnId = getDataById(TransactionData, employId);
  const filteredTxnOnBeverage = getDataByBeverage(filteredTxnOnId, beverage);
  const filteredBeverageData = getDataByDate(filteredTxnOnBeverage, userDate);

  return [
    "Employee ID, Beverage, Quantity, Date",
    filteredBeverageData,
    countJuices(filteredBeverageData)
  ];
};

module.exports = {
  queryBeverages,
  getDataByDate,
  getDataByBeverage,
  getDataById,
  isValidArguments
};
