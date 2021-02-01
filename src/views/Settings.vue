<template>
  <div class="settings">
    <a-card
        size="small"
        title="代理设置"
    >
      <Proxy/>
    </a-card>
    <Rules/>
    <a-card
        v-if="mode === 'utools'"
        size="small"
        title="其他作品"
    >
      <Extra/>
    </a-card>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Proxy from '@/components/settings/Proxy'
import Rules from '@/components/settings/Rules'
import Extra from '@/components/settings/Extra'

export default {
  name: 'Settings',
  components: {
    Proxy,
    Rules,
    Extra,
  },
  computed: {
    ...mapGetters([
      'mode'
    ])
  },
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
