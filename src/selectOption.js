const saveBeverageDetails = require("./saveBeverageDetails")
  .saveBeverageDetails;
const queryBeverages = require("./queryBeverages").queryBeverages;

const selectOption = function(userArguments, requiredProperties) {
  const actions = { "--save": saveBeverageDetails, "--query": queryBeverages };
  const errorMessage = "invalid transaction";
  const action = actions[userArguments[0]];
  if (action == undefined) {
    return errorMessage;
  }

  const beverageDetails = action(userArguments.slice(1), requiredProperties);

  return formatData(beverageDetails);
};

const formatData = function(beverageDetails) {
  //beverageDetails.reduce(function(beverageDetail) {})
  const formatedBeverageDetails = [];
  formatedBeverageDetails.push(beverageDetails[0]);
  if (beverageDetails[1].length != 0)
    formatedBeverageDetails.push(
      beverageDetails[1]
        .map(function(beverageDetail) {
          return [
            beverageDetail.empId,
            beverageDetail.beverage,
            beverageDetail.qty,
            beverageDetail.date
          ];
        })
        .join("\n")
    );
  // for (let index = 0; index < beverageDetails[1].length; index++) {
  //   formatedBeverageDetails.push(
  //     Object.values(beverageDetails[1][index]).join(",")
  //   );
  // }
  formatedBeverageDetails.push(beverageDetails.slice(2));
  return formatedBeverageDetails.join("\n");
};

exports.selectOption = selectOption;
