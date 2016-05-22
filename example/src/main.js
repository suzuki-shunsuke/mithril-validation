let $ = require('jquery');
let m = require('mithril');

$(() => {
  m.mount(document.getElementById('container'), require('./form.component.js'));
});
