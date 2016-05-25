let m = require('mithril');

let mv = {};

function create_validator(args) {
  const RULE_SET = this.rule_set;

  class Validator {
    constructor(prop) {
      this.prop = prop;
      this.result = m.prop();
    }

    validate() {
      let rules = this.constructor.rules;
      let len = rules.length;
      let value = this.prop();
      for (let i=0; i<len; i++) {
        let rule = rules[i];
        if (! RULE_SET[rule.type](value, rule.params)) {
          this.result(false);
          return false;
        }
      }
      return true;
    }
  }

  Validator.rules = args.rules;

  return Validator;
}

mv.create_validator = create_validator;

/*
mv.validator = args => {
  return value => {
    let rules = args.rules || [];
    let len = rules.length;
    let rule = null;
    for (let i=0; i<len; i++) {
      rule = rules[i];
      if (! rule_set[rule.type](value, rule.params)) {
        let message = '';
        if (typeof rule.message === 'function') {
          message = rule.message(value, rule.params);
        } else {
          message = rule.message;
        }
        return {result: false, message: message, value: value};
      }
    }
    return {result: true, value: value};
  };
};
*/

module.exports = mv;
