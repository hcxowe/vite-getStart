<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import List from './components/JSXComponent.tsx'

let env:ImportMetaEnv = import.meta.env

const version:string = __APP_VERSION__

console.log(env)
</script>

<template>
    <p>项目版本： {{ version }}</p>

  <HelloWorld msg="Vue3 + TypeScript + Vite" />

  <List></List>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
