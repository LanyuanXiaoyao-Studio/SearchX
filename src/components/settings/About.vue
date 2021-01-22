<template>
  <div class="settings-about">
    <a-skeleton
        v-show="isLoading"
        active
    />
    <div
        v-show="!isLoading"
        v-html="about.disclaimer"
    />
    <div>
      <a-button
          type="link"
          @click="openPublish"
      >
        发布页
      </a-button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {isEmpty, isNil} from 'licia';

export default {
  name: 'SettingsAbout',
  mounted() {
    console.log(this.isLoading)
  },
  computed: {
    ...mapGetters([
      'about',
    ]),
    isLoading() {
      return isNil(this.about.disclaimer) || isEmpty(this.about.disclaimer)
    }
  },
  methods: {
    openPublish() {
      let url = this.about.publish
      if (url && url !== '') {
        window.openInExternal(url)
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
