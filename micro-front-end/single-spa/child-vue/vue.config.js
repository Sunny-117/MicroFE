module.exports = {
    configureWebpack:{
        output:{
            library:'singleVue',
            libraryTarget:'umd' // 子应用打包成umd格式的js文件
        },
        devServer:{
            port:10000
        }
    }
}
