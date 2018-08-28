//获取应用实例
var app = getApp()
// 积分落户：基本信息
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "2017-01-01"
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
    app.globalData.birth = e.detail.value;
    wx.setStorageSync("birth", e.detail.value);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.birth.length > 0) {
      this.setData({
        date: app.globalData.birth
      })
    }
  }
  
})