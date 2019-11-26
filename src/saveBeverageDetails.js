//const fs = require("fs");
//const previousBeverageInfo = fs.readFileSync("./src/beverageData.json");
const createNewTransaction = function(beverageDetails, getDate, date) {
  const newBeverageDetails = {
    empId: beverageDetails[beverageDetails.indexOf("--empId") + 1],
    beverage: beverageDetails[beverageDetails.indexOf("--beverage") + 1],
    qty: beverageDetails[beverageDetails.indexOf("--qty") + 1],
    date: getDate(date)
  };
  return newBeverageDetails;
};

const saveBeverageDetails = function(
  beverageDetails,
  loadData,
  filePath,
  writeData,
  getDate,
  date
) {
  const newBeverageDetails = createNewTransaction(
    beverageDetails,
    getDate,
    date
  );

  // if(isnotIncludesDetails(beverageDetails)) {
  //   return createUsage;
  // }
  let beverageTransactionData = loadData(filePath);
  beverageTransactionData = modifyTransactionData(
    beverageTransactionData,
    newBeverageDetails
  );
  writeData(filePath, JSON.stringify(beverageTransactionData));
  return formatData(newBeverageDetails);
};

const modifyTransactionData = function(
  beverageTransactionData,
  newBeverageDetails
) {
  employId = newBeverageDetails["empId"];
  if (beverageTransactionData[employId] == undefined) {
    beverageTransactionData[employId] = [newBeverageDetails];
  } else {
    beverageTransactionData[employId].push(newBeverageDetails);
  }
  return beverageTransactionData;
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
