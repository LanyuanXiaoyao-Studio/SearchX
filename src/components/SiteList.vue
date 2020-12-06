<template>
  <div class="site-list">
    <a-empty
        v-if="!sites || sites.length === 0"
        description="请在设置中更新订阅"
    />
    <a-tabs
        v-else
        :default-active-key="0"
        tab-position="left"
    >
      <a-tab-pane
          v-for="(list, name, index) in categories"
          :key="index"
          :tab="name"
      >
        <a-list
            :data-source="list"
            class="site-list-panel"
            item-layout="horizontal"
        >
          <a-list-item
              slot="renderItem"
              slot-scope="site, index"
          >
            <a-row style="width: 100%">
              <a-col
                  :span="4"
                  class="site-icon"
              >
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>点击访问官网</span>
                  </template>
                  <a-avatar
                      :src="site.icon"
                      shape="square"
                      size="small"
                  />
                </a-tooltip>
              </a-col>
              <a-col
                  :span="20"
                  class="site-info"
              >
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>点击选择站点</span>
                  </template>
                  <div
                      class="name"
                      @click="selectSite(site)"
                  >
                    {{ site.name }}
                    <span class="author">@{{ site.author }}</span>
                  </div>
                </a-tooltip>
                <div class="description">
                  {{ site.description }}
                </div>
              </a-col>
            </a-row>
          </a-list-item>
        </a-list>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import isEmpty from 'licia/isEmpty'

export default {
  name: 'SiteList',
  props: {
    sites: Array,
    categories: Object,
  },
  data() {
    return {
      selectedTags: [],
    }
  },
  mounted() {
    console.log(this.categories)
  },
  computed: {
    siteTags() {
      return [...new Set(this.sites.map(s => s.category))]
    },
    filterSites() {
      return isEmpty(this.selectedTags)
          ? this.sites
          : this.sites.filter(s => this.selectedTags.indexOf(s.category) > -1)
    },
  },
  methods: {
    handleChange(tag, checked) {
      const {selectedTags} = this;
      this.selectedTags = checked
          ? [...selectedTags, tag]
          : selectedTags.filter(t => t !== tag);
    },
    selectSite(site) {
      this.$emit('select', site)
    },
  },
}
</script>

<style
    lang="stylus"
    scoped
>
.site-list
  //margin-left: -50px
  width auto

  .site-icon
    width 50px
    cursor pointer

  .site-info
    .name
      font-weight 450
      font-size 1.05rem
      cursor pointer

    .author
      color darkgrey
      font-weight normal
      font-size smaller
      font-style italic
      float right
      padding-right 10px

    .description
      color #8c8c8c
</style>
