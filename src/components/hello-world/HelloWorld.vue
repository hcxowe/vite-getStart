<template>
    <div class="wrapper">
        <h3 :class="CSSModules.red">{{ msg }}</h3>

        <div class="postcss-wraper">
            <span class="postcss-item" :class="$style.red">what is the postCSS?</span>
        </div>

        <button type="button" @click="count++">count is: {{ count }}</button>

        <div class="mask-image"></div>

        <label>账号：</label>
        <input v-model="username" />
        <label>密码：</label>
        <input v-model="password" />
        <button @click="onModify">修改</button>
    </div>
</template>

<script setup lang="ts">
import { ref, useCssModule } from 'vue'
import CSSModules from './style.module.css'
import { useUserStore } from '../../store/user'
import { modifyPwd } from '../../api/user'

defineProps<{ msg: string }>()
const count = ref(0)

const userStore = useUserStore()

const username = ref('')
const password = ref('')

async function onModify() {
    const ret = await modifyPwd('123456', password.value, '修改密码中，请稍后...')

    userStore.modify(username.value, password.value)
}

/* 获取 css module 定义的类 */
const moduleClass = useCssModule()
</script>

<style module>
.red {
    color: green;
}
</style>

<style scoped>
.wrapper {
    padding: 10px;
}

/* 深度选择器 */
.wrapper :deep(label) {
    color: blue;
}

/* 插槽选择器 */
:slotted(div) {
    padding: 10px;
}

/* 全局选择器 */
:global(div) {
    margin: 5px 0;
}

.postcss-wraper {
    border: 1px solid #ccc;
}

.mask-image {
    --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath d='M28.027 5.161l-17.017 17.017-7.007-7.007-3.003 3.003 10.010 10.010 20.020-20.020z'%3E%3C/path%3E%3C/svg%3E");

    width: 100px;
    height: 100px;
    margin: 0 auto;
    background: red;

    mask-image: var(--svg);
    mask-repeat: no-repeat;
}

.header {
    height: 60px;

    & .title {
        font-weight: bold;
        color: red;
    }

    @media screen (max-width: 760px) {
        & {
            height: 30px;
        }
    }

    @nest .content & {
        height: 50px;
    }
}
</style>