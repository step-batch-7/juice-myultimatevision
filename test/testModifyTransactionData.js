const modifyTransactionData = require("../src/saveBeverageDetails")
  .modifyTransactionData;
const assert = require("assert");

describe("modifyTransactionData", function() {
  it("should create new key for new employ transaction data when data is empty", function() {
    const actual = modifyTransactionData(
      {},
      { empId: "1111", beverage: "orange", qty: 1 },
      "1111"
    );
    const expected = {
      1111: [{ empId: "1111", beverage: "orange", qty: 1 }]
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should push to existing key when employ transactions already exists", function() {
    const actual = modifyTransactionData(
      { 1111: [{ empId: 1111, beverage: "orange", qty: 1 }] },
      { empId: 1111, beverage: "pineApple", qty: 1 },
      1111
    );
    const expected = {
      1111: [
        { empId: 1111, beverage: "orange", qty: 1 },
        { empId: 1111, beverage: "pineApple", qty: 1 }
      ]
    };
    assert.deepStrictEqual(actual, expected);
  });
});
