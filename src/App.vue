<template>
    <div class="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/vue3">Vue3</router-link>
    </div>

    <div>
        <router-view v-slot="{ Component, route }">
            <keep-alive>
                <component :is="Component" :key="route.path"/>
            </keep-alive>
        </router-view>
    </div>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
    padding: 10px;
}

.nav {
    font-size: 20px;
    color: #333;
    padding: 20px;

    & .router-link-active {
        color: blue;
    }
}
</style>