const { defineConfig } = require("@vue/cli-service");
const packageName = require("./package.json").name;
const port = 9003;
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: { port, headers: { "Access-Control-Allow-Origin": "*" } },
  configureWebpack: {
    output: {
      library: `${packageName}-[name]`,
      libraryTarget: "umd",// 子应用的格式必须是umd格式
      // jsonpFunction: `webpackJsonp_${packageName}`,
    },
  },
});
