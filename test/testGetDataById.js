const getDataById = require("../src/queryBeverages").getDataById;
const assert = require("assert");

describe("getDataById", function() {
  it("should give empty array when id not found", function() {
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
    assert.deepStrictEqual(getDataById(data, "1243"), []);
  });

  it("should give empty array when data is empty", function() {
    data = [];
    assert.deepStrictEqual(getDataById(data, "1243"), []);
  });

  it("should give data of id if it found", function() {
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
        empId: "12344",
        beverage: "orange",
        qty: "2",
        date: "2019-11-27T05:45:25.400Z"
      }
    ];
    assert.deepStrictEqual(getDataById(data, "12344"), expected);
  });

  it("should give all data if id is undefined ", function() {
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
    assert.deepStrictEqual(getDataById(data), expected);
  });
});
