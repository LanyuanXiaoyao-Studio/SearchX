<template>
  <div class="main">
    <el-card class="box-card">
      <div
              slot="header"
              class="clearfix"
      >
        <span><b>资源搜索</b></span>
        <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="settingDialog.show = true"
        >
          设置
        </el-button>
      </div>
      <el-input
              size="medium"
              class="search-input"
              placeholder="搜索内容"
              v-model="input.search"
              :disabled="loading"
      >
        <el-select
                slot="prepend"
                placeholder="请选择站点"
                v-model="input.code"
                :disabled="loading"
                filterable
        >
          <el-option-group
                  v-for="(sites, category) in categories"
                  :key="category"
                  :label="category"
          >
            <el-option
                    v-for="site in sites"
                    :key="site.code"
                    :label="site.name"
                    :value="site.code"
            >
              <el-row :gutter="2">
                <el-col :span="4">
                  <el-image
                          style="width: 32px;height: 32px"
                          :src="site.icon"
                          fit="scale-down"
                  />
                </el-col>
                <el-col :span="20">
                  <div
                          class="name"
                          style="padding-left: 6px"
                  >
                    {{ site.name }}
                  </div>
                  <div
                          class="description"
                          style="padding-left: 6px"
                  >
                    {{ site.description }}
                  </div>
                </el-col>
              </el-row>
            </el-option>
          </el-option-group>

        </el-select>
        <el-button
                slot="append"
                icon="el-icon-search"
                @click="query"
                :disabled="loading"
        />
      </el-input>
      <el-table
              class="result-table"
              :data="result"
              style="width: 100%"
              :show-header="false"
              empty-text="空空如也"
      >
        <el-table-column>
          <template slot-scope="scope">
            <div :class="scope.row.author || scope.row.description ? 'item-title' : ''">
              {{ scope.row.title }}
            </div>
            <div
                    class="item-author"
                    v-if="scope.row.author"
            >
              {{ scope.row.author }}
            </div>
            <div
                    class="item-description"
                    v-if="scope.row.description"
            >
              {{ scope.row.description }}
            </div>
            <div class="tags">
              <el-tag
                      v-if="scope.row.datetime"
                      size="small"
                      type="info"
                      effect="plain"
              >
                <i class="el-icon-alarm-clock"/> {{ scope.row.datetime }}
              </el-tag>
              <el-tag
                      v-if="scope.row.size"
                      size="small"
                      type="info"
                      effect="plain"
              >
                <i class="el-icon-box"/> {{ scope.row.size }}
              </el-tag>
              <el-tag
                      v-if="scope.row.view"
                      size="small"
                      type="info"
                      effect="plain"
              >
                <i class="el-icon-view"/> {{ scope.row.view }}
              </el-tag>
              <el-tag
                      v-if="scope.row.number"
                      size="small"
                      type="info"
                      effect="plain"
              >
                <i class="el-icon-document"/> {{ scope.row.number }}
              </el-tag>
              <el-tag
                      v-if="scope.row.location"
                      size="small"
                      type="info"
                      effect="plain"
              >
                <i class="el-icon-location"/> {{ scope.row.location }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
                fixed="right"
                width="110"
        >
          <template slot-scope="scope">
            <div style="float: right">
              <el-button-group>
                <el-button
                        icon="el-icon-attract"
                        type="success"
                        size="medium"
                        circle
                        plain
                        @click="showDetail(scope.row.link)"
                />
                <el-button
                        icon="el-icon-link"
                        type="primary"
                        size="medium"
                        circle
                        plain
                        @click="openInBrowser(scope.row.link)"
                />
              </el-button-group>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="width: 100%; text-align: center">
        <el-button
                type="text"
                :loading="loading"
                @click="more"
                :style="`visibility: ${isShowLoadMoreButton ? 'visible' : 'hidden'}`"
        >
          加载更多
        </el-button>
      </div>
    </el-card>
    <el-dialog
            title="设置"
            top="20px"
            :visible.sync="settingDialog.show"
            :destroy-on-close="true"
            :close-on-press-escape="false"
            width="80%"
    >
      <Settings/>
    </el-dialog>
    <el-dialog
            v-loading="detailDialog.loading"
            title="详情"
            top="20px"
            :visible.sync=" detailDialog.show"
            :destroy-on-close="true"
            :close-on-click-modal="!detailDialog.loading"
            :close-on-press-escape="false"
            width="80%"
    >
      <Detail :data="detailDialog.data"/>
    </el-dialog>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Settings from '../components/Settings'
  import Detail from '../components/Detail'
  import isNil from 'licia/isNil'
  import isEmpty from 'licia/isEmpty'
  import Squirrel from '../utils/squirrel'

  export default {
    name: 'Main',
    components: {Detail, Settings},
    comments: {
      Settings,
      Detail,
    },
    data() {
      return {
        input: {
          code: '',
          search: '',
        },
        loading: false,
        site: null,
        result: [],
        next: '',
        settingDialog: {
          show: false,
        },
        detailDialog: {
          show: false,
          data: {},
          loading: false,
        },
        isShowLoadMoreButton: false,
      }
    },
    computed: {
      ...mapGetters([
        'sites',
        'categories',
      ]),
    },
    mounted() {
    },
    methods: {
      async query() {
        this.isShowLoadMoreButton = true
        if (!isEmpty(this.input.code)) {
          let site = this.$store.getters.site(this.input.code)
          this.result = []
          this.site = site
        }
        else {
          this.finnishAndMessage(`站点未选择`, 'warning')
          return
        }

        if (!isEmpty(this.input.search)) {
          this.next = this.site.search.replace('{query}', this.input.search)
        }
        else {
          this.finnishAndMessage(`未输入搜索内容`, 'warning')
          return
        }
        await this.more()
      },
      async more() {
        this.loading = true
        if (isNil(this.next) || isEmpty(this.next)) {
          this.finnishAndMessage(`没有更多内容`, 'warning')
          return
        }

        try {
          await this.fetch(this.site.code, this.next)
        } catch (e) {
          this.finnishAndMessage(`读取数据失败 ${e.message}`, 'error')
        }
      },
      async fetch(code, url) {
        console.log('code', code, 'url', url)
        if (isNil(code) || isEmpty(code) || isNil(url) || isEmpty(url)) {
          throw new Error('URL 或 CODE 不能为空')
        }
        let data = await Squirrel.page({
          code: code,
          url: url,
        })
        console.log('data', data)
        if (isNil(data) || isNil(data.list) || isEmpty(data.list)) {
          this.finnishAndMessage(`没有更多内容`, ' warning')
          return
        }
        this.result = this.result.concat(data.list)
        this.next = data.next
        this.finnishAndMessage(`读取数据成功`, 'success')
      },
      async showDetail(url) {
        this.detailDialog.loading = true
        this.detailDialog.show = true
        try {
          let data = await Squirrel.page({
            code: this.site.code,
            url: url
          })
          console.log('data', data)
          if (isNil(data) || isNil(data.list) || isEmpty(data.list)) {
            this.$message.error(`获取数据失败`)
            return
          }
          this.detailDialog.data = data
        } catch (e) {
          this.$message.error(`获取数据失败 ${e.message}`)
          this.detailDialog.loading = false
          this.detailDialog.show = false
        }
        if (!isNil(this.detailDialog.data.text) && !isNil(this.detailDialog.data.text.supplement) && !isEmpty(this.detailDialog.data.text.supplement)) {
          let supplementUrl = this.detailDialog.data.text.supplement
          let supplementData = await Squirrel.page({
            code: this.site.code,
            url: supplementUrl
          })
          console.log('supplementData', supplementData)
          if (isNil(supplementData) || isNil(supplementData.text) || isEmpty(supplementData.text)) {
            this.$message.error(`获取简介失败`)
          }
          for (let k in supplementData.text) {
            this.$set(this.detailDialog.data.text, k, supplementData.text[k])
          }
        }
        this.detailDialog.loading = false
      },
      finnishAndMessage(text, type) {
        this.loading = false
        this.$message({
          type: type,
          message: text,
        })
      },
      openInBrowser(url) {
        utools.shellOpenExternal(url)
      },
    },
  }
</script>

<style
        lang="stylus"
        scoped
>
  .main
    padding 10px

    .result-table
      margin-top 10px

      .item-title
        font-size 1.2em
        font-weight bold
        margin-bottom 3px

      .tags:empty
        display none

      .tags
        margin-top 10px

        .el-tag + .el-tag
          margin-left 3px
          margin-top 3px
</style>

<style lang="stylus">
  .search-input
    .el-input-group__prepend
      background-color #ffffff

      .el-select > .el-input
        width 125px

        .el-col
          text-align center

  .el-select-dropdown
    min-width 400px !important

  .el-select-dropdown__item
    padding 10px 20px 5px
    height 50px

    .el-row
      margin-top -25px

    .name
    .description
      padding-left 6
      line-height 1.2em

    .description
      font-size 0.87em
      color darkgray
      margin-top 4px
      width 300px
      overflow hidden
      text-overflow ellipsis
      white-space nowrap

</style>
