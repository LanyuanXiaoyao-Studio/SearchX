import squirrel from '@/squirrel'
import store from '@/store'

export default {
  importSitesFromFile(path) {
    console.log('path', path)
    let source = window.readAllFile(path)
    // console.log('source', source)
    let sites = eval(`(${source})`)
    // console.log('sites waited import', sites)
    let result = squirrel.merge(source)
    console.log(result)
  }
}
