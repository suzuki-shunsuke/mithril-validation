let m = require('mithril');
let validator = require('validator');

let component = {};

class Controller {
  constructor() {
    this.value = m.prop('');
    this.help = m.prop('');
    this.result = m.prop(false);
    this.validator = mv.validator({
      rules: [{
        type: 'required',
        message: '必須です!'
      }],
    });
  }

  validate(value) {
    let ret = this.validator(value);
    this.result(ret.result);
    if (ret.result) {
      this.help('OK');
    } else {
      this.help(ret.message);
    }
  }

  reset() {
    this.value('');
    this.help('');
    this.result(false);
  }
}

component.controller = Controller;

component.view = ctrl => {
  let a = ctrl.result() ? {'class': 'has-success'} : {'class': 'has-warning'};

  return m('.form-group', a, [
    m('label.control-label', [
      'name: ',
      m('input.form-control', {
        'oninput': m.withAttr('value', value => {
          ctrl.value(value);
          ctrl.validate(value);
        }),
        'value': ctrl.value(),
      })
    ]),
    m('span.help-block', ctrl.help())
  ]);
};

module.exports = component;
