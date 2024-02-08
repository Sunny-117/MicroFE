const webpackConfig = require('./webpack.config');

module.exports = {
    publicPath: "//localhost:3000/",
    // css在所有环境下，都不单独打包为文件。这样是为了保证最小引入（只引入js）
    css: {
        extract: false
    },
    configureWebpack: webpackConfig,
    devServer: {
        contentBase: './',
        compress: true,
    }
}
