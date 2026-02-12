const ADDRESS_OPTIONS = ['信息学部', '文理学部', '工学部', '医学部', '武汉市内']
const PEOPLE_OPTIONS = ['1人', '2~3人', '4~5人', '6人及以上']

Page({
  data: {
    addressText: '信息学部',
    peopleText: '2~3人',
    addressOptions: ADDRESS_OPTIONS,
    peopleOptions: PEOPLE_OPTIONS,
    addressOpen: false,
    peopleOpen: false,
    showBubble: false,
    resultModalOpen: false,
    actionModalOpen: false,
    recommendData: {
      name: '川味坊（武大校内店）',
      tag1: '约菜转式',
      tag2: '评菜评价',
      price: '¥48/人',
      hours: '11:00 - 14:00; 17:00 - 20:00',
      location: '武昌区八一路483号武汉大学工学部内',
      dishes: '干编红丝、重庆辣子鸡、蝎搪鱼',
    },
  },
  onToggleAddress() {
    this.setData({
      addressOpen: !this.data.addressOpen,
      peopleOpen: false,
    })
  },
  onTogglePeople() {
    this.setData({
      peopleOpen: !this.data.peopleOpen,
      addressOpen: false,
    })
  },
  onSelectAddress(e: WechatMiniprogram.TouchEvent) {
    const value = (e.currentTarget.dataset as { value: string }).value
    this.setData({ addressText: value, addressOpen: false })
  },
  onSelectPeople(e: WechatMiniprogram.TouchEvent) {
    const value = (e.currentTarget.dataset as { value: string }).value
    this.setData({ peopleText: value, peopleOpen: false })
  },
  onShow() {
    const t = this.getTabBar && this.getTabBar()
    if (t && typeof t.setData === 'function') t.setData({ selected: 0 })
    this.setData({ showBubble: true })
    if (this._bubbleTimer) clearTimeout(this._bubbleTimer)
    this._bubbleTimer = setTimeout(() => {
      this.setData({ showBubble: false })
    }, 5000)
  },
  onUnload() {
    if (this._bubbleTimer) clearTimeout(this._bubbleTimer)
  },
  onPick() {
    // 模拟后端返回推荐数据，然后显示弹窗
    this.setData({
      resultModalOpen: true,
      recommendData: {
        name: '川味坊（武大校内店）',
        tag1: '约菜转式',
        tag2: '评菜评价',
        price: '¥48/人',
        hours: '11:00 - 14:00; 17:00 - 20:00',
        location: '武昌区八一路483号武汉大学工学部内',
        dishes: '干编红丝、重庆辣子鸡、蝎搪鱼',
      },
    })
  },
  onCloseResultModal() {
    this.setData({ resultModalOpen: false })
  },
  onConfirmSelect() {
    // 隐藏推荐结果弹窗，显示操作面板
    this.setData({
      resultModalOpen: false,
      actionModalOpen: true,
    })
  },
  onReselect() {
    this.setData({ resultModalOpen: false })
  },
  onCheckReviews() {
    wx.showToast({ title: '查看评价', icon: 'none' })
  },
  onBlacklistDish() {
    wx.showToast({ title: '已加入黑名单', icon: 'success' })
    this.setData({ resultModalOpen: false })
  },
  onBlacklistDishFromAction() {
    wx.showToast({ title: '已加入黑名单', icon: 'success' })
    this.setData({ actionModalOpen: false })
  },
  onCloseActionModal() {
    this.setData({ actionModalOpen: false })
  },
  onAlreadyEaten() {
    wx.showToast({ title: '已记录为已吃过', icon: 'success' })
    this.setData({ actionModalOpen: false })
  },
  onStartDine() {
    const app = getApp() as IAppOption
    app.globalData.selectedRestaurant = this.data.recommendData
    this.setData({ actionModalOpen: false })
    wx.switchTab({ url: '/pages/publish/publish' })
  },
  onNavigate() {
    wx.showToast({ title: '导航前往', icon: 'none' })
    this.setData({ actionModalOpen: false })
  },
  onOpenAIChat() {
    wx.navigateTo({
      url: '/pages/ai-chat/ai-chat',
    })
  },
})
