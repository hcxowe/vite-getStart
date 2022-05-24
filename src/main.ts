import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router/index'
import i18n from './plugins/i18n'
import 'element-plus/dist/index.css'
import './styles/index.scss'

createApp(App).use(createPinia()).use(router).use(i18n).mount('#app')