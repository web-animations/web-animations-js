module.exports = {
  frameworks: ['mocha', 'chai'],
  plugins: [
    'karma-mocha',
    'karma-chai',
    'karma-chrome-launcher',
    'karma-firefox-launcher'
  ],
  browsers: ['Chrome', 'Firefox'],
  // browsers: ['Safari', 'Chrome', 'ChromeCanary', 'Firefox', 'IE'],
  basePath: '.',
  files: [
    // Populated in `grunt test` task.
  ],
  singleRun: true,
  port: 9876,
  reporters: ['progress'],
  colors: true,
  autoWatch: false,
};
