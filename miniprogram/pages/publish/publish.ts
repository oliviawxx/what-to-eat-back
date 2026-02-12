const GENDER_OPTIONS = [
  { label: '男女均可', value: 'all' },
  { label: '仅男', value: 'male' },
  { label: '仅女', value: 'female' },
]
const PEOPLE_OPTIONS = [
  { label: '2~3人', value: '2-3' },
  { label: '4~5人', value: '4-5' },
  { label: '6人及以上', value: '6+' },
]

Page({
  data: {
    pageType: 'dine',
    navTitle: '约饭',
    rating: 0,
    reviewContent: '',
    statusBarHeight: 20,
    images: [] as string[],
    video: '',
    genderOptions: GENDER_OPTIONS,
    peopleOptions: PEOPLE_OPTIONS,
    dineMerchant: {
      name: '川味坊（武大校内店）',
      dineCount: 28,
      reviewCount: 28,
      price: '40¥/人',
      hours: '11:00 - 14:00 17:00 - 20:00',
      address: '武昌区八一路483号武汉大学工学部内',
      dishes: '干煸藕丝 重庆辣子鸡 糍粑鱼',
    },
    dineForm: {
      date: '',
      time: '',
      place: '',
      remark: '',
      genderIndex: 0,
      peopleIndex: 0,
      tags: ['辣', '不辣', '甜口', '川菜'],
    },
    showDineAddTagModal: false,
    newDineTagName: '',
  },
  onLoad(_options: Record<string, string>) {
    const winInfo = wx.getWindowInfo()
    const app = getApp() as IAppOption
    const updates: {
      statusBarHeight?: number
      pageType?: string
      navTitle?: string
      dineMerchant?: Record<string, unknown>
    } = {
      statusBarHeight: winInfo.statusBarHeight != null ? winInfo.statusBarHeight : 20,
    }
    if (app.globalData.publishMode === 'review') {
      updates.pageType = 'review'
      app.globalData.publishMode = 'dine'
    }
    const rest = app.globalData.selectedRestaurant
    if (rest && rest.name) {
      updates.navTitle = rest.name as string
      updates.dineMerchant = {
        name: rest.name,
        dineCount: (rest as { dineCount?: number }).dineCount != null ? (rest as { dineCount?: number }).dineCount : 28,
        reviewCount: (rest as { reviewCount?: number }).reviewCount != null ? (rest as { reviewCount?: number }).reviewCount : 28,
        price: (rest as { price?: string }).price != null ? (rest as { price?: string }).price : '40¥/人',
        hours: (rest as { hours?: string }).hours != null ? (rest as { hours?: string }).hours : '11:00 - 14:00 17:00 - 20:00',
        address: (rest as { location?: string }).location != null ? (rest as { location?: string }).location : ((rest as { address?: string }).address != null ? (rest as { address?: string }).address : '武昌区八一路483号武汉大学工学部内'),
        dishes: (rest as { dishes?: string }).dishes != null ? (rest as { dishes?: string }).dishes : '干煸藕丝 重庆辣子鸡 糍粑鱼',
      }
    }
    this.setData(updates)
  },
  onShow() {
    const t = this.getTabBar && this.getTabBar()
    if (t && typeof t.setData === 'function') t.setData({ selected: 2 })
    const app = getApp() as IAppOption
    const sel = app.globalData.selectedRestaurant
    if (sel && sel.name && this.data.navTitle !== sel.name) {
      this.setData({ navTitle: sel.name })
    }
  },
  onSetRating(e: WechatMiniprogram.TouchEvent) {
    const rating = (e.currentTarget.dataset as { rating: number }).rating
    this.setData({ rating })
  },
  onReviewInput(e: WechatMiniprogram.InputEvent) {
    this.setData({ reviewContent: e.detail.value })
  },
  onUploadImage() {
    wx.chooseMedia({
      count: 9 - ((this.data.images && this.data.images.length) || 0),
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const files = (res.tempFiles || []).map((f) => f.tempFilePath)
        const images = [...(this.data.images || []), ...files].slice(0, 9)
        this.setData({ images })
      },
    })
  },
  onUploadVideo() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['video'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFiles && res.tempFiles[0] ? res.tempFiles[0].tempFilePath : undefined
        if (tempFilePath) this.setData({ video: tempFilePath })
      },
    })
  },
  onBack() {
    wx.switchTab({ url: '/pages/map-rank/map-rank' })
  },
  onNavRightTap() {
    wx.showToast({ title: '编辑', icon: 'none' })
  },
  onEditMerchant() {
    wx.showToast({ title: '编辑商家', icon: 'none' })
  },
  onMerchantNav() {
    wx.showToast({ title: '导航', icon: 'none' })
  },
  onMerchantReviews() {
    wx.showToast({ title: '查看评价', icon: 'none' })
  },
  onDineDateInput(e: WechatMiniprogram.InputEvent) {
    this.setData({ 'dineForm.date': e.detail.value })
  },
  onDineTimeInput(e: WechatMiniprogram.InputEvent) {
    this.setData({ 'dineForm.time': e.detail.value })
  },
  onDinePlaceInput(e: WechatMiniprogram.InputEvent) {
    this.setData({ 'dineForm.place': e.detail.value })
  },
  onDineRemarkInput(e: WechatMiniprogram.InputEvent) {
    this.setData({ 'dineForm.remark': e.detail.value })
  },
  onDineGenderChange(e: WechatMiniprogram.PickerChange) {
    this.setData({ 'dineForm.genderIndex': Number(e.detail.value) })
  },
  onDinePeopleChange(e: WechatMiniprogram.PickerChange) {
    this.setData({ 'dineForm.peopleIndex': Number(e.detail.value) })
  },
  onAddTag() {
    this.setData({ showDineAddTagModal: true, newDineTagName: '' })
  },
  onCloseDineAddTagModal() {
    this.setData({ showDineAddTagModal: false, newDineTagName: '' })
  },
  onDineNewTagInput(e: WechatMiniprogram.InputEvent) {
    this.setData({ newDineTagName: e.detail.value })
  },
  onConfirmDineAddTag() {
    const name = (this.data.newDineTagName || '').trim()
    if (!name) {
      wx.showToast({ title: '请输入标签名', icon: 'none' })
      return
    }
    const tags = [...this.data.dineForm.tags, name]
    this.setData({
      'dineForm.tags': tags,
      showDineAddTagModal: false,
      newDineTagName: '',
    })
    wx.showToast({ title: '已添加', icon: 'success' })
  },
  onDineConfirmPublish() {
    wx.showToast({ title: '发布成功', icon: 'success' })
    setTimeout(() => {
      wx.switchTab({ url: '/pages/map-rank/map-rank' })
    }, 1500)
  },
  onConfirmPublish() {
    if (this.data.rating === 0) {
      wx.showToast({ title: '请先选择评分', icon: 'none' })
      return
    }
    wx.showToast({ title: '评价已发布', icon: 'success' })
    setTimeout(() => {
      wx.switchTab({ url: '/pages/map-rank/map-rank' })
    }, 1500)
  },
})

