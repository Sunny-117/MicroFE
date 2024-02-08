import serve from 'rollup-plugin-serve';

// rollup可以帮我们打包 es6的模块化语法
export default {
    input: './src/single-spa.js',
    output: {
        file: './lib/umd/single-spa.js',
        format: 'umd',
        name: 'singleSpa',
        sourcemap: true
    },
    plugins: [
        serve({
            openPage: '/index.html',
            contentBase: '',
            port: 3000
        })
    ]
}