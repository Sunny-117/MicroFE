// zmp需要读取emp-config.js文件
// host
module.exports = {
    server: {
        port: 8002
    },
    empShare: {
        name: 'host',
        remotes: {
            remote: 'remote@http://127.0.0.1:8001/emp.js'
        }
    }
}
// remote
module.exports = {
    server: {
        port: 8001
    },
    empShare: {
        name: 'remote',
        exposes: {
            './App': './src/App'
        }
    }
}