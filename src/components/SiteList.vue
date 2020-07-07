<template>
  <div class="site-list">
    <div class="tag-filter">
      <template v-for="tag in siteTags">
        <a-checkable-tag
                :checked="selectedTags.indexOf(tag) > -1"
                :key="tag"
                @change="checked => handleChange(tag, checked)"
        >
          {{ tag }}
        </a-checkable-tag>
      </template>
    </div>
    <a-list
            :data-source="filterSites"
            item-layout="horizontal"
    >
      <a-list-item
              slot="renderItem"
              slot-scope="site, index"
      >
        <a-row>
          <a-col
                  :span="6"
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
                  :span="18"
                  class="site-info"
          >
            <a-tooltip placement="top">
              <template slot="title">
                <span>点击选择站点</span>
              </template>
              <div
                      @click="selectSite(site)"
                      class="name"
              >
                {{ site.name }}
              </div>
            </a-tooltip>
            <div class="description">
              {{ site.description }}
            </div>
            <div class="tags">
              <a-tag color="blue">{{ site.category }}</a-tag>
            </div>
          </a-col>
        </a-row>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
  import isEmpty from 'licia/isEmpty'

  export default {
    name: 'SiteList',
    props: {
      sites: Array,
    },
    data() {
      return {
        selectedTags: [],
      }
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
    .tag-filter
      margin-bottom 5px

    .site-icon
      width 50px
      cursor pointer

    .site-info
      .name
        font-weight 450
        font-size 1.05em
        text-decoration underline
        cursor pointer

      .description
        color darkgray
        width 300px

      .tags
        margin-top 5px
</style>
