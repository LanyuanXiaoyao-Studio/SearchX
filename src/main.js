import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/ant'
import './plugins/masonry'
import Utils from './utils/utils'

Vue.config.productionTip = false

if (window.squirrelInitialReady) {
  Utils.loadingMessage(window.squirrelInitialReady())
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
