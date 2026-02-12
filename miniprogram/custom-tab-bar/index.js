Component({
  data: {
    selected: 0,
    publishModalOpen: false,
  },
  methods: {
    onSwitch(e) {
      const index = parseInt(e.currentTarget.dataset.index, 10)
      const list = [
        '/pages/index/index',
        '/pages/map-rank/map-rank',
        '/pages/publish/publish',
        '/pages/chat/chat',
        '/pages/profile/profile',
      ]
      this.setData({ selected: index })
      wx.switchTab({ url: list[index] })
    },
    onShowPublishModal() {
      this.setData({ publishModalOpen: true })
    },
    onClosePublishModal() {
      this.setData({ publishModalOpen: false })
    },
    onPublishReview() {
      this.setData({ publishModalOpen: false })
      // 设置全局标记并跳转到发布页
      const app = getApp()
      app.globalData.publishMode = 'review'
      const list = [
        '/pages/index/index',
        '/pages/map-rank/map-rank',
        '/pages/publish/publish',
        '/pages/chat/chat',
        '/pages/profile/profile',
      ]
      this.setData({ selected: 2 })
      wx.switchTab({ url: list[2] })
    },
    onPublishDine() {
      this.setData({ publishModalOpen: false })
      const list = [
        '/pages/index/index',
        '/pages/map-rank/map-rank',
        '/pages/publish/publish',
        '/pages/chat/chat',
        '/pages/profile/profile',
      ]
      this.setData({ selected: 2 })
      wx.switchTab({ url: list[2] })
    },
  },
})
