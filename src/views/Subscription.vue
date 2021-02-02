<template lang="pug">
  .subscription
    a-space(:size="constants.spaceSize" direction="vertical")
      Rules
      a-card(size="small" title="站点管理")
        a-table.rules-table.ant-card-bordered(:columns="columns" :data-source="sitesSource" :pagination="false" :rowKey="'code'" )
          span(slot="icon" slot-scope="site")
            img.site-icon(:src="site.icon" alt="site-icon")
          span(slot="name" slot-scope="site")
            a-tooltip(:title="site.home")
              span.site-name(@click="openUrl(site.home)") {{ site.name }}
          span(slot="action" slot-scope="site")
            a-space(:size="constants.spaceSize")
              a-tooltip(title="查看规则")
                a-button.table-action-button(
                  icon="eye"
                  shape="circle"
                  size="small"
                  type="link"
                  @click="showSiteSource(site)")
              a-button.table-action-button(
                icon="delete"
                shape="circle"
                size="small"
                theme="filled"
                type="link"
                @click="deleteSite(site.code)")
    a-modal(
      :destroyOnClose="true"
      :dialogStyle="{top: '20px'}"
      :footer="null"
      :visible=" sourceDialog.show"
      title="规则源码"
      width="80%"
      @cancel="sourceDialog.show = false")
      SiteSourceCode(:site-source="sourceDialog.siteSource")
</template>

<script>
import {mapGetters} from 'vuex'
import Rules from '@/components/settings/Rules'
import SiteSourceCode from '@/components/SiteSourceCode'
import Utils from '@/utils/utils'

export default {
  name: 'Subscription',
  components: {
    Rules,
    SiteSourceCode,
  },
  data() {
    return {
      columns: [
        {
          title: '#',
          key: 'icon',
          scopedSlots: {customRender: 'icon'},
          width: 50,
        },
        {
          title: '名称',
          key: 'name',
          scopedSlots: {customRender: 'name'},
          width: 150,
        },
        {
          title: '作者',
          key: 'author',
          dataIndex: 'author',
          width: 150,
        },
        {
          title: '描述',
          key: 'description',
          dataIndex: 'description',
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: {customRender: 'action'},
          fixed: 'right',
          width: 70,
        }
      ],
      sourceDialog: {
        show: false,
        siteSource: {},
      }
    }
  },
  mounted() {
  },
  computed: {
    ...mapGetters([
      'sites',
      'sitesSource',
      'constants'
    ])
  },
  methods: {
    ...Utils.openUrl(),
    showSiteSource(siteSource) {
      this.sourceDialog.siteSource = siteSource
      this.sourceDialog.show = true
    },
    deleteSite(code) {
      this.$store.dispatch('removeSites', [code])
    }
  }
}
</script>

<style
    lang="stylus"
>
.subscription
  .site-icon
    width 32px

  .site-name
    color dodgerblue
    cursor pointer
    text-decoration underline

  .ant-table-small
    border 0
</style>
