<template>
  <div class="settings-about">
    <div v-html="about.disclaimer"/>
    <div>
      <el-button
              type="text"
              @click="openPublish"
      >
        插件发布页
      </el-button>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'SettingsAbout',
    computed: {
      ...mapGetters([
        'about',
      ]),
    },
    methods: {
      openPublish() {
        let url = this.about.publish
        if (url && url !== '') {
          utools.shellOpenExternal(url)
        }
      }
    }
  }
</script>

<style
        lang="stylus"
        scoped
>
  .settings-about p
    font-family serif
</style>
