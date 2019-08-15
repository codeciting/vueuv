import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueModule from './lib/vue-module'

Vue.config.productionTip = false

Vue.use(VueModule, {
  router,
  store,
  declarations: [
    {
      path: '/p',
      config: () => import('./modules/user/login/module.config.js')
    }
  ]
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
