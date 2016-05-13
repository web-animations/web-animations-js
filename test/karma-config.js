module.exports = function(config) {
  config.set({
    // The following config properties are populated by grunt:
    // frameworks, plugins, files.
    plugins: [
      'karma-firefox-launcher'
    ],
    browsers: ['Firefox'],
    basePath: '..',
    port: 9876,
    reporters: ['dots'],
    colors: true,
    autoWatch: false,
    proxies: {
      '/resources/': '/base/test/resources/',
      '/test/': '/base/test/',
      '/polyfill/': '/base/',
    },
  });
};
