<template lang="pug">
  .site-source-code
    MonacoEditor(
      v-model="siteSourceJsonText"
      :options="options"
      :style="{width: '100%', height: editorHeight}"
      class="editor"
      language="json")
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
      clientHeight: 500,
      options: {
        readOnly: true,
        scrollBeyondLastLine: false,
        wordWrap: 'on',
      }
    }
  },
  mounted() {
    this.clientHeight = document.documentElement.clientHeight
  },
  computed: {
    siteSourceJsonText() {
      return JSON.stringify(this.siteSource, (key, value) => value ? value: undefined, 2)
    },
    editorHeight() {
      return this.clientHeight * 0.85 + 'px'
    }
  }
}
</script>

<style
    lang="stylus"
    scoped
>
</style>
