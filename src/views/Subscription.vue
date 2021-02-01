<template>
  <div class="subscription">
    <a-space
        :size="constants.spaceSize"
        direction="vertical"
    >
      <Rules/>
    </a-space>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Rules from '@/components/settings/Rules'

export default {
  name: 'Subscription',
  components: {
    Rules
  },
  computed: {
    ...mapGetters([
      'constants'
    ])
  }
}
</script>

<style
    lang="stylus"
>
.subscription
  .ant-table-small
    border 0
</style>
