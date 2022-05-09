<template>
    <h1 class="title">Vue3 + TypeScript + Vite + Pinia2 + Vue-Router4 + lodash</h1>
    <p>{{ '账号：' + userStore.username + ' 密码: ' + userStore.password }}</p>
    <p>项目版本： {{ env.VITE_APP_TITLE + env.VITE_APP_VERSION }}</p>
</template>

<script setup lang="ts">
import { useUserStore } from '../store/user'
import { onMounted } from 'vue'

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_APP_VERSION: string
    readonly NODE_ENV: string
}

const env:ImportMetaEnv = import.meta.env

const userStore = useUserStore()

onMounted(() => {
    userStore.getUser()
})
</script>

<style scoped>
.title {
    color: blue;
    margin-bottom: 10px;
    border: 1px solid var(--borderColor);
}
</style>