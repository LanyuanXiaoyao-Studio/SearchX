<template>
  <div class="settings-proxy">
    <a-input
        v-model="proxyUrl"
        placeholder="代理地址: IP:PORT (无需协议名, 仅支持 HTTP 协议)"
    />
    <div class="setting-buttons">
      <a-space :size="constants.spaceSize">
        <a-button
            size="small"
            type="primary"
            @click="change"
        >
          更改代理地址
        </a-button>
        <a-button
            size="small"
            type="danger"
            @click="clear"
        >
          清空代理
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import squirrel from '@/squirrel'

export default {
  name: 'SettingsProxy',
  data() {
    return {
      proxyUrl: ''
    }
  },
  computed: {
    ...mapGetters([
      'settings',
      'constants',
    ]),
  },
  async mounted() {
    await this.$store.dispatch('updateSettings')
    if (this.settings.proxy) {
      let hostname = this.settings.proxy.hostname
      let port = this.settings.proxy.port
      if (hostname && port && hostname !== '' && port !== -1) {
        this.proxyUrl = `${hostname}:${port}`
      }
    }
  },
  methods: {
    async change() {
      try {
        let valueSplit = this.proxyUrl.split(':')
        let hostname = valueSplit[0]
        let port = parseInt(valueSplit[1])
        if (hostname && port && hostname !== '' && port > 0) {
          await this.$store.dispatch('updateProxy', {
            hostname: hostname,
            port: port,
          })
          this.$message.success('设置成功')
        }
        else {
          this.$message.error('设置失败')
        }
      } catch (ignore) {
        this.$message.error('设置失败')
      }
    },
    async clear() {
      await this.$store.dispatch('updateProxy', {
        hostname: '',
        port: -1
      })
      await squirrel.save(this.settings)
      this.proxyUrl = ''
      this.$message.success('设置成功')
    }
  }
}
</script>
