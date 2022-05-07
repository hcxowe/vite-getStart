<template>
    <p>在 setup 中你应该避免使用 this，因为它不会找到组件实例。setup 的调用发生在 data property、computed property 或 methods 被解析之前，所以它们无法在 setup 中被获取。</p>

    <p style="margin: 10px;" @click="count++">ref 的响应式变量：{{ count }}</p>
    <p style="margin: 10px;" @click="onAddListItem">reactive 的响应式变量：{{ list.join() }}</p>
    <p style="margin: 10px;" @click="username = usernameAry[Math.floor(Math.random() * 4)]">toRef:为源响应式对象上的某个属性创建一个 ref 并保持连接：{{ `source: ${infos.username}, target: ${username}` }}</p>
    <p style="margin: 10px;">computed 计算属性：{{ listShow }}</p>
</template>

<script setup lang="ts">
import { ref, reactive, toRef, toRefs, onMounted, watch, computed } from 'vue'

// 响应式变量
const count = ref<number>(0)
const list  = reactive<number[]>([1, 2, 3, 4])
const infos = reactive({
    username: 'hcxowe',
    age: 33,
    isAdmin: true,
    others: {
        brothday: '1989-01-25',
        xingzuo: '摩羯座'
    },
    hobby: ['read', 'game', 'sleep']
})
const usernameAry: string[] = ['hcxowe', 'ksea', 'yun', 'dh']

// 创建 infos.username 的 ref 对象， username与infos.name保持连接
const username = toRef(infos, 'username')

// toRefs 将响应式对象转换为普通对象，其中结果对象的每个 property 都是指向原始对象相应 property 的 ref
// 其实就是 toRef 的批量操作
const { age, isAdmin, hobby } = toRefs(infos)



// 方法
const onAddListItem = () => {
    list.push(Math.floor(Math.random() * 100))
}

// 生命周期钩子
onMounted(() => {
    count.value = 10
})

// 计算属性
const listShow = computed(() => {
    return list.join(';')
})

// 监听
watch(count, (newValue, oldVlaue) => {
    console.log(`conter: ${oldVlaue} => ${newValue}`)
})
</script>