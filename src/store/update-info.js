export default {
  state: () => ({
    updateInfo: [
      [
        '0.2.0',
        '完成基本功能，包含搜索、设置、订阅等功能。'
      ],
      [
        '0.2.1',
        '👏 完善 uTools 端和 web 端，使用方法见 uTools 端和 web 端安装说明。',
        '⚡️ 调整部分 UI，使界面更紧凑。',
        '⚡️ 订阅设置增加订阅示例地址，方便使用。',
        '⚡️ 修复其他问题。',
      ],
      [
        '0.2.2',
        '⚡️ 优化 docker 版的数据文件放到到<code>/workspace/database/database.json</code>，方便挂载',
        '⚡️ 优化 macOS 版的标题过于靠上的问题',
        '⚡️ 优化点击列表查看按钮时弹出提示, 避免由于解析失败导致打开预料外的网址不知所措',
      ],
      [
        '0.2.3',
        '⚡️ 修复 macOS 端无法使用复制粘贴等快捷键功能的问题 #6',
        '⚡️ 修复标题处显示的版本号不是当前版本号的问题 #7',
      ],
    ]
  }),
  getters: {
    updateInfo: state => state.updateInfo
  }
}
