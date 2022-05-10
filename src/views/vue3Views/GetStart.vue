<template>
    <div ref="provideEl">祖先组件传递的非响应式数据：{{ message }}</div>
    <div>祖先组件传递的响应式数据：路由导航点击次数：{{ clickcount }}次</div>
    <div>插件中注入的i18n数据：{{ greetingShow }}</div>
</template>

<script setup lang="ts">
import { inject, ref, onMounted } from 'vue'

const provideEl = ref(null)

onMounted(() => {
    // console.log(provideEl.value)
})

const clickcount    = inject('navClickCount')
const message       = inject('vue3message')

interface greetingObj {
    [name: string]: string
}

// 获取由插件注入的数据
const i18nGreeting: greetingObj | undefined = inject('i18n')
let greetingShow = ''

if (typeof i18nGreeting !== 'undefined') {
    for (const key in i18nGreeting) {
        greetingShow += `${key}：${i18nGreeting[key]};`
    }
}

</script>