<template>
    <div>
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
            <a-menu-item key="1">
                <car-outlined />
                <router-link to="/" class="ml10">主应用</router-link>
            </a-menu-item>
            <a-menu-item key="2">
                <car-outlined />
                <router-link to="/subapp/app-vue3/" class="ml10">vue3</router-link>
            </a-menu-item>
            <a-menu-item key="3">
                <car-outlined />
                <router-link to="/subapp/app-vue2/" class="ml10">vue2</router-link>
            </a-menu-item>
            <a-menu-item key="4">
                <car-outlined />
                <router-link to="/subapp/app-react/" class="ml10">react</router-link>
            </a-menu-item>
        </a-menu>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { CarOutlined } from '@ant-design/icons-vue';

const selectedKeys = ref(['1']);

</script>

<style scoped>
.ml10 {
    margin-left: 10px;
}
</style>