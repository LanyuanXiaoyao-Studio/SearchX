<template>
  <div class="result-list">
    <a-list
        :data-source="data"
        item-layout="vertical"
        :style="`height: ${resultListHeight}px`"
    >
      <div slot="header">
        <b>搜索结果</b>
      </div>
      <div
          v-if="showLoadMore"
          slot="loadMore"
          :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
      >
        <a-spin v-if="loading"/>
        <a-button
            v-else
            type="link"
            @click="more"
        >
          加载更多
        </a-button>
      </div>
      <a-list-item
          slot="renderItem"
          slot-scope="item, index"
      >
        <a-button
            v-if="!openDirectly"
            slot="actions"
            class="operation-btn"
            type="link"
            @click="detail(item.link)"
        >
          <a-icon type="file-text"/>
          详情
        </a-button>
        <a-button
            slot="actions"
            class="operation-btn"
            type="link"
            @click="openInBrowser(item.link)"
        >
          <a-icon type="eye"/>
          查看
        </a-button>
        <a-list-item-meta :description="item.author">
          <span slot="title">
            {{ item.title }}
          </span>
          <a-avatar
              v-if="item.avatar && item.avatar !== ''"
              slot="avatar"
              :src="item.avatar"
          />
        </a-list-item-meta>
        <div class="item-description">
          {{ item.description ? item.description : '暂无简介' }}
        </div>
        <div class="item-tags">
          <a-tag
              v-for="tag in generateTagList(item)"
              :key="tag.name"
              effect="plain"
              size="small"
              type="info"
          >
            <a-icon :type="tag.icon"/>
            {{ tag.content }}
          </a-tag>
        </div>
        <img
            v-if="item.image && item.image !== ''"
            slot="extra"
            :src="item.image"
            alt="image"
            class="item-image"
        />
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import utils from '@/utils/utils'

export default {
  name: 'ResultList',
  props: {
    data: Array,
    openDirectly: Boolean,
    loading: Boolean,
    showLoadMore: Boolean,
  },
  data() {
    return {
      clientHeight: 0
    }
  },
  mounted() {
    this.clientHeight = document.documentElement.clientHeight
    window.onresize = () => {
      this.clientHeight = document.documentElement.clientHeight
    }
  },
  computed: {
    resultListHeight() {
      return this.clientHeight - 125
    }
  },
  methods: {
    more() {
      this.$emit('more')
    },
    detail(url) {
      this.$emit('detail', url)
    },
    openInBrowser(url) {
      window.openInBrowser(url)
    },
    generateTagList(item) {
      return utils.generateTagList(item)
    },
  }
}
</script>

<style
    lang="stylus"
    scoped
>
.result-list
  padding 5px

  .ant-list
    overflow scroll
    scroll overflow-y

    .item-image
      max-height 150px

    .item-tags
      margin-top 10px

    .operation-btn
      margin 0
      padding 0
</style>
