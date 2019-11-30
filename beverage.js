const selectOption = require("./src/selectOption").selectOption;
const fs = require("fs");

const main = function() {
  console.log("Anna Juice Ltd");
  const requiredProperties = {
    loader: fs.readFileSync,
    writer: fs.writeFileSync,
    encoding: "utf8",
    date: () => new Date(),
    isFileExists: fs.existsSync,
    filePath: "./data/beverageData.json"
  };
  const userArguments = process.argv.slice(2);
  console.log(selectOption(userArguments, requiredProperties));
};
main();
