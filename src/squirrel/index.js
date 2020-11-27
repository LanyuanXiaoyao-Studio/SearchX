import store from '@/store'

console.log(store)
window.store = store
console.log(window.store)

const appMode = process.env.VUE_APP_MODE
console.log(`Current Mode: ${appMode}`)

let squirrel
if (appMode === 'utools') {
  squirrel = require('@/squirrel/squirrel-utools-0.3.103-SNAPSHOT').com.lanyuanxiaoyao.squirrel.utools
}
else if (appMode === 'electron') {
  squirrel = require('@/squirrel/squirrel-electron-0.3.113-SNAPSHOT').com.lanyuanxiaoyao.squirrel.electron
}

console.log(squirrel)

console.log(squirrel.info())
squirrel.debug('true')

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
    mergeSitesFromFile(path) {
      console.log('path', path)
      let source = window.readAllFile(path)
      // console.log('source', source)
      let sites = eval(`(${source})`)
      // console.log('sites waited import', sites)
      let result = squirrelWrapper.merge(sites)
      if (result.code === 0) {
        store.commit('saveSites')
      }
      return result
    },
    mergeSitesFromUrl(url) {
    },
  }
}
