// pages/reback/reback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pid: "",
    umbrellaId: "",
    inputValue: "",
    rebackUrl: 'http://localhost:8080/reback'
  },
  bindKeyInput: function (e) {
    switch (e.detail.value) {
      case "1":
        this.setData({
          inputValue: "竹一"
        })
        break;
      case "2":
        this.setData({
          inputValue: "康二"
        })
        break;
      case "3":
        this.setData({
          inputValue: "桂三"
        })
        break;
      case "4":
        this.setData({
          inputValue: "梅四"
        })
        break;
      case "5":
        this.setData({
          inputValue: "榕五"
        })
        break;
      default:
        this.setData({
          inputValue: "UNKNOW"
        })
        break;
    };
  },
  scanpCode: function () {
    var that = this;
    wx.scanCode({ //扫描API
      success(res) { //扫描成功
        console.log(res) //输出回调信息
        that.setData({
          pid: res.result
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


  /**
   *  表单功能
   */
  formSubmit: function (e) {
    var that = this;
    var pid = e.detail.value.pid; //获取表数据
    var uid = e.detail.value.uid;
    var url = that.data.rebackUrl;

    wx.request({
      url: url,
      data: { pid: pid, uid: uid },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        var result = res.statusCode;
        var toastText = "操作成功";
        if (result != 200) {
          toastText = "操作失败！";
        }
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 3000
        });

        wx.switchTab({
          url: "/pages/borrow/borrow",
        })

      }
    })
  }
})