//app.js
App({
  onLaunch: function () {

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 读取本地数据
    this.globalData.birth = wx.getStorageSync("birth");
    this.globalData.workMonth = wx.getStorageSync("workMonth");
    this.globalData.livingList = wx.getStorageSync("livingList");
    this.globalData.eduLevel = wx.getStorageSync("eduLevel");
  },
  globalData: {
    userInfo: null,
    birth: "",
    workMonth: 0,
    livingList: [],
    eduLevel: 0,
    hourseAndWorkChange: 0,
    hourseAndWorkYear: 0,
    innovationAndCarvingOut: 0,
    innovationIndex: 0,
    innovationValue: 0,
    taxLevel: 0,
    weifaIndex: 0,
    honor: 0,
    detention: 0
  }
})