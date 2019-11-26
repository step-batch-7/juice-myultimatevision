const selectOption = require("../src/selectOption").selectOption;
const assert = require("assert");

describe("selectOption", function() {
  it("should perform save operation if option is --save", function() {
    const getDate = function(date) {
      return date;
    };
    const loadData = function(path) {
      return {};
    };
    const writeData = function(path, data) {};
    const filePath = "./src/beverageData.json";
    const userArguments = [
      "--save",
      "--empId",
      "12343",
      "--qty",
      "1",
      "--beverage",
      "pine-apple"
    ];
    const date = "2019-11-22T09:55:53.546z";

    const actual = selectOption(
      userArguments,
      loadData,
      filePath,
      writeData,
      getDate,
      date
    );
    const expected =
      "transaction recorded :\nempId,beverage,qty,date\n12343,pine-apple,1," +
      date;
    assert.deepStrictEqual(actual, expected);
  });
});
