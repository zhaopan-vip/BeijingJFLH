//获取应用实例
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: ["自有住所", "单位宿舍", "租赁住所"],
    typeIndex: 0,
    start: "2017-01",
    end: "2017-12",
    items: []
  },
  showStartWithEndAlert: function () {
    wx.showModal({
      content: '居住开始时间必须小于或者等于结束时间',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
  },
  showStartEndAreaAlert: function () {
    wx.showModal({
      content: '居住开始时间与结束时间区间不能与已有记录范围重叠！',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
  },
  bindStartChange: function(e) {
    if (this.data.end < e.detail.value) {
      // 重置
      var that = this;
      this.setData({
        start: that.data.end
      })
      this.showStartWithEndAlert();
      return;
    }
    this.setData({
      start: e.detail.value
    })
  },
  bindEndChange: function(e) {
    if (this.data.start > e.detail.value) {
      // 重置回最大值
      this.setData({
        end: "2017-12"
      });
      this.showStartWithEndAlert();
      return;
    }
    this.setData({
      end: e.detail.value
    })
  },
  bindTypeChange: function(e) {
    this.setData({
      typeIndex: parseInt(e.detail.value)
    })
  },
  bindTapMore: function(e) {
    // 添加到列表中显示，时间区间不能重叠
    var items = this.data.items;
    if (items.length == 0) {
      items = new Array();
    }
    for(var i=0; i < items.length; i++) {
      var item = items[i];
      if ((item.start <= this.data.start && this.data.start <= item.end) 
        || (item.start <= this.data.end && this.data.end <= item.end)
        || (this.data.start < item.start && item.end < this.data.end)) {
        // 时间范围存在重叠
        this.showStartEndAreaAlert();
        return;
      }
    }
    items[items.length] = {
      typeIndex: this.data.typeIndex,
      start: this.data.start,
      end: this.data.end,
    }
    this.setData({
      items: items
    })
    app.globalData.livingList = items;
    wx.setStorageSync("livingList", items);
  },
  bindTapDelete: function(e) {
    // 删除列表项
    var Ind = e.currentTarget.dataset.index;
    console.log(Ind);
    var items = this.data.items;
    items.splice(Ind, 1);
    this.setData({
      items: items
    })
    app.globalData.livingList = items;
    wx.setStorageSync("livingList", items);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      items: app.globalData.livingList
    })
  }
})