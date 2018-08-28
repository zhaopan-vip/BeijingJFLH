//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    items: [
      {
        icon: "/images/p5.png",
        title: "基本信息",
        sum: 0
      },
      {
        icon: "/images/i1.png",
        title: "合法稳定就业",
        sum: 0
      },
      {
        icon: "/images/p2.png",
        title: "合法稳定住所",
        sum: 0
      },
      {
        icon: "/images/i2.png",
        title: "教育背景",
        sum: 0
      },
      {
        icon: "/images/i5.png",
        title: "职住区域",
        sum: 0
      },
      {
        icon: "/images/i3.png",
        title: "创新创业",
        sum: 0
      },
      {
        icon: "/images/i4.png",
        title: "纳税",
        sum: 0
      },
      {
        icon: "/images/i6.png",
        title: "年龄",
        sum: 0
      },
      {
        icon: "/images/p4.png",
        title: "荣誉表彰",
        sum: 0
      },
      {
        icon: "/images/i7.png",
        title: "守法记录",
        sum: 0
      }
    ],
    total: 0
  },
  onShow: function () {
    var items = this.data.items;
    // 合法稳定就业
    items[1].sum = 3.0 * app.globalData.workMonth / 12;
    // 合法稳定住所
    var zf_month_array = [0, 0, 0];
    for (var i = 0, iLen = app.globalData.livingList.length; i < iLen; i++) {
      var livingItem = app.globalData.livingList[i];
      var begin = new Date(livingItem.start);
      var end = new Date(livingItem.end);
      var months = (end.getFullYear() - begin.getFullYear()) * 12 + end.getMonth() - begin.getMonth() + 1;
      console.log("months: " + months);
      zf_month_array[livingItem.typeIndex] += months;
    }
    if (app.globalData.workMonth < zf_month_array[0] + zf_month_array[1] + zf_month_array[2]) {
      // 社保年限小于住房累计年限
      if (app.globalData.workMonth <= zf_month_array[0]) {
        var a = 1.0 * app.globalData.workMonth / 12;
        items[2].sum = parseFloat(a.toFixed(2));
      } else {
        var a = 1.0 * zf_month_array[0] / 12;
        items[2].sum = parseFloat(a.toFixed(2));
        var delta = app.globalData.workMonth - zf_month_array[0];
        // 优先计算自有住房，余下是单位住房/租房
        if (delta <= zf_month_array[1]) {
          var b = 0.5 * delta / 12;
          items[2].sum += parseFloat(b.toFixed(2));
        } else {
          var b = 0.5 * zf_month_array[1] / 12;
          items[2].sum += parseFloat(b.toFixed(2));
          // 租房
          var c = 0.5 * (delta - zf_month_array[1]) / 12;
          items[2].sum += parseFloat(c.toFixed(2));
        }
      }
    } else {
      var a = 1.0 * zf_month_array[0] / 12;
      var b = 0.5 * zf_month_array[1] / 12;
      var c = 0.5 * zf_month_array[2] / 12;
      items[2].sum = parseFloat(a.toFixed(2)) + 
          parseFloat(b.toFixed(2)) + parseFloat(c.toFixed(2));
    }
    // 教育背景
    switch (app.globalData.eduLevel) {
      case '0': items[3].sum = 0;     break;
      case '1': items[3].sum = 10.5;  break;
      case '2': items[3].sum = 15;    break;
      case '3': items[3].sum = 26;    break;
      case '4': items[3].sum = 37;    break;
    }
    // 职住
    switch (app.globalData.hourseAndWorkChange) {
      case '0': items[4].sum = 0; break;
      case '1': items[4].sum = 2.0 * (parseInt(app.globalData.hourseAndWorkYear) + 1); break;
      case '2': items[4].sum = 4.0 * (parseInt(app.globalData.hourseAndWorkYear) + 1); break;
    }
    // 创新创业
    switch (app.globalData.innovationAndCarvingOut) {
      case '0': items[5].sum = 0; break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
        items[5].sum = app.globalData.innovationValue;
        break;
    }
    // 纳税，两条之一加6分，违法记录每条扣12分
    switch (app.globalData.taxLevel) {
      case '0': items[6].sum = 0; break;
      case '1':
      case '2':
        items[6].sum = 6;
        break;
    }
    items[6].sum -= app.globalData.weifaIndex * 12.0;
    // 年龄
    items[7].sum = (app.globalData.birth < "1971-01")? 0: 20;
    // 荣誉表彰
    switch (app.globalData.honor) {
      case '0': items[8].sum = 0; break;
      case '1':
      case '2':
      case '3':
        items[8].sum = 20;
        break;
    }
    // 守法记录(扣分项)
    switch (app.globalData.detention) {
      case '0': items[9].sum = 0; break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '10':
        items[9].sum = parseInt(app.globalData.detention) * (-30);
        break;
    }
    // 总分
    var totalSum = 0;
    for (var i = 1; i < items.length; i++) {
      totalSum += items[i].sum;
    }
    this.setData({
      items: items,
      total: totalSum.toFixed(2)
    })
  },

  toastUnComplete: function () {
    wx.showToast({
      title: '暂不支持该项积分计算，可以将四项基本加分结果再自行计算……',
      icon: 'none',
      duration: 3000
    });
  },
  toastAge: function () {
    wx.showToast({
      title: '年龄申报计算以个人身份证记录为准。不超过45周岁的积分指标计算截至积分落户申报工作启动的上一年度1月1日。',
      icon: 'none',
      duration: 5000
    });
  },
  /**
   * 跳转到单项
   */
  toPage: function (event) {
    var that = this;
    //点击跳转菜单，获取当前的index值
    var Ind = event.currentTarget.dataset.index;
    console.log(Ind);
    switch (Ind) {
      case 0://判断跳转页面
        wx.navigateTo({
          url: "jbxx/jbxx"
        });
        break;
      case 1:
        wx.navigateTo({
          url: 'wdjy/wdjy',
        })
        break;
      case 2:
        wx.navigateTo({
          url: 'wdzs/wdzs',
        })
        break;
      case 3:
        wx.navigateTo({
          url: 'jybj/jybj',
        })
        break;
      case 4:
        wx.navigateTo({
          url: 'zzqy/zzqy',
        })
        break;
      case 5:
        wx.navigateTo({
          url: 'cxcy/cxcy',
        })
        break;
      case 6:
        wx.navigateTo({
          url: 'ns/ns',
        })
        break;
      case 7:
        that.toastAge();
        break;
      case 8:
        wx.navigateTo({
          url: 'rybz/rybz',
        })
      case 9:
        wx.navigateTo({
          url: 'sfjl/sfjl',
        })
        break;
      default: {
        that.toastUnComplete();
      }
        break;
    }
  }
})
