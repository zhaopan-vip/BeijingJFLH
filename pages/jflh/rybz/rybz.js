//获取应用实例
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [
      { name: '不符合荣誉表彰积分条件', value: '0', checked: true },
      { name: '省部级以上劳动模范', value: '1' },
      { name: '全国道德模范或首都道德模范', value: '2' },
      { name: '全国见义勇为英雄模范或首都见义勇为好市民', value: '3' },
    ],
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

    app.globalData.honor = e.detail.value;
    wx.setStorageSync("honor", e.detail.value);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.changeRadioValue(app.globalData.honor);
  }
})