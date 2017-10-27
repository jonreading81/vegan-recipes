module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'sinon'],
        files: [
          'src/test/test_index.js'
        ],
        exclude: [],
        preprocessors: {

          'src/client.js': ['webpack'],
          'src/test/test_index.js': ["webpack"]
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
        browsers: ['Chrome'],
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};