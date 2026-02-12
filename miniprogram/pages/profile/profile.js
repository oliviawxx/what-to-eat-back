Page({
  onShow() {
    var t = this.getTabBar && this.getTabBar()
    if (t && typeof t.setData === 'function') t.setData({ selected: 4 })
  },
  data: {
    userInfo: {
      avatarUrl: '',
      nickName: '用户12345678910',
      signature: '听说你是一个行走的签名墙,快去编一个签名吧',
      email: '12345678910@whu.com',
      intro: 'delicious!',
    },
    tags: ['辣', '武汉', '甜口', '粤菜', '川菜'],
    templates: [
      { id: '1', people: '4~5人', gender: '男女皆可' },
      { id: '2', people: '4~5人', gender: '男女皆可' },
    ],
    editModalShow: false,
  },
  onOpenEditModal: function () {
    this.setData({ editModalShow: true })
  },
  onCloseEditModal: function () {
    this.setData({ editModalShow: false })
  },
  onEditNickname: function () {
    wx.showToast({ title: '编辑昵称', icon: 'none' })
  },
  onEditEmail: function () {
    wx.showToast({ title: '编辑邮箱', icon: 'none' })
  },
  onEditIntro: function () {
    wx.showToast({ title: '编辑个人简介', icon: 'none' })
  },
  onEditSignature: function () {
    wx.showToast({ title: '编辑签名', icon: 'none' })
  },
  onGoToTemplateEdit: function () {
    wx.navigateTo({ url: '/pages/template-edit/template-edit' })
  },
})
