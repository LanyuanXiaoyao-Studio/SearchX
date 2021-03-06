export default {
  state: () => ({
    updateInfo: [
      [
        '<b>0.2.0</b>',
        '👏 完成基本功能，包含搜索、设置、订阅等功能。',
      ],
      [
        '<b>0.2.1</b>',
        '👏 完善 uTools 端和 web 端，使用方法见 uTools 端和 web 端安装说明。',
        '⚡️ 调整部分 UI，使界面更紧凑。',
        '⚡️ 订阅设置增加订阅示例地址，方便使用。',
        '⚡️ 修复其他问题。',
      ],
      [
        '<b>0.2.2</b>',
        '⚡️ 优化 docker 版的数据文件放到到<code>/workspace/database/database.json</code>，方便挂载。',
        '⚡️ 优化 macOS 版的标题过于靠上的问题。',
        '⚡️ 优化点击列表查看按钮时弹出提示, 避免由于解析失败导致打开预料外的网址不知所措。',
      ],
      [
        '<b>0.2.3</b>',
        '⚡️ 修复 macOS 端无法使用复制粘贴等快捷键功能的问题。 #6',
        '⚡️ 修复标题处显示的版本号不是当前版本号的问题。 #7',
      ],
      [
        '<b>1.0.0</b>',
        '👏 UI 大改动，使用起来更方便。',
        '👏 开始施工「大搜索」功能，即同时搜索多个站点。',
        '⚡️ 修复订阅窗口重新打开默认选中文件类型导致 web 版选项为空的问题。 #8',
      ],
      [
        '<b>1.0.1</b>',
        '⚡️ 修复更新提醒点击后跳出 hello 的弹框。 #10',
      ],
      [
        '<b>1.1.0</b>',
        '👏 新增订阅功能，可以单独删除站点。',
        '👏 新增站点规则源码查看，在订阅功能中，为自定义站点提供参考。',
        '⚡️ Title 增加返回首页链接。',
        '⚡️ 站点详情页信息栏默认展开。',
        '⚡️ 其他代码改进。',
      ],
      [
        '<b>1.1.2</b>',
        '👏 新增 score 和 other 标签。',
        '⚡️ 订阅页面点击标题跳转详情页面。',
        '⚡️ 简化规则源码显示，不显示 null 值字段。',
        '⚡️ 修复侧边栏在 Windows 和 Linux 下出现多余的横向滚动条。 #15',
      ],
      [
        '<b>1.2.0</b>',
        '⚡️ 升级部分底层依赖，提升性能。',
        '⚡️ 适配 uTools 2.x，准备上架插件市场。',
      ],
    ],
  }),
  getters: {
    updateInfo: state => state.updateInfo,
  },
}
