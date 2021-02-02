<template lang="pug">
  .settings-donate
    p(style={fontFamily: 'serif'} v-html="about.author.lines")
    a-card
      a-row(:gutter="10")
        a-col(:span="8")
          a-avatar(:size="110" :src="about.author.donateCode" shape="square")
        a-col(:span="16")
          .business-card
            a-avatar.avatar(:src="about.author.avatar" size="large")
            .name
              span.find-me {{ about.author.name }}
            .slogan(v-html="about.author.slogan")
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'SettingsDonate',
  computed: {
    ...mapGetters([
      'about',
    ]),
  },
}
</script>

<style
    lang="stylus"
    scoped
>
.settings-donate
  padding-bottom 20px

  .ant-card
    width 360px

    .business-card
      text-align center

      .name
        font-size 1.25rem
        font-weight 450
        font-family sans-serif
        text-decoration underline

      .slogan
        color darkgray
        margin-top 5px
</style>
