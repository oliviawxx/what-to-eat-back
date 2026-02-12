/**
 * 聊天详情页 - 后端接口预留
 * 入参：conversationId 会话ID、name 对方昵称、temp 1=临时会话 0=好友会话
 * 临时会话：isTemp 为 true 时展示「添加好友」入口，请求需带 conversationType: 'temp'
 * 建议接口：getConversationList(含 isTemp)、getMessages、sendMessage、addFriend(临时会话)
 */
interface ChatMessage {
  id: string
  type?: string
  from?: string
  letter?: string
  msgType?: string
  text?: string
  time?: string
  imageUrl?: string
  label?: string
  read?: boolean
  duration?: string
}

const DEFAULT_AVATAR = '/images/avatar/默认头像.png'

Page({
  data: {
    partnerName: '',
    conversationId: '',
    isTemp: false,
    statusBarHeight: 20,
    scrollToId: '',
    inputText: '',
    inputFocus: false,
    messages: [] as ChatMessage[],
    currentUserAvatar: DEFAULT_AVATAR,
  },
  onLoad(options: Record<string, string | undefined>) {
    const conversationId = options.conversationId || options.id || ''
    const name = options.name ? decodeURIComponent(options.name) : '聊天'
    const temp = options.temp === '1' || options.temp === 'true'
    const sysInfo = wx.getSystemInfoSync()
    this.setData({
      partnerName: name,
      conversationId,
      isTemp: temp,
      statusBarHeight: sysInfo.statusBarHeight || 20,
      messages: this._mockMessages(name),
    })
  },
  onShow() {
    const app = getApp() as { globalData: { localUserInfo?: { avatarUrl?: string } } }
    const url =
      app.globalData.localUserInfo && app.globalData.localUserInfo.avatarUrl
        ? app.globalData.localUserInfo.avatarUrl
        : DEFAULT_AVATAR
    this.setData({ currentUserAvatar: url })
  },
  _mockMessages(partnerName: string): ChatMessage[] {
    const letter = (partnerName || 'A').charAt(0).toUpperCase()
    return [
      { id: '1', type: 'date', text: 'Sat, 17/10' },
      { id: '2', from: 'other', letter, msgType: 'image', text: 'Look at how chocho sleep in my arms!', time: '16.46' },
      { id: '3', from: 'me', letter: 'M', label: 'You', text: 'Can I come over? Of course, let me know if you\'re', time: '16.46' },
      { id: '4', from: 'me', letter: 'M', text: 'K, I\'m on my way', time: '16.50', read: true },
      { id: '5', from: 'me', letter: 'M', msgType: 'voice', duration: '0:20', time: '09.13', read: true },
      { id: '6', from: 'other', letter, text: 'Good morning, did you sleep well?', time: '09.45' },
    ]
  },
  onBack() {
    wx.navigateBack()
  },
  onAddFriend() {
    // 临时会话加好友：后端 addFriend(conversationId / targetUserId)
    wx.showToast({ title: '已发送好友申请', icon: 'none' })
  },
  onAttach() {
    wx.showToast({ title: '选择图片/文件', icon: 'none' })
  },
  onInput(e: WechatMiniprogram.Input) {
    this.setData({ inputText: e.detail.value })
  },
  onSend() {
    const text = (this.data.inputText as string || '').trim()
    if (!text) return
    const msg: ChatMessage = {
      id: 'm' + Date.now(),
      from: 'me',
      letter: 'M',
      text,
      time: this._formatTime(new Date()),
      read: false,
    }
    this.setData({
      messages: this.data.messages.concat([msg]) as ChatMessage[],
      inputText: '',
      scrollToId: 'msg-' + msg.id,
    })
  },
  _formatTime(d: Date): string {
    const h = d.getHours()
    const m = d.getMinutes()
    return (h < 10 ? '0' : '') + h + '.' + (m < 10 ? '0' : '') + m
  },
})
