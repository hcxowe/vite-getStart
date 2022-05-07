import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    { path: '/', component: () => import('../views/Home.vue') },
    { path: '/about', component: () => import('../views/About.vue') },
    { 
        path: '/vue3',
        redirect: '/vue3/getStart',
        component: () => import('../views/Vue3Study.vue'),
        children: [
            { path: 'getStart',  component: () => import('../views/vue3Views/GetStart.vue') },
            { path: 'composition',  component: () => import('../views/vue3Views/CompositionAPI.vue') }
        ]
    }

]

export default createRouter({
    history: createWebHashHistory(),
    routes
})