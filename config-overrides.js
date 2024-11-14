const webpack = require("webpack");

module.exports = function override(config, env) {
    // Add missing dependencies to fallback
    config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        os: require.resolve("os-browserify/browser"),
        url: require.resolve("url/"),  // Note the trailing slash
        constants: require.resolve("constants-browserify"),
        util: require.resolve("util/"),
        buffer: require.resolve("buffer/"),
        process: require.resolve("process/browser"),
        assert: require.resolve("assert/"),
        path: require.resolve("path-browserify"),
        dns: false,
        net: false,
        tls: false,
        dgram: false,
        fs: false,
        zlib: false,
        vm: false
    };

    // Add plugins
    config.plugins = [
        ...config.plugins,
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"],
            url: ["url", "URL"],  // Add URL provider
        }),
        new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
            const mod = resource.request.replace(/^node:/, "");
            switch (mod) {
                case "buffer":
                    resource.request = "buffer";
                    break;
                case "stream":
                    resource.request = "readable-stream";
                    break;
                case "url":
                    resource.request = "url";
                    break;
                default:
                    throw new Error(`Not found ${mod}`);
            }
        }),
    ];

    // Handle source map warnings
    config.ignoreWarnings = [
        /Failed to parse source map/,
        /Critical dependency/,
    ];

    // Ensure proper resolution
    config.resolve.alias = {
        ...config.resolve.alias,
        "process/browser": "process/browser.js",
        "url": require.resolve("url/"),
    };

    return config;
};