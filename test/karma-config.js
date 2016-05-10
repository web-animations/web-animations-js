module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-firefox-launcher'
    ],
    browsers: ['Firefox'],
    // browsers: ['Safari', 'Chrome', 'ChromeCanary', 'Firefox', 'IE'],
    basePath: '..',
    files: [
      // Populated in `grunt test` and `grunt debug` tasks.
    ],
    port: 9876,
    reporters: ['dots'],
    colors: true,
    autoWatch: false,
  });
};
