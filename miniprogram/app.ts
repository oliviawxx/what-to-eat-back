// app.ts
import type { ILocalUserInfo } from '../typings'

const STORAGE_USER = 'localUserInfo'

App<IAppOption>({
  globalData: {
    publishMode: 'dine',
    localUserInfo: undefined,
  },
  onLaunch() {
    try {
      const stored = wx.getStorageSync(STORAGE_USER) as ILocalUserInfo | undefined
      if (stored && typeof stored === 'object') {
        this.globalData.localUserInfo = stored
      }
    } catch (_) {}
    setTimeout(() => {
      try {
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
      } catch (_) {}
    }, 0)
    setTimeout(() => {
      wx.login({ success: (res) => { console.log(res.code) } })
    }, 100)
  },
})

export { STORAGE_USER }