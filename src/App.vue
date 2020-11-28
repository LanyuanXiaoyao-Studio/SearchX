<template>
  <div class="app">
    <a-config-provider :locale="zh">
      <router-view/>
    </a-config-provider>
  </div>
</template>

<script>
import squirrel from '@/squirrel'
import zh from 'ant-design-vue/es/locale/zh_CN'

export default {
  name: 'App',
  data() {
    return {
      zh,
    }
  },
  mounted() {
    squirrel.services.checkUpdate()
            .then(result => {
              console.log(result)
              if (result.cmp < 0) {
                this.$notification['warning']({
                  duration: null,
                  message: '发现新版本',
                  description: `当前版本: ${result.current} → 最新版本: ${result.remote}`,
                  btn: h => {
                    return h(
                        'a-button',
                        {
                          props: {
                            type: 'link',
                            size: 'small',
                          },
                          on: {
                            click: () => {
                              alert('hello')
                            }
                          }
                        },
                        '前往下载'
                    )
                  }
                })
              }
            })
            .catch(error => {
              this.$message.error(`无法检查更新: ${error}`)
            })
  }
}
</script>

<style
    lang="stylus"
    scoped
>
.app
  height 100%
</style>
