const fs = require("fs");

const loadData = function(filePath) {
  beverageDetails = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return beverageDetails;
};

const writeData = function(filePath, beverageDetails) {
  fs.writeFileSync(filePath, beverageDetails, "utf8");
};

const getDate = function(date) {
  return new Date();
};

exports.loadData = loadData;
exports.writeData = writeData;
exports.getDate = getDate;
