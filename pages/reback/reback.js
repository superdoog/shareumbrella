// pages/reback/reback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pointId: "",
    umbrellaId: ""

  },
  scanpCode: function () {
    var that = this;
    wx.scanCode({ //扫描API
      success(res) { //扫描成功
        console.log(res) //输出回调信息
        that.setData({
          pointId: res.result
        });
        wx.showToast({
          title: '成功',
          duration: 1000
        })
      }
    })
  },
  scanuCode: function () {
    var that = this;
    wx.scanCode({ //扫描API
      success(res) { //扫描成功
        console.log(res) //输出回调信息
        that.setData({
          umbrellaId: res.result
        });
        wx.showToast({
          title: '成功',
          duration: 1000
        })
      }
    })
  },

  reback: function (e) {
    var that = this;
    var uid = e.detail.value.uid;
    var pid = e.detail.value.pid;
    var openid = wx.getStorageSync('openid');
    wx.request({
      url: 'http://localhost:8080/reback',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        pid: pid,
        uid: uid,
        openid: openid
      },
      success: function (res) {
        var resultCode = res.statusCode;
        if (resultCode == 200) {
          var toastText = '还伞成功';
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000 //弹出时间
          });
          wx.switchTab({
            url: '/pages/record/record',

          });

        } else {
          var toastText = '还伞失败';
          wx.showToast({
            title: toastText,
            icon: 'loding',
            duration: 2000 //弹出时间
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    this.onLoad(); //重新加载onLoad()
  },

})