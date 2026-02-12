Page({
  data: {
    templates: [
      { id: '1', people: '4~5人', gender: '男女皆可' },
      { id: '2', people: '4~5人', gender: '男女皆可' },
    ],
    genderOptions: [
      { value: 'all', label: '男女均可' },
      { value: 'male', label: '仅限男生' },
      { value: 'female', label: '仅限女生' },
    ],
    peopleOptions: [
      { value: '1', label: '1人' },
      { value: '2-3', label: '2~3人' },
      { value: '4-5', label: '4~5人' },
      { value: '6+', label: '6人及以上' },
    ],
    genderIndex: 0,
    peopleIndex: 1,
    form: {
      time: '',
      place: '',
      remark: '',
    },
    tags: ['辣', '武汉', '甜口', '粤菜', '川菜'],
  },
  onSelectTemplate: function (e) {
    var id = e.currentTarget.dataset.id
    wx.showToast({ title: '编辑模板' + id, icon: 'none' })
  },
  onGenderChange: function (e) {
    this.setData({ genderIndex: parseInt(e.detail.value, 10) })
  },
  onPeopleChange: function (e) {
    this.setData({ peopleIndex: parseInt(e.detail.value, 10) })
  },
  onTimeInput: function (e) {
    this.setData({ 'form.time': e.detail.value })
  },
  onPlaceInput: function (e) {
    this.setData({ 'form.place': e.detail.value })
  },
  onRemarkInput: function (e) {
    this.setData({ 'form.remark': e.detail.value })
  },
  onSaveTemplate: function () {
    wx.showToast({ title: '保存成功', icon: 'success' })
  },
})
