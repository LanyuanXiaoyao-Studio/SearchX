import store from '@/store'
import {cmpVersion} from 'licia'

window.store = store

const appMode = process.env.VUE_APP_MODE
console.log(`Current Mode: ${appMode}`)

let squirrel
if (appMode === 'utools') {
  squirrel = window.squirrelLib.com.lanyuanxiaoyao.squirrel.utools
}
else if (appMode === 'electron') {
  squirrel = window.squirrelLib.com.lanyuanxiaoyao.squirrel.electron
}

let squirrelWrapper
if (appMode === 'web') {
  squirrelWrapper = require('./squirrel-web').default
}
else {
  squirrelWrapper = {
    info: async () => JSON.parse(squirrel.info('default')),
    sites: async () => JSON.parse(squirrel.sites('SEARCH')),
    categories: async () => JSON.parse(squirrel.categories('SEARCH')),
    downloader: async () => JSON.parse(squirrel.downloader()),
    page: async request => eval(`(${await squirrel.page(JSON.stringify(request))})`),
    change: async request => JSON.parse(squirrel.change(request)),
    save: async information => squirrel.save(JSON.stringify(information)),
    fetch: async () => JSON.parse(squirrel.fetch()),
    load: async information => JSON.parse(squirrel.load(information)),
    imports: async sites => {
      let result = JSON.parse(squirrel.imports(JSON.stringify(sites)))
      await store.dispatch('updateSitesAndCategories')
      return result
    },
    merge: async sites => {
      let result = JSON.parse(squirrel.merge(JSON.stringify(sites)))
      await store.dispatch('updateSitesAndCategories')
      return result
    },
    exports: async () => JSON.parse(squirrel.exports()),
    debug: async enable => JSON.parse(squirrel.debug(enable)),
  }
}

squirrelWrapper.info()
               .then(result => console.log(result))
               .catch(error => console.log(error))

window.squirrel = squirrelWrapper

export default {
  ...squirrelWrapper,
  services: {
    async mergeSitesFromFile(path) {
      let source = await window.readTextFromFile(path)
      let sites = eval(`(${source})`)
      let result = await squirrelWrapper.merge(sites)
      if (result.code === 0) {
        await store.dispatch('saveSites')
      }
      return result
    },
    async mergeSitesFromUrl(url) {
      let source = await window.readTextFromUrl(url)
      let sites = eval(`(${source})`)
      let result = await squirrelWrapper.merge(sites)
      if (result.code === 0) {
        await store.dispatch('saveSites')
      }
      return result
    },
    async checkUpdate() {
      let versionText = await window.download('https://gitee.com/lanyuanxiaoyao/utools-data/raw/master/utools-torrent/version.json')
      let remoteVersion = JSON.parse(versionText).version
      let currentVersion = store.getters.version
      return {
        current: currentVersion,
        remote: remoteVersion,
        cmp: cmpVersion(currentVersion, remoteVersion)
      }
    }
  }
}
