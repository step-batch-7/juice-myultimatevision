const assert = require("assert");
const queryBeverages = require("../src/queryBeverages").queryBeverages;

describe("queryBeverages", function() {
  it("should display the beverages history of given employ id if exists", function() {
    const loadData = function(path) {
      return [
        {
          empId: "12345",
          beverage: "orange",
          qty: "1",
          date: "2019-11-26T03:51:44.546Z"
        }
      ];
    };
    const actual = queryBeverages(
      ["--empId", "12345"],
      loadData,
      "./data/beverageData.json"
    );
    const expected = [
      "employId,beverage,quantity,date",
      [
        {
          empId: "12345",
          beverage: "orange",
          qty: "1",
          date: "2019-11-26T03:51:44.546Z"
        }
      ],
      "Total juices :1"
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("should display the error msg when given employ beverage history not exists", function() {
    const loadData = function(path) {
      return [];
    };

    const actual = queryBeverages(
      ["--empId", "12346"],
      loadData,
      "./data/beverageData.json"
    );
    const expected = ["no previous records", []];
    assert.deepStrictEqual(actual, expected);
  });

  it("should display file not found when given file path not exists", function() {
    const loadData = function(path) {
      return [];
    };

    const actual = queryBeverages(
      ["--empId", "12346"],
      loadData,
      "./data/beverage.json"
    );
    const expected = ["file not found", []];
    assert.deepStrictEqual(actual, expected);
  });

  it("should display usage when given arguments are invalid", function() {
    const loadData = function(path) {
      return [];
    };

    const actual = queryBeverages(
      ["--empI", "12345"],
      loadData,
      "./data/beverageData.json"
    );
    const expected = [
      "usage :\nnode beverage.js --query [--empId id] [--date date]",
      []
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("should display usage when given arguments not sufficient", function() {
    const loadData = function(path) {
      return [];
    };

    const actual = queryBeverages(
      ["--empId"],
      loadData,
      "./data/beverageData.json"
    );
    const expected = [
      "usage :\nnode beverage.js --query [--empId id] [--date date]",
      []
    ];
    assert.deepStrictEqual(actual, expected);
  });
});
