let chai = require('chai');
let mocha = require('mocha');
let m = require('mithril');

let mv = require('../../../src/main');
mv.rule_set = require('../../../src/rule_set');

mocha.describe('mv.create_validator', () => {
  mocha.it('', () => {
    let message = 'Required!';
    let NameValidator = mv.create_validator({
      rules: [
        {'type': 'required', 'message': message},
        {'type': 'max_length',
         'message': (value, params) => `value: ${value}`, params: 5},
      ],
    });
    let name = m.prop('');
    let name_validator = new NameValidator(name);
    chai.expect(name_validator.validate()).to.be.false;
    chai.expect(name_validator.result()).to.be.false;
    chai.expect(name_validator.message()).eql(message);
    name('f');
    chai.expect(name_validator.validate()).to.be.true;
    chai.expect(name_validator.result()).to.be.true;
    chai.expect(name_validator.message()).eql('');
    let value = 'ffffff';
    name(value);
    chai.expect(name_validator.validate()).to.be.false;
    chai.expect(name_validator.result()).to.be.false;
    chai.expect(name_validator.message()).eql(`value: ${value}`);
  });
});
