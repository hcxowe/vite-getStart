<template>
    <div class="nav">
        <router-link to="getStart">getStart</router-link> |
    </div>

    <div>
        <router-view></router-view>    
    </div>
</template>

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