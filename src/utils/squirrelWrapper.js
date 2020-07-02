import Squirrel from './squirrel-0.0.3-beta';

window.squirrel = Squirrel

export default {
  info: () => JSON.parse(Squirrel.info('default')),
  sites: () => JSON.parse(Squirrel.sites('SEARCH')),
  categories: () => JSON.parse(Squirrel.categories('SEARCH')),
  page: async request => eval(`(${await Squirrel.page(JSON.stringify(request))})`),
  fetch: () => JSON.parse(Squirrel.fetch()),
  save: information => Squirrel.save(JSON.stringify(information))
}

