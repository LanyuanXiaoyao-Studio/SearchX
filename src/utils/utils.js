import {isEmpty, isFn, isNil, isPromise} from 'licia'
import Vue from 'vue'
import store from '@/store'

const isDevelopment = process.env.NODE_ENV !== 'production'

export default {
  generateTagList(item) {
    let tagList = []
    if (item.datetime) tagList.push(this.generateTagData('时间', 'clock-circle', item.datetime))
    if (item.size) tagList.push(this.generateTagData('大小', 'inbox', item.size))
    if (item.view) tagList.push(this.generateTagData('被浏览', 'eye', item.view))
    if (item.number) tagList.push(this.generateTagData('文件个数', 'file', item.number))
    if (item.location) tagList.push(this.generateTagData('地址', 'environment', item.location))
    if (item.version) tagList.push(this.generateTagData('版本', 'fork', item.version))
    if (item.star) tagList.push(this.generateTagData('赞', 'star', item.star))
    if (item.language) tagList.push(this.generateTagData('语言', 'code', item.language))
    if (item.download) tagList.push(this.generateTagData('下载数', 'download', item.download))
    if (item.other) tagList.push(this.generateTagData('其他', 'bulb', item.other))
    if (item.score) tagList.push(this.generateTagData('评分', 'area-chart', item.score))
    return tagList
  },
  generateTagData(name, iconName, content) {
    return {
      name: name,
      icon: iconName,
      content: content,
    }
  },
  generateErrorMessage(error) {
    return `${!isEmpty(error) ? !isEmpty(error.data) ? error.data : error.message : 'Unknown Error'}`
  },
  loadingMessage(process, loadingMessage = '', successMessage = '', errorMessage = '') {
    if (!isFn(process) && !isPromise(process)) throw Error(`${process} is not function`)
    loadingMessage = isEmpty(loadingMessage) ? '加载数据...' : loadingMessage
    successMessage = isEmpty(successMessage) ? '加载成功' : successMessage
    errorMessage = isEmpty(errorMessage) ? '加载失败' : errorMessage
    let key = 'updatable'
    let hide = Vue.prototype.$message.loading({content: loadingMessage, key, duration: 0})
    if (isPromise(process)) {
      process
        .then(result => Vue.prototype.$message.success({content: successMessage, key}))
        .catch(error => Vue.prototype.$message.error({content: `${errorMessage}: ${error}`, key}))
    }
    else {
      try {
        process()
        Vue.prototype.$message.success({content: successMessage, key})
      } catch (e) {
        Vue.prototype.$message.error({content: `${errorMessage}: ${error}`, key})
        throw e
      } finally {
        hide()
      }
    }
  },
  async loadAbout() {
    let mode = store.getters.mode
    // 插件信息放在 gitee 上可以保证国内的访问速度, github 在国内访问不稳定
    if (isEmpty(store.getters.about.author)) {
      window.download('https://gitee.com/lanyuanxiaoyao/utools-data/raw/master/common.json', '{}', '', 'utf8')
            .then(result => {
              let data = JSON.parse(result)
              // console.log(data)
              store.commit('updateAuthor', data['author'])
            })
            .catch(error => {
              console.log(error)
            })
    }
    if (isEmpty(store.getters.about.disclaimer)) {
      window.download(`https://gitee.com/lanyuanxiaoyao/utools-data/raw/master/utools-torrent/disclaimer/${mode}.json`, '{}', '', 'utf8')
            .then(result => {
              let data = JSON.parse(result)
              // console.log(data)
              store.commit('updateDisclaimer', data['disclaimer'])
            })
            .catch(error => {
              console.log(error)
            })
    }
    if (isEmpty(store.getters.about.publish)) {
      window.download(`https://gitee.com/lanyuanxiaoyao/utools-data/raw/master/utools-torrent/disclaimer/${mode}.json`, '{}', '', 'utf8')
            .then(result => {
              let data = JSON.parse(result)
              // console.log(data)
              store.commit('updatePublish', data['publish'])
            })
            .catch(error => {
              console.log(error)
            })
    }
  },
  // 方便在各个地方使用 mixin 混入的方法
  openUrl() {
    return {
      openUrl(url) {
        window.openInExternal(url)
      },
    }
  },
  // 统计埋点
  statistic(path, event) {
    // 如果是开发模式, 不发送统计信息
    if (isDevelopment) return
    let query = {}
    query['path'] = path
    if (!isNil(event)) {
      query['event'] = event
    }
    try {
      let api = require('@/private/StatisticsApi')
      if (!isNil(api)) {
        let options = api.default.tencentApi()
                         .options(query)
        console.log('options', options)
        if (!isNil(options)) {
          window.statistic(options)
        }
      }
    } catch (e) {
      // Ignored
      console.log(e)
    }
  },
}
