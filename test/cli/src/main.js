let chai = require('chai');
let mocha = require('mocha');
let m = require('mithril');

let mv = require('../../../src/main');
mv.rule_set = require('../../../src/rule_set');

mocha.describe('mv.create_validator', () => {
  mocha.it('', () => {
    let NameValidator = mv.create_validator({
      rules: [{'type': 'required'}],
    });
    let name = m.prop('');
    let name_validator = new NameValidator(name);
    chai.expect(name_validator.validate()).to.be.false;
    name('f');
    chai.expect(name_validator.validate()).to.be.true;
  });
});
