let m = require('mithril');
let validator = require('validator');

let mv = {};

let rule_set = {};

rule_set.required = value => ! validator.isNull(value);
rule_set.min_length = (value, limit) => validator.isLength(value, {min: limit});
rule_set.max_length = (value, limit) => validator.isLength(value, {max: limit});
rule_set.tel = value => validator.matches(value, /[0-9][-0-9]{4,17}/);
rule_set.email = validator.isEmail;
rule_set.whitelist = validator.isWhitelisted;

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

module.exports = mv;
