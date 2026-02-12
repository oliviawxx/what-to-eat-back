/// <reference path="./types/index.d.ts" />

/** 本地/缓存的当前用户资料（头像、昵称等），用于各页面展示一致 */
export interface ILocalUserInfo {
  avatarUrl?: string
  nickName?: string
  signature?: string
  email?: string
  intro?: string
}

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo
    /** 当前用户资料（含头像），各页面读此或 storage，更新时写此处 + wx.setStorageSync('localUserInfo') */
    localUserInfo?: ILocalUserInfo
    publishMode?: 'review' | 'dine'
    selectedRestaurant?: { name?: string; [k: string]: unknown }
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback
}