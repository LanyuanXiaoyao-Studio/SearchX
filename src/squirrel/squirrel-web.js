import superagent from 'superagent'
import store from '@/store'
import Vue from 'vue'
import {isNil, base64, strToBytes} from 'licia'

const env = process.env.NODE_ENV

const base = env === 'development' ? 'http://localhost:10086/management' : '/management'

window.download = async url => (await superagent.get(`${base}/simpleGet?url=${base64.encode(strToBytes(url))}`)).text
window.squirrelInitialReady = async () => {
  let result = await squirrel.fetch()
  if (result.code === 0) {
    // console.log('squirrelInitialReady', result)
    await squirrel.imports(result.data.sites)
  }
}
window.isFileExists = path => {
}
window.singleFileSelect = () => {
}
window.readTextFromFile = path => {
}
window.readTextFromUrl = async url => (await superagent.get(`${base}/simpleGet?url=${base64.encode(strToBytes(url))}`)).text
window.statistic = options => {
  superagent.get(options.url)
      .set(options.headers)
      .set('mode', 'web')
      .then(result => console.log(result))
      .catch(error => console.log(error))
}
window.openInExternal = url => window.open(url)
window.copyText = async text => {
  let fallback = text => {
    let textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.position = 'fixed'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      let successful = document.execCommand('copy');
      if (!successful) {
        throw new Error('Copy Failure')
      }
    } catch (err) {
      throw new Error('Copy Failure')
    }
    document.body.removeChild(textArea);
  }
  if (!navigator.clipboard) {
    fallback(text)
    return
  }
  await navigator.clipboard.writeText(text)
}
window.notify = (text, callback) => {
  let notify = () => {
    let notification = new Notification('SearchX', {
      body: text,
      requireInteraction: !isNil(callback)
    })
    if (!isNil(callback)) {
      notification.onclick = callback
      notification.close()
    }
  }
  if (Notification.permission === 'granted') {
    notify()
  }
  else if (Notification.permission === 'denied') {
    Vue.prototype.$message.info(text)
  }
  else {
    Notification.requestPermission()
                .then(permission => {
                  if (permission === 'granted') {
                    notify()
                  }
                  else if (permission === 'denied') {
                    Vue.prototype.$message.info(text)
                  }
                })
  }
}

export default {
  info: async version => JSON.parse((await superagent.get(`${base}/info`)).text),
  sites: async () => JSON.parse((await superagent.get(`${base}/sites?target=SEARCH`)).text),
  categories: async () => JSON.parse((await superagent.get(`${base}/categories?target=SEARCH`)).text),
  downloader: async () => JSON.parse((await superagent.get(`${base}/downloader`)).text),
  page: async request => eval(`(${(await superagent.post(`${base}/page`, request)).text})`),
  change: async request => JSON.parse((await superagent.post(`${base}/change`, request)).text),
  save: async information => await superagent.post(`${base}/save`, information),
  fetch: async () => JSON.parse((await superagent.get(`${base}/fetch`)).text),
  load: async information => JSON.parse((await superagent.post(`${base}/load`, information)).text),
  imports: async sites => {
    let result = JSON.parse((await superagent.post(`${base}/imports`, sites)).text)
    await store.dispatch('updateSitesAndCategories')
    return result
  },
  merge: async sites => {
    let result = JSON.parse((await superagent.post(`${base}/merge`, sites)).text)
    await store.dispatch('updateSitesAndCategories')
    return result
  },
  exports: async () => JSON.parse((await superagent.get(`${base}/exports`)).text),
  debug: async enable => JSON.parse((await superagent.get(`${base}/debug?enable=${enable}`)).text),
}
