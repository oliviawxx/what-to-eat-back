const STORAGE_USER = 'localUserInfo'

function syncUserInfoToStorage(
  app: { globalData: { localUserInfo?: Record<string, string> } },
  userInfo: Record<string, string>
) {
  const cur = app.globalData.localUserInfo || {}
  app.globalData.localUserInfo = { ...cur, ...userInfo }
  try {
    wx.setStorageSync(STORAGE_USER, app.globalData.localUserInfo)
  } catch (_) {}
}

Page({
  onShow() {
    const t = this.getTabBar && this.getTabBar()
    if (t && typeof t.setData === 'function') t.setData({ selected: 4 })
    const app = getApp()
    const stored = app.globalData.localUserInfo
    if (stored && typeof stored === 'object') {
      const userInfo = { ...this.data.userInfo, ...stored }
      this.setData({ userInfo })
    }
  },
  data: {
    isLoggedIn: false,
    userInfo: {
      avatarUrl: '',
      nickName: '用户12345678910',
      signature: '听说你是一个行走的签名墙,快去编一个签名吧',
      email: '12345678910@whu.com',
      intro: 'delicious!',
    },
    tags: ['辣', '武汉', '甜口', '粤菜', '川菜'],
    showAddTagModal: false,
    newTagName: '',
    templates: [
      { id: '1', people: '4~5人', gender: '男女皆可' },
      { id: '2', people: '4~5人', gender: '男女皆可' },
    ],
    editModalShow: false,
    showEditField: '',
    editFieldValue: '',
    editFieldLabel: '',
    loginModalShow: false,
    loginEmail: '',
    loginVerifyCode: '',
    countdown: 0,
  },
  onOpenLoginModal() {
    this.setData({ loginModalShow: true })
  },
  onCloseLoginModal() {
    this.setData({ loginModalShow: false })
  },
  onLoginModalMaskTap() {
    this.setData({ loginModalShow: false })
  },
  onLoginModalContentTap() {
    /* 阻止点击模态框内容时关闭 */
  },
  onGetVerifyCode() {
    if (this.data.countdown > 0) return
    const s = 60
    this.setData({ countdown: s })
    const timer = setInterval(() => {
      const n = this.data.countdown - 1
      this.setData({ countdown: n })
      if (n <= 0) clearInterval(timer)
    }, 1000)
    wx.showToast({ title: '验证码已发送', icon: 'none' })
  },
  onLoginEmailInput(e: WechatMiniprogram.CustomEvent) {
    this.setData({ loginEmail: e.detail.value })
  },
  onLoginCodeInput(e: WechatMiniprogram.CustomEvent) {
    this.setData({ loginVerifyCode: e.detail.value })
  },
  onLoginSubmit() {
    // 调试用：点击登录直接进入已登录状态，并同步当前 userInfo 到本地供各页使用
    syncUserInfoToStorage(getApp(), this.data.userInfo)
    this.setData({
      loginModalShow: false,
      isLoggedIn: true,
    })
  },
  onOpenEditModal() {
    this.setData({ editModalShow: true })
  },
  onCloseEditModal() {
    this.setData({ editModalShow: false })
  },
  onUploadAvatar() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFiles && res.tempFiles[0] ? res.tempFiles[0].tempFilePath : ''
        if (tempFilePath) {
          const userInfo = { ...this.data.userInfo, avatarUrl: tempFilePath }
          this.setData({ userInfo })
          syncUserInfoToStorage(getApp(), userInfo)
          wx.showToast({ title: '头像已更新', icon: 'success' })
        }
      },
    })
  },
  onEditNickname() {
    this.setData({
      showEditField: 'nickName',
      editFieldLabel: '昵称',
      editFieldValue: this.data.userInfo.nickName,
    })
  },
  onEditEmail() {
    this.setData({
      showEditField: 'email',
      editFieldLabel: '邮箱',
      editFieldValue: this.data.userInfo.email,
    })
  },
  onEditIntro() {
    this.setData({
      showEditField: 'intro',
      editFieldLabel: '个人简介',
      editFieldValue: this.data.userInfo.intro,
    })
  },
  onEditSignature() {
    this.setData({
      showEditField: 'signature',
      editFieldLabel: '签名',
      editFieldValue: this.data.userInfo.signature,
    })
  },
  onCloseEditFieldModal() {
    this.setData({ showEditField: '' })
  },
  onEditFieldInput(e: WechatMiniprogram.CustomEvent) {
    this.setData({ editFieldValue: e.detail.value })
  },
  onConfirmEditField() {
    const field = this.data.showEditField
    const value = (this.data.editFieldValue || '').trim()
    if (!field) return
    const userInfo = { ...this.data.userInfo, [field]: value }
    this.setData({
      userInfo,
      showEditField: '',
    })
    syncUserInfoToStorage(getApp(), userInfo)
    wx.showToast({ title: '已保存', icon: 'success' })
  },
  onAddTag() {
    this.setData({ showAddTagModal: true, newTagName: '' })
  },
  onCloseAddTagModal() {
    this.setData({ showAddTagModal: false, newTagName: '' })
  },
  onNewTagInput(e: WechatMiniprogram.CustomEvent) {
    this.setData({ newTagName: e.detail.value })
  },
  onConfirmAddTag() {
    const name = (this.data.newTagName || '').trim()
    if (!name) {
      wx.showToast({ title: '请输入标签名', icon: 'none' })
      return
    }
    const tags = [...this.data.tags, name]
    this.setData({
      tags,
      showAddTagModal: false,
      newTagName: '',
    })
    wx.showToast({ title: '已添加', icon: 'success' })
  },
  onGoToTemplateEdit() {
    wx.navigateTo({ url: '/pages/template-edit/template-edit' })
  },
  onGoToTodo() {
    wx.navigateTo({ url: '/pages/todo-list/todo-list' })
  },
})
