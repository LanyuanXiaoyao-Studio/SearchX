import Vue from 'vue'
import {
  Avatar,
  BackTop,
  Button,
  Card,
  Checkbox,
  Col,
  ConfigProvider,
  Descriptions,
  Divider,
  Drawer,
  Dropdown,
  Empty,
  FormModel,
  Icon,
  Input,
  Layout,
  List,
  Menu,
  message,
  Modal,
  Notification,
  PageHeader,
  Popover,
  Radio,
  Row,
  Select,
  Space,
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
Vue.use(FormModel)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(Divider)
Vue.use(Space)
Vue.use(Notification)
Vue.use(Menu)
Vue.use(Dropdown)

Vue.prototype.$message = message
Vue.prototype.$notification = Notification
