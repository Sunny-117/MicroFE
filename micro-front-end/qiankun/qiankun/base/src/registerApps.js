import { registerMicroApps, start } from 'qiankun'; // 底层是基于single-spa

const loader = (loading) => {
    console.log(loading)
}
registerMicroApps([{
    name: 'm-vue',
    entry: '//localhost:20000',
    container: '#container',
    activeRule: '/vue',// 激活条件
    loader,
},
{
    name: 'm-react',
    entry: '//localhost:30000',
    container: '#container',
    activeRule: '/react',
    loader
}
], {
    beforeLoad: () => {
        console.log('加载前')
    },
    beforeMount: () => {
        console.log('挂在前')
    },
    afterMount: () => {
        console.log('挂载后')
    },
    beforeUnmount: () => {
        console.log('销毁前')
    },
    afterUnmount: () => {
        console.log('销毁后')
    },
})
start({
    sandbox: {
        // experimentalStyleIsolation:true
        strictStyleIsolation: true
    }
});