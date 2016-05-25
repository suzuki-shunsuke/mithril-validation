let assert = require('chai').assert;
let mocha = require('mocha');

mocha.describe('Array', () => {
  mocha.describe('#indexOf()', () => {
    mocha.it('should return -1 when the value is not present', () => {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});
