<template>
  <div class="settings">
    <a-space
        :size="constants.spaceSize"
        direction="vertical"
    >
      <Proxy/>
      <Rules/>
      <Extra v-if="mode === 'utools'"/>
    </a-space>
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
      'mode',
      'constants'
    ])
  },
}
</script>

<style lang="stylus">
.settings
  .ant-btn
    margin-top 5px
    font-size 0.9rem

  .ant-table-small
    border 0
</style>
