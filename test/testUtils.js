const assert = require("assert");

describe("utils", function() {
  describe("loadData", function() {
    it("should load data from required file", function() {
      const isFileExists = function(filePath) {
        assert.strictEqual(filePath, "somePath");
        return true;
      };

      const loadData = function(filePath, read, isFileExists, encoding) {
        assert.strictEqual(filePath, "somePath");
        assert.strictEqual(read, "read");
        assert.ok(isFileExists(filePath));
        assert.strictEqual(encoding, "utf8");
        return [
          {
            empId: "12342",
            beverage: "orange",
            qty: "2",
            date: "2019-11-27T05:45:25.400Z"
          }
        ];
      };
      actual = loadData("somePath", "read", isFileExists, "utf8");
      expected = [
        {
          empId: "12342",
          beverage: "orange",
          qty: "2",
          date: "2019-11-27T05:45:25.400Z"
        }
      ];
      assert.deepStrictEqual(actual, expected);
    });

    it("should load empty if file not exists", function() {
      const isFileExists = function(filePath) {
        assert.strictEqual(filePath, "somePath");
        return false;
      };

      const loadData = function(filePath, read, isFileExists, encoding) {
        assert.strictEqual(filePath, "somePath");
        assert.strictEqual(read, "read");
        assert.ok(!isFileExists(filePath));
        assert.strictEqual(encoding, "utf8");
        return [];
      };
      actual = loadData("somePath", "read", isFileExists, "utf8");
      expected = [];
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe("writeData", function() {
    it("should write data to required file", function() {
      const writeData = function(filePath, encoding) {
        assert.strictEqual(filePath, "somePath");
        assert.strictEqual(encoding, "utf8");
      };
      actual = writeData("somePath", "utf8");
      expected = undefined;
      assert.strictEqual(actual, expected);
    });
  });
});
