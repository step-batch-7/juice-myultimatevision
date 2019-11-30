const assert = require("assert");
const queryBeverages = require("../src/queryBeverages").queryBeverages;

describe("queryBeverages", function() {
  it("should display the beverages history of given employ id if exists", function() {
    const date = new Date("2019-11-25T02:59:29.363Z").toJSON();
    const requiredProperties = {
      loader: (filePath, encoding) => {
        return '[{"empId": "12345","beverage": "orange","qty": "1","date":"2019-11-25T02:59:29.363Z"}]';
      },
      writer: (filePath, transactionsRecord, encodingType) => undefined,
      date: date,
      filePath: "somePath",
      encoding: "utf8",
      isFileExists: filePath => true
    };
    const actual = queryBeverages(["--empId", "12345"], requiredProperties);
    const expected = [
      "employId,beverage,quantity,date",
      [
        {
          empId: "12345",
          beverage: "orange",
          qty: "1",
          date: "2019-11-25T02:59:29.363Z"
        }
      ],
      "Total juices :1"
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("should display the error msg when given employ beverage history not exists", function() {
    const date = new Date("2019-11-25T02:59:29.363Z").toJSON();
    const requiredProperties = {
      loader: (filePath, encoding) => {
        return '[{"empId": "12345","beverage": "orange","qty": "1","date":"2019-11-25T02:59:29.363Z"}]';
      },
      writer: (filePath, transactionsRecord, encodingType) => undefined,
      date: date,
      filePath: "somePath",
      encoding: "utf-8",
      isFileExists: filePath => true
    };
    const actual = queryBeverages(["--empId", "12343"], requiredProperties);
    const expected = ["no previous records", []];
    assert.deepStrictEqual(actual, expected);
  });

  it("should display file not found when given file path not exists", function() {
    const date = new Date("2019-11-25T02:59:29.363Z").toJSON();
    const requiredProperties = {
      loader: (filePath, encoding) => {
        return '[{"empId": "12345","beverage": "orange","qty": "1","date": "2019-11-25T02:59:29.363Z"]';
      },
      writer: (filePath, transactionsRecord, encodingType) => undefined,
      date: date,
      filePath: "somePath",
      encoding: "utf-8",
      isFileExists: filePath => false
    };
    const actual = queryBeverages(["--empId", "12345"], requiredProperties);
    const expected = ["no previous records", []];
    assert.deepStrictEqual(actual, expected);
  });

  it("should display usage when given arguments are invalid", function() {
    const date = new Date("2019-11-30T12:34:43.234Z").toJSON();
    const requiredProperties = {
      loader: (filePath, encoding) => {
        return '[{empId: "12345",beverage: "orange",qty: "1",date:"2019-11-30T12:34:43.234Z"]';
      },
      writer: (filePath, transactionsRecord, encodingType) => undefined,
      date: date,
      filePath: "somePath",
      encoding: "utf8",
      isFileExists: filePath => true
    };
    const expected = [
      "usage :\nnode beverage.js --query [--empId id] [--date date]",
      []
    ];
    const actual = queryBeverages(["--empI", "12345"], requiredProperties);
    assert.deepStrictEqual(actual, expected);
  });

  it("should display usage when given arguments not sufficient", function() {
    const date = new Date("2019-11-25T02:59:29.363Z").toJSON();
    const requiredProperties = {
      loader: () =>
        '[{ "empId": 25275, "beverage": "orange", "qty": 1, "date":"2019-11-25T02:59:29.363Z"}]',
      writer: (filePath, transactionsRecord, encodingType) => undefined,
      date: date,
      filePath: "somePath",
      encoding: "utf-8",
      isFileExists: () => true
    };
    const actual = queryBeverages(["--empId"], requiredProperties);
    const expected = [
      "usage :\nnode beverage.js --query [--empId id] [--date date]",
      []
    ];
    assert.deepStrictEqual(actual, expected);
  });
});
