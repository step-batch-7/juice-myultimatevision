const isValidArguments = require("../src/queryBeverages").isValidArguments;
const assert = require("assert");

describe("isValidArguments", function() {
  it("should validate valid input when only employ id is given ", function() {
    assert.strictEqual(isValidArguments(["--empId", "12345"]), true);
  });

  it("should validate valid input when only beverage is given ", function() {
    assert.strictEqual(isValidArguments(["--beverage", "orange"]), true);
  });

  it("should validate valid input when only date is given ", function() {
    assert.strictEqual(isValidArguments(["--date", "2019-11-22"]), true);
  });

  it("should validate valid input when any Two of them are given ", function() {
    assert.strictEqual(
      isValidArguments(["--empId", "1265", "--beverage", "orange"]),
      true
    );
    assert.strictEqual(
      isValidArguments(["--date", "2019-11-22", "--beverage", "orange"]),
      true
    );
    assert.strictEqual(
      isValidArguments(["--date", "2019-11-22", "--empId", "12345"]),
      true
    );
  });
});
