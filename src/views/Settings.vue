<template lang="pug">
  .settings
    a-space(:size="constants.spaceSize" direction="vertical")
      Proxy
      Rules
</template>

<script>
import {mapGetters} from 'vuex'
import Proxy from '@/components/settings/Proxy'
import Rules from '@/components/settings/Rules'

export default {
  name: 'Settings',
  components: {
    Proxy,
    Rules,
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
