<script setup lang="ts">
import { ref } from 'vue'
import CSSModules from './style.module.css'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h3 :class="CSSModules.red">{{ msg }}</h3>

  <div class="postcss-wraper">
    <span class="postcss-item">what is postCSS?</span>
  </div>

  <button type="button" @click="count++">count is: {{ count }}</button>
</template>

<style scoped>
.postcss-wrapper {
  border: 1px solid #ccc;
  
  & .postcss-item {
    color: red;
  }
}
</style>