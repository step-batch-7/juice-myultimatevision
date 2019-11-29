const getDataById = require("../src/queryBeverages").getDataByBeverage;
const assert = require("assert");

describe("getDataByBeverage", function() {
  it("should give empty array when beverage not found", function() {
    data = [
      {
        empId: "12342",
        beverage: "orange",
        qty: "2",
        date: "2019-11-27T05:45:25.400Z"
      },
      {
        empId: "12344",
        beverage: "orange",
        qty: "2",
        date: "2019-11-27T05:45:25.400Z"
      }
    ];
    assert.deepStrictEqual(getDataByBeverage(data, "pineApple"), []);
  });

  it("should give empty array when data is empty", function() {
    data = [];
    assert.deepStrictEqual(getDataByBeverage(data, "pineApple"), []);
  });

  it("should give data of Beverage if it found", function() {
    data = [
      {
        empId: "12342",
        beverage: "orange",
        qty: "2",
        date: "2019-11-27T05:45:25.400Z"
      },
      {
        empId: "12344",
        beverage: "pineApple",
        qty: "2",
        date: "2019-11-27T05:45:25.400Z"
      }
    ];
    expected = [
      {
        empId: "12342",
        beverage: "orange",
        qty: "2",
        date: "2019-11-27T05:45:25.400Z"
      }
    ];
    assert.deepStrictEqual(getDataByBeverage(data, "orange"), expected);
  });

  it("should give all data if Beverage is undefined ", function() {
    data = [
      {
        empId: "12342",
        beverage: "orange",
        qty: "2",
        date: "2019-11-27T05:45:25.400Z"
      },
      {
        empId: "12344",
        beverage: "orange",
        qty: "2",
        date: "2019-11-27T05:45:25.400Z"
      }
    ];
    expected = [
      {
        empId: "12342",
        beverage: "orange",
        qty: "2",
        date: "2019-11-27T05:45:25.400Z"
      },
      {
        empId: "12344",
        beverage: "orange",
        qty: "2",
        date: "2019-11-27T05:45:25.400Z"
      }
    ];
    assert.deepStrictEqual(getDataByBeverage(data), expected);
  });
});
