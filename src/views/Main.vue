<template>
  <div class="main">
    <div class="search">
      <a-back-top :target="resultDom"/>
      <a-input-search
              :loading="loading"
              @search="query"
              class="search-input"
              placeholder="搜索内容"
              size="large"
              v-model="search"
      >
        <a-popover
                overlayClassName="site-list"
                placement="bottomRight"
                slot="addonBefore"
                title="站点列表"
                trigger="hoverr"
                v-model="siteListVisible"
        >
          <template slot="content">
            <div style="height: 400px; overflow: auto">
              <SiteList
                      :sites="sites"
                      @select="selectSite"
              />
            </div>
          </template>
          <span style="cursor: pointer; display: inline-block; width: 150px; font-weight: 500">
            <a-avatar
                    style="margin-right: 5px; top: -1px"
                    :size="18"
                    :src="site.icon"
                    icon="bulb"
                    shape="square"
                    v-if="site.name"
            />
            {{ site.name ? site.name : '选择站点' }}
          </span>
        </a-popover>
        <a-icon
                @click="settingDialog.show = true"
                slot="addonAfter"
                type="setting"
        />
      </a-input-search>
    </div>
    <div
            class="result"
            ref="result"
    >
      <ResultList
              :data="result"
              :loading="loading"
              :open-directly="isOpenDirectly(options)"
              :show-load-more="showLoadMore"
              @detail="detail"
              @more="load"
      />
    </div>
    <a-modal
            :dialogStyle="{top: '20px'}"
            :footer="null"
            :keyboard="false"
            :visible="settingDialog.show"
            @cancel="settingDialog.show = false"
            title="设置"
            width="80%"
    >
      <Settings/>
    </a-modal>
    <a-modal
            :closable="!detailDialog.loading"
            :destroyOnClose="true"
            :dialogStyle="{top: '20px'}"
            :footer="null"
            :keyboard="false"
            :maskClosable="!detailDialog.loading"
            :visible=" detailDialog.show"
            @cancel="detailDialog.show = false"
            title="详情"
            width="80%"
    >
      <Detail :data="detailDialog.data"/>
    </a-modal>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import ResultList from '../components/ResultList'
  import SiteList from '../components/SiteList'
  import Settings from '../components/Settings'
  import Detail from '../components/Detail'
  import Squirrel from '../utils/squirrelWrapper'
  import isEmpty from 'licia/isEmpty'
  import isNil from 'licia/isNil'
  import contain from 'licia/contain';

  export default {
    name: 'Main',
    components: {
      ResultList,
      SiteList,
      Settings,
      Detail,
    },
    data() {
      return {
        site: {},
        search: '',
        next: '',
        result: [],
        options: [],
        loading: false,
        siteListVisible: false,
        settingDialog: {
          show: false,
        },
        detailDialog: {
          show: false,
          data: {},
          loading: false,
        },
      }
    },
    computed: {
      ...mapGetters([
        'sites',
        'categories',
      ]),
      showLoadMore() {
        return !isEmpty(this.result)
      },
    },
    methods: {
      async query() {
        if (isEmpty(this.site)) {
          this.$message.warning(`站点未选择`)
          return
        }
        if (isEmpty(this.search)) {
          this.$message.warning(`未输入搜索内容`)
          return
        }
        this.result = []
        this.next = this.site.search.replace('{query}', this.search)
        await this.load()
      },
      async load() {
        this.loading = true

        if (isNil(this.next) || isEmpty(this.next)) {
          this.$message.warning(`没有更多内容`)
          return
        }

        try {
          await this.fetch(this.site.code, this.next)
        } catch (e) {
          this.$message.error(`读取数据失败 ${e.message}`)
          this.loading = false
        }
      },
      async fetch(code, url) {
        if (isNil(code) || isEmpty(code) || isNil(url) || isEmpty(url)) {
          throw new Error(`URL 或 CODE 不能为空`)
        }
        let data = await Squirrel.page({
          code: code,
          url: url,
        })
        if (isNil(data) || isNil(data.list) || isEmpty(data.list)) {
          this.$message.warning(`没有更多内容`)
          this.loading = false
          return
        }
        this.result = this.result.concat(data.list)
        this.options = data.options
        this.next = data.next
        this.$message.success(`读取数据成功`)
        this.loading = false
      },
      async detail(url) {
        this.detailDialog.loading = true
        this.detailDialog.data = {}
        const hide = this.$message.loading(`加载中...`, 0);
        this.detailDialog.show = true
        try {
          let data = await Squirrel.page({
            code: this.site.code,
            url: url
          })
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

        // 如果有 supplement 字段, 就处理补充信息
        if (!isNil(this.detailDialog.data.text) && !isNil(this.detailDialog.data.text.supplement) && !isEmpty(this.detailDialog.data.text.supplement)) {
          let supplementUrl = this.detailDialog.data.text.supplement
          let supplementData = await Squirrel.page({
            code: this.site.code,
            url: supplementUrl
          })
          if (isNil(supplementData) || isNil(supplementData.text) || isEmpty(supplementData.text)) {
            this.$message.error(`获取简介失败`)
          }
          for (let key in supplementData.text) {
            this.$set(this.detailDialog.data.text, key, supplementData.text[key])
          }
        }

        this.detailDialog.loading = false
        hide()
      },
      isOpenDirectly(options) {
        if (isEmpty(options)) {
          return false
        }
        return contain(options, 'OPEN_DIRECTLY')
      },
      resultDom() {
        return () => this.$refs.result
      },
      selectSite(site) {
        this.site = site
        this.siteListVisible = false
      },
    },
  }
</script>

<style
        lang="stylus"
        scoped
>
  .main
    display grid
    height 100%
    padding 10px
    grid-template-rows 40px auto

    .search
      width 100%
      text-align center

      .search-input
        width 100%

    .result
      height 100%
</style>
