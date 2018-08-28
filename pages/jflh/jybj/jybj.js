//获取应用实例
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [
      { name: '不满足教育背景积分条件', value: '0', checked: true },
      { name: '大学专科(含高职)', value: '1' },
      { name: '大学本科学历并取得学士学位', value: '2' },
      { name: '研究生学历并取得硕士学位', value: '3' },
      { name: '研究生学历并取得博士学位', value: '4' },
    ],
  },
  changeRadioValue: function(value) {
    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == value;
    }

    this.setData({
      radioItems: radioItems
    });
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.changeRadioValue(e.detail.value);

    app.globalData.eduLevel = e.detail.value;
    wx.setStorageSync("eduLevel", e.detail.value);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.changeRadioValue(app.globalData.eduLevel);
  }
})