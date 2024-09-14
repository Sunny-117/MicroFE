<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider v-model:collapsed="collapsed" collapsible>
            <div class="logo"></div>
            <Menu />
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding-left: 20px">Header</a-layout-header>
            <a-layout-content style="margin: 16px">
                <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
                   
                   <!-- 主应用路由渲染出口 -->
                    <router-view></router-view>

                    <!-- 微应用渲染出口 -->
                    <div id="sub-container"></div>
                </div>
            </a-layout-content>
            <a-layout-footer style="text-align: center">
                Ant Design ©2018 Created by Ant UED
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script setup>
import { ref } from 'vue';
import Menu from './Menu.vue'

const collapsed = ref(false);
</script>
<style scoped>
.logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
    background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
}
</style>