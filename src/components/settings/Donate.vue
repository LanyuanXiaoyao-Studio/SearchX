<template>
  <div class="settings-donate">
    <p
            style="font-family: serif"
            v-html="about.author.lines"
    />
    <el-card>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-image
                  :src="about.author.donateCode"
                  fit="fill"
          />
        </el-col>
        <el-col :span="16">
          <div class="business-card">
            <el-image
                    :src="about.author.avatar"
                    class="avatar"
            />
            <div class="name">
              {{ about.author.name }}
              <el-tooltip
                      content="论坛找我"
                      effect="dark"
                      placement="top"
              >
                <el-button
                        @click="openUtoolsHome"
                        icon="el-icon-link"
                        type="text"
                />
              </el-tooltip>
            </div>
            <div
                    class="slogan"
                    v-html="about.author.slogan"
            />
          </div>
        </el-col>
      </el-row>
    </el-card>
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
    .el-card
      width 360px

      .business-card
        text-align center

        .avatar
          width 40px

        .name
          font-size 1.3rem
          font-weight bold
          font-family serif

          .el-button
            margin 0
            padding 0

        .slogan
          margin-top 5px
</style>
