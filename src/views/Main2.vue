<template>
  <div class="main">
    <div class="search">
      <a-input-search
              size="large"
              class="search-input"
              placeholder="搜索内容"
      >
        <a-popover
                overlayClassName="site-list"
                placement="bottomRight"
                slot="addonBefore"
                title="站点列表"
                trigger="hover"
                v-model="sitePanelVisible"
        >
          <template slot="content">
            <div style="height: 400px; overflow: auto">
              <SiteList
                      :sites="sites"
                      @select="selectSite"
              />
            </div>
          </template>
          <span>{{ site.name ? site.name : '选择站点' }}</span>
        </a-popover>
        <a-icon
                @click="settingDialog.show = true"
                slot="addonAfter"
                type="setting"
        />
      </a-input-search>
    </div>
    <div class="result">
      <ResultList/>
    </div>
    <a-modal
            :dialogStyle="{top: '20px'}"
            :footer="null"
            :visible="settingDialog.show"
            @cancel="settingDialog.show = false"
            title="设置"
            width="80%"
    >
      <Settings/>
    </a-modal>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import ResultList from '../components/ResultList'
  import SiteList from '../components/SiteList'
  import Settings from '../components/Settings'
  import Squirrel from '../utils/squirrelWrapper'

  export default {
    name: 'Main2',
    components: {
      ResultList,
      SiteList,
      Settings,
    },
    data() {
      return {
        site: {},
        sitePanelVisible: false,
        settingDialog: {
          show: false,
        },
      }
    },
    computed: {
      ...mapGetters([
        'sites',
        'categories',
      ]),
    },
    mounted() {
      console.log(Squirrel)
    },
    methods: {
      selectSite(site) {
        this.site = site
        this.sitePanelVisible = false
      }
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
