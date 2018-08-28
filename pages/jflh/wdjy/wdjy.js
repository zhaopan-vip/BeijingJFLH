//获取应用实例
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    month: 0
  },

  /**
   * 提交数据
   */
  onConfirm: function(e) {
    this.setData({
      month: e.detail.value
    })
    app.globalData.workMonth = e.detail.value;
    wx.setStorageSync("workMonth", e.detail.value);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      month: app.globalData.workMonth
    })
  },
})