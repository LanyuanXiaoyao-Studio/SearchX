<template>
  <div
      class="site-description"
  >
    <a-descriptions
        :column="3"
        size="small"
    >
      <template slot="title">
        <div v-if="showHeader">
          <img
              :src="site.icon"
              alt="site-icon"
              class="site-icon"
          >
          {{ site.name }}
        </div>
      </template>
      <a-descriptions-item>
        <a-icon type="home"/>
        <span
            class="description-content site-home"
            @click="openUrl(site.home)"
        >
          {{ site.home }}
        </span>
      </a-descriptions-item>
      <a-descriptions-item :span="2">
        <a-icon type="user"/>
        <span class="description-content">{{ site.author }}</span>
      </a-descriptions-item>
      <a-descriptions-item :span="3">
        <a-icon type="message"/>
        <span class="description-content">{{ site.description }}</span>
      </a-descriptions-item>
    </a-descriptions>
  </div>
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
    width 30px
    margin-right 5px

  .description-content
    margin-left 5px

  .site-home
    cursor pointer
    text-decoration underline
    color #298DFA
</style>
