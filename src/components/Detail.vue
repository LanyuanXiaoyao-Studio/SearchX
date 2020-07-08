<template>
  <div class="detail">
    <a-descriptions
            :column="3"
            bordered
            layout="vertical"
    >
      <a-descriptions-item
              :span="3"
              label="名称"
              v-if="text.title"
      >
        {{ text.title }}
      </a-descriptions-item>
      <a-descriptions-item
              label="作者"
              v-if="text.author"
      >
        {{ text.author }}
      </a-descriptions-item>
      <a-descriptions-item
              label="时间"
              v-if="text.datetime"
      >
        {{ text.datetime }}
      </a-descriptions-item>
      <a-descriptions-item
              label="大小"
              v-if="text.size"
      >
        {{ text.size }}
      </a-descriptions-item>
      <a-descriptions-item
              :span="3"
              label="描述"
              v-if="text.description"
      >
        {{ text.description }}
      </a-descriptions-item>
    </a-descriptions>
    <a-card
            :key="item.content"
            :title="item.title ? item.title : ''"
            size="small"
            v-for="item in list"
    >
          <span slot="extra">
            <a-button
                    :disabled="!item.content"
                    @click="copy(item.content)"
                    size="small"
                    type="link"
            >
              复制
            </a-button>
            <a-button
                    :disabled="!item.content"
                    @click="open(item.content)"
                    size="small"
                    type="link"
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
        utools.copyText(url)
        this.$message.success('复制成功')
      },
      open(url) {
        if (isNil(url) || isEmpty(url)) {
          this.$message.error('打开失败')
          return
        }
        utools.shellOpenExternal(url)
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
