<template>
  <div class="settings-proxy">
    <el-input
            size="medium"
            v-model="proxyUrl"
            placeholder="代理地址"
    />
    <div class="setting-buttons">
      <el-button
              type="primary"
              size="small"
              @click="change"
      >
        更改代理地址
      </el-button>
      <el-button
              type="danger"
              size="small"
              @click="clear"
      >
        清空代理
      </el-button>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Squirrel from '../../utils/squirrel'

  export default {
    name: 'SettingsProxy',
    data() {
      return {
        proxyUrl: ''
      }
    },
    computed: {
      ...mapGetters([
        'settings'
      ]),
    },
    mounted() {
      this.fetchData()
      console.log(this.settings)
      if (this.settings.proxy) {
        let hostname = this.settings.proxy.hostname
        let port = this.settings.proxy.port
        if (hostname && port && hostname !== '' && port !== -1) {
          this.proxyUrl = `${hostname}:${port}`
        }
      }
    },
    methods: {
      fetchData() {
        let settings = Squirrel.fetch()
        console.log('settings', settings)
        this.$store.commit('updateSettings', settings)
      },
      change() {
        try {
          let valueSplit = this.proxyUrl.split(':')
          let hostname = valueSplit[0]
          let port = parseInt(valueSplit[1])
          if (hostname && port && hostname !== '' && port > 0) {
            this.$store.commit('updateProxy', {
              hostname: hostname,
              port: port,
            })
            Squirrel.save(this.settings)
            this.$message.success('设置成功')
          }
          else {
            this.$message.error('设置失败')
          }
        } catch (ignore) {
          this.$message.error('设置失败')
        }
      },
      clear() {
        this.$store.commit('updateProxy', {
          hostname: '',
          port: -1
        })
        Squirrel.save(this.settings)
        this.proxyUrl = ''
        this.$message.success('设置成功')
      }
    }
  }
</script>
