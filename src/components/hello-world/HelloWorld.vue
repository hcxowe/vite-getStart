<template>
    <h3 :class="CSSModules.red">{{ msg }}</h3>

    <div class="postcss-wraper">
        <span class="postcss-item">what is the postCSS?</span>
    </div>

    <button type="button" @click="count++">count is: {{ count }}</button>

    <div class="mask-image"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CSSModules from './style.module.css'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<style scoped>
.postcss-wraper {
    border: 1px solid #ccc;

    & .postcss-item {
        color: red;
    }
}

.mask-image {
    --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath d='M28.027 5.161l-17.017 17.017-7.007-7.007-3.003 3.003 10.010 10.010 20.020-20.020z'%3E%3C/path%3E%3C/svg%3E");

    width: 100px;
    height: 100px;
    background: red;

    mask-image: var(--svg);
    mask-repeat: no-repeat;
}
</style>