<template>
  <div class="site-source-code">
    {{ siteSourceJsonText }}
  </div>
</template>

<script>
export default {
  name: 'SiteSourceCode',
  props: {
    siteSource: Object
  },
  computed: {
    siteSourceJsonText() {
      return JSON.stringify(this.siteSource)
    }
  }
}
</script>

<style
    lang="stylus"
    scoped
>
</style>
