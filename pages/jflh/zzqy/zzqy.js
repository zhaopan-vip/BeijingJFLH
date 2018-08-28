//获取应用实例
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [
      { name: '不满足相关职住区域积分条件', value: '0', checked: true },
      { name: '居住地由城六区转移到本市其他行政区', value: '1' },
      { name: '就业地和居住地均由城六区转移到本市其他行政区', value: '2' },
    ],
    pickerItems: ['满1年', '满2年', '满3年及以上'],
    pickerIndex: 0
  },
  /*
   * 职住转移是否满足
   */
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

    app.globalData.hourseAndWorkChange = e.detail.value;
    wx.setStorageSync("hourseAndWorkChange", e.detail.value);
  },

  /*
   * 职住转移满n年，最大3年
   */
  bindPickerChange: function (e) {
    console.log('picker 发生选择改变，携带值为', e.detail.value);

    this.setData({
      pickerIndex: e.detail.value
    })
    app.globalData.hourseAndWorkYear = e.detail.value;
    wx.setStorageSync("hourseAndWorkYear", e.detail.value);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.changeRadioValue(app.globalData.hourseAndWorkChange);
    this.setData({
      pickerIndex: app.globalData.hourseAndWorkYear
    })
  }
})