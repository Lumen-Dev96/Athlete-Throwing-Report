import './assets/main.css'
import './assets/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus';

const app = createApp(App)

app.use(router)
app.use(VueAxios, axios)
app.use(ElementPlus);
app.provide('axios', app.config.globalProperties.axios)  // provide 'axios'

app.mount('#app')
