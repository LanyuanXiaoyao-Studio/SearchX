<template lang="pug">
  .result-list
    a-list(:data-source="data" item-layout="vertical")
      div(slot="header")
        b 搜索结果
      div(
        v-if="showLoadMore"
        slot="loadMore"
        style={
          textAlign: 'center',
          marginTop: '12px',
          height: '32px',
          lineHeight: '32px'
        })
        a-spin(v-if="loading")
        a-button(v-else type="link" @click="more") 加载更多
      a-list-item(slot="renderItem" slot-scope="item, index")
        a-button(
          v-if="!openDirectly"
          slot="actions"
          class="operation-btn"
          type="link"
          @click="detail(item.link)")
          a-icon(type="file-text")
          | 详情
        a-button(
          slot="actions"
          class="operation-btn"
          type="link"
          @click="openInExternal(item.link)")
          a-icon(type="eye")
          | 查看
        a-button(
          v-if="item.magnet"
          slot="actions"
          class="operation-btn"
          type="link"
          @click="openInExternal(item.magnet)")
          a-icon(type="download")
          | 下载
        a-list-item-meta(:description="item.author")
          span(slot="title") {{ item.title }}
          a-avatar(v-if="item.avatar && item.avatar !== ''" slot="avatar" :src="item.avatar")
        .item-description {{ item.description ? item.description : '暂无简介' }}
        .item-tags
          a-tag(
            v-for="tag in generateTagList(item)"
            :key="tag.name"
            effect="plain"
            size="small"
            type="info")
            a-icon.tag-icon(:type="tag.icon")
            | {{ tag.content }}
        img(
          v-if="item.image && item.image !== ''"
          slot="extra"
          :src="item.image"
          alt="image"
          class="item-image")
</template>

<script>
import {mapGetters} from 'vuex'
import utils from '@/utils/utils'

export default {
  name: 'ResultList',
  props: {
    data: Array,
    openDirectly: Boolean,
    loading: Boolean,
    showLoadMore: Boolean,
  },
  computed: {
    ...mapGetters([
      'mode'
    ]),
  },
  methods: {
    more() {
      this.$emit('more')
    },
    detail(url) {
      this.$emit('detail', url)
    },
    openInExternal(url) {
      window.openInExternal(url)
      window.notify(`打开 ${url}`, () => window.openInExternal(url))
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
  background-color white
  border-radius 4px
  border 1px solid #d9d9d9
  padding 5px 10px 5px 10px

  .site-list-panel
    height 400px

.ant-list
  .item-image
    max-height 150px

  .item-tags
    margin-top 10px

  .tag-icon
    margin-right 3px

  .operation-btn
    margin 0
    padding 0
</style>
