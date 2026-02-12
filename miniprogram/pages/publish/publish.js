Page({
  data: {},
  onShow() {
    var t = this.getTabBar && this.getTabBar()
    if (t && typeof t.setData === 'function') t.setData({ selected: 2 })
  },
})
