let m = require('mithril');
let validator = require('validator');

let component = {
  controller(reset, show, disabled) {
    this.reset = reset;
    this.show = show;
    this.disabled = disabled;
  }
};

component.view = ctrl => {
  return m('.form-gruop', [
    m('button.btn.btn-primary', {
      'disabled': ctrl.disabled(),
      onclick() {
        ctrl.show();
        ctrl.reset();
      }
    }, '送信')
  ]);
};

module.exports = component;
