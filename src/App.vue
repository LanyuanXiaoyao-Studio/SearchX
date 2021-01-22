<template>
  <div class="app">
    <a-layout style="height: 100%">
      <a-layout-header class="app-title">
        <a-row>
          <a-col :span="22">
            <a-page-header
                :sub-title="slogan"
                :title="title"
            >
              <template slot="tags">
                <a-tag color="gray">
                  {{ version }}
                </a-tag>
              </template>
            </a-page-header>
          </a-col>
          <a-col :span="2">
            <a-dropdown>
              <a class="more">
                <a-icon
                    theme="filled"
                    type="message"
                />
              </a>
              <a-menu slot="overlay">
                <a-menu-item @click="openUrl('https://github.com/LanyuanXiaoyao-Studio/SearchX')">
                  <a-icon type="github"/>
                  开源
                </a-menu-item>
                <a-menu-item @click="openUrl('mailto:lanyuanxiaoyao@email.com?subject=%E6%84%8F%E8%A7%81%E5%8F%8D%E9%A6%88&body=(%E8%AF%B7%E8%AF%A6%E7%BB%86%E6%8F%8F%E8%BF%B0%E4%BD%A0%E9%81%87%E5%88%B0%E7%9A%84%E9%97%AE%E9%A2%98)')">
                  <a-icon
                      theme="filled"
                      type="mail"
                  />
                  邮箱
                </a-menu-item>
                <a-menu-item @click="openUrl('https://github.com/LanyuanXiaoyao-Studio/SearchX/issues')">
                  <a-icon
                      theme="filled"
                      type="question-circle"
                  />
                  反馈
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </a-col>
        </a-row>
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
              <a-icon type="setting"/>
              设置
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
                              alert('hello')
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
      font-size 1.5rem

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
