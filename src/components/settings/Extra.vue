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
      <a-card
              class="plugin-item"
              v-bind:key="plugin.name"
              v-for="plugin in about.plugins.plugins"
      >
        <a-row :gutter="20">
          <a-col
                  :span="6"
                  class="icon"
          >
            <a-avatar
                    :src="plugin.icon"
                    size="large"
            />
          </a-col>
          <a-col
                  :span="18"
                  class="description"
          >
            <div
                    @click="open(plugin.key)"
                    class="title"
            >
              <a-tooltip placement="top">
                <template slot="title">
                  <span>试一试</span>
                </template>
                {{ plugin.name }}
              </a-tooltip>
            </div>
            <div class="text">{{ plugin.description }}</div>
          </a-col>
        </a-row>
      </a-card>
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
        padding 0

      .title
        font-weight bold
        font-size 1.2rem
        text-decoration underline
        cursor pointer

      .text
        word-break: break-word

      .el-button
        margin 0
        padding 0
</style>
