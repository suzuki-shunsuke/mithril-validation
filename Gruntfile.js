module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    mocha: {
      test: {
        src: ['test/mock/storage/test.html']
      }
    },
    simplemocha: {
      options: {
        globals: ['chai'],
        timeout: 3000,
        ui: 'bdd',
        reporter: 'tap'
      },
      all: { src: ['test/cli/src/main.js'] }
    },
  });
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.registerTask('test', ['simplemocha']);
};
