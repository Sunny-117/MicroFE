(function webpackUniversalModuleDefinition(root, factory) {
    // commonjs模块规范
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    // 兼容amd模块规范
    else if (typeof define === 'function' && define.amd)
        define([], factory);
    // commonjs
    else if (typeof exports === 'object')
        exports["app-vue2-app"] = factory();
    // window['xxx']=factory();
    else
        root["app-vue2-app"] = factory();
})(window, function () {
    // 这是内部的代码

    // 最后会返回导出的结果
    return {
        a: 1,
        b: 2
    }
});