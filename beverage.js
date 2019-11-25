const selectOption = require("./src/selectOption").selectOption;
const loadData = require("./src/utils").loadData;
const writeData = require("./src/utils").writeData;
const filePath = "./src/beverageData";
const getDate = require("./src/utils").getDate;

const main = function(userArguments,loadData, writeData, filePath,getDate,date) {
  console.log("Anna Juice Ltd");
  console.log(selectOption(userArguments,, loadData, writeData, filePath,getDate,date));
};
main(process.argv.slice(2),loadData, writeData, filePath,getDate,'');
