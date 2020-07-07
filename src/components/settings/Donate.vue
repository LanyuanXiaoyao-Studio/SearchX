<template>
  <div class="settings-donate">
    <p
            style="font-family: serif"
            v-html="about.author.lines"
    />
    <a-card>
      <el-row :gutter="10">
        <el-col :span="8">
          <a-avatar
                  :size="110"
                  :src="about.author.donateCode"
                  shape="square"
          />
        </el-col>
        <el-col :span="16">
          <div class="business-card">
            <a-avatar
                    :src="about.author.avatar"
                    class="avatar"
                    size="large"
            />
            <div class="name">
              <a-tooltip placement="right">
                <template slot="title">
                  <span>论坛找我</span>
                </template>
                <span
                        @click="openUtoolsHome"
                        class="find-me"
                >
                  {{ about.author.name }}
                </span>
              </a-tooltip>
            </div>
            <div
                    class="slogan"
                    v-html="about.author.slogan"
            />
          </div>
        </el-col>
      </el-row>
    </a-card>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'SettingsDonate',
    computed: {
      ...mapGetters([
        'about',
      ]),
    },
    methods: {
      openUtoolsHome() {
        let url = this.about.author.utoolsHome
        if (url && url !== '') {
          utools.shellOpenExternal(url)
        }
      }
    }
  }
</script>

<style
        lang="stylus"
        scoped
>
  .settings-donate
    .ant-card
      width 360px

      .business-card
        text-align center

        .name
          font-size 1.25rem
          font-weight 450
          font-family sans-serif
          text-decoration underline
          cursor pointer

        .slogan
          color darkgray
          margin-top 5px
</style>
