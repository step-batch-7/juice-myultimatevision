const assert = require("assert");
const { getDataStorePath, timeStamp } = require("../src/config");

describe("getDataStorePath", function() {
  it("should pick the path from the env variable", () => {
    const env = { Juice_TRANSACTIONS_STORE_PATH: "beverageData.json" };
    assert.strictEqual(getDataStorePath(env), "beverageData.json");
  });

  it("should give default path when not configured", () => {
    const env = {};
    assert.strictEqual(getDataStorePath(env), "./TransactionData.json");
  });
});

describe("timeStamp", function() {
  it("should give current time by default", function() {
    assert.deepStrictEqual(timeStamp({}), new Date());
  });

  it("should give stubbed time from env variable", function() {
    const stubbedDate = new Date("2019-01-01");
    const env = { NOW: stubbedDate.toJSON() };
    assert.deepStrictEqual(timeStamp(env), stubbedDate);
  });
});
