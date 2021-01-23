<template>
  <div class="app">
    <a-layout style="height: 100%">
      <a-layout-header class="app-title">
        <a-page-header :sub-title="slogan">
          <template slot="title">
            <a-space>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAB3VBMVEUAAADS5P7V5/7Y6f7X6P7g7/7n9f7W6P6oxP/Y6f7S5f7Q4/7P4/7U5v7X6P691P7c7P7a6v6Xtv/W6P7b7P6evP/G3P6Dp//F2/46bv/l9P7q9/6wy/9tlv9Off+xy/5Edv9hjf/K3v7W5/5jjv+rxv5+ov/o9v6sx/++1f5Qf//U5v691P7Q4/6Eqf/F2v7U5v5Sgf96n//F2/6qxf/j8v6/1v5ymf+Qsf/T5f6qxf+hvv+Qsv+tx/5Tgf/Z6v5slf/O4f6zzP6du//s+f7n9f5Acv96n/91nP/X6P7G3P5ciP+60f6jwP/b6/5ul//V5/5Edf/n9P7G3P5ijf96oP/l9P61zv5nkP/H2/6lwv5+o/9tlv+60f6cvP/Z6v5IeP97of/h8P6evP5/o/+lwf55n/9kjv+Ep/+KrP/J3f7T5f62z/+60/+OsP+Gqf/a6/7H3P6yzP+Vtf+Ss/+oxP/X6f7V5/7B2P9/pP+vyf+du/98ov+sx/+Krf9Vg//Q4/6kwf+fvf9slf/f7/54n/9zm/9xmf++1f5lj/9dif9ul/9gjP/i8f7d7f7K3v6gvv+Dp/9Rf//N4f7E2v+40P+auv9okv9ah/9NfP+qxv+YuP/k8/7u+/7o9v4Lfh3zAAAAa3RSTlMAXmeinI1dVQbp362Wi3pwShgVC+3r6OHd2860saCaj46KgYB+fnV1dGJeRkRBPzkrIfv58/Pz8O/j4NrZ2dTU0c7KxMTEw8C5ubm3t7W1s7KspqWjoZ2Xk5OMiYaDcHBtaWVcTk1LNysjI5P2SmwAAAK8SURBVDjLbZNVd+MwEEYnKXO3y8xcXGZmZmbetSRLZjsxxQ421KRMv3Wd9HTbbntf9HA/6cwZzcASfux59nzLlS0HfsOKfFifkIxJSx8i4tuV/H1xSB42IxKfGIsPPVzu78lELgtyEIgmM15i5//+IHJjBW0ukEjb6WzXUr/6KIoIHBbcyCi5tefQp8cT2xbbcHuIoZjmpIxJc20vVPh1aMGH1tCGMEPFYQcj7HbB6voX16/VHfwz79ty7AzUzL2goa+wfw1XYdpvbaz6hhyOb4cWFtTgMHYeatSKVtXgaF4FAcdxnN8FbQy5o8zRXu5WAk2poiiUcqcD31nmebEVDjMkE1dNnaDBbaWQGhFGtDJV2gDqXJ1IzQDrkCzyjKUUVVWYHHEnTdNIqUoXtFgWsYbroRvJUzzWTGeaKo5TQLIgCAZWwrB9iEi8keuH97FRXdbEqUKBm85RqpmCgAStFjqCACGO/xEOnIrr2E3ocuTY681+JYFGUAvslnhJsmL5fFPtupiXKJIsKR7ZCn2bFGwgjJ7CFxwUKVou5+dzeWZE9DGvSOIXADYVKoE70O+buiVOEXGEMc6f4bxMRpSi3g5YpSKE8WWAiz6SLCJZvIgVlZsVJ0pEjA6OD8ATjJB2G6BHyXHYlE1cpkF3Z9aWJrwgkNkB9SkBOe0AUMtRP0/zPq30uO6zbZei/GDmBnRig9Hqb9QERuUqqJvhbjZjp4PARggJjLZDlVAzV6VpP/z0sml7XE9mN8KDMq2FeTrDNY/qGgAaTw56Y7YdTY5v655tCsM/GkLVo3d9NJ6ovjCxrz7UCAscTm1o3fvmqkh4PTlWCmqwB2ApGwRWmXkxWIp0See9ZWvRYxjDaG5r7KQYvQTL6IgUkRCT+Hg2ESM3G2E5389ZYjAScck4uw9W5tu7ra/27urog8X8BSrNG+C+tnIYAAAAAElFTkSuQmCC" />
              {{ title }}
            </a-space>
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
              class="sider-menu"
              mode="inline"
          >
            <a-menu-item>
              <router-link :to="'/'">
                <a-icon type="home"/>
                首页
              </router-link>
            </a-menu-item>
            <a-menu-item>
              <router-link :to="'/settings'">
                <a-icon type="setting"/>
                设置
              </router-link>
            </a-menu-item>
            <a-menu-item disabled>
              <router-link :to="'/merge-search'">
                <a-icon type="search"/>
                大搜索
                <span style="background-color: #ff000095;border-radius: 10px;color: white;padding: 1px 6px 1px 6px;margin: 0 0 0 2px; font-size: 0.6rem">开发中</span>
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
                  :key="site.code"
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

export default {
  name: 'App',
  data() {
    return {
      zh,
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
      'mode',
      'version',
      'sites',
      'categories',
    ]),
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
