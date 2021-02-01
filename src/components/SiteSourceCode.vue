<template>
  <div class="site-source-code">
    <MonacoEditor
        v-model="siteSourceJsonText"
        :options="options"
        language="json"
        class="editor"
    />
  </div>
</template>

<script>
import MonacoEditor from 'vue-monaco'

export default {
  name: 'SiteSourceCode',
  props: {
    siteSource: Object
  },
  components: {
    MonacoEditor
  },
  data() {
    return {
      options: {
        readOnly: true
      }
    }
  },
  computed: {
    siteSourceJsonText() {
      return JSON.stringify(this.siteSource, null, 2)
    }
  }
}
</script>

<style
    lang="stylus"
    scoped
>
.site-source-code
  .editor
    width 100%
    height 500px
</style>
