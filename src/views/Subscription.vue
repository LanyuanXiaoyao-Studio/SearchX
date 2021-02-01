<template>
  <div class="subscription">
    <a-space
        :size="constants.spaceSize"
        direction="vertical"
    >
      <Rules/>
      <a-card
          size="small"
          title="站点管理"
      >
        <a-table
            :columns="columns"
            :data-source="sites"
            :pagination="false"
            :rowKey="'path'"
            class="rules-table ant-card-bordered"
        >
          <span
              slot="icon"
              slot-scope="site"
          >
            <img
                :src="site.icon"
                alt="site-icon"
                class="site-icon"
            />
          </span>
          <span
              slot="name"
              slot-scope="site"
          >
            <span class="site-name">{{ site.name }}</span>
          </span>
          <span
              slot="action"
              slot-scope="subscription"
          >
            <a-space :size="constants.spaceSize">
              <a-button
                  class="table-action-button"
                  icon="reload"
                  shape="circle"
                  size="small"
                  type="link"
              />
              <a-button
                  class="table-action-button"
                  icon="delete"
                  shape="circle"
                  size="small"
                  theme="filled"
                  type="link"
              />
            </a-space>
          </span>
        </a-table>
      </a-card>
    </a-space>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Rules from '@/components/settings/Rules'

export default {
  name: 'Subscription',
  components: {
    Rules
  },
  data() {
    return {
      columns: [
        {
          title: '#',
          key: 'icon',
          scopedSlots: {customRender: 'icon'},
          width: 50,
        },
        {
          title: '名称',
          key: 'name',
          scopedSlots: {customRender: 'name'},
          width: 150,
        },
        {
          title: '作者',
          key: 'author',
          dataIndex: 'author',
          width: 150,
        },
        {
          title: '描述',
          key: 'description',
          dataIndex: 'description',
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: {customRender: 'action'},
          fixed: 'right',
          width: 70,
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'sites',
      'constants'
    ])
  }
}
</script>

<style
    lang="stylus"
>
.subscription
  .site-icon
    width 32px

  .site-name
    cursor pointer
    color dodgerblue
    text-decoration underline

  .ant-table-small
    border 0
</style>
