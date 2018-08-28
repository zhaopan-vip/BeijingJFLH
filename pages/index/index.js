//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
  },
  //事件处理函数
  onClickJFLH: function () {
    wx.navigateTo({
      url: '/pages/jflh/jflh',
    })
  },
  onLoad: function () {
    console.log('onLoad')
  }
})