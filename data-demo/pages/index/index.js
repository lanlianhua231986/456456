// pages/index/index.js
// import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
// import Toast from '@vant/weapp/toast/toast';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '',
    show: false,
    active:1,
    formatter(day){
      const weekday = day.date.getDay()
      if(weekday===1 || weekday ===3 || weekday ===5){
        day.className ='special'
      }
      return day
    }
  },
  onDisplay() {
    this.setData({ 
      show: true,
    });
    
  },
  onClose() {
    this.setData({ show: false });
  },

  onConfirm(event) {
    let selectDateNum=[]
    this.setData({
      show: false,
      date: `选择了 ${event.detail.length} 个日期`,
      
    });

    event.detail.forEach(e => {
      selectDateNum.push(e.getTime())
    });
    console.log(selectDateNum);
    //转换为年月日
   const dates = this.handleTime(selectDateNum)
   console.log(dates);
    //弹出提示框
    Dialog.confirm({
      title: '日期选择',
      message: `${dates}`,
    })
      .then(() => {
        // on confirm
      })
      .catch(() => {
        // on cancel
      });
  },

  //遍历数组转换年月日
  handleTime(selectDateNum){
    let dateList = []
    selectDateNum.forEach((item)=>{
      var selectDate = new Date(item)
      let Y = selectDate.getFullYear()+"年";
      let M = (selectDate.getMonth() + 1 < 10 ?"0"+(selectDate.getMonth() + 1):(selectDate.getMonth() + 1))
      let D = (selectDate.getDate() + "日")
      item = Y+M+"月"+D
      dateList.push(item)
    })
    return dateList.toString()
  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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