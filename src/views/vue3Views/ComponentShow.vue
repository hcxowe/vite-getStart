<template>
    <div class="wrapper">
        <h1>Button按钮</h1>

        <h3>各种类型的按钮 {{ clickCount }}</h3>
        <Button type="default" @click="clickCount++">Default</Button>
        <Button type="primary" @click="clickCount++">Primary</Button>
        <Button type="success" @click="clickCount++">Success</Button>
        <Button type="warning" @click="clickCount++">Warning</Button>
        <Button type="danger" @click="clickCount++">Danger</Button>
        <Button type="info" @click="clickCount++">Info</Button>

        <h3>禁用状态</h3>
        <Button type="default" disabled>Default</Button>
        <Button type="primary" disabled>Primary</Button>
        <Button type="success" disabled>Success</Button>
        <Button type="warning" disabled>Warning</Button>
        <Button type="danger" disabled>Danger</Button>
        <Button type="info" disabled>Info</Button>

        <h3>各种尺寸的按钮</h3>
        <Button size="large" type="primary">Large</Button>
        <Button size="default" type="primary">Default</Button>
        <Button size="small" type="primary">Small</Button>
    </div>
</template>

<script setup lang="ts">
import Button from '../../components/button'

const clickCount = ref(0)
</script>

<style scoped>
.wrapper {
    padding: 20px;
    text-align: left;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    margin: 10px 0;
}
</style>
