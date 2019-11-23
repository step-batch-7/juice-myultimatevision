const assert = require("assert");
const queryBeverages = require("../src/queryBeverages").queryBeverages;
const fs = require("fs");
const beverageData = JSON.parse(
  fs.readFileSync("./src/beverageData.json", "utf8")
);

describe("queryBeverages", function() {
  it("should display the beverages history of given employ id if exists", function() {
    const actual = queryBeverages(beverageData, "12345");
    const expected = [
      {
        beverage: "orange",
        qty: 1,
        date: "2019-11-22T09:55:53.437Z"
      }
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("should display the error msg when given employ beverage history not exists", function() {
    const actual = queryBeverages(beverageData, "12233");
    const expected = ["no previous records"];
    assert.deepStrictEqual(actual, expected);
  });
});
