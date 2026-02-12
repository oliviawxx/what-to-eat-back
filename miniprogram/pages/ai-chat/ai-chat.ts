const DEFAULT_AVATAR = '/images/avatar/默认头像.png'

Page({
  data: {
    inputText: '',
    messages: [] as { id: number; text: string; role: 'user' | 'ai' }[],
    scrollToId: '',
    nextId: 1,
    currentUserAvatar: DEFAULT_AVATAR,
  },
  onShow() {
    const app = getApp() as { globalData: { localUserInfo?: { avatarUrl?: string } } }
    const url = app.globalData.localUserInfo && app.globalData.localUserInfo.avatarUrl
      ? app.globalData.localUserInfo.avatarUrl
      : DEFAULT_AVATAR
    this.setData({ currentUserAvatar: url })
  },
  onInput(e: { detail: { value: string } }) {
    this.setData({ inputText: e.detail.value })
  },
  onSend() {
    const text = (this.data.inputText || '').trim()
    if (!text) return
    const id = this.data.nextId
    const userMsg = { id, text, role: 'user' as const }
    const messages = this.data.messages.concat([userMsg])
    this.setData({
      inputText: '',
      messages,
      nextId: id + 1,
      scrollToId: 'msg' + id,
    })
    // 骨架：后续接 AI 回复
    wx.showToast({ title: '已发送', icon: 'none' })
  },
})
