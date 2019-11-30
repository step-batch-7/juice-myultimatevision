const assert = require("assert");
const saveBeverageDetails = require("../src/saveBeverageDetails")
  .saveBeverageDetails;

describe("saveBeverages", function() {
  it("should  create and save employ beverage data to file if file not exists", function() {
    const userArguments = [
      "--empId",
      "12343",
      "--qty",
      "1",
      "--beverage",
      "pine-apple"
    ];
    const requiredProperties = {
      loader: (filePath, encodingType) => "[]",
      writer: (filePath, transactionsRecord, encodingType) => undefined,
      date: () => new Date("2019-11-25T02:59:29.363Z"),
      filePath: "somePath",
      encoding: "utf-8",
      isFileExists: filePath => true
    };

    const actual = saveBeverageDetails(userArguments, requiredProperties);
    const expected = [
      "transaction recorded:\nemploy id,beverage,quantity,date",
      [
        {
          beverage: "pine-apple",
          date: "2019-11-25T02:59:29.363Z",
          empId: "12343",
          qty: "1"
        }
      ]
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("should  add employ beverage data to file when previous transactions of employ not present", function() {
    const userArguments = [
      "--empId",
      "12343",
      "--qty",
      "1",
      "--beverage",
      "pine-apple"
    ];
    const requiredProperties = {
      loader: (filePath, encodingType) => "[]",
      writer: (filePath, transactionsRecord, encodingType) => true,
      date: () => new Date("2019-11-25T02:59:29.363Z"),
      filePath: "somePath",
      encoding: "utf-8",
      isFileExists: filePath => true
    };

    const actual = saveBeverageDetails(userArguments, requiredProperties);
    const expected = [
      "transaction recorded:\nemploy id,beverage,quantity,date",
      [
        {
          beverage: "pine-apple",
          date: "2019-11-25T02:59:29.363Z",
          empId: "12343",
          qty: "1"
        }
      ]
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("should  add employ beverage data to file when previous transactions of employ present", function() {
    const userArguments = [
      "--empId",
      "12343",
      "--qty",
      "1",
      "--beverage",
      "pine-apple"
    ];
    const requiredProperties = {
      loader: (filePath, encoding) =>
        '[{ "empId": 25275, "beverage": "orange", "qty": 1, "date":"2019-11-27T05:56:20.097Z" }]',
      writer: (filePath, transactionsRecord, encodingType) => true,
      date: () => new Date("2019-11-25T02:59:29.363Z"),
      filePath: "somePath",
      encoding: "utf-8",
      isFileExists: filePath => true
    };

    const actual = saveBeverageDetails(userArguments, requiredProperties);
    const expected = [
      "transaction recorded:\nemploy id,beverage,quantity,date",
      [
        {
          beverage: "pine-apple",
          date: "2019-11-25T02:59:29.363Z",
          empId: "12343",
          qty: "1"
        }
      ]
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("should create usage when given arguments are not sufficient", function() {
    const userArguments = ["--empId", "12343", "--qty", "1"];
    const requiredProperties = {
      loader: (filePath, encoding) =>
        '[{ "empId": 25275, "beverage": "orange", "qty": 1, "date":"2019-11-27T05:56:20.097Z" }]',
      writer: (filePath, transactionsRecord, encodingType) => true,
      date: () => new Date("2019-11-25T02:59:29.363z"),
      filePath: "somePath",
      encoding: "utf-8",
      isFileExists: filePath => true
    };

    const actual = saveBeverageDetails(userArguments, requiredProperties);

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
    const userArguments = ["--empId", "12343", "--qty", "1", "--bev", "apple"];
    const requiredProperties = {
      loader: (filePath, encoding) =>
        '[{ "empId": 25275, "beverage": "orange", "qty": 1, "date":"2019-11-27T05:56:20.097Z" }]',
      writer: (filePath, transactionsRecord, encodingType) => true,
      date: () => new Date("2019-11-25T02:59:29.363Z"),
      filePath: "somePath",
      encoding: "utf-8",
      isFileExists: filePath => true
    };

    const actual = saveBeverageDetails(userArguments, requiredProperties);

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
