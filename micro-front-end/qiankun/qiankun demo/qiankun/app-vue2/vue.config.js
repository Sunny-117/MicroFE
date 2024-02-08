const { name } = require('./package.json');
// webpack支持运行时的publicPath
module.exports = {
  // publicPath:"" //************************************************************************在vuecli中这样设置
  devServer: {
    port: 9002,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },

  configureWebpack: {
    mode: 'development',
    output: {
      // publicPath：//************************************************************************在webpack中这样设置
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
};