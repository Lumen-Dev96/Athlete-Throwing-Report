import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus';

import './assets/main.css'
import './assets/tailwind.css'

// import './demos/ipc'
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

const app = createApp(App)

app.use(router)
  .use(VueAxios, axios)
  .use(ElementPlus)
  .provide('axios', app.config.globalProperties.axios)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
