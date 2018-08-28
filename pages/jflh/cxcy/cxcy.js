//获取应用实例
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [
      { name: '不满足创新创业积分条件', value: '0', checked: true },
      { name: '在科技、文化领域获得国家级或本市市级奖项', value: '1' },
      { name: '在创新创业大赛获得国家级或本市市级奖项', value: '2' },
      { name: '在国家高新技术企业担任高级管理人员、核心技术人员且符合相关条件', value: '3' },
      { name: '在经认定的科技企业孵化器及众创空间中符合一定条件的创业企业投资或就业且符合相关条件', value: '4' },
      { name: '在经认定的科技企业孵化器及众创空间、技术转移服务机构、专业科技服务机构投资或就业且符合相关条件', value: '5' },
    ],
    item_1_Picker: ['积12分', '积11分', '积10分', '积9分', '积8分', '积6分', '积5分', '积4分', '积2分'],
    value_1_Array: [12, 11, 10, 9, 8, 6, 5, 4, 2],
    item_1_Index: 0,

    item_2_Picker: ['积12分', '积9分', '积6分', '积4分', '积3分', '积2分'],
    value_2_Array: [12, 9, 6, 4, 3, 2],
    item_2_Index: 0,

    item_3_Picker: ['满1年', '满2年', '满3年'],
    value_3_Array: [2, 4, 6],
    item_3_Index: 2,

    item_4_Picker: ['满1年', '满2年', '满3年'],
    value_4_Array: [2, 4, 6],
    item_4_Index: 0,

    item_5_Picker: ['满1年', '满2年', '满3年'],
    value_5_Array: [1, 2, 3],
    item_5_Index: 0,
  },
  saveTargetIndex: function (targetIndex, strIndex) {
    switch (targetIndex) {
      case 1:
        this.setData({
          item_1_Index: strIndex
        })
        break;
      case 2:
        this.setData({
          item_2_Index: strIndex
        })
        break;
      case 3:
        this.setData({
          item_3_Index: strIndex
        })
        break;
      case 4:
        this.setData({
          item_4_Index: strIndex
        })
        break;
      case 5:
        this.setData({
          item_5_Index: strIndex
        })
        break;
    }
  }, 
  saveItemIndexAndValue: function (targetIndex, strIndex) {
    var array = [
      [0], 
      this.data.value_1_Array, 
      this.data.value_2_Array, 
      this.data.value_3_Array, 
      this.data.value_4_Array, 
      this.data.value_5_Array
    ];
    var valueIndex = parseInt(strIndex);
    // 同时保存默认的索引与取值
    app.globalData.innovationIndex = strIndex;
    app.globalData.innovationValue = array[targetIndex][valueIndex];
    wx.setStorageSync("innovationIndex", app.globalData.innovationIndex);
    wx.setStorageSync("innovationValue", app.globalData.innovationValue);
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

    app.globalData.innovationAndCarvingOut = e.detail.value;
    wx.setStorageSync("innovationAndCarvingOut", e.detail.value);
    // 需要同步更新
    var targetIndex = parseInt(e.detail.value);
    this.saveTargetIndex(targetIndex, '0');
    this.saveItemIndexAndValue(targetIndex, '0');
  },
  /*
   * 第一项
   */
  bindOnePickerChange: function (e) {
    console.log('picker 发生选择改变，携带值为', e.detail.value);

    this.setData({
      item_1_Index: e.detail.value
    })
    this.saveItemIndexAndValue(1, e.detail.value);
  },
  /*
   * 第二项
   */
  bindTwoPickerChange: function (e) {
    console.log('picker 发生选择改变，携带值为', e.detail.value);

    this.setData({
      item_2_Index: e.detail.value
    })
    this.saveItemIndexAndValue(2, e.detail.value);
  },
  /*
   * 第3项
   */
  bindThreePickerChange: function (e) {
    console.log('picker 发生选择改变，携带值为', e.detail.value);

    this.setData({
      item_3_Index: e.detail.value
    })
    this.saveItemIndexAndValue(3, e.detail.value);
  },
  /*
   * 第4项
   */
  bindFourPickerChange: function (e) {
    console.log('picker 发生选择改变，携带值为', e.detail.value);

    this.setData({
      item_4_Index: e.detail.value
    })
    this.saveItemIndexAndValue(4, e.detail.value);
  },
  /*
   * 第5项
   */
  bindFivePickerChange: function (e) {
    console.log('picker 发生选择改变，携带值为', e.detail.value);

    this.setData({
      item_5_Index: e.detail.value
    })
    this.saveItemIndexAndValue(5, e.detail.value);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.changeRadioValue(app.globalData.innovationAndCarvingOut);
    this.saveTargetIndex(parseInt(app.globalData.innovationAndCarvingOut), app.globalData.innovationIndex);
  }
})