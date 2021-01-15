import {isEmpty, isFn, isPromise} from 'licia'
import Vue from 'vue'

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
  }
}
