import store from '@/store'

console.log(store)
window.store = store
console.log(window.store)

const appMode = process.env.VUE_APP_MODE
console.log(`Current Mode: ${appMode}`)

let Squirrel
if (appMode === 'utools') {
  let SquirrelClient = require('@/utils/squirrel-utools-0.3.103-SNAPSHOT')
  Squirrel = SquirrelClient.com.lanyuanxiaoyao.squirrel.utools
}
else if (appMode === 'electron') {
  let SquirrelClient = require('@/utils/squirrel-electron-0.3.103-SNAPSHOT')
  Squirrel = SquirrelClient.com.lanyuanxiaoyao.squirrel.electron
}

console.log(Squirrel.info())
Squirrel.debug('true')

window.squirrel = {
  info: () => JSON.parse(Squirrel.info('default')),
  sites: () => JSON.parse(Squirrel.sites('SEARCH')),
  categories: () => JSON.parse(Squirrel.categories('SEARCH')),
  downloader: () => JSON.parse(Squirrel.downloader()),
  page: async request => eval(`(${await Squirrel.page(JSON.stringify(request))})`),
  change: request => JSON.parse(Squirrel.change(request)),
  save: information => Squirrel.save(JSON.stringify(information)),
  fetch: () => JSON.parse(Squirrel.fetch()),
  load: information => JSON.parse(Squirrel.load(information)),
  imports: sites => {
    JSON.parse(Squirrel.imports(sites))
    store.commit('updateSitesAndCategories')
  },
  debug: enable => JSON.parse(Squirrel.debug(enable))
}

export default {
  ...window.squirrel
}
