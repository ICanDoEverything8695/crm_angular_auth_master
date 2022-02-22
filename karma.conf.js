// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-junit-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    files: [
      {pattern: './node_modules/@angular/material/prebuilt-themes/indigo-pink.css', included: true, watched: true}
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'kjhtml', 'junit'],
    junitReporter: {
      outputFile: 'karma-test-results.xml'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true,
    browserDisconnectTolerance: 2,
    browserNoActivityTimeout: 50000,
    browsers: ['Chromium_no_sandbox'],
    customLaunchers: {
      Chromium_no_sandbox: {
        base: 'ChromiumHeadless',
        flags: ['--no-sandbox']
      }
    }
  });
};
