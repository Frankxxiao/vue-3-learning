import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

// 这个 mixin 将会影响下面所有的 app 实例
Vue.mixin({ /* ... */ })

const app1 = new Vue({ el: '#app-1' })
const app2 = new Vue({ el: '#app-2' })