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
  const errorMessage = ["file not found"];
  action = actions[userArguments[0]];

  if (
    action == undefined ||
    (!isFileExists(filePath) && userArguments[0] != "--save")
  ) {
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

const isFileExists = function(filePath) {
  return fs.existsSync(filePath);
};

exports.selectOption = selectOption;
