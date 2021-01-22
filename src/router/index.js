import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决 NavigationDuplicated: Avoided redundant navigation to current location 报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location)
                     .catch(err => err)
}

const routes = [
  {
    path: '/site/:code',
    name: 'Site',
    component: () => import('@/views/Site.vue')
  }
]

export default new VueRouter({
  routes
})
