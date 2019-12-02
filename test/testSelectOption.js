const selectOption = require("../src/selectOption").selectOption;
const assert = require("assert");
const fs = require("fs");

describe("selectOption", function() {
  it("should create invalid transaction message when invalid operation given", function() {
    const userArguments = [
      "--store",
      "--empId",
      "12343",
      "--qty",
      "1",
      "--beverage",
      "pine-apple"
    ];
    const date = new Date("2019-11-25T02:59:29.363Z").toJSON();
    const requiredProperties = {
      loader: (filePath, encodingType) => "[]",
      writer: (filePath, transactionsRecord, encodingType) => true,
      date: () => new Date("2019-11-25T02:59:29.363Z").toJSON(),
      filePath: "somePath",
      encoding: "utf-8",
      isFileExists: filePath => true
    };

    const actual = selectOption(userArguments, requiredProperties);
    const expected = [
      "Usage :,node beverage.js ,--save,[--empId employId],[--beverage beveragename],[qty quantity]",
      "--query,[--empId employId],[--beverage beveragename][date yyyy-mm-dd]"
    ].join("\n");
    assert.deepStrictEqual(actual, expected);
  });

  describe("saveBeverages", function() {
    it("should  create and save employ beverage data to file if file not exists", function() {
      const userArguments = [
        "--save",
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

      const actual = selectOption(userArguments, requiredProperties);
      const expected =
        "Transaction Recorded:\nEmployee ID, Beverage, Quantity, Date\n12343,pine-apple,1,2019-11-25T02:59:29.363Z\n";
      assert.deepStrictEqual(actual, expected);
    });

    it("should  add employ beverage data to file when previous transactions of employ not present", function() {
      const userArguments = [
        "--save",
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

      const actual = selectOption(userArguments, requiredProperties);
      const expected =
        "Transaction Recorded:\nEmployee ID, Beverage, Quantity, Date\n12343,pine-apple,1,2019-11-25T02:59:29.363Z\n";
      assert.deepStrictEqual(actual, expected);
    });

    it("should  add employ beverage data to file when previous transactions of employ present", function() {
      const userArguments = [
        "--save",
        "--empId",
        "12343",
        "--qty",
        "1",
        "--beverage",
        "pine-apple"
      ];
      const requiredProperties = {
        loader: (filePath, encoding) =>
          '[{ "empId": 25275, "beverage": "orange", "qty": 1, "date":"2019-11-25T02:59:29.363Z" }]',
        writer: (filePath, transactionsRecord, encodingType) => true,
        date: () => new Date("2019-11-25T02:59:29.363Z"),
        filePath: "somePath",
        encoding: "utf-8",
        isFileExists: filePath => true
      };

      const actual = selectOption(userArguments, requiredProperties);
      const expected =
        "Transaction Recorded:\nEmployee ID, Beverage, Quantity, Date\n12343,pine-apple,1,2019-11-25T02:59:29.363Z\n";
      assert.deepStrictEqual(actual, expected);
    });

    it("should create usage when given arguments are not sufficient", function() {
      const userArguments = ["--save", "--empId", "12343", "--qty", "1"];
      const requiredProperties = {
        loader: (filePath, encoding) =>
          '[{ "empId": 25275, "beverage": "orange", "qty": 1, "date":"2019-11-25T02:59:29.363Z" }]',
        writer: (filePath, transactionsRecord, encodingType) => true,
        date: () => new Date("2019-11-25T02:59:29.363Z"),
        filePath: "somePath",
        encoding: "utf-8",
        isFileExists: filePath => true
      };

      const actual = selectOption(userArguments, requiredProperties);

      const expected =
        "Usage :\nnode beverage.js \n--save\n[--empId employId]\n[--beverage beveragename]\n[qty quantity]\n";

      assert.deepStrictEqual(actual, expected);
    });

    it("should create usage when arguments are invalid", function() {
      const userArguments = [
        "--save",
        "--empId",
        "12343",
        "--qty",
        "1",
        "--bev",
        "apple"
      ];
      const requiredProperties = {
        loader: (filePath, encoding) =>
          '[{ "empId": 25275, "beverage": "orange", "qty": 1, "date":"019-11-25T02:59:29.363Z" }]',
        writer: (filePath, transactionsRecord, encodingType) => true,
        date: () => new Date("2019-11-25T02:59:29.363Z"),
        filePath: "somePath",
        encoding: "utf-8",
        isFileExists: () => true
      };

      const actual = selectOption(userArguments, requiredProperties);

      const expected =
        "Usage :\nnode beverage.js \n--save\n[--empId employId]\n[--beverage beveragename]\n[qty quantity]\n";

      assert.deepStrictEqual(actual, expected);
    });
  });

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
      const actual = selectOption(
        ["--query", "--empId", "12345"],
        requiredProperties
      );
      const expected =
        "Employee ID, Beverage, Quantity, Date\n12345,orange,1,2019-11-25T02:59:29.363Z\nTotal :1 Juice";
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
      const actual = selectOption(
        ["--query", "--empId", "12343"],
        requiredProperties
      );
      const expected = "Employee ID, Beverage, Quantity, Date\nTotal :0 Juices";
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
      const actual = selectOption(
        ["--query", "--empId", "12345"],
        requiredProperties
      );
      const expected = "Employee ID, Beverage, Quantity, Date\nTotal :0 Juices";
      assert.deepStrictEqual(actual, expected);
    });

    it("should display usage when given arguments are invalid", function() {
      const date = new Date("2019-11-30T12:34:43.234Z").toJSON();
      const requiredProperties = {
        loader: (filePath, encoding) => {
          return `[{empId: "12345",beverage: "orange",qty: "1",date: ${date}]`;
        },
        writer: (filePath, transactionsRecord, encodingType) => undefined,
        date: date,
        filePath: "somePath",
        encoding: "utf8",
        isFileExists: filePath => true
      };
      const expected =
        "usage :\nnode beverage.js --query [--empId id] [--date date]\n";
      const actual = selectOption(
        ["--query", "--empI", "12345"],
        requiredProperties
      );
      assert.deepStrictEqual(actual, expected);
    });

    it("should display usage when given arguments not sufficient", function() {
      const date = new Date("2019-11-25T02:59:29.363Z").toJSON();
      const requiredProperties = {
        loader: () =>
          `[{ "empId": 25275, "beverage": "orange", "qty": 1, "date":${date}}]`,
        writer: (filePath, transactionsRecord, encodingType) => undefined,
        date: date,
        filePath: "somePath",
        encoding: "utf-8",
        isFileExists: () => true
      };
      const actual = selectOption(["--query", "--empId"], requiredProperties);
      const expected =
        "usage :\nnode beverage.js --query [--empId id] [--date date]\n";
      assert.deepStrictEqual(actual, expected);
    });
  });
});
