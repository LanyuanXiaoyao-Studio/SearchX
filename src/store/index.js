import Vue from 'vue'
import Vuex from 'vuex'
import Squirrel from '../utils/squirrel'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sites: [],
    categories: {},
    settings: {},
    about: {
      author: {},
      disclaimer: '',
      publish: '',
      plugins: [],
    },
  },
  getters: {
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
    about: state => state.about,
  },
  mutations: {
    updateSitesAndCategories: (state) => {
      let result = Squirrel.sites()
      if (result.code === 0) state.sites = result.data
      else state.sites = []
      console.log('sites', result.message, result.timestamp)

      result = Squirrel.categories()
      if (result.code === 0) state.categories = result.data
      else state.categories = {}
      console.log('categories', result.message, result.timestamp)
    },
    updateSettings: (state, settings) => (state.settings = settings),
    updateProxy: (state, proxy) => {
      if (state.settings.proxy) {
        state.settings.proxy.hostname = proxy.hostname
        state.settings.proxy.port = proxy.port
      }
    },
    updateAuthor: (state, author) => (state.about.author = author),
    updateDisclaimer: (state, disclaimer) => (state.about.disclaimer = disclaimer),
    updatePublish: (state, publish) => (state.about.publish = publish),
    updatePlugins: (state, plugins) => (state.about.plugins = plugins),
  },
})
