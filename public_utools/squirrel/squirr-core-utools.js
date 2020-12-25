// Node native http/https downloader
const agent = require('https-proxy-agent')
const phin = require('phin')
const iconv = require('iconv-lite')

window.nodeDownload = async (url, headers, proxy, charset) => {
  headers = JSON.parse(headers)
  let options = {
    url: url,
    followRedirects: true,
    core: {
      headers: headers
    }
  }
  if (proxy && proxy !== '') {
    options.core.agent = new agent(`${proxy}`)
  }
  let response = await phin(options)
  if (response && response.body) {
    return iconv.decode(response.body, charset)
  }
  return ''
}

// uTools ubrowser downloader
window.uBrowserDownload = async (url, proxy, charset) => {
  // console.log(url, headers, proxy, charset)
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
  try {
    let data = utools.db.get(id)
    if (!data || data.error) {
      return defaultData
    }
    rev = data._rev
    return data.data
  } catch (e) {
    return defaultData
  }
}

window.put = data => {
  try {
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
  } catch (e) {
    return false
  }
}

const squirrelLib = require('./squirrel-utools-0.3.118-SNAPSHOT')
window.squirrelLib = squirrelLib
