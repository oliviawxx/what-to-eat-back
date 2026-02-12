Page({
  onShow() {
    var t = this.getTabBar && this.getTabBar()
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
  onChatItem(e) {
    const { id, name, temp } = e.currentTarget.dataset
    // 跳转聊天详情：conversationId=id，conversationType：temp=1 临时会话，temp=0 好友会话
    wx.navigateTo({
      url: '/pages/chat-detail/chat-detail?conversationId=' + (id || '') + '&name=' + encodeURIComponent(name || '') + '&temp=' + (temp || '0'),
    })
  },
})
