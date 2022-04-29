<template>
    <p class="version-title">项目版本： {{ env.VITE_APP_TITLE + env.VITE_APP_VERSION }}</p>
    <HelloWorld msg="Vue3 + TypeScript + Vite" />
    <List></List>
</template>

<script setup lang="ts">
import HelloWorld from './components/hello-world/HelloWorld.vue'
import List from './components/todo-list/JSXComponent'

let env:ImportMetaEnv = import.meta.env
console.log(env)
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

.version-title {
    border: 1px solid var(borderColor);
}
</style>
