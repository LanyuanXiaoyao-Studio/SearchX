<template>
  <div class="app">
    <a-layout style="height: 100%">
      <a-layout-header class="app-title">
        <a-page-header :sub-title="slogan">
          <template slot="title">
            <router-link
                style="color: black"
                to="/"
            >
              <a-space size="small">
                <img
                    alt="title-icon"
                    src="data:image/png;base64,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"
                    style="width: 32px"
                />
                {{ title }}
              </a-space>
            </router-link>
          </template>
          <template slot="tags">
            <a-tag color="gray">
              {{ version }}
            </a-tag>
          </template>
          <template slot="extra">
            <a-space
                :size="'middle'"
                class="more"
            >
              <a-tooltip title="开源">
                <a-icon
                    type="github"
                    @click="openUrl('https://github.com/LanyuanXiaoyao-Studio/SearchX')"
                />
              </a-tooltip>
              <a-tooltip
                  title="邮箱"
                  @click="openUrl('mailto:lanyuanxiaoyao@email.com?subject=%E6%84%8F%E8%A7%81%E5%8F%8D%E9%A6%88&body=(%E8%AF%B7%E8%AF%A6%E7%BB%86%E6%8F%8F%E8%BF%B0%E4%BD%A0%E9%81%87%E5%88%B0%E7%9A%84%E9%97%AE%E9%A2%98)')"
              >
                <a-icon
                    theme="filled"
                    type="mail"
                />
              </a-tooltip>
              <a-tooltip
                  title="反馈"
                  @click="openUrl('https://github.com/LanyuanXiaoyao-Studio/SearchX/issues')"
              >
                <a-icon
                    theme="filled"
                    type="question-circle"
                />
              </a-tooltip>
            </a-space>
          </template>
        </a-page-header>
      </a-layout-header>
      <a-layout :style="{marginTop: '64px'}">
        <a-layout-sider>
          <a-menu
              v-model="defaultSelectedKeys"
              class="sider-menu"
              mode="inline"
          >
            <a-menu-item key="/">
              <router-link :to="'/'">
                <a-icon type="home"/>
                首页
              </router-link>
            </a-menu-item>
            <a-menu-item key="/settings">
              <router-link :to="'/settings'">
                <a-icon type="setting"/>
                设置
              </router-link>
            </a-menu-item>
            <a-menu-item key="/subscription">
              <router-link :to="'/subscription'">
                <a-icon type="cloud"/>
                订阅
              </router-link>
            </a-menu-item>
            <a-menu-item
                key="/merge-search"
                disabled
            >
              <router-link :to="'/merge-search'">
                <a-icon type="search"/>
                搜索
                <DevelopmentTag/>
              </router-link>
            </a-menu-item>
            <a-menu-divider/>
            <a-menu-item-group
                v-for="(category, key) in categories"
                :key="key"
            >
              <span slot="title">
                {{ key }}
              </span>
              <a-menu-item
                  v-for="site in category"
                  :key="`/site/${site.code}`"
              >
                <router-link :to="`/site/${site.code}`">
                  <img
                      :alt="site.name"
                      :src="site.icon"
                      class="site-icon"
                  />
                  {{ site.name }}
                </router-link>
              </a-menu-item>
            </a-menu-item-group>
          </a-menu>
        </a-layout-sider>
        <a-layout
            id="view-content-layout"
            class="content"
        >
          <a-back-top :target="layoutDom"/>
          <a-layout-content>
            <a-config-provider :locale="zh">
              <transition>
                <router-view :key="generateViewKey()"/>
              </transition>
            </a-config-provider>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import squirrel from '@/squirrel'
import zh from 'ant-design-vue/es/locale/zh_CN'
import {mapGetters} from 'vuex'
import {isEmpty, isNil} from 'licia';
import DevelopmentTag from '@/components/DevelopmentTag'

export default {
  name: 'App',
  components: {
    DevelopmentTag,
  },
  data() {
    return {
      zh
    }
  },
  mounted() {
    if (process.env.NODE_ENV !== 'development') {
      squirrel.services.checkUpdate()
              .then(result => {
                if (result.cmp < 0) {
                  this.$notification['warning']({
                    duration: null,
                    message: '发现新版本',
                    description: `当前版本: ${result.current} → 最新版本: ${result.remote}`,
                    btn: h => {
                      return h(
                          'a-button',
                          {
                            props: {
                              type: 'link',
                              size: 'small',
                            },
                            on: {
                              click: () => {
                                window.openInExternal('https://github.com/LanyuanXiaoyao-Studio/SearchX/releases/latest')
                              }
                            }
                          },
                          '前往下载'
                      )
                    }
                  })
                }
              })
              .catch(error => {
                this.$message.error(`无法检查更新: ${error}`)
              })
    }
  },
  computed: {
    ...mapGetters([
      'currentUrl',
      'mode',
      'version',
      'sites',
      'categories',
    ]),
    defaultSelectedKeys() {
      return [this.currentUrl]
    },
    title() {
      let title = process.env.VUE_APP_TITLE
      return isEmpty(title) ? 'SearchX' : title
    },
    slogan() {
      let slogan = process.env.VUE_APP_SLOGAN
      return isEmpty(slogan) ? '' : slogan
    }
  },
  methods: {
    openUrl(url) {
      if (!isNil(url) && !isEmpty(url)) {
        window.openInExternal(url)
      }
    },
    generateViewKey() {
      return this.$route.name ? `${this.$route.name}${new Date().getTime()}` : `${this.$route}${new Date().getTime()}`
    },
    layoutDom() {
      return document.getElementById('view-content-layout')
    }
  }
}
</script>

<style
    lang="stylus"
    scoped
>
.app
  height 100%

  .app-title
    -webkit-app-region: drag
    background-color white
    box-shadow: 0 0 5px #666666
    position fixed
    z-index 1
    width 100%
    height 64px
    padding 0

    .more
      color gray
      font-size 1.3rem
      cursor pointer

  .sider-menu
    overflow-y auto
    height 100%

  .site-icon
    width 20px
    margin-right 5px

  .content
    padding 15px

    .ant-back-top
      bottom: 50px
      right 45px
</style>
