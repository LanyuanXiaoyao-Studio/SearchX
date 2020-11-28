<template>
  <div class="settings-donate">
    <p
        style="font-family: serif"
        v-html="about.author.lines"
    />
    <a-card>
      <a-row :gutter="10">
        <a-col :span="8">
          <a-avatar
              :size="110"
              :src="about.author.donateCode"
              shape="square"
          />
        </a-col>
        <a-col :span="16">
          <div class="business-card">
            <a-avatar
                :src="about.author.avatar"
                class="avatar"
                size="large"
            />
            <div class="name">
                <span class="find-me">
                  {{ about.author.name }}
                </span>
            </div>
            <div
                class="slogan"
                v-html="about.author.slogan"
            />
          </div>
        </a-col>
      </a-row>
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

      .slogan
        color darkgray
        margin-top 5px
</style>
