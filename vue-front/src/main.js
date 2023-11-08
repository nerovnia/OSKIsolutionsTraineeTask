import './assets/main.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
/*
import AuthForm from './components/forms/Auth'

export default {
  name: 'App',
  components: { AuthForm  }
}
*/

app.use(router)

app.mount('#app')
