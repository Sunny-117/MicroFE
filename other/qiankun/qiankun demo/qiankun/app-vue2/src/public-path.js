
// webpack支持运行时的publicPath
// webpack在运行时生成的路径会自动拼接上这个全局变量
// 所以现在__webpack_public_path__由主应用提供，到时候获取资源去寻找主应用的publicPath
if (window.__POWERED_BY_QIANKUN__) {
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}