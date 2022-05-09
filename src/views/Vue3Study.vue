<template>
    <div class="nav" @click="onNavClick">
        <router-link to="getStart">getStart</router-link> |
        <router-link to="composition">组合式API</router-link> |
    </div>

    <div>
        <router-view v-slot="{ Component, route }">
            <keep-alive>
                <component :is="Component" :key="route.path" path="route.path"/>
            </keep-alive>
        </router-view>
    </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'

/* 尽可能将对响应式 property 的所有修改限制在定义 provide 的组件内部， 如果要在 inject 组件中修改值，可以传递修改方法 */

// 传递响应式数据
const clickCount = ref(0)
provide('navClickCount', clickCount)

// 传递响应式数据修改方法
const onNavClick = () => {
    clickCount.value++
}
provide('navClickFun', onNavClick)

// 传递非响应式数据
const vuemsg = 'this is the provide msg!'
provide('vue3message', vuemsg)
</script>

<style scoped>
.nav {
    font-size: 16px;
    color: #333;
    padding: 16px;
    border: 1px solid var(--borderColor);

    & .router-link-active {
        color: blue;
    }
}
</style>