import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: () => import('../views/Home.vue') },
    { path: '/about', component: () => import('../views/About.vue') },
    {
        path: '/vue3',
        component: () => import('../views/Vue3Study.vue'),
        children: [
            { path: '', redirect: '/vue3/getStart' },
            { path: 'getStart', component: () => import('../views/vue3Views/GetStart.vue') },
            { path: 'composition', component: () => import('../views/vue3Views/CompositionAPI.vue') },
            { path: 'components', component: () => import('../views/vue3Views/ComponentShow.vue') }
        ]
    }

]

export default createRouter({
    history: createWebHashHistory(),
    routes
})