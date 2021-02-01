<template>
  <div class="subscription">
    <a-space direction="vertical">
      <Rules/>
    </a-space>
  </div>
</template>

<script>
import Rules from '@/components/settings/Rules'

export default {
  name: 'Subscription',
  components: {
    Rules
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
