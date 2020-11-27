<template>
  <div class="app">
    <a-config-provider :locale="zh">
      <router-view/>
    </a-config-provider>
  </div>
</template>

<script>
import zh from 'ant-design-vue/es/locale/zh_CN'

export default {
  name: 'App',
  data() {
    return {
      zh,
    }
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
