//获取应用实例
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [
      { name: '不满足相关纳税积分条件', value: '0', checked: true },
      { name: '平均每年个人所得税纳税额在10万元及以上', value: '1' },
      { name: '出资企业纳税额按其出资比例计算，平均每年纳税20万元及以上', value: '2' },
    ],
    weifaItems: [0,1,2,3,4,5,6,7,8,9,10],
    weifaIndex: 0
  },
  changeRadioValue: function (value) {
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

    app.globalData.taxLevel = e.detail.value;
    wx.setStorageSync("taxLevel", e.detail.value);
  },
  bindWeiFaChange: function (e) {
    this.setData({
      weifaIndex: e.detail.value
    })
    app.globalData.weifaIndex = e.detail.value;
    wx.setStorageSync("weifaIndex", e.detail.value);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.changeRadioValue(app.globalData.taxLevel);
    this.setData({
      weifaIndex: app.globalData.weifaIndex
    })
  }
})