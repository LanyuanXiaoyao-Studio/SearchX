// Node native http/https downloader
const superagent = require('superagent')
require('superagent-proxy')(superagent)
const iconv = require('iconv-lite')

window.nodeDownload = async (url, headers, proxy, charset) => {
  headers = JSON.parse(headers)
  let requestAgent = superagent.get(encodeURI(url))
                               .buffer(true)
                               .parse(superagent.parse.image)
                               .set(headers)
  if (proxy && proxy !== '') {
    requestAgent.proxy(proxy)
  }
  let response = await requestAgent
  return iconv.decode(response.body, charset)
}

// uTools ubrowser downloader
window.uBrowserDownload = async (url, proxy, charset) => {
  if (proxy && proxy !== '') {
    utools.setUBrowserProxy({
      proxyRules: proxy
    })
  }
  let browserRunOptions = {
    show: false
  }
  let browser = utools.ubrowser.goto(url)
                      .evaluate(() => {
                        return `<html>${document.documentElement.innerHTML}</html>`
                      })
  let results = await browser.run(browserRunOptions)
  if (results && results.length && results.length > 0) {
    return results[0]
  }
  return ''
}

// uTools database
let id = ''
let defaultData = ''
let rev = ''
window.databaseInitial = (_id, _defaultData) => {
  id = _id
  defaultData = _defaultData
}

window.get = () => {
  let data = utools.db.get(id)
  if (!data || data.error) {
    return defaultData
  }
  rev = data._rev
  return data.data
}

window.put = data => {
  let result
  if (rev === '') {
    result = utools.db.put({
      _id: id,
      data: data
    })
  }
  else {
    result = utools.db.put({
      _id: id,
      data: data,
      _rev: rev
    })
  }
  return !result.error;
}

const sites = require('./sites')

const groupBy = (arr, func) =>
    arr.map(typeof func === 'function' ? func : val => val[func])
       .reduce((acc, val, i) => {
         acc[val] = (acc[val] || []).concat(arr[i]);
         return acc;
       }, {})

// uTools life circle
utools.onPluginReady(() => {
  if (window.squirrel) {
    window.squirrel.load(window.get())
    window.squirrel.import(JSON.stringify(sites))
    window.store.commit('updateSites', sites)
    window.store.commit('updateCategories', groupBy(sites, 'category'))

    // 插件信息放在 gitee 上可以保证国内的访问速度, github 在国内访问不稳定
    window.nodeDownload('https://gitee.com/lanyuanxiaoyao/utools-data/raw/master/common.json', '{}', '', 'utf8')
          .then(result => {
            let data = JSON.parse(result)
            window.store.commit('updateAuthor', data['author'])
            window.store.commit('updateDisclaimer', data['disclaimer'])
          })
          .catch(error => {
            console.log(error)
          })
    window.nodeDownload('https://gitee.com/lanyuanxiaoyao/utools-data/raw/master/utools-torrent/common.json', '{}', '', 'utf8')
          .then(result => {
            let data = JSON.parse(result)
            window.store.commit('updatePublish', data['publish'])
          })
          .catch(error => {
            console.log(error)
          })
    window.nodeDownload('https://gitee.com/lanyuanxiaoyao/utools-data/raw/master/plugins.json', '{}', '', 'utf8')
          .then(result => {
            let data = JSON.parse(result)
            window.store.commit('updatePlugins', data)
          })
          .catch(error => {
            console.log(error)
          })
  }
})

// Executor for running script
window.scriptExecutor = (script, text, paramsJson) => {
  let params = JSON.parse(paramsJson);
  let jsFunction = new Function('text', 'params', script);
  let result = jsFunction(text, params);
  return result ? JSON.stringify(result) : '';
};
