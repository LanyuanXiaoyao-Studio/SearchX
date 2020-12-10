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

console.log(squirrel.info())
squirrel.debug('false')

let squirrelWrapper = {
  info: () => JSON.parse(squirrel.info('default')),
  sites: () => JSON.parse(squirrel.sites('SEARCH')),
  categories: () => JSON.parse(squirrel.categories('SEARCH')),
  downloader: () => JSON.parse(squirrel.downloader()),
  page: async request => eval(`(${await squirrel.page(JSON.stringify(request))})`),
  change: request => JSON.parse(squirrel.change(request)),
  save: information => squirrel.save(JSON.stringify(information)),
  fetch: () => JSON.parse(squirrel.fetch()),
  load: information => JSON.parse(squirrel.load(information)),
  imports: sites => {
    JSON.parse(squirrel.imports(JSON.stringify(sites)))
    store.commit('updateSitesAndCategories')
  },
  merge: sites => {
    let result = JSON.parse(squirrel.merge(JSON.stringify(sites)))
    store.commit('updateSitesAndCategories')
    return result
  },
  exports: () => JSON.parse(squirrel.exports()),
  debug: enable => JSON.parse(squirrel.debug(enable)),
}

window.squirrel = squirrelWrapper

export default {
  ...squirrelWrapper,
  services: {
    async mergeSitesFromFile(path) {
      console.log('path', path)
      let source = await window.readTextFromFile(path)
      // console.log('source', source)
      let sites = eval(`(${source})`)
      // console.log('sites waited import', sites)
      let result = squirrelWrapper.merge(sites)
      if (result.code === 0) {
        store.commit('saveSites')
      }
      return result
    },
    async mergeSitesFromUrl(url) {
      console.log('url', url)
      let source = await window.readTextFromUrl(url)
      // console.log('source', source)
      let sites = eval(`(${source})`)
      // console.log('sites waited import', sites)
      let result = squirrelWrapper.merge(sites)
      if (result.code === 0) {
        store.commit('saveSites')
      }
      return result
    },
    async checkUpdate() {
      let versionText = await window.nodeDownload('https://gitee.com/lanyuanxiaoyao/utools-data/raw/master/utools-torrent/version.json', '{}', '', 'utf8')
      let remoteVersion = JSON.parse(versionText).version
      let currentVersion = store.getters.version
      console.log('version', remoteVersion, currentVersion, cmpVersion(currentVersion, remoteVersion))
      return {
        current: currentVersion,
        remote: remoteVersion,
        cmp: cmpVersion(currentVersion, remoteVersion)
      }
    }
  }
}
