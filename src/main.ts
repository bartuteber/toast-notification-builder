import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'animate.css'
import './assets/styles/tokens.css'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
