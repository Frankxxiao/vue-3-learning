import { createApp } from 'vue'
import App from './App.vue'
import './index.css'


const app = createApp(App)
// 这个 mixin 配置只会影响 app 实例 
app.mixin(/* ... */)
app.mount('#app')