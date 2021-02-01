<template>
  <div class="settings-rules">
    <a-card
        size="small"
        title="规则订阅"
    >
      <div class="setting-buttons">
        <a-space :size="constants.spaceSize">
          <a-button
              size="small"
              type="primary"
              @click="addModal.visible = true"
          >
            新增订阅
          </a-button>
          <a-button
              size="small"
              type="default"
              @click="importAllSubscriptions"
          >
            全部更新
          </a-button>
          <a-button
              size="small"
              type="danger"
              @click="removeAllSites"
          >
            清空全部站点
          </a-button>
          <a-button
              size="small"
              type="link"
              @click="openExampleRules"
          >
            示例
          </a-button>
        </a-space>
      </div>
      <a-table
          :columns="columns"
          :data-source="subscriptionsWrapper"
          :pagination="false"
          :rowKey="'path'"
          :scroll="{y: 240}"
          :showHeader="false"
          class="rules-table ant-card-bordered"
          size="small"
      >
      <span
          slot="path"
          slot-scope="subscription"
      >
        <span :style="`color: ${subscription.available ? '': 'red'}`">{{ subscription.path }}</span>
        <a-tooltip :title="subscription.error">
          <a-icon
              v-if="!subscription.available"
              style="color: red; margin-left: 5px"
              type="exclamation-circle"
          />
        </a-tooltip>
      </span>
      <span
          slot="action"
          slot-scope="subscription"
      >
        <a-space :size="constants.spaceSize">
          <a-button
              :loading="subscription.loading"
              class="table-action-button"
              icon="reload"
              shape="circle"
              size="small"
              type="link"
              @click="importSubscription(subscription)"
          />
          <a-button
              class="table-action-button"
              icon="delete"
              shape="circle"
              size="small"
              theme="filled"
              type="link"
              @click="removeSubscription(subscription)"
          />
        </a-space>
      </span>
      </a-table>
    </a-card>
    <a-modal
        :confirm-loading="addModal.loading"
        :visible="addModal.visible"
        title="新增订阅"
        @cancel="onAddModalCancel"
        @ok="onAddModalOk"
    >
      <a-form-model :modal="addModal.form">
        <a-form-model-item label="订阅类型">
          <a-radio-group v-model="addModal.form.type">
            <a-radio
                v-if="mode !== 'web'"
                name="type"
                value="FILE"
            >
              本地文件
            </a-radio>
            <a-radio
                name="type"
                value="URL"
            >
              网络链接
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="订阅地址">
          <a-input
              v-if="addModal.form.type === 'URL'"
              v-model="addModal.form.url"
          />
          <a-input
              v-if="addModal.form.type === 'FILE' && mode !== 'web'"
              v-model="addModal.form.file"
              disabled
          >
            <a-icon
                slot="addonAfter"
                type="folder-open"
                @click="selectSingleFile"
            />
          </a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import {contain, isAbsoluteUrl, isEmpty, isNil, parallel, splitPath} from 'licia'
import {mapGetters} from 'vuex'
import squirrel from '@/squirrel'
import utils from '@/utils/utils'

export default {
  name: 'SettingsRules',
  data() {
    return {
      addModal: {
        visible: false,
        loading: false,
        form: {
          type: 'URL',
          file: '',
          url: '',
        }
      },
      columns: [
        {
          title: '地址',
          key: 'path',
          scopedSlots: {customRender: 'path'},
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: {customRender: 'action'},
          fixed: 'right',
          width: 70,
        }
      ],
    }
  },
  computed: {
    ...mapGetters([
      'mode',
      'settings',
      'subscriptions',
      'constants',
    ]),
    paths() {
      return this.subscriptions.map(i => i.path)
    },
    subscriptionsWrapper() {
      return this.subscriptions.map(s => {
        this.$set(s, 'loading', false)
        this.$set(s, 'available', true)
        this.$set(s, 'error', '')
        return s
      })
    },
  },
  async mounted() {
    await this.$store.dispatch('updateSettings')
    // console.log('subscriptionsWrapper', this.subscriptionsWrapper)
  },
  methods: {
    async onAddModalOk() {
      this.addModal.loading = true
      let form = this.addModal.form
      switch (form.type) {
        case 'FILE':
          if (isEmpty(form.file)) {
            this.$message.error('文件路径不能为空')
            break
          }
          if (!window.isFileExists(form.file)) {
            this.$message.error('文件不存在')
            break
          }
          if (contain(this.paths, form.file)) {
            this.$message.error('文件已在订阅列表中')
            break
          }
          await this.$store.dispatch('updateSubscription', {
            type: form.type,
            path: form.file
          })
          this.$message.success('添加成功')
          this.onAddModalCancel()
          break
        case 'URL':
          if (isEmpty(form.url)) {
            this.$message.error('链接不能为空')
            break
          }
          if (!isAbsoluteUrl(form.url)) {
            this.$message.error('链接格式不正确')
            break
          }
          if (contain(this.paths, form.url)) {
            this.$message.error('链接已在订阅列表中')
            break
          }
          await this.$store.dispatch('updateSubscription', {
            type: form.type,
            path: form.url
          })
          this.$message.success('添加成功')
          this.onAddModalCancel()
          break
        default:
          this.$message.error('不能没有类型')
          break
      }
      this.addModal.loading = false
    },
    onAddModalCancel() {
      this.addModal.form = {
        type: 'FILE',
        file: '',
        url: '',
      }
      if (this.mode === 'web') {
        this.addModal.form.type = 'URL'
      }
      this.addModal.visible = false
    },
    importAllSubscriptions() {
      parallel(this.subscriptionsWrapper.map(s => {
        return async () => {
          await this.importSubscription(s)
        }
      }))
    },
    async importSubscription(subscription) {
      subscription.loading = true
      try {
        let result = subscription.type === 'FILE' ?
            await squirrel.services.mergeSitesFromFile(subscription.path) :
            await squirrel.services.mergeSitesFromUrl(subscription.path)
        if (result.code === 0) {
          let data = result.data
          subscription.available = true
          let path = splitPath(subscription.path)
          this.$message.success(`从 ${decodeURI(path.name)} 新增 ${data.new} 个站点\n更新 ${data.cover} 个站点`)
        }
        else {
          subscription.available = false
          let error = utils.generateErrorMessage(result)
          subscription.error = error
          this.$message.error(error)
        }
      } catch (e) {
        console.log(e)
        subscription.available = false
        subscription.error = e.message
        this.$message.error(`更新失败: ${e.message}`)
      }
      subscription.loading = false
    },
    async removeSubscription(subscription) {
      if (!isNil(subscription)) {
        await this.$store.dispatch('removeSubscription', subscription)
        this.$message.success('删除订阅成功')
      }
      else {
        this.$message.error('无法找到被删除的订阅')
      }
    },
    async removeAllSites() {
      await this.$store.dispatch('removeAllSites')
      this.$message.success('已清空')
    },
    selectSingleFile() {
      let path = window.singleFileSelect()
      if (!isEmpty(path)) {
        this.addModal.form.file = path
      }
      else {
        this.$message.error('未选择任何文件')
      }
    },
    openExampleRules() {
      window.openInExternal('https://github.com/LanyuanXiaoyao-Studio/SearchX/wiki/%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E#%E8%AE%A2%E9%98%85%E7%A4%BA%E4%BE%8B')
    }
  }
}
</script>

<style
    lang="stylus"
    scoped
>
.settings-rules
  .rules-table
    margin-top 5px
    max-height 240px

    .table-action-button
      margin-top 0
      padding 1px
</style>
