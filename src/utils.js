const fs = require("fs");

const loadData = function(filePath, read, isFileExists, encoding) {
  let beverageDetails = [];
  if (isFileExists(filePath))
    beverageDetails = JSON.parse(read(filePath, encoding));
  return beverageDetails;
};

const writeData = function(filePath, write, beverageDetails, encoding) {
  write(filePath, JSON.stringify(beverageDetails), encoding);
};

exports.loadData = loadData;
exports.writeData = writeData;
