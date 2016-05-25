let chai = require('chai');
let mocha = require('mocha');

let mv = require('../../../src/main');

mocha.describe('mv.create_validator', () => {
  mocha.it('should be callable', () => {
    chai.expect(mv.create_validator()).to.be.undefined;
  });
});
