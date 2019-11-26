const selectOption = require("../src/selectOption").selectOption;
const assert = require("assert");

describe("selectOption", function() {
  it("should create invalid transaction message when invalid operation given", function() {
    const getDate = function(date) {
      return date;
    };
    const loadData = function(path) {
      return {};
    };
    const writeData = function(path, data) {};
    const filePath = "./src/beverageData.json";
    const userArguments = [
      "--store",
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
    const expected = "invalid transaction";
    assert.deepStrictEqual(actual, expected);
  });

  describe("saveBeverageDetails", function() {
    it("should perform save transaction when arguments are valid for save", function() {
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

    it("should create usage when given arguments are not sufficient for save", function() {
      const filePath = "./src/beverageData.json";
      const loadData = function(filePath) {
        return {};
      };

      const writeData = function(filePath, beverageData) {};
      const getDate = function(date) {
        return date;
      };
      const date = "2019-11-25T02:59:29.363z";
      const actual = selectOption(
        ["--save", "--empId", "12343", "--qty", "1"],
        loadData,
        filePath,
        writeData,
        getDate,
        date
      );

      const expected = [
        "Usage :",
        "node beverage.js ",
        "[--empId employId]",
        "[--beverage beveragename]",
        "[qty quantity]"
      ].join("\n");

      assert.deepStrictEqual(actual, expected);
    });

    it("should  add employ beverage data to file when previous transactions of employ present for save", function() {
      const filePath = "./src/beverageData.json";
      const loadData = function(filePath) {
        return {
          "12343": [
            {
              empId: "12343",
              beverage: "orange",
              qty: "1",
              date: "2019-11-26T03:50:39.363Z"
            }
          ]
        };
      };

      const writeData = function(filePath, beverageData) {};
      const getDate = function(date) {
        return date;
      };
      const date = "2019-11-25T02:59:29.363z";
      const actual = selectOption(
        [
          "--save",
          "--empId",
          "12343",
          "--qty",
          "1",
          "--beverage",
          "pine-apple"
        ],
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

    it("should  add employ beverage data to file when previous transactions of employ not present for save", function() {
      const filePath = "./src/beverageData.json";
      const loadData = function(filePath) {
        return {};
      };

      const writeData = function(filePath, beverageData) {};
      const getDate = function(date) {
        return date;
      };
      const date = "2019-11-25T02:59:29.363z";
      const actual = selectOption(
        [
          "--save",
          "--empId",
          "12343",
          "--qty",
          "1",
          "--beverage",
          "pine-apple"
        ],
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

    it("should  create and save employ beverage data to file if file not exists for save", function() {
      const loadData = function(filePath) {
        return {};
      };

      const writeData = function(filePath, beverageData) {};
      const getDate = function(date) {
        return date;
      };
      const date = "2019-11-25T02:59:29.363z";
      const actual = selectOption(
        [
          "--save",
          "--empId",
          "12343",
          "--qty",
          "1",
          "--beverage",
          "pine-apple"
        ],
        loadData,
        "./src/beverage",
        writeData,
        getDate,
        date
      );
      const expected =
        "transaction recorded :\nempId,beverage,qty,date\n12343,pine-apple,1,2019-11-25T02:59:29.363z";
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe("queryBeverageDetails", function() {
    it("should display the beverages history of employ when arguments are valid for query", function() {
      const loadData = function(path) {
        return {
          "12343": [
            {
              empId: "12343",
              beverage: "orange",
              qty: "1",
              date: "2019-11-26T03:50:39.363Z"
            }
          ]
        };
      };

      const getDate = function(date) {
        return date;
      };

      const writeData = function(path, data) {};
      const actual = selectOption(
        ["--query", "--empId", "12343"],
        loadData,
        "./src/beverageData.json",
        writeData,
        getDate,
        "2019-11-26T03:50:39.363Z"
      );
      const expected = [
        "empId,beverage,qty,date",
        "12343,orange,1,2019-11-26T03:50:39.363Z",
        "juices: 1"
      ].join("\n");
      assert.deepStrictEqual(actual, expected);
    });

    it("should display usage when given arguments not sufficient for query", function() {
      const loadData = function(path) {
        return JSON.parse(fs.readFileSync(path));
      };

      const actual = selectOption(
        ["--query", "--empId"],
        loadData,
        "./src/beverageData.json"
      );
      const expected = "usage :\nnode beverage.js [empId id]";
      assert.deepStrictEqual(actual, expected);
    });

    it("should display the beverages history of given employ id if exists for query", function() {
      const filePath = "./src/beverageData.json";
      const loadData = function(filePath) {
        return {
          "12345": [
            {
              empId: "12345",
              beverage: "orange",
              qty: "1",
              date: "2019-11-26T03:51:44.546Z"
            }
          ]
        };
      };

      const writeData = function(filePath, beverageData) {};
      const getDate = function(date) {
        return date;
      };
      const actual = selectOption(
        ["--query", "--empId", "12345"],
        loadData,
        filePath,
        writeData,
        getDate,
        "2019-11-26T03:51:44.546Z"
      );
      const expected = [
        "empId,beverage,qty,date",
        "12345,orange,1,2019-11-26T03:51:44.546Z",
        "juices: 1"
      ].join("\n");
      assert.deepStrictEqual(actual, expected);
    });

    it("should display file not found when given file path not exists for query", function() {
      const loadData = function(path) {
        return JSON.parse(fs.readFileSync(path));
      };

      const actual = selectOption(
        ["--query", "--empId", "12346"],
        loadData,
        "./src/beverage.json"
      );
      const expected = "file not found";
      assert.deepStrictEqual(actual, expected);
    });

    it("should display usage when given arguments are invalid for query", function() {
      const filePath = "./src/beverageData.json";
      const loadData = function(filePath) {
        return {
          "12345": [
            {
              empId: "12345",
              beverage: "orange",
              qty: "1",
              date: "2019-11-26T03:51:44.546Z"
            }
          ]
        };
      };

      const writeData = function(filePath, beverageData) {};
      const getDate = function(date) {
        return date;
      };

      const actual = selectOption(
        ["--query", "--empI", "12345"],
        loadData,
        filePath,
        writeData,
        getDate,
        "2019-11-26T03:51:44.546Z"
      );
      const expected = "usage :\nnode beverage.js [empId id]";
      assert.deepStrictEqual(actual, expected);
    });
  });
});
