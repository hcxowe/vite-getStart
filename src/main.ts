import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router/index'
import i18n from './plugins/i18n'
import './styles/index.css'

createApp(App).use(createPinia()).use(router).use(i18n).mount('#app')