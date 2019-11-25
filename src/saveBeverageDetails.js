const fs = require("fs");
const previousBeverageInfo = fs.readFileSync("./src/beverageData.json");

const saveBeverageDetails = function(
  beverageDetails,
  loadData,
  writeData,
  filePath,
  getDate,
  date
) {
  const employId = beverageDetails[beverageDetails.indexOf("--empId") + 1];
  const beverage = beverageDetails[beverageDetails.indexOf("--beverage") + 1];
  const qty = beverageDetails[beverageDetails.indexOf("--qty") + 1];
  const dateNow = getDate(date);
  const newBeverageDetails = {
    empId: employId,
    beverage: beverage,
    qty: qty,
    date: dateNow
  };
  const message = "transaction recorded :";
  let beverageTransactionData = loadData(filePath);

  beverageTransactionData = modifyTransactionData(
    beverageTransactionData,
    newBeverageDetails,
    employId
  );
  writeData(filePath, beverageTransactionData);
  return [message, JSON.stringify(newBeverageDetails)];
};

const modifyTransactionData = function(
  beverageTransactionData,
  newBeverageDetails,
  employId
) {
  if (beverageTransactionData[employId] == undefined) {
    beverageTransactionData[employId] = [newBeverageDetails];
  } else {
    beverageTransactionData[employId].push(newBeverageDetails);
  }
  return beverageTransactionData;
};

exports.saveBeverageDetails = saveBeverageDetails;
exports.modifyTransactionData = modifyTransactionData;
