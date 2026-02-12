interface ListItem {
  id: string
  avatarUrl: string
  userName: string
  joined: number
  total: number
  people: string
  gender: string
  place: string
  meetPlace: string
  date: string
  time: string
  remark: string
  btnLeft: string
  btnRight: string
  btnLeftIcon?: string
  btnRightIcon?: string
}

/** 约饭地点项（后端返回，含经纬度，用于地图标记与详情弹窗） */
interface YuefanLocationItem extends ListItem {
  latitude: number
  longitude: number
}

/** 地图 marker 结构（由 YuefanLocationItem 转换） */
interface MapMarker {
  id: number
  latitude: number
  longitude: number
  width?: number
  height?: number
  title?: string
}

/** 默认中心：武汉大学附近 */
const DEFAULT_LONGITUDE = 114.362
const DEFAULT_LATITUDE = 30.538

Page({
  data: {
    mode: 'map' as 'map' | 'list',
    filterOpen: false,
    longitude: DEFAULT_LONGITUDE,
    latitude: DEFAULT_LATITUDE,
    mapScale: 15,
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
        btnLeftIcon: '../../images/buttons/临时对话.png',
        btnRightIcon: '../../images/buttons/加入约饭.png',
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
    ] as ListItem[],
    /** 约饭地点列表（含经纬度），由后端返回，用于地图标记与详情弹窗 */
    yuefanLocations: [] as YuefanLocationItem[],
    /** 地图上的标记点（由 yuefanLocations 生成） */
    mapMarkers: [] as MapMarker[],
    /** 详情弹窗是否显示 */
    detailModalShow: false,
    /** 当前选中的约饭项（用于详情弹窗） */
    selectedYuefan: null as YuefanLocationItem | null,
  },
  onLoad() {
    this.loadYuefanLocations()
  },
  /** 从后端拉取约饭地点并更新地图标记（此处为占位，替换为真实请求） */
  loadYuefanLocations() {
    // TODO: 替换为 wx.request 调用后端接口，接口返回约饭列表，每项含 latitude, longitude 及详情
    // wx.request({ url: 'xxx/yuefan/locations', success: (res) => { this.buildMarkers(res.data) } })
    const mockList: YuefanLocationItem[] = this.data.listItems.map((item, index) => ({
      ...item,
      latitude: DEFAULT_LATITUDE + (index - 0.5) * 0.008,
      longitude: DEFAULT_LONGITUDE + (index - 0.5) * 0.006,
    }))
    this.setData({ yuefanLocations: mockList }, () => this.buildMapMarkers())
  },
  /** 根据 yuefanLocations 生成 map 组件的 markers */
  buildMapMarkers() {
    const list = this.data.yuefanLocations as YuefanLocationItem[]
    const mapMarkers: MapMarker[] = list.map((item, index) => ({
      id: index,
      latitude: item.latitude,
      longitude: item.longitude,
      width: 32,
      height: 32,
      title: item.place || '',
    }))
    this.setData({ mapMarkers })
  },
  onShow() {
    const t = this.getTabBar && this.getTabBar()
    if (t && typeof t.setData === 'function') t.setData({ selected: 1 })
    if (this.data.mode === 'map') this.initMapCenter()
  },
  /** 尝试用用户位置定位，失败则用默认中心 */
  initMapCenter() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude,
        })
      },
      fail: () => {
        // 保持默认武汉中心
      },
    })
  },
  onMapTap() {},
  /** 点击地图标记：弹出该约饭详情 */
  onMarkerTap(e: WechatMiniprogram.CustomEvent<{ markerId: number }>) {
    const markerId = e.detail.markerId
    const list = this.data.yuefanLocations as YuefanLocationItem[]
    const item = list[markerId]
    if (!item) return
    this.setData({ selectedYuefan: item, detailModalShow: true })
  },
  closeDetailModal() {
    this.setData({ detailModalShow: false, selectedYuefan: null })
  },
  onDetailModalContentTap() {
    // 阻止点击弹窗内容时关闭
  },
  onDetailTempChat() {
    const item = this.data.selectedYuefan
    if (item) wx.showToast({ title: '临时对话', icon: 'none' })
    this.closeDetailModal()
  },
  onDetailJoinYuefan() {
    const item = this.data.selectedYuefan
    if (item) wx.showToast({ title: '加入约饭', icon: 'none' })
    this.closeDetailModal()
  },
  onViewRank() {
    wx.showToast({ title: '查看榜单', icon: 'none' })
    // 可跳转到榜单页或切换展示
  },
  onViewYuefan() {
    wx.showToast({ title: '查看约饭', icon: 'none' })
    // 可跳转到约饭列表或筛选
  },
  onSelectMode(e: WechatMiniprogram.TouchEvent) {
    const value = (e.currentTarget.dataset as { value: 'map' | 'list' }).value
    this.setData({ mode: value })
    if (value === 'map') this.initMapCenter()
  },
  onToggleFilter() {
    this.setData({ filterOpen: !this.data.filterOpen })
  },
  onCloseFilter() {
    this.setData({ filterOpen: false })
  },
  onFilterChip(e: WechatMiniprogram.TouchEvent) {
    const { field, value } = e.currentTarget.dataset as { field: string; value: string }
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
  onCardAction(e: WechatMiniprogram.TouchEvent) {
    const { id, action } = e.currentTarget.dataset as { id: string; action: string }
    const item = (this.data.listItems as ListItem[]).find((x) => x.id === id)
    if (!item) return
    const name = action === 'left' ? item.btnLeft : item.btnRight
    wx.showToast({ title: name, icon: 'none' })
  },
})
