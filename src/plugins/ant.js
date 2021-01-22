import Vue from 'vue'
import {
  Alert,
  Avatar,
  BackTop,
  Button,
  Card,
  Col,
  Collapse,
  ConfigProvider,
  Descriptions,
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
  Radio,
  Row,
  Skeleton,
  Space,
  Spin,
  Table,
  Tabs,
  Tag,
  Timeline,
  Tooltip,
} from 'ant-design-vue'

Vue.use(Button)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Descriptions)
Vue.use(Card)
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
Vue.use(Radio)
Vue.use(Space)
Vue.use(Notification)
Vue.use(Menu)
Vue.use(Dropdown)
Vue.use(Collapse)
Vue.use(Skeleton)
Vue.use(Alert)
Vue.use(Timeline)

Vue.prototype.$message = message
Vue.prototype.$notification = Notification
