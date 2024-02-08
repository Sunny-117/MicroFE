import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home'
import About from '../views/about'

export const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About }
]

export default createRouter({
    history: createWebHistory(),
    routes
})