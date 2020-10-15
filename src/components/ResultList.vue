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
              v-if="item.image"
              slot="avatar"
              :src="item.image"
          />
        </a-list-item-meta>
        <div class="item-description">
          {{ item.description ? item.description : '暂无简介' }}
        </div>
        <div class="item-tags">
          <a-tag
              v-for="tag in generateTagList(item)"
              :key="tag"
              effect="plain"
              size="small"
              type="info"
          >
            <a-icon :type="tag.icon"/>
            {{ tag.content }}
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
    openDirectly: Boolean,
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
    generateTagList(item) {
      let tagList = []
      if (item.datetime) tagList.push(this.generateTagData('clock-circle', item.datetime))
      if (item.size) tagList.push(this.generateTagData('inbox', item.size))
      if (item.view) tagList.push(this.generateTagData('eye', item.view))
      if (item.number) tagList.push(this.generateTagData('file', item.number))
      if (item.location) tagList.push(this.generateTagData('environment', item.location))
      if (item.version) tagList.push(this.generateTagData('fork', item.version))
      if (item.star) tagList.push(this.generateTagData('star', item.star))
      if (item.language) tagList.push(this.generateTagData('code', item.language))
      if (item.download) tagList.push(this.generateTagData('download', item.download))
      if (item.author) tagList.push(this.generateTagData('user', item.author))
      return tagList
    },
    generateTagData(iconName, content) {
      return {
        icon: iconName,
        content: content,
      }
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
