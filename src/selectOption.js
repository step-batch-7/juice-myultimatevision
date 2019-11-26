const saveBeverageDetails = require("./saveBeverageDetails")
  .saveBeverageDetails;
const queryBeverages = require("./queryBeverages").queryBeverages;
const fs = require("fs");

const selectOption = function(
  userArguments,
  loadData,
  filePath,
  writeData,
  getDate,
  date
) {
  const actions = { "--save": saveBeverageDetails, "--query": queryBeverages };
  const errorMessage = "invalid transaction";
  action = actions[userArguments[0]];
  if (action == undefined) {
    return errorMessage;
  }

  const beverageDetails = action(
    userArguments.slice(1),
    loadData,
    filePath,
    writeData,
    getDate,
    date
  );
  return beverageDetails;
};

exports.selectOption = selectOption;
