import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

// 解决 NavigationDuplicated: Avoided redundant navigation to current location 报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location)
                     .catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue')
  },
  {
    path: '/subscription',
    name: 'Subscription',
    component: () => import('@/views/Subscription')
  },
  {
    path: '/merge-search',
    name: 'MergeSearch',
    component: () => import('@/views/MergeSearch.vue')
  },
  {
    path: '/site/:code',
    name: 'Site',
    component: () => import('@/views/Site.vue')
  }
]

const router = new VueRouter({
  routes
})

router.afterEach((to, from) => {
  store.commit('updateCurrentUrl', to.path)
  window.statistic(store.getters.statisticUrl, to.path)
})

export default router
