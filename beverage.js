const fs = require("fs");
const { selectOption } = require("./src/selectOption");
const { timeStamp, getDataStorePath } = require("./src/config");

const main = function() {
  const requiredProperties = {
    loader: fs.readFileSync,
    writer: fs.writeFileSync,
    encoding: "utf8",
    date: () => timeStamp(process.env),
    isFileExists: fs.existsSync,
    filePath: getDataStorePath(process.env)
  };
  const userArguments = process.argv.slice(2);
  console.log(selectOption(userArguments, requiredProperties));
};
main();
