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
      '/resources/': '/base/test/web-platform-tests/resources/',

      // Using our own augmented testharnessreport.js that talks with karma-testharness-adapter.js
      '/resources/testharnessreport.js': '/base/test/resources/testharnessreport.js',

      // Matching behaviour of WPT's serve tool: https://github.com/w3c/wpt-tools/blob/de648409ff2556576d59810b3ba971aeac2184a2/serve/serve.py#L45
      '/resources/WebIDLParser.js': '/base/test/web-platform-tests/resources/webidl2/lib/webidl2.js',

      '/test/': '/base/test/',
    },
  });
};
