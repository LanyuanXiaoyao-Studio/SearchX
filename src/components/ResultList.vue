<template>
  <div class="result-list">
    <a-list
            :data-source="data"
            item-layout="vertical"
    >
      <div slot="header">
        <b>搜索结果</b>
      </div>
      <div
              :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
              slot="loadMore"
              v-if="showLoadMore"
      >
        <a-spin v-if="loading"/>
        <a-button
                @click="more"
                type="link"
                v-else
        >
          加载更多
        </a-button>
      </div>
      <a-list-item
              slot="renderItem"
              slot-scope="item, index"
      >
        <a-button
                @click="detail(item.link)"
                class="operation-btn"
                slot="actions"
                type="link"
        >
          <a-icon type="file-text"/>
          详情
        </a-button>
        <a-button
                @click="openInBrowser(item.link)"
                class="operation-btn"
                slot="actions"
                type="link"
        >
          <a-icon type="eye"/>
          查看
        </a-button>
        <a-list-item-meta :description="item.author">
          <span slot="title">
            {{ item.title }}
          </span>
        </a-list-item-meta>
        <div class="item-description">
          {{ item.description ? item.description : '暂无简介' }}
        </div>
        <div class="item-tags">
          <a-tag
                  effect="plain"
                  size="small"
                  type="info"
                  v-if="item.datetime"
          >
            <a-icon type="clock-circle"/>
            {{ item.datetime }}
          </a-tag>
          <a-tag
                  effect="plain"
                  size="small"
                  type="info"
                  v-if="item.size"
          >
            <a-icon type="inbox"/>
            {{ item.size }}
          </a-tag>
          <a-tag
                  effect="plain"
                  size="small"
                  type="info"
                  v-if="item.view"
          >
            <a-icon type="eye"/>
            {{ item.view }}
          </a-tag>
          <a-tag
                  effect="plain"
                  size="small"
                  type="info"
                  v-if="item.number"
          >
            <a-icon type="file"/>
            {{ item.number }}
          </a-tag>
          <a-tag
                  effect="plain"
                  size="small"
                  type="info"
                  v-if="item.location"
          >
            <a-icon type="environment"/>
            {{ item.location }}
          </a-tag>
        </div>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
  export default {
    name: 'ResultList',
    props: {
      data: Array,
      loading: Boolean,
      showLoadMore: Boolean,
    },
    methods: {
      more() {
        this.$emit('more')
      },
      detail(url) {
        this.$emit('detail', url)
      },
      openInBrowser(url) {
        utools.shellOpenExternal(url)
      },
    }
  }
</script>

<style
        lang="stylus"
        scoped
>
  .result-list
    height 100%
    padding 5px

    .ant-list
      height 100%

      .item-tags
        margin-top 10px

      .operation-btn
        margin 0
        padding 0
</style>
