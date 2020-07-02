<template>
  <div class="detail">
    <el-card v-if="data.text">
      <div
              slot="header"
              class="clearfix"
      >
        <span><b>简介</b></span>
      </div>
      <el-form
              label-position="right"
              label-width="60px"
              size="mini"
      >
        <el-form-item
                v-if="data.text.title"
                label="名称"
        >
          {{ data.text.title }}
        </el-form-item>
        <el-form-item
                v-if="data.text.author"
                label="作者"
        >
          {{ data.text.author }}
        </el-form-item>
        <el-form-item
                v-if="data.text.datetime"
                label="时间"
        >
          {{ data.text.datetime }}
        </el-form-item>
        <el-form-item
                v-if="data.text.size"
                label="大小"
        >
          {{ data.text.size }}
        </el-form-item>
        <el-form-item
                v-if="data.text.description"
                label="描述"
        >
          {{ data.text.description }}
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-if="data.list">
      <div
              slot="header"
              class="clearfix"
      >
        <span><b>下载</b></span>
      </div>
      <div
              class="download-item"
              v-for="item in data.list"
              :key="item.content"
      >
        <el-divider content-position="left">{{ item.title ? item.title : '' }}</el-divider>
        <el-input
                :value="item.content ? item.content : ''"
                type="textarea"
                resize="none"
                readonly
                autosize
        />
        <div class="operation-bar">
          <el-button
                  :disabled="!item.content"
                  size="mini"
                  type="primary"
                  @click="copy(item.content)"
          >
            复制
          </el-button>
          <el-button
                  :disabled="!item.content"
                  size="mini"
                  type="success"
                  @click="open(item.content)"
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
