import SquirrelUtools from './squirrel-utools-0.2.69';

const Squirrel = SquirrelUtools.com.lanyuanxiaoyao.squirrel.utools

window.squirrel = Squirrel

export default {
  info: () => JSON.parse(Squirrel.info('default')),
  sites: () => JSON.parse(Squirrel.sites('SEARCH')),
  categories: () => JSON.parse(Squirrel.categories('SEARCH')),
  page: async request => eval(`(${await Squirrel.page(JSON.stringify(request))})`),
  fetch: () => JSON.parse(Squirrel.fetch()),
  save: information => Squirrel.save(JSON.stringify(information))
}
