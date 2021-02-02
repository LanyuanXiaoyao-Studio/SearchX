<template lang="pug">
  .site-description
    a-descriptions(:column="3" size="small")
      template(slot="title")
        div(v-if="showHeader")
          img.site-icon(:src="site.icon" alt="site-icon")
          | {{ site.name }}
      a-descriptions-item
        a-icon(type="home")
        span.description-content.site-home(@click="openUrl(site.home)") {{ site.home }}
      a-descriptions-item(:span="2")
        a-icon(type="user")
        span.description-content {{ site.author }}
      a-descriptions-item(:span="3")
        a-icon(type="message")
        span.description-content {{ site.description }}
</template>

<script>
import Utils from '@/utils/utils'

export default {
  name: 'SiteDescription',
  props: {
    site: Object,
    showHeader: Boolean,
  },
  methods: {
    ...Utils.openUrl()
  }
}
</script>

<style
    lang="stylus"
    scoped
>
.site-description
  .site-icon
    margin-right 5px
    width 30px

  .description-content
    margin-left 5px

  .site-home
    color #298DFA
    cursor pointer
    text-decoration underline
</style>
