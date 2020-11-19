<template>
  <div class="settings">
    <a-card
        size="small"
        title="基本设置"
    >
      <Proxy/>
    </a-card>
    <a-card
        size="small"
        title="规则订阅"
    >
      <Rules/>
    </a-card>
    <a-card
        size="small"
        title="关于插件"
    >
      <About/>
    </a-card>
    <a-card
        size="small"
        title="关于插件"
    >
      <Donate/>
    </a-card>
    <a-card
        size="small"
        title="关于插件"
    >
      <Extra/>
    </a-card>
  </div>
</template>

<script>
import Proxy from './settings/Proxy'
import Rules from './settings/Rules'
import About from './settings/About'
import Donate from './settings/Donate'
import Extra from './settings/Extra'
import isEmpty from 'licia/isEmpty'

export default {
  name: 'Settings',
  components: {
    Proxy,
    Rules,
    About,
    Donate,
    Extra,
  },
  async created() {
    // 插件信息放在 gitee 上可以保证国内的访问速度, github 在国内访问不稳定
    if (isEmpty(this.$store.getters.about.author) || isEmpty(this.$store.getters.about.disclaimer)) {
      window.nodeDownload('https://gitee.com/lanyuanxiaoyao/utools-data/raw/master/common.json', '{}', '', 'utf8')
            .then(result => {
              let data = JSON.parse(result)
              this.$store.commit('updateAuthor', data['author'])
              this.$store.commit('updateDisclaimer', data['disclaimer'])
            })
            .catch(error => {
              console.log(error)
            })
    }
    if (isEmpty(this.$store.getters.about.publish)) {
      window.nodeDownload('https://gitee.com/lanyuanxiaoyao/utools-data/raw/master/utools-torrent/common.json', '{}', '', 'utf8')
            .then(result => {
              let data = JSON.parse(result)
              this.$store.commit('updatePublish', data['publish'])
            })
            .catch(error => {
              console.log(error)
            })
    }
    if (isEmpty(this.$store.getters.about.plugins)) {
      window.nodeDownload('https://gitee.com/lanyuanxiaoyao/utools-data/raw/master/plugins.json', '{}', '', 'utf8')
            .then(result => {
              let data = JSON.parse(result)
              this.$store.commit('updatePlugins', data)
            })
            .catch(error => {
              console.log(error)
            })
    }
  }
}
</script>

<style lang="stylus">
.settings
  .ant-card + .ant-card
    margin-top 10px

  .ant-btn
    margin-top 5px
    font-size 0.9rem

  .ant-btn + .ant-btn
    margin-left 5px
</style>
