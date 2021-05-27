// pages/borrow/borrow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // arr: [{ pid: "", pname: "竹一", stock: "" },
    // { pid: "", pname: "康二", stock: "" },
    // { pid: "", pname: "桂三", stock: "" },
    // { pid: "", pname: "梅四", stock: "" },
    // { pid: "", pname: "榕五", stock: "" }],
    list:[]
  },

  gotoSC: function (event) {
    let value = event.currentTarget.dataset.value
    var str = JSON.stringify(value)
    // console.log("value："+value) 
    wx.navigateTo({
      url: '/pages/borrowSc/borrowSc?pid=' + str,
      events: {
        acceptDataFromOpenedPage: function (data) {
          console.log(data)
        },
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
    var that=this;
    wx.request({
      url: 'http://localhost:8080/queryAll',
      method:'GET',
      data:{},
      success:function(res){
        var list=res.data;
        if(list==null){
          var toastText='获取数据失败';
          wx.showToast({
            title: toastText,
            icon:'',
            duration:2000 //弹出时间
          })
        }else{
          that.setData({
            list:list
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    this.onLoad(); //重新加载onLoad()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})