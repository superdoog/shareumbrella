// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效

    var that = this;
    wx.request({
      url: 'http://localhost:8080/record',
      header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      data: {
        openid: wx.getStorageSync('openid')
      },
      method: 'POST',
      success: function (res) {
        // console.log(res);
        var result = res.statusCode;
        that.setData({
          recordList: res.data
        })
        // console.log(that.data.orderList);
      }
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad();
  },


  /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
  onPullDownRefresh: function () {
    var that = this;
    this.onLoad(); //重新加载onLoad()
  },

})