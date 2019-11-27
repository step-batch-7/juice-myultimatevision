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
  const action = actions[userArguments[0]];
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
  return formatData(beverageDetails);
};

const formatData = function(beverageDetails) {
  const formatedBeverageDetails = [];
  formatedBeverageDetails.push(beverageDetails[0]);
  for (let index = 0; index < beverageDetails[1].length; index++) {
    formatedBeverageDetails.push(
      Object.values(beverageDetails[1][index]).join(",")
    );
  }
  formatedBeverageDetails.push(beverageDetails.slice(2));
  return formatedBeverageDetails.join("\n");
};

exports.selectOption = selectOption;
