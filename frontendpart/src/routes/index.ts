import { createRouter, createWebHistory } from "vue-router";
 
const routes = [
    {
        path: '/',
        name: 'Главная',
        component: () => import('@/views/HomeView.vue')
    },
    {
        path: '/chat',
        name: 'Чат',
        component: () => import('@/views/ChatView.vue')
    },
    {
        path: '/login',
        name: 'Вход',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/profile',
        name: 'Профиль',
        component: () => import('@/views/ProfileView.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;