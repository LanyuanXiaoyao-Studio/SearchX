<template>
  <div class="settings-about">
    <div v-html="about.disclaimer"/>
    <div>
      <a-button
              @click="openPublish"
              type="link"
      >
        发布页
      </a-button>
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
          window.openInBrowser(url)
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

  .ant-btn
    padding 0
</style>
