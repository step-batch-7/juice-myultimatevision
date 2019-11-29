const assert = require("assert");
const saveBeverageDetails = require("../src/saveBeverageDetails")
  .saveBeverageDetails;

describe("saveBeverages", function() {
  it("should  create and save employ beverage data to file if file not exists", function() {
    const loadData = function(filePath) {
      return [];
    };

    const writeData = function(filePath, beverageData) {};
    const getDate = function(date) {
      return date;
    };
    const date = "2019-11-25T02:59:29.363z";
    const actual = saveBeverageDetails(
      ["--empId", "12343", "--qty", "1", "--beverage", "pine-apple"],
      loadData,
      "./src/beverage",
      writeData,
      getDate,
      date
    );
    const expected = [
      "transaction recorded:\nemploy id,beverage,quantity,date",
      [
        {
          beverage: "pine-apple",
          date: "2019-11-25T02:59:29.363z",
          empId: "12343",
          qty: "1"
        }
      ]
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("should  add employ beverage data to file when previous transactions of employ not present", function() {
    const filePath = "./src/beverageData.json";
    const loadData = function(filePath) {
      return [];
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
    const expected = [
      "transaction recorded:\nemploy id,beverage,quantity,date",
      [
        {
          beverage: "pine-apple",
          date: "2019-11-25T02:59:29.363z",
          empId: "12343",
          qty: "1"
        }
      ]
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("should  add employ beverage data to file when previous transactions of employ present", function() {
    const filePath = "./src/beverageData.json";
    const loadData = function(filePath) {
      return [
        {
          empId: "12343",
          beverage: "orange",
          qty: "1",
          date: "2019-11-26T03:50:39.363Z"
        }
      ];
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
    const expected = [
      "transaction recorded:\nemploy id,beverage,quantity,date",
      [
        {
          beverage: "pine-apple",
          date: "2019-11-25T02:59:29.363z",
          empId: "12343",
          qty: "1"
        }
      ]
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("should create usage when given arguments are not sufficient", function() {
    const filePath = "./src/beverageData.json";
    const loadData = function(filePath) {
      return [];
    };

    const writeData = function(filePath, beverageData) {};
    const getDate = function(date) {
      return date;
    };
    const date = "2019-11-25T02:59:29.363z";
    const actual = saveBeverageDetails(
      ["--empId", "12343", "--qty", "1"],
      loadData,
      filePath,
      writeData,
      getDate,
      date
    );

    const expected = [
      [
        "Usage :",
        "node beverage.js ",
        "--save",
        "[--empId employId]",
        "[--beverage beveragename]",
        "[qty quantity]"
      ].join("\n"),
      []
    ];

    assert.deepStrictEqual(actual, expected);
  });

  it("should create usage when arguments are invalid", function() {
    const filePath = "./src/beverageData.json";
    const loadData = function(filePath) {
      return [];
    };

    const writeData = function(filePath, beverageData) {};
    const getDate = function(date) {
      return date;
    };
    const date = "2019-11-25T02:59:29.363z";
    const actual = saveBeverageDetails(
      ["--empId", "12343", "--qty", "1"],
      loadData,
      filePath,
      writeData,
      getDate,
      date
    );

    const expected = [
      [
        "Usage :",
        "node beverage.js ",
        "--save",
        "[--empId employId]",
        "[--beverage beveragename]",
        "[qty quantity]"
      ].join("\n"),
      []
    ];

    assert.deepStrictEqual(actual, expected);
  });
});
