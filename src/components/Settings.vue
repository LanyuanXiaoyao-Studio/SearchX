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
  import About from './settings/About'
  import Donate from './settings/Donate'
  import Extra from './settings/Extra'

  export default {
    name: 'Settings',
    components: {
      Proxy,
      About,
      Donate,
      Extra,
    },
  }
</script>

<style lang="stylus">
  .settings
    .ant-card + .ant-card
      margin-top 10px

    .ant-btn
      margin-top 5px

    .ant-btn + .ant-btn
      margin-left 5px
</style>
