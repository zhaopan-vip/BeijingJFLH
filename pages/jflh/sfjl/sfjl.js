//获取应用实例
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickerItems: [0,1,2,3,4,5,6,7,8,9,10],
    pickerIndex: 0
  },
  bindPickerChange: function (e) {
    console.log('picker 发生选择改变，携带值为', e.detail.value);

    this.setData({
      pickerIndex: e.detail.value
    })
    app.globalData.detention = e.detail.value;
    wx.setStorageSync("detention", e.detail.value);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pickerIndex: app.globalData.detention
    })
  }
})