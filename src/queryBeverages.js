const queryBeverages = function(beverageData, employId) {
  const errorMessage = ["no previous records"];
  if (beverageData[employId] == undefined) {
    return errorMessage;
  }
  const employBeverageData = beverageData[employId];
  return employBeverageData;
};

exports.queryBeverages = queryBeverages;
