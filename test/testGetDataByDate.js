const getDataById = require("../src/queryBeverages").getDataByDate;
const assert = require("assert");

describe("getDataByDate", function() {
  it("should give empty array when date not found", function() {
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
    assert.deepStrictEqual(getDataByDate(data, "2010-11-24"), []);
  });

  it("should give empty array when data is empty", function() {
    data = [];
    assert.deepStrictEqual(getDataByDate(data, "2019-11-27"), []);
  });

  it("should give data of date if it found", function() {
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
        date: "2019-11-28T05:45:25.400Z"
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
    assert.deepStrictEqual(getDataByDate(data, "2019-11-27"), expected);
  });

  it("should give all data if date is undefined ", function() {
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
    assert.deepStrictEqual(getDataByDate(data), expected);
  });
});
