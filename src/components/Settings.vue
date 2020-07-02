<template>
  <div class="settings">
    <el-card>
      <div
              class="clearfix"
              slot="header"
      >
        <span><b>基本设置</b></span>
      </div>
      <Proxy/>
    </el-card>
    <el-card>
      <div
              class="clearfix"
              slot="header"
      >
        <span><b>关于插件</b></span>
      </div>
      <About/>
    </el-card>
    <el-card>
      <div
              class="clearfix"
              slot="header"
      >
        <span><b>交个朋友</b></span>
      </div>
      <Donate/>
    </el-card>
    <el-card>
      <div
              class="clearfix"
              slot="header"
      >
        <span><b>更多插件</b></span>
      </div>
      <Extra/>
    </el-card>
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
    .el-card + .el-card
      margin-top 10px

    .el-button
      margin-top 5px

    .el-button + .el-button
      margin-left 5px
</style>
