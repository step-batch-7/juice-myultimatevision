const assert = require("assert");
const queryBeverages = require("../src/queryBeverages").queryBeverages;
const fs = require("fs");
const beverageData = JSON.parse(
  fs.readFileSync("./src/beverageData.json", "utf8")
);

describe("queryBeverages", function() {
  it("should display the beverages history of given employ id if exists", function() {
    const loadData = function(path) {
      return JSON.parse(fs.readFileSync(path));
    };
    const actual = queryBeverages(
      ["--empId", "12345"],
      loadData,
      "./src/beverageData.json"
    );
    const expected = [
      "empId,beverage,qty,date",
      "12345,orange,1,2019-11-26T03:51:44.546Z",
      "juices: 1"
    ].join("\n");
    assert.deepStrictEqual(actual, expected);
  });

  it("should display the error msg when given employ beverage history not exists", function() {
    const loadData = function(path) {
      return JSON.parse(fs.readFileSync(path));
    };

    const actual = queryBeverages(
      ["--empId", "12346"],
      loadData,
      "./src/beverageData.json"
    );
    const expected = "no previous records";
    assert.deepStrictEqual(actual, expected);
  });
});
