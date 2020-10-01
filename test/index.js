const NinjaName = require("../server/lib");
const assert = require('assert');

describe('NinjaName', function () {
  describe('#toName()', function () {
    it('should return a ninja name', function () {
      const res = new NinjaName(["node"]).toName()
      assert.strictEqual(typeof res, "string");
      assert.strictEqual(res.length > 10, true)
    });
    it('easter eggs', function () {
      const res = new NinjaName(["npm"]).toName()
      assert.strictEqual(typeof res, "string");
      assert.strictEqual(res, "Nuclear Pizza Maker")
    });
  });
  describe('#toObjectName()', function () {
    it('should return a ninja name object', function () {
      const res = new NinjaName(["node"]).toObjectName()
      assert.strictEqual(typeof res, "object");
      assert.strictEqual(res.name.length > 10, true)
    });
  });
});