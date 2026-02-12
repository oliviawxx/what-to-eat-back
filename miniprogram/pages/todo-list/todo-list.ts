Page({
  data: {
    statusBarHeight: 20,
    inProgress: [
      { id: '1', progress: 50 },
      { id: '2', progress: 50 },
    ] as { id: string; progress: number }[],
    toAttend: [
      { id: '1', countdown: '2天', place: 'Supporting line text lorem ipsum dolor' },
      { id: '2', countdown: '1天', place: '武汉大学信息学部食堂' },
    ] as { id: string; countdown: string; place: string }[],
    history: [
      { id: '1', place: '海底捞' },
      { id: '2', place: '比格比萨自助(银泰创意城店)' },
    ] as { id: string; place: string }[],
  },
  onLoad() {
    const winInfo = wx.getWindowInfo()
    this.setData({ statusBarHeight: winInfo.statusBarHeight != null ? winInfo.statusBarHeight : 20 })
  },
  onBack() {
    wx.navigateBack()
  },
  onTapInProgress(e: WechatMiniprogram.TouchEvent) {
    const id = (e.currentTarget.dataset as { id: string }).id
    wx.showToast({ title: `约饭 ${id} 详情`, icon: 'none' })
  },
  onTapToAttend(e: WechatMiniprogram.TouchEvent) {
    const id = (e.currentTarget.dataset as { id: string }).id
    wx.showToast({ title: `待前往 ${id}`, icon: 'none' })
  },
  onTapHistory(e: WechatMiniprogram.TouchEvent) {
    const id = (e.currentTarget.dataset as { id: string }).id
    wx.showToast({ title: `历史约饭 ${id}`, icon: 'none' })
  },
})
