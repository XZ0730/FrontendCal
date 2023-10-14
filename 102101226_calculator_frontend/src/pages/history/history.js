// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    results:[
      {
        exp:"",
        result:"",
      },{
        exp:"",
        result:"",
      },{
        exp:"",
        result:"",
      },{
        exp:"",
        result:"",
      },{
        exp:"",
        result:"",
      },{
        exp:"",
        result:"",
      },{
        exp:"",
        result:"",
      },{
        exp:"",
        result:"",
      },{
        exp:"",
        result:"",
      },{
        exp:"",
        result:"",
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
      url: 'http://43.136.122.18:8083/cs/calculate/history',
      method:'GET',
      success:res=>{
        console.log(res)
        for(let i='0';i<res.data.history.length;i++){
          let exp="";
          let idx ='0';
          for(let j='0';j<res.data.history[i].length;j++){
            if (res.data.history[i][j]=="="){
              idx = j;
              break;
            }
          }
          this.data.results[i].exp= res.data.history[i].slice(0,idx);
          this.data.results[i].result = res.data.history[i].slice(idx+1,);
        }
        this.setData({results:this.data.results});
        console.log(this.data.results);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})