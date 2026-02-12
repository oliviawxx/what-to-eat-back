Page({
  onShow() {
    const t = this.getTabBar && this.getTabBar()
    if (t && typeof t.setData === 'function') t.setData({ selected: 3 })
  },
  data: {
    tempList: [
      { id: 't1', name: 'Athalia Putri', letter: 'A', preview: 'Look at how chocho sleep...', time: '16:46' },
      { id: 't2', name: 'Devesh Ojha', letter: 'D', preview: 'Hello', time: '18:44' },
      { id: 't3', name: 'Devesh Ojha', letter: 'D', preview: 'Hello', time: '18:44' },
      { id: 't4', name: 'Devesh Ojha', letter: 'D', preview: 'Hello', time: '18:44' },
    ],
    friendList: [
      { id: 'f1', name: 'Devesh Ojha', letter: 'D', preview: 'Hello', time: '18:44' },
      { id: 'f2', name: 'Devesh Ojha', letter: 'D', preview: 'Hello', time: '18:44' },
      { id: 'f3', name: 'Devesh Ojha', letter: 'D', preview: 'Hello', time: '18:44' },
      { id: 'f4', name: 'Devesh Ojha', letter: 'D', preview: 'Hello', time: '18:44' },
      { id: 'f5', name: 'Devesh Ojha', letter: 'D', preview: 'Hello', time: '18:44' },
    ],
  },
  onChatItem(e: WechatMiniprogram.TouchEvent) {
    const { id, name, temp } = e.currentTarget.dataset as { id?: string; name?: string; temp?: string }
    wx.navigateTo({
      url: '/pages/chat-detail/chat-detail?conversationId=' + (id || '') + '&name=' + encodeURIComponent(name || '') + '&temp=' + (temp || '0'),
    })
  },
})
