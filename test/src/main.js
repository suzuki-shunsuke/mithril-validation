let mocha = require('mocha'),
    $ = require('jquery'),
    chai = require('chai');

$(() => {
  mocha.setup('bdd');

  describe('chrome.storage.local', () => {
    describe('chrome.storage.local.get', () => {
      describe('', () => {
        before(done => {
          chromise.storage.local.clear().then(() => {
            done();
          });
        });
        after(done => {
          chromise.storage.local.clear().then(() => {
            done();
          });
        });
        beforeEach(done => {
          chromise.storage.local.clear().then(() => {
            done();
          });
        });
        afterEach(done => {
          chromise.storage.local.clear().then(() => {
            done();
          });
        });
        it('storage.get', done => {
          chromise.storage.local.get('a').then(items => {
            chai.expect(items).to.eql({});
            done();
          }); 
        });
      });
    });
  });

  mocha.run();
});

