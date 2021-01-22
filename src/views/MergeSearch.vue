<template>
  <div class="merge-search">
    <a-space direction="vertical">
      <a-alert
          banner
          message="同时向多个站点发起搜索请求会导致性能降低，部分站点频繁请求可能会遭到源站屏蔽，请合理使用"
      />
      <a-input-search
          v-model="search"
          :loading="loading"
          class="search-input"
          placeholder="搜索内容"
          @search="query"
      />
      <div
          v-for="(category, key) in categories"
          :key="key"
          class="result-items-wrapper"
      >
        <h4 class="result-items-title">{{ key }}</h4>
        <a-collapse
            :bordered="false"
            class="result-items"
        >
          <template #expandIcon="props">
            <a-icon
                :rotate="props.isActive ? 90 : 0"
                type="caret-right"
            />
          </template>
          <a-collapse-panel
              v-for="site in category"
              :key="site.code"
          >
            <template slot="header">
              <img
                  :alt="site.name"
                  :src="site.icon"
                  class="avatar"
              />
              <span class="title">{{ site.name }}</span>
            </template>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </a-space>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'MergeSearch',
  data() {
    return {
      search: '',
      loading: false,
    }
  },
  computed: {
    ...mapGetters([
      'sites',
      'categories',
    ])
  },
  methods: {
    query() {

    }
  }
}
</script>

<style
    lang="stylus"
    scoped
>
.merge-search
  height 100%

  .ant-space
    width 100%

  .result-items-wrapper
    .result-items-title
      margin-left 10px
      color #565656

    .result-items
      background-color white

      .avatar
        width 20px
        height 20px

      .title
        font-size 0.9rem
        font-weight 630
        margin 0 0 0 10px
</style>
