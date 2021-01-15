import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/ant'
import './plugins/masonry'

Vue.config.productionTip = false

if (window.squirrelInitialReady) {
  let key = 'updatable'
  Vue.prototype.$message.loading({content: '加载数据...', key})
  window.squirrelInitialReady()
        .then(result => Vue.prototype.$message.success({content: '加载完成', key}))
        .catch(error => Vue.prototype.$message.error({content: error, key}))
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
