module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'sinon'],
        files: [
             "src/test/**/*-test.js"
        ],
        exclude: [],
        preprocessors: {
            "src/test/**/*-test.js": ["webpack"]
        },
        reporters: [ 'mocha' ],
        // webpack configuration
        webpack: require("./webpack/test.config.js"),
        webpackMiddleware: {
            //stats: "errors-only"
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeWithoutSecurity'],
        customLaunchers: {
            ChromeWithoutSecurity: {
                base: 'Chrome',
                flags: ['--disable-web-security']
            }
        },
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,
        concurrency: Infinity
    });
};
