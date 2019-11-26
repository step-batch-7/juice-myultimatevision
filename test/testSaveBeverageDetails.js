const assert = require("assert");
const filePath = "./src/beverageData.json";
const saveBeverageDetails = require("../src/saveBeverageDetails")
  .saveBeverageDetails;

describe("saveBeverages", function() {
  it("should  save employ beverage data to file", function() {
    const loadData = function(filePath) {
      return filePath;
    };

    const writeData = function(filePath, beverageData) {};
    const getDate = function(date) {
      return date;
    };
    const date = "2019-11-25T02:59:29.363z";
    const actual = saveBeverageDetails(
      ["--empId", "12343", "--qty", "1", "--beverage", "pine-apple"],
      loadData,
      filePath,
      writeData,
      getDate,
      date
    );
    const expected =
      "transaction recorded :\nempId,beverage,qty,date\n12343,pine-apple,1,2019-11-25T02:59:29.363z";
    assert.deepStrictEqual(actual, expected);
  });

  // it("should create an error message if any details missing", function() {
  //   const loadData = function(filePath) {
  //     return filePath;
  //   };

  //   const writeData = function(filePath, beverageData) {};
  //   const getDate = function(date) {
  //     return date;
  //   };
  //   const date = "2019-11-25T02:59:29.363z";
  //   const actual = saveBeverageDetails(
  //     ["--empId", "12343", "--qty", "1"],
  //     loadData,
  //     filePath,
  //     writeData,
  //     getDate,
  //     date
  //   );

  //   const expected = [
  //     "Usage :",
  //     "node beverage.js ",
  //     "[--empId employId]",
  //     "[--beverage beveragename]",
  //     "[qty quantity]"
  //   ].join("\n");

  //   assert.deepStrictEqual(actual, expected);
  // });
});
