import store from '../store'
import SquirrelUtools from './squirrel-utools-0.3.96-SNAPSHOT';

const Squirrel = SquirrelUtools.com.lanyuanxiaoyao.squirrel.utools
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
