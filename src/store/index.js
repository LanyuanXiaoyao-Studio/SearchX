import Vue from 'vue'
import Vuex from 'vuex'
import squirrel from '@/squirrel'
import {isEmpty, isNil, remove, findIdx} from 'licia'

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
    updateSitesAndCategories: (state) => {
      let result = squirrel.sites()
      if (result.code === 0) state.sites = result.data
      else state.sites = []
      console.log('sites', result.message, result.timestamp)

      result = squirrel.categories()
      if (result.code === 0) state.categories = result.data
      else state.categories = {}
      console.log('categories', result.message, result.timestamp)
    },
    updateSettings: (state) => {
      let result = squirrel.fetch()
      if (result.code === 0) state.settings = result.data
      else state.settings = {}
      console.log('settings', state.settings)
    },
    updateProxy: (state, proxy) => {
      if (!isNil(state.settings.proxy)) {
        state.settings.proxy.hostname = proxy.hostname
        state.settings.proxy.port = proxy.port
      }
      squirrel.save(state.settings)
    },
    updateSubscription: (state, subscription) => {
      if (!isNil(state.settings.subscriptions)) {
        state.settings.subscriptions.push(subscription)
      }
      console.log(squirrel.save(state.settings))
    },
    removeSubscription: (state, subscription) => {
      if (!isNil(state.settings.subscriptions)) {
        state.settings.subscriptions = state.settings.subscriptions.filter(s => s.path !== subscription.path)
      }
      squirrel.save(state.settings)
    },
    saveSites: (state) => {
      let result = squirrel.exports()
      if (result.code === 0) {
        state.settings.sites = result.data
      }
      console.log('saveSites', state.settings.sites)
      squirrel.save(state.settings)
    },
    removeAllSites: (state) => {
      state.settings.sites = []
      squirrel.imports(state.settings.sites)
      squirrel.save(state.settings)
      store.commit('updateSitesAndCategories')
    },
    updateAuthor: (state, author) => (state.about.author = author),
    updateDisclaimer: (state, disclaimer) => (state.about.disclaimer = disclaimer),
    updatePublish: (state, publish) => (state.about.publish = publish),
    updatePlugins: (state, plugins) => (state.about.plugins = plugins),
  },
})

export default store
