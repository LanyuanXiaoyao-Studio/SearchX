<template>
  <div class="site">
    <a-space direction="vertical">
      <a-collapse
          :bordered="false"
          :defaultActiveKey="'site'"
          class="header"
      >
        <template #expandIcon="props">
          <a-icon
              :rotate="props.isActive ? 90 : 0"
              type="caret-right"
          />
        </template>
        <a-collapse-panel key="site">
          <template slot="header">
            <img
                :alt="site.name"
                :src="site.icon"
                class="avatar"
            />
            <span class="title">{{ site.name }}</span>
          </template>
          <SiteDescription :site="site"/>
        </a-collapse-panel>
      </a-collapse>
      <a-input-search
          v-model="search"
          :loading="loading"
          class="search-input"
          placeholder="搜索内容"
          @search="query"
      />
      <div
          id="result"
          class="result"
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
    </a-space>
    <a-modal
        :closable="!detailDialog.loading"
        :destroyOnClose="true"
        :dialogStyle="{top: '20px'}"
        :footer="null"
        :keyboard="false"
        :maskClosable="!detailDialog.loading"
        :visible=" detailDialog.show"
        title="详情"
        width="80%"
        @cancel="detailDialog.show = false"
    >
      <Detail :data="detailDialog.data"/>
    </a-modal>
  </div>
</template>

<script>
import {contain, find, isEmpty, isNil} from 'licia';
import {mapGetters} from 'vuex';
import ResultList from '@/components/ResultList';
import Detail from '@/components/Detail';
import SiteDescription from '@/components/SiteDescription';
import squirrel from '@/squirrel';
import utils from '@/utils/utils';

export default {
  name: 'Site',
  components: {
    ResultList,
    Detail,
    SiteDescription,
  },
  data() {
    return {
      site: {},
      search: '',
      next: '',
      result: [],
      options: [],
      loading: false,
      detailDialog: {
        show: false,
        data: {},
        loading: false,
      },
    }
  },
  mounted() {
    let code = this.$route.params.code
    if (isNil(code) || isEmpty(code)) {
      this.$message.error('参数 code 不存在')
      return
    }
    let site = this.findSite(code)
    if (isNil(site)) {
      this.$message.error('站点 code 不存在')
      return
    }
    this.site = site
    // console.log('site', this.site.name, this.site)
  },
  computed: {
    ...mapGetters([
      'mode',
      'version',
      'sites',
    ]),
    showLoadMore() {
      return !isEmpty(this.result)
    },
  },
  methods: {
    findSite(code) {
      return find(this.sites, site => site.code === code)
    },
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
        this.loading = false
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
      // console.log(code, url)
      if (isNil(code) || isEmpty(code) || isNil(url) || isEmpty(url)) {
        throw new Error(`URL 或 CODE 不能为空`)
      }
      let result = await squirrel.page({
        code: code,
        url: url,
      })
      // console.log(result)
      if (result.code !== 0) {
        this.$message.error(utils.generateErrorMessage(result))
        this.loading = false
        return
      }
      let data = result.data
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
        let result = await squirrel.page({
          code: this.site.code,
          url: url
        })
        // console.log(result)
        if (result.code !== 0) {
          throw new Error(utils.generateErrorMessage(result))
        }
        let data = result.data
        // console.log('data', data)
        if (isNil(data) || isNil(data.list) || isEmpty(data.list)) {
          throw new Error('返回数据为空')
        }
        this.detailDialog.data = data
      } catch (e) {
        this.$message.error(`获取数据失败 ${e.message}`)
        this.loading = false
        this.detailDialog.loading = false
        this.detailDialog.show = false
        hide()
        return
      }

      // 如果有 supplement 字段, 就处理补充信息
      if (!isNil(this.detailDialog.data.text) && !isNil(this.detailDialog.data.text.supplement) && !isEmpty(this.detailDialog.data.text.supplement)) {
        let supplementUrl = this.detailDialog.data.text.supplement
        let supplementResult = await squirrel.page({
          code: this.site.code,
          url: supplementUrl
        })
        // console.log(supplementResult)
        if (supplementResult.code !== 0) {
          this.$message.error(utils.generateErrorMessage(supplementResult))
          this.loading = false
          return
        }
        let supplementData = supplementResult.data
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
  }
}
</script>

<style
    lang="stylus"
    scoped
>
.site,
.site .ant-space
  width 100%
  height 100%

  .header
    background-color #FFFFFF10

    .avatar
      width 30px
      height 30px

    .title
      font-size 1rem
      font-weight 630
      margin 0 0 0 10px
</style>
