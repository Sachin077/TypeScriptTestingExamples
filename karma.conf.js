module.exports = function (config) {
  'use strict';

  var testFiles = __dirname + '/bundled/test/bdd.test.js',
      coverageFolder = __dirname + '/coverage/';

  config.set({
      basePath: '',
      frameworks: ['mocha', 'chai', 'sinon'],
      browsers: ['PhantomJS'],
      reporters: ['progress', 'coverage'],
      coverageReporter: {
        type : 'lcov',
        dir : coverageFolder,
      },
      plugins : [
        'karma-coverage',
        'karma-mocha',
        'karma-chai',
        'karma-sinon',
        'karma-phantomjs-launcher'
      ],
      preprocessors: {
        // in this demo we will only execute the bdd tests
        // but tdd examples are available in the /test directory
        '**/bundled/test/bdd.test.js' : 'coverage'
      },
      files : [
        testFiles
      ],
      client : {
        // we can customize the mocha options
        mocha : {
          // in this demo we will only execute the bdd tests
          // but tdd examples are available in the /test directory
          ui : "bdd"
        }
      },
      port: 9876,
      colors: true,
      autoWatch: false,
      logLevel: config.LOG_INFO
  });
};
