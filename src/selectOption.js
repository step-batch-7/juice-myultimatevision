const { saveBeverageDetails } = require("./saveBeverageDetails");
const { queryBeverages } = require("./queryBeverages");

const createUsage = function() {
  const usage = [
    "Usage :,node beverage.js ,--save,[--empId employId],[--beverage beveragename],[qty quantity]",
    "--query,[--empId employId],[--beverage beveragename][date yyyy-mm-dd]"
  ].join("\n");
  return usage;
};

const formatData = function(beverageDetails) {
  const formatedBeverageDetails = [];
  formatedBeverageDetails.push(beverageDetails[0]);
  if (beverageDetails[1].length != 0)
    formatedBeverageDetails.push(
      beverageDetails[1]
        .map(function(beverageDetail) {
          const { empId, beverage, qty, date } = beverageDetail;
          return [empId, beverage, qty, date];
        })
        .join("\n")
    );
  formatedBeverageDetails.push(beverageDetails.slice(2));
  return formatedBeverageDetails.join("\n");
};

const selectOption = function(userArguments, requiredProperties) {
  const actions = { "--save": saveBeverageDetails, "--query": queryBeverages };
  const errorMessage = createUsage();
  const action = actions[userArguments[0]];
  if (action == undefined) {
    return errorMessage;
  }

  const beverageDetails = action(userArguments.slice(1), requiredProperties);

  return formatData(beverageDetails);
};

module.exports = { selectOption };
