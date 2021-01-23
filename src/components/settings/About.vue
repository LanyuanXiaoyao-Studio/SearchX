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
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {isEmpty, isNil} from 'licia';

export default {
  name: 'SettingsAbout',
  computed: {
    ...mapGetters([
      'about',
    ]),
    isLoading() {
      return isNil(this.about.disclaimer) || isEmpty(this.about.disclaimer)
    }
  },
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
