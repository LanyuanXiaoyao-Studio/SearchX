import Vue from 'vue'
import {
  Avatar,
  BackTop,
  Button,
  Card,
  Col,
  ConfigProvider,
  Descriptions,
  Drawer,
  Empty,
  Icon,
  Input,
  Layout,
  List,
  message,
  Modal,
  PageHeader,
  Popover,
  Row,
  Select,
  Spin,
  Table,
  Tabs,
  Tag,
  Tooltip,
} from 'ant-design-vue'

Vue.use(Button)
Vue.use(Input)
Vue.use(Select)
Vue.use(Icon)
Vue.use(Drawer)
Vue.use(Descriptions)
Vue.use(Card)
Vue.use(Popover)
Vue.use(Table)
Vue.use(List)
Vue.use(Row)
Vue.use(Col)
Vue.use(Avatar)
Vue.use(Tooltip)
Vue.use(Tag)
Vue.use(ConfigProvider)
Vue.use(Empty)
Vue.use(Layout)
Vue.use(Modal)
Vue.use(Spin)
Vue.use(BackTop)
Vue.use(Tabs)
Vue.use(PageHeader)

Vue.prototype.$message = message
