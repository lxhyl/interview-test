import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia';
import 'element-plus/dist/index.css'
import './style/index.css'

createApp(App).use(createPinia()).mount('#app')
