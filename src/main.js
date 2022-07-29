import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Maska from 'maska'

createApp(App).use(router).use(Maska).mount('#app')
