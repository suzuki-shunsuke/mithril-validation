let components = {
  name: require('./name.component'),
  description: require('./description.component'),
  button: require('./button.component'),
};

let component = {};

class Controller {
  constructor() {
    this.name = new components.name.controller();
    this.description = new components.description.controller();
    this.button = new components.button.controller(
      this.reset.bind(this),
      this.show.bind(this),
      this.disabled.bind(this)
    );
  }

  reset() {
    this.name.reset();
    this.description.reset();
  }

  show() {
    alert(this.name.value() + ' / ' + this.description.value());
  }

  disabled() {
    return !(this.name.result() && this.description.result());
  }
}

component.controller = Controller;

component.view = ctrl => [
  components.name.view(ctrl.name),
  components.description.view(ctrl.description),
  components.button.view(ctrl.button),
];

module.exports = component;
