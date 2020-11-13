import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import './plugins/ant'
import './plugins/masonry'

if (window.squirrelInitialReady) {
  window.squirrelInitialReady()
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
