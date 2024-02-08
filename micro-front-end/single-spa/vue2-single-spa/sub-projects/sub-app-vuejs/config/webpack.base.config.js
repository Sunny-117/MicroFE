const StatsPlugin = require('stats-webpack-plugin');

const config = {
    output: {
        library: "singleVue",
        libraryTarget: "window",
    },
    plugins: [
        new StatsPlugin('manifest.json', {
            chunkModules: false,
            entrypoints: true,
            source: false,
            chunks: false,
            modules: false,
            assets: false,
            children: false,
            exclude: [/node_modules/]
        }),
    ]
};

module.exports = config;
