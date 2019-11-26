const queryBeverages = function(userArguments, loadData, filePath) {
  const employId = userArguments[userArguments.indexOf("--empId") + 1];
  const beverageData = loadData(filePath);
  const errorMessage = "no previous records";
  console.log(employId);

  if (beverageData[employId] == undefined) {
    return errorMessage;
  }
  const employBeverageData = beverageData[employId];
  return formatData(employBeverageData, employId);
};

const formatData = function(employBeverageData, employId) {
  const formatedBeverageDetails = [];
  const headers = "empId,beverage,qty,date";
  let noOfJuices = 0;
  formatedBeverageDetails.push(headers);

  for (let index = 0; index < employBeverageData.length; index++) {
    let empBeverageData = Object.values(employBeverageData[index]).join(",");
    noOfJuices = noOfJuices + +employBeverageData[index]["qty"];
    formatedBeverageDetails.push(empBeverageData);
  }
  formatedBeverageDetails.push("juices: " + noOfJuices);
  return formatedBeverageDetails.join("\n");
};

exports.queryBeverages = queryBeverages;
