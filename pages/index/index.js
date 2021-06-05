Page({
  // 页面的初始数据
  data: {
    isShowUserName: false,
    userInfo: null,
    userOpenid: null,
    user:null,
  },

  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function (options) {
    var that = this;

    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://localhost:8080/getOpenid',
            data: {
              code: res.code
            },
            success(data) {
              // wx.showToast({
              //   title: '获取openid成功',
              //   icon: 'success',
              //   duration: 2000
              // })
              // console.log("openid:" + data.data['openid'])
              that.setData({
                userOpenid: data.data['openid'],
                user: data.data['user']
              })
              wx.setStorageSync('openid', data.data['openid']) //保存openid到本地缓存
              wx.setStorageSync('user', data.data['user'])
            }, fail(data) {
              wx.showToast({
                title: '获取openid失败',
                icon: 'error',
                duration: 2000
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

  },


  //获取用户信息
  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log("获取用户信息成功", res)
        let userInfo = res.userInfo
        wx.setStorageSync('userInfo', userInfo) //保存用户信息到本地缓存
        this.setData({
          isShowUserName: true,
          userInfo: userInfo,
        })
      },
      fail: res => {
        console.log("获取用户信息失败", res)
      }
    })
    // var openid = wx.getStorageSync('openid');
    // console.log(Object.is(openid));
    if (this.data.user !== null && this.data.user !== undefined && this.data.user !== '') {
      wx.switchTab({
        url: "/pages/borrow/borrow",
      })
    } else {
      wx.navigateTo({
        url: '/pages/register/register',
      })
    }
  },


  onShow(options) {
    // this.getUserProfile()
    // var user = wx.getStorageSync('user'); //从本地缓存取用户信息
    // if (user && user.nickName) { //如果本地缓存有信息就显示本地缓存
    //   this.setData({
    //     isShowUserName: true,
    //     userInfo: user,
    //   })
    // }
  },


})