let m = require('mithril');

let mv = {};

function create_validator() {
  let len = arguments.length;
  if (len === 1) {
    let args = arguments[0];
    if (args.rules) {
      if (args.rules.rules) {
      
      } else {
      
      }
    } else {
    
    }
  } else {
  
  }
}


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
