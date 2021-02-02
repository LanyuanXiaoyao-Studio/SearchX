<template lang="pug">
  div.home
    a-space.center(direction='vertical')
      div.content
        p.shields
          img(alt='GitHub package.json version' src='https://img.shields.io/github/package-json/v/LanyuanXiaoyao-Studio/SearchX?label=%E4%BB%A3%E7%A0%81%E7%89%88%E6%9C%AC')
          img(alt='GitHub release (latest by date)' src='https://img.shields.io/github/languages/code-size/LanyuanXiaoyao-Studio/SearchX?label=%E4%BB%A3%E7%A0%81%E4%BD%93%E7%A7%AF')
          img(alt='GitHub code size in bytes' src='https://img.shields.io/github/v/release/LanyuanXiaoyao-Studio/SearchX?label=%E5%8F%91%E5%B8%83%E7%89%88%E6%9C%AC')
          img(alt='uTools version' src='https://img.shields.io/badge/uTools%20%E7%89%88%E6%9C%AC-%3E%3D1.1.3-green')
        p.shields
          img(alt='GitHub all releases' src='https://img.shields.io/github/downloads/LanyuanXiaoyao-Studio/SearchX/total?label=%E4%B8%8B%E8%BD%BD%E6%95%B0')
          img(alt='GitHub release (latest by SemVer)' src='https://img.shields.io/github/downloads/LanyuanXiaoyao-Studio/SearchX/latest/total?label=%E4%B8%8B%E8%BD%BD%E6%95%B0%40latest')
        h2 简介
        p 基于规则的跨平台一站式聚合搜索工具。
        p 通过简单的 JSON 规则定义如何获取一个网站的关键内容，并聚合到一起，方便查询和阅读，这就是这个工具的本意，茫茫网海，不同的 UI 和操作方式挡住了我们畅游的道路，是时候返璞归真了。
        h2 下载
        p
          a-button(icon="github" size="small" type="primary" @click="openUrl('https://github.com/LanyuanXiaoyao-Studio/SearchX/releases/latest')") Github Release
        h4 支持平台
        p
          a-space(size="middle")
            a-tooltip(title="Windows")
              WindowsIcon.platform-icon(style={fontSize: '1.4rem'})
            a-tooltip(title="macOS")
              MacOSIcon.platform-icon(style={fontSize: '1.5rem'})
            a-tooltip(title="Linux")
              LinuxIcon.platform-icon(style={fontSize: '1.6rem'})
            a-tooltip(title="Docker & Web")
              DockerIcon.platform-icon(style={fontSize: '1.7rem'})
            a-tooltip(title="uTools")
              UToolsIcon.platform-icon(style={fontSize: '1.6rem'})
        p(style="font-size: 0.8rem")
          i
            b docker 端
            | 在 Docker Hub 拉取，不直接提供镜像文件下载
            a-button(icon="search" size="small" style={margin: '5px'} type="primary" @click="openUrl('https://hub.docker.com/r/lanyuanxiaoyao/searchx')") Docker Hub
            br
            b uTools 端
            | 在 uTools 插件中心下载，不直接提供安装文件下载
        p
          span(style="marginRight: 5px") 更多关于安装文档见
          a-button(icon="github" size="small" style={margin: '5px'} type="primary" @click="openUrl('https://github.com/LanyuanXiaoyao-Studio/SearchX/wiki/%E5%AE%89%E8%A3%85%E8%AF%B4%E6%98%8E')") Github Wiki
        h2 快速上手
        h3 订阅站点
        p.
          应用通过订阅规则文件获取站点规则, 站点支持从#[b 网络]和#[b 本地文件](docker 端不支持)订阅规则
          #[br]
          在「设置」→「规则订阅」→「新增订阅」添加订阅来源, 记得在添加完后「全部更新」一下
          #[br]
          这里有一个示例订阅源#[code https://gitee.com/lanyuanxiaoyao/utools-data/raw/master/utools-torrent/sites/ALL.json]
        p 赶紧去尝试一下吧😃
        h3 设置代理
        p.
          对于不能直接访问的站点, 可以通过设置代理服务来访问, 在「设置」→「代理设置」可以设置代理服务
          #[br]
          #[b 代理服务目前仅支持 HTTP 代理]
        p
          span(style="marginRight: 5px") 更多关于使用文档见
          a-button(icon="github" size="small" style={margin: '5px'} type="primary" @click="openUrl('https://github.com/LanyuanXiaoyao-Studio/SearchX/wiki/%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E')") Github Wiki
        h2 软件说明
        About
        h2 支持
        Donate
        h2 更新内容
        p(style="paddingTop: 5px")
          a-timeline(:pending="'未完待续'" :reverse="true")
            a-timeline-item(v-for="(update, index) in updateInfo" :key="index")
              span.timeline-update-item(v-for="(item, index2) in update" :key="index2" v-html="item")
</template>

<script>
import LinuxIcon from '@/icons/LinuxIcon'
import WindowsIcon from '@/icons/WindowsIcon'
import MacOSIcon from '@/icons/MacOSIcon'
import DockerIcon from '@/icons/DockerIcon'
import UToolsIcon from '@/icons/UToolsIcon'
import About from '@/components/settings/About'
import Donate from '@/components/settings/Donate'
import Utils from '@/utils/utils'
import {mapGetters} from 'vuex'

export default {
  name: 'Home',
  components: {
    LinuxIcon,
    WindowsIcon,
    MacOSIcon,
    DockerIcon,
    UToolsIcon,
    About,
    Donate,
  },
  computed: mapGetters(['updateInfo']),
  async mounted() {
    await Utils.loadAbout()
  },
  methods: {
    openUrl(url) {
      window.openInExternal(url)
    },
    routeTo(url) {
      this.$router.push(url)
    }
  }
}
</script>

<style
    lang="stylus"
    scoped
>
.center
  background-color white
  height 100%
  width 100%

  .ant-space-item
    width 100%

  .content
    padding 2%

    code
      background-color #393939
      border-radius 3px
      color white
      font-size 0.8rem
      margin-left 3px
      padding 1px 3px 1px 3px

    .shields img + img
      margin-left 5px

    .timeline-update-item
      display block
      font-size 0.9rem
      margin 6px 0 0 0
</style>
