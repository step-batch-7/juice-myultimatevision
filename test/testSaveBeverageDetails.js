const assert = require("assert");
const filePath = "./src/beverageData";
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
      writeData,
      filePath,
      getDate,
      date
    );
    const expected = [
      "transaction recorded :",
      JSON.stringify({
        empId: "12343",
        beverage: "pine-apple",
        qty: "1",
        date: date
      })
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("should create an error message if any details missing", function() {});
});
