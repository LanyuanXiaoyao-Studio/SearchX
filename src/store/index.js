import Vue from 'vue'
import Vuex from 'vuex'
import squirrel from '@/squirrel'
import {findIdx, isEmpty, isNil} from 'licia'
import Constants from '@/store/constants'
import UpdateInfoModule from '@/store/update-info'

Vue.use(Vuex)

const appMode = process.env.VUE_APP_MODE

const store = new Vuex.Store({
  modules: {
    Constants,
    UpdateInfoModule,
  },
  state: {
    currentUrl: '/',
    statisticUrl: 'http://127.0.0.1:8080/analysis/record',
    version: '1.1.1',
    sites: [],
    categories: {},
    settings: {
      sites: [],
      proxy: {
        hostname: '',
        port: -1
      }
    },
    appSettings: {},
    about: {
      author: {},
      disclaimer: '',
      publish: '',
      plugins: [],
    },
    constants: {
      spaceSize: 5
    },
  },
  getters: {
    currentUrl: state => state.currentUrl,
    statisticUrl: state => state.statisticUrl,
    mode: state => appMode,
    version: state => state.version,
    sites: state => state.sites,
    sitesSource: state => state.settings.sites,
    site: state => code => {
      for (let i = 0, length = state.sites.length; i < length; i++) {
        let site = state.sites[i]
        if (site.code === code) {
          return site
        }
      }
    },
    categories: state => state.categories,
    settings: state => state.settings,
    appSettings: state => state.appSettings,
    subscriptions: state => (isEmpty(state.settings) || isNil(state.settings.subscriptions)) ? [] : state.settings.subscriptions,
    proxy: state => (isEmpty(state.settings) || isNil(state.settings.subscriptions)) ? {} : state.settings.proxy,
    about: state => state.about,
    constants: state => state.constants,
  },
  mutations: {
    updateCurrentUrl: (state, url) => (state.currentUrl = url),
    updateAuthor: (state, author) => (state.about.author = author),
    updateDisclaimer: (state, disclaimer) => (state.about.disclaimer = disclaimer),
    updatePublish: (state, publish) => (state.about.publish = publish),
    updatePlugins: (state, plugins) => (state.about.plugins = plugins),
    setSites: (state, sites) => (state.sites = sites),
    deleteSites: (state, codes) => {
      if (!isNil(state.settings.sites)) {
        state.settings.sites = state.settings.sites.filter(s => findIdx(codes, c => s.code === c) < 0)
      }
    },
    setSettingsSites: (state, sites) => (state.settings.sites = sites),
    setCategories: (state, categories) => (state.categories = categories),
    setSettings: (state, settings) => (state.settings = settings),
    setAppSettings: (state, appSettings) => (state.appSettings = appSettings),
    setProxy: (state, proxy) => {
      if (!isNil(state.settings.proxy)) {
        state.settings.proxy.hostname = proxy.hostname
        state.settings.proxy.port = proxy.port
      }
    },
    setSubscription: (state, subscription) => {
      if (!isNil(state.settings.subscriptions)) {
        state.settings.subscriptions.push(subscription)
      }
    },
    deleteSubscription: (state, subscription) => {
      if (!isNil(state.settings.subscriptions)) {
        state.settings.subscriptions = state.settings.subscriptions.filter(s => s.path !== subscription.path)
      }
    }
  },
  actions: {
    updateSitesAndCategories: async ({getters, commit}) => {
      let result = await squirrel.sites()
      if (result.code === 0) commit('setSites', result.data)
      else commit('setSites', [])
      // console.log('sites', result.message, result.timestamp)

      result = await squirrel.categories()
      if (result.code === 0) commit('setCategories', result.data)
      else commit('setCategories', {})
    },
    updateSettings: async ({getters, commit}) => {
      let result = await squirrel.fetch()
      if (result.code === 0) commit('setSettings', result.data)
      else commit('setSettings', {})
      // console.log('settings', getters.settings)
    },
    updateProxy: async ({getters, commit}, proxy) => {
      commit('setProxy', proxy)
      await squirrel.save(getters.settings)
    },
    updateSubscription: async ({getters, commit}, subscription) => {
      commit('setSubscription', subscription)
      await squirrel.save(getters.settings)
    },
    removeSubscription: async ({getters, commit}, subscription) => {
      commit('deleteSubscription', subscription)
      await squirrel.save(getters.settings)
      Vue.prototype.$message.success('删除订阅成功')
    },
    saveSites: async ({getters, commit}) => {
      let result = await squirrel.exports()
      if (result.code === 0) {
        commit('setSettingsSites', result.data)
        await squirrel.save(getters.settings)
      }
      else throw new Error('保存失败')
    },
    removeSites: async ({getters, commit, dispatch}, codes) => {
      commit('deleteSites', codes)
      await squirrel.imports(getters.settings.sites)
      await squirrel.save(getters.settings)
      await dispatch('updateSitesAndCategories')
      Vue.prototype.$message.success('删除站点成功')
    },
    removeAllSites: async ({getters, commit}) => {
      commit('setSettingsSites', [])
      await squirrel.imports(getters.settings.sites)
      await squirrel.save(getters.settings)
      await store.dispatch('updateSitesAndCategories')
      Vue.prototype.$message.success('已清空全部站点')
    },
  }
})

export default store
