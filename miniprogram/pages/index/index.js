var ADDRESS_OPTIONS = ['信息学部', '文理学部', '工学部', '医学部', '武汉市内']
var PEOPLE_OPTIONS = ['1人', '2~3人', '4~5人', '6人及以上']

Page({
  data: {
    addressText: '信息学部',
    peopleText: '2~3人',
    addressOptions: ADDRESS_OPTIONS,
    peopleOptions: PEOPLE_OPTIONS,
    addressOpen: false,
    peopleOpen: false,
    showBubble: false,
  },
  onToggleAddress: function () {
    this.setData({
      addressOpen: !this.data.addressOpen,
      peopleOpen: false,
    })
  },
  onTogglePeople: function () {
    this.setData({
      peopleOpen: !this.data.peopleOpen,
      addressOpen: false,
    })
  },
  onSelectAddress: function (e) {
    var value = e.currentTarget.dataset.value
    this.setData({ addressText: value, addressOpen: false })
  },
  onSelectPeople: function (e) {
    var value = e.currentTarget.dataset.value
    this.setData({ peopleText: value, peopleOpen: false })
  },
  onShow: function () {
    var t = this.getTabBar && this.getTabBar()
    if (t && typeof t.setData === 'function') t.setData({ selected: 0 })
    this.setData({ showBubble: true })
    if (this._bubbleTimer) clearTimeout(this._bubbleTimer)
    var that = this
    this._bubbleTimer = setTimeout(function () {
      that.setData({ showBubble: false })
    }, 3000)
  },
  onUnload: function () {
    if (this._bubbleTimer) clearTimeout(this._bubbleTimer)
  },
  onPick() {
    wx.showToast({ title: '今天吃什么', icon: 'none' })
  },
  onOpenAIChat() {
    wx.navigateTo({
      url: '/pages/ai-chat/ai-chat',
    })
  },
})
