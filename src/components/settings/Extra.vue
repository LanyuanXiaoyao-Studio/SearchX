<template>
  <div class="settings-extra">
    <p
            style="font-family: serif"
            v-html="about.plugins.lines"
    />
    <masonry
            :cols="2"
            :gutter="10"
    >
      <el-card
              class="plugin-item"
              v-for="plugin in about.plugins.plugins"
              v-bind:key="plugin.name"
      >
        <el-row :gutter="10">
          <el-col
                  class="icon"
                  :span="6"
          >
            <el-image :src="plugin.icon"/>
          </el-col>
          <el-col
                  class="description"
                  :span="18"
          >
            <div class="title">{{ plugin.name }}</div>
            <div class="text">{{ plugin.description }}</div>
            <div class="try">
              <el-button
                      type="text"
                      @click="open(plugin.key)"
              >
                试一试
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </masonry>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'SettingsExtra',
    computed: {
      ...mapGetters([
        'about',
      ]),
    },
    methods: {
      open(key) {
        utools.redirect(key)
      }
    }
  }
</script>

<style
        lang="stylus"
        scoped
>
  .settings-extra
    .plugin-item
      margin-top 10px

    .icon
      padding 8px

    .description
      font-family serif

      .title
      .text
      .try
        padding 5px

      .title
        font-weight bold
        font-size 1.2em

      .text
        word-break: break-word

      .el-button
        margin 0
        padding 0
</style>

<style lang="stylus">
  .settings-extra
    .el-card__body
      padding 10px
</style>
