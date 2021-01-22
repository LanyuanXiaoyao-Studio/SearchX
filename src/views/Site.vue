<template>
  <div class="site">
    Site
  </div>
</template>

<script>
import {isEmpty, isNil, find} from 'licia';
import {mapGetters} from 'vuex';

export default {
  name: 'Site',
  data() {
    return {
      site: {}
    }
  },
  mounted() {
    let code = this.$route.params.code
    if (isNil(code) || isEmpty(code)) {
      this.$message.error('参数 code 不存在')
      return
    }
    let site = this.findSite(code)
    if (isNil(site)) {
      this.$message.error('站点 code 不存在')
      return
    }
    this.site = site
    // console.log('site', this.site.name, this.site)
  },
  computed: {
    ...mapGetters([
      'mode',
      'version',
      'sites',
    ])
  },
  methods: {
    findSite(code) {
      return find(this.sites, site => site.code === code)
    }
  }
}
</script>

<style
    lang="stylus"
    scoped
>

</style>
