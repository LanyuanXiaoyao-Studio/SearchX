<template>
  <div class="settings">
    <a-card
        size="small"
        title="代理设置"
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
        title="支持一下"
    >
      <Donate/>
    </a-card>
    <a-card
        size="small"
        title="其他作品"
        v-if="appMode === 'utools'"
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

const appMode = process.env.VUE_APP_MODE

export default {
  name: 'Settings',
  components: {
    Proxy,
    Rules,
    About,
    Donate,
    Extra,
  },
  data() {
    return {
      appMode: appMode
    }
  },
  async mounted() {
    const appMode = process.env.VUE_APP_MODE
    // 插件信息放在 gitee 上可以保证国内的访问速度, github 在国内访问不稳定
    if (isEmpty(this.$store.getters.about.author)) {
      window.download('https://gitee.com/lanyuanxiaoyao/utools-data/raw/master/common.json', '{}', '', 'utf8')
            .then(result => {
              let data = JSON.parse(result)
              // console.log(data)
              this.$store.commit('updateAuthor', data['author'])
            })
            .catch(error => {
              console.log(error)
            })
    }
    // console.log(appMode)
    if (isEmpty(this.$store.getters.about.disclaimer)) {
      window.download(`https://gitee.com/lanyuanxiaoyao/utools-data/raw/master/utools-torrent/disclaimer/${appMode}.json`, '{}', '', 'utf8')
            .then(result => {
              let data = JSON.parse(result)
              // console.log(data)
              this.$store.commit('updateDisclaimer', data['disclaimer'])
            })
            .catch(error => {
              console.log(error)
            })
    }
    if (isEmpty(this.$store.getters.about.publish)) {
      window.download(`https://gitee.com/lanyuanxiaoyao/utools-data/raw/master/utools-torrent/disclaimer/${appMode}.json`, '{}', '', 'utf8')
            .then(result => {
              let data = JSON.parse(result)
              // console.log(data)
              this.$store.commit('updatePublish', data['publish'])
            })
            .catch(error => {
              console.log(error)
            })
    }
    if (appMode === 'utools' && isEmpty(this.$store.getters.about.plugins)) {
      window.download('https://gitee.com/lanyuanxiaoyao/utools-data/raw/master/plugins.json', '{}', '', 'utf8')
            .then(result => {
              let data = JSON.parse(result)
              // console.log(data)
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

  .ant-btn-success
    color white
    background-color #3869cb

  .ant-table-small
    border 0
</style>
