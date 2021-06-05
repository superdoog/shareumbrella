// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowUserName: null,
    userInfo: null,
  },

  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userInfo'); //从本地缓存取用户信息
    if (userInfo && userInfo.nickName) { //如果本地缓存有信息就显示本地缓存
      this.setData({
        isShowUserName: true,
        userInfo: userInfo,
      })
    }

  },

  /**
 *  表单功能
 */
  formSubmit: function (e) {
    var that = this;
    var userName = e.detail.value.userName;
    var password = e.detail.value.password;
    var openid = wx.getStorageSync('openid');

    wx.request({
      url: 'http://localhost:8080/register',
      header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      data: {
        username: userName, password: password, openid: openid
      },
      method: 'POST',
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
        if (result == 200) {
          wx.switchTab({
            url: '/pages/borrow/borrow',
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

})