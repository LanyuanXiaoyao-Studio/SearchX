<template>
  <div class="detail">
    <el-card v-if="data.text">
      <div
              class="clearfix"
              slot="header"
      >
        <span><b>简介</b></span>
      </div>
      <el-form
              label-position="right"
              label-width="60px"
              size="mini"
      >
        <el-form-item
                label="名称"
                v-if="data.text.title"
        >
          {{ data.text.title }}
        </el-form-item>
        <el-form-item
                label="作者"
                v-if="data.text.author"
        >
          {{ data.text.author }}
        </el-form-item>
        <el-form-item
                label="时间"
                v-if="data.text.datetime"
        >
          {{ data.text.datetime }}
        </el-form-item>
        <el-form-item
                label="大小"
                v-if="data.text.size"
        >
          {{ data.text.size }}
        </el-form-item>
        <el-form-item
                label="描述"
                v-if="data.text.description"
        >
          {{ data.text.description }}
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-if="data.list">
      <div
              class="clearfix"
              slot="header"
      >
        <span><b>下载</b></span>
      </div>
      <div
              :key="item.content"
              class="download-item"
              v-for="item in data.list"
      >
        <el-divider content-position="left">{{ item.title ? item.title : '' }}</el-divider>
        <el-input
                :value="item.content ? item.content : ''"
                autosize
                readonly
                resize="none"
                type="textarea"
        />
        <div class="operation-bar">
          <el-button
                  :disabled="!item.content"
                  @click="copy(item.content)"
                  size="mini"
                  type="primary"
          >
            复制
          </el-button>
          <el-button
                  :disabled="!item.content"
                  @click="open(item.content)"
                  size="mini"
                  type="success"
          >
            打开
          </el-button>
        </div>
      </div>
    </el-card>
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
    .el-card + .el-card
      margin-top 10px

    .el-form-item
      word-break break-word

    .download-item + .download-item
      margin-top 10px

    .operation-bar
      display flex
      flex-direction row-reverse
      margin-top 5px

      .el-button
        margin-left 5px

</style>
