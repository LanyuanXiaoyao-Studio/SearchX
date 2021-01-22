<template>
  <div class="home">
    <a-space
        class="center"
        direction="vertical"
    >
      <div class="content">
        <p class="shields">
          <img src="https://img.shields.io/github/package-json/v/LanyuanXiaoyao-Studio/SearchX?label=%E4%BB%A3%E7%A0%81%E7%89%88%E6%9C%AC">
          <img src="https://img.shields.io/github/languages/code-size/LanyuanXiaoyao-Studio/SearchX?label=%E4%BB%A3%E7%A0%81%E4%BD%93%E7%A7%AF">
          <img src="https://img.shields.io/github/v/release/LanyuanXiaoyao-Studio/SearchX?label=%E5%8F%91%E5%B8%83%E7%89%88%E6%9C%AC">
          <img src="https://img.shields.io/badge/uTools%20%E7%89%88%E6%9C%AC-%3E%3D1.1.3-green">
        </p>
        <h3>简介</h3>
        <p>基于规则的跨平台一站式聚合搜索工具。</p>
        <p>通过简单的 JSON 规则定义如何获取一个网站的关键内容，并聚合到一起，方便查询和阅读，这就是这个工具的本意，茫茫网海，不同的 UI 和操作方式挡住了我们畅游的道路，是时候返璞归真了。</p>
        <h3>下载</h3>
        <p>
          <a-button
              size="small"
              type="primary"
          >
            Github Release
          </a-button>
        </p>
        <h3>平台</h3>
        <p>
          <a-space size="large">
            <a-tooltip title="Windows">
              <windows-icon
                  class="platform-icon"
                  style="font-size: 1.5rem"
              />
            </a-tooltip>
            <a-tooltip title="macOS">
              <mac-o-s-icon
                  class="platform-icon"
                  style="font-size: 1.7rem"
              />
            </a-tooltip>
            <a-tooltip title="Linux">
              <linux-icon
                  class="platform-icon"
                  style="font-size: 1.6rem"
              />
            </a-tooltip>
            <a-tooltip title="Docker & Web">
              <docker-icon
                  class="platform-icon"
                  style="font-size: 1.8rem"
              />
            </a-tooltip>
            <a-tooltip title="uTools">
              <u-tools-icon
                  class="platform-icon"
                  style="font-size: 1.7rem"
              />
            </a-tooltip>
          </a-space>
        </p>
        <h3>更新</h3>
        <p style="padding-top: 5px">
          <a-timeline :reverse="true">
            <a-timeline-item
                v-for="(update, index) in updateInfo"
                :key="index"
            >
              <span
                  v-for="(item, index) in update"
                  :key="index"
                  class="timeline-update-item"
                  v-html="item"
              />
            </a-timeline-item>
          </a-timeline>
        </p>
      </div>
    </a-space>
  </div>
</template>

<script>
import LinuxIcon from '@/icons/LinuxIcon'
import WindowsIcon from '@/icons/WindowsIcon'
import MacOSIcon from '@/icons/MacOSIcon'
import DockerIcon from '@/icons/DockerIcon'
import UToolsIcon from '@/icons/UToolsIcon'
import {mapGetters} from 'vuex'

export default {
  name: 'Home',
  components: {
    LinuxIcon,
    WindowsIcon,
    MacOSIcon,
    DockerIcon,
    UToolsIcon,
  },
  computed: mapGetters(['updateInfo'])
}
</script>

<style
    lang="stylus"
    scoped
>
.center
  width 100%
  height 100%

  .ant-space-item
    width 100%

  .content
    padding 2%

    .shields img + img
      margin-left 5px

    .timeline-update-item
      display block
      font-size 0.9rem
      margin 6px 0 0 0
</style>
