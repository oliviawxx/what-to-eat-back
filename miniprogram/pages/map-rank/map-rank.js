Page({
  data: {
    mode: 'list',
    filterOpen: false,
    filters: {
      people: '4~5',
      location: '文理学部',
      gender: '',
    },
    listItems: [
      {
        id: '1',
        avatarUrl: '',
        userName: '用户12345678910',
        joined: 2,
        total: 5,
        people: '4~5人',
        gender: '男女皆可',
        place: '海底捞',
        meetPlace: 'Supporting line text lorem ipsum',
        date: '2026年2月30日',
        time: '11:00 — 13:00',
        remark: 'Supporting line text lorem ipsum dolor sit amet, consectetur.',
        btnLeft: '临时对话',
        btnRight: '加入约饭',
      },
      {
        id: '2',
        avatarUrl: '',
        userName: '用户12345678910',
        joined: 3,
        total: 4,
        people: '4~5人',
        gender: '男女皆可',
        place: '信息学部食堂',
        meetPlace: '校门口',
        date: '2026年3月1日',
        time: '12:00 — 14:00',
        remark: '忌辣',
        btnLeft: '查看榜单',
        btnRight: '查看约饭',
      },
    ],
  },
  onShow() {
    var t = this.getTabBar && this.getTabBar()
    if (t && typeof t.setData === 'function') t.setData({ selected: 1 })
  },
  onSelectMode(e) {
    var value = e.currentTarget.dataset.value
    this.setData({ mode: value })
  },
  onToggleFilter() {
    this.setData({ filterOpen: !this.data.filterOpen })
  },
  onCloseFilter() {
    this.setData({ filterOpen: false })
  },
  onFilterChip(e) {
    var field = e.currentTarget.dataset.field
    var value = e.currentTarget.dataset.value
    this.setData({ ['filters.' + field]: value })
  },
  onFilterReset() {
    this.setData({
      'filters.people': '2~3',
      'filters.location': '信息学部',
      'filters.gender': '',
    })
  },
  onFilterDone() {
    this.setData({ filterOpen: false })
    wx.showToast({ title: '筛选已应用', icon: 'none' })
  },
  onCardAction(e) {
    var id = e.currentTarget.dataset.id
    var action = e.currentTarget.dataset.action
    var item = this.data.listItems.find(function (x) { return x.id === id })
    if (!item) return
    var name = action === 'left' ? item.btnLeft : item.btnRight
    wx.showToast({ title: name, icon: 'none' })
  },
})
