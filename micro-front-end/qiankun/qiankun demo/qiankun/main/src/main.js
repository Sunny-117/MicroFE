import { createApp } from 'vue'
import { registerMicroApps, start } from 'qiankun'
import Antd from 'ant-design-vue'
import router from './router'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';

// 注册子应用
registerMicroApps([
    // 当匹配到activeRule的时候，会去请求entry的资源，并渲染到container内。
    {
        name: 'app-vue3', // HTML 入口
        entry: '//localhost:9003',
        activeRule: '/subapp/app-vue3',
        container: '#sub-container'
    },
    {
        name: 'app-vue2',
        entry: '//localhost:9002',
        activeRule: '/subapp/app-vue2',
        container: '#sub-container'
    },
    {
        name: 'app-react',
        entry: '//localhost:9001',
        activeRule: '/subapp/app-react',
        container: '#sub-container'
    }
]);


start()

createApp(App).use(router).use(Antd).mount('#app')
