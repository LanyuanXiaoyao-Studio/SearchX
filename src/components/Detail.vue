<template>
  <div class="detail">
    <a-descriptions
        :column="2"
        size="small"
    >
      <a-descriptions-item
          v-if="text.title"
          :span="2"
          label="名称"
      >
        {{ text.title }}
      </a-descriptions-item>
      <a-descriptions-item
          v-for="tag in generateTagList(text)"
          :key="tag.name"
          :label="tag.name"
      >
        {{ tag.content }}
      </a-descriptions-item>
      <a-descriptions-item
          v-if="text.description"
          :span="2"
          label="描述"
      >
        {{ text.description }}
      </a-descriptions-item>
    </a-descriptions>
    <a-card
        v-for="item in list"
        :key="item.content"
        :title="item.title ? item.title : ''"
        size="small"
    >
          <span slot="extra">
            <a-button
                :disabled="!item.content"
                size="small"
                type="link"
                @click="copy(item.content)"
            >
              复制
            </a-button>
            <a-button
                :disabled="!item.content"
                size="small"
                type="link"
                @click="open(item.content)"
            >
              打开
            </a-button>
          </span>
      <a-textarea
          :auto-size="{ minRows: 1, maxRows: 5 }"
          :value="item.content ? item.content : ''"
          readOnly
      />
    </a-card>
  </div>
</template>

<script>
import isNil from 'licia/isNil'
import isEmpty from 'licia/isEmpty'
import utils from '@/utils/utils'

export default {
  name: 'detail',
  props: {
    data: Object
  },
  data() {
    return {}
  },
  computed: {
    text() {
      return (isNil(this.data.text) || isEmpty(this.data.text))
          ? {}
          : this.data.text
    },
    list() {
      return (isNil(this.data.list) || isEmpty(this.data.list))
          ? []
          : this.data.list
    },
  },
  methods: {
    copy(url) {
      if (isNil(url) || isEmpty(url)) {
        this.$message.error('复制失败')
        return
      }
      window.copyText(url)
      this.$message.success('复制成功')
    },
    open(url) {
      if (isNil(url) || isEmpty(url)) {
        this.$message.error('打开失败')
        return
      }
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
.detail
  .ant-card
    margin-top 10px
</style>
