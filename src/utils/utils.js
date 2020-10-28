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
}
