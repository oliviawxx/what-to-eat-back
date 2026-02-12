// 聊天详情页 - 后端接口预留说明：
// - 入参：conversationId（会话ID）、name（对方昵称）、temp（1=临时会话 0=好友会话）
// - 临时会话标记：data.isTemp === true 时仅展示「添加好友」入口，且请求需带 conversationType: 'temp'
// - 建议后端接口：getConversationList(含 isTemp 字段)、getMessages(conversationId)、sendMessage(conversationId, content)、addFriend(targetUserId)（临时会话加好友）
Page({
  data: {
    partnerName: '',
    conversationId: '',
    isTemp: false,
    statusBarHeight: 20,
    scrollToId: '',
    inputText: '',
    inputFocus: false,
    messages: [],
  },
  onLoad(options) {
    var conversationId = options.conversationId || options.id || ''
    var name = options.name ? decodeURIComponent(options.name) : '聊天'
    var temp = options.temp === '1' || options.temp === 'true'
    var sysInfo = wx.getSystemInfoSync()
    this.setData({
      partnerName: name,
      conversationId: conversationId,
      isTemp: temp,
      statusBarHeight: sysInfo.statusBarHeight || 20,
      messages: this._mockMessages(name),
    })
  },
  _mockMessages(partnerName) {
    var letter = (partnerName || 'A').charAt(0).toUpperCase()
    return [
      { id: '1', type: 'date', text: 'Sat, 17/10' },
      { id: '2', from: 'other', letter: letter, msgType: 'image', text: 'Look at how chocho sleep in my arms!', time: '16.46' },
      { id: '3', from: 'me', letter: 'M', label: 'You', text: 'Can I come over? Of course, let me know if you\'re', time: '16.46' },
      { id: '4', from: 'me', letter: 'M', text: 'K, I\'m on my way', time: '16.50', read: true },
      { id: '5', from: 'me', letter: 'M', msgType: 'voice', duration: '0:20', time: '09.13', read: true },
      { id: '6', from: 'other', letter: letter, text: 'Good morning, did you sleep well?', time: '09.45' },
    ]
  },
  onBack() {
    wx.navigateBack()
  },
  onAddFriend() {
    // 临时会话加好友：后端接口 addFriend(conversationId 或 targetUserId)
    wx.showToast({ title: '已发送好友申请', icon: 'none' })
  },
  onAttach() {
    wx.showToast({ title: '选择图片/文件', icon: 'none' })
  },
  onInput(e) {
    this.setData({ inputText: e.detail.value })
  },
  onSend() {
    var text = (this.data.inputText || '').trim()
    if (!text) return
    var msg = {
      id: 'm' + Date.now(),
      from: 'me',
      letter: 'M',
      text: text,
      time: this._formatTime(new Date()),
      read: false,
    }
    this.setData({
      messages: this.data.messages.concat([msg]),
      inputText: '',
      scrollToId: 'msg-' + msg.id,
    })
  },
  _formatTime(d) {
    var h = d.getHours()
    var m = d.getMinutes()
    return (h < 10 ? '0' : '') + h + '.' + (m < 10 ? '0' : '') + m
  },
})
