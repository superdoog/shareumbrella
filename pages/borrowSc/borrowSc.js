// pages/borrowSc/borrowSc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pid: "",
    pname: "",
    umbrellaId: "",
    borrowUrl: 'http://localhost:8080/borrow'
  },
  scanCode: function () {
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
    var that = this;
    if (options.pid == undefined) {
      return;
    }
    that.setData({
      pid: options.pid,
    });

    wx.request({
      url: 'http://localhost:8080/byPid',
      data: { pid: options.pid },
      method: 'GET',
      success: function (res) {
        console.log(res);
        var area = res.data;
        if (area == undefined) {
          var text = '获取数据失败';
          wx.showToast({
            title: text,
            icon: '',
            duration: 3000
          });
        } else {
          that.setData({
            pname: area.pname
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   *  表单功能
   */
  formSubmit: function (e) {
    var that = this;
    var pid = e.detail.value.pid; //获取表数据
    var uid = e.detail.value.uid;
    var url = that.data.borrowUrl;

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
        // if(that.data.areaId=undefined){
        //   wx.redirectTo({
        //     url: '../list/list',
        //   })
        // }
      }
    })
  }
})
