import Vue from 'vue'
import Vuex from 'vuex'
import squirrel from '@/squirrel'
import {isEmpty, isNil} from 'licia'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    version: '0.2.0',
    sites: [],
    categories: {},
    settings: {},
    about: {
      author: {},
      disclaimer: '',
      publish: '',
      plugins: [],
    },
    constants: {
      spaceSize: 5
    }
  },
  getters: {
    version: state => state.version,
    sites: state => state.sites,
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
    subscriptions: state => (isEmpty(state.settings) || isNil(state.settings.subscriptions)) ? [] : state.settings.subscriptions,
    proxy: state => (isEmpty(state.settings) || isNil(state.settings.subscriptions)) ? {} : state.settings.proxy,
    about: state => state.about,
    constants: state => state.constants,
  },
  mutations: {
    updateAuthor: (state, author) => (state.about.author = author),
    updateDisclaimer: (state, disclaimer) => (state.about.disclaimer = disclaimer),
    updatePublish: (state, publish) => (state.about.publish = publish),
    updatePlugins: (state, plugins) => (state.about.plugins = plugins),
    setSites: (state, sites) => (state.sites = sites),
    setCategories: (state, categories) => (state.categories = categories),
    setSettings: (state, settings) => (state.settings = settings),
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
    updateSitesAndCategories: async ({commit}) => {
      let result = await squirrel.sites()
      if (result.code === 0) commit('setSites', result.data)
      else commit('setSites', [])
      // console.log('sites', result.message, result.timestamp)

      result = await squirrel.categories()
      if (result.code === 0) commit('setCategories', result.data)
      else commit('setCategories', {})
      // console.log('categories', result.message, result.timestamp)
    },
    updateSettings: async ({commit}) => {
      let result = await squirrel.fetch()
      if (result.code === 0) commit('setSettings', result.data)
      else commit('setSettings', {})
      // console.log('settings', state.settings)
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
    },
    saveSites: async ({getters}) => {
      let result = await squirrel.exports()
      if (result.code === 0) {
        getters.settings.sites = result.data
      }
      // console.log('saveSites', state.settings.sites)
      await squirrel.save(getters.settings)
    },
    removeAllSites: async ({getters}) => {
      getters.settings.sites = []
      await squirrel.imports(getters.settings.sites)
      await squirrel.save(getters.settings)
      await store.dispatch('updateSitesAndCategories')
    },
  }
})

export default store
