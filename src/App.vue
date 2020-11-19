<template>
  <div class="app">
    <div class="app-title">
      <a-page-header
          sub-title="跨平台一站式搜索工具"
          title="SearchX"
      >
        <template slot="tags">
          <img
              alt="GitHub release (latest by date)"
              src="https://img.shields.io/badge/-0.2.0-lightgrey"
          >
        </template>
      </a-page-header>
    </div>
    <a-back-top
        :visibilityHeight="10"
    />
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

  .app-title
    margin-top 10px

    .ant-page-header
      padding 15px 0 5px 12px
</style>
