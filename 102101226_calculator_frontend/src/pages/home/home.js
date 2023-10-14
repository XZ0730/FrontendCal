// pages/home/home.js
// pages/Calculator/Calculator.js
Page({
  // onLoad() {
  // },
  /**
   * 页面的初始数据
   */
  data: {
    showlist:false,
      but:"|||",
      keysdata: [ // type：0 计算符  1 数字
          { name: 'AC', index: '001', type: 0 },
          { name: '+/-', index: '002', type: 0 },
          { name: '%', index: '003', type: 2 },
          { name: '÷', index: '004', type: 2 },
          { name: 'x', index: '005', type: 2 },
          { name: 'back', index: '006', type: 9 },
          { name: '7', index: '007', type: 1 },
          { name: '8', index: '008', type: 1 },
          { name: '9', index: '009', type: 1 },
          { name: 'sin', index: '0010', type: 3 },
          { name: 'cos', index: '0011', type: 3 },
          { name: 'tan', index: '0012', type: 3 },
          { name: '4', index: '0013', type: 1 },
          { name: '5', index: '0014', type: 1 },
          { name: '6', index: '0015', type: 1 },
          { name: '+', index: '0016', type: 2 },
          { name: '-', index: '0017', type: 2 },
          { name: '^', index: '0018', type: 2 },
          { name: '1', index: '0019', type: 1 },
          { name: '2', index: '0020', type: 1 },
          { name: '3', index: '0021', type: 1 },
          { name: 'log', index: '0022', type: 3 },
          { name: 'ln', index: '0023', type: 3 },
          { name: 'sq', index: '0024', type: 3 },
          { name: 'inv', index: '0025', type: 7 },
          { name: '0', index: '0026', type: 1 },
          { name: '(', index: '0027', type: 6 },
          { name: ')', index: '0028', type: 6 },
          { name: '.', index: '0029', type: 2 },
          { name: '=', index: '0030', type: 10 },
      ],
      resultNum: "0",  //结果
      isCompute: false,  // 是否计算
      lastbtn: 0,  //上一个按钮  0：数字  1：计算符号  2：等于 3：三角 4:
      pre_expression:"0",
      showPopup:false,
  },
  jumpRate(){
    wx.navigateTo({
      url: '../rate/rate',
      success: function(res) {

      },
      fail: function(res) {

      },
      complete: function(res) {
      },
     })   
  },
  jumpHistory(){
      wx.navigateTo({
        url: '../history/history',
        success: function(res) {

        },
        fail: function(res) {
  
        },
      })
  },
  showPopup() {
    if (this.data.showPopup){
      this.data.showPopup=false;
    }else{
      this.data.showPopup=true;
    }
    this.setData({
      showPopup: this.data.showPopup
    });
  },
  // 键盘点击事件
  keyClick(event) {
      let n = event.target.dataset.num;
      // if (this.data.resultNum.length>8){
      //   return;
      // }
      if(n.name=="AC"){
         this.clearScreen(); 
         return;
      }
      this.setData({showPopup:false});
      console.log(event.detail);
      // for(let i=0;i<this.data.resultNum.length;i++){
      //   if(this.data.resultNum[i]=="e"){
      //     this.data.resultNum = "";
      //   }
      // }
      switch (n.type) {
        case 1:// 数字
          if (this.data.resultNum.length==1&&this.data.         resultNum=="0"){
           this.data.resultNum="";
          }
          // if (this.data.lastbtn==3){
          //   // 三角函数
          //   this.data.resultNum+="";
          //   break;
          // }
          if (n.name=="0"){
            // 如果上个输入为0则不添加
            if(this.data.resultNum[this.data.resultNum.length-1]=="0"){
              this.data.resultNum+="";
              break;
            }
          }
          this.data.resultNum+=n.name;
          this.data.lastbtn=0;
          break;
        case 2:// 运算符
          if (this.data.lastbtn==1){
            this.data.resultNum+="";
            break;
          }else if (this.data.lastbtn==3){
            // 三角函数
            if (n.name!="("){
              this.data.resultNum+="";
              break;
            }
          }
          if (n.name=="÷"){
            n.name="/";
          }
          if (n.name=="x"){
            n.name="*";
          }
          this.data.resultNum+=n.name;
          this.data.lastbtn=1;
          break;
        case 3:// 
        if (this.data.resultNum.length==1&&this.data.resultNum=="0"){
          this.data.resultNum="";
        }
          if (n.name=="as"){
            n.name +="in";
          }else if(n.name=="ac"){
            n.name +="os";
          }else if(n.name=="at"){
            n.name +="an";
          }else if(n.name=="sq"){
            n.name +="rt";
          }
          this.data.resultNum+=n.name;
          this.data.lastbtn=3;
          break;
        case 6:
          if ((this.data.resultNum.length==1&&this.data.resultNum=="0")||this.data.resultNum[this.data.resultNum.length-1]=="."){
            this.data.resultNum="";
            break;
          }
          this.data.resultNum+=n.name;
          this.data.lastbtn=1;
          this.setData({lastbtn:0});
        case 7:
          if (this.data.resultNum.length==1&&this.data.resultNum=="0"){
            this.data.resultNum="0";
          }
          for(let i=9;i<=11;i++){
            if(this.data.keysdata[i].name=="sin"){
              this.data.keysdata[i].name="as";
            }else if(this.data.keysdata[i].name=="cos"){
              this.data.keysdata[i].name="ac";
            }else if(this.data.keysdata[i].name=="tan"){
              this.data.keysdata[i].name="at";
            }else if(this.data.keysdata[i].name=="as"){
              this.data.keysdata[i].name="sin";
            }else if(this.data.keysdata[i].name=="ac"){
              this.data.keysdata[i].name="cos";
            }else if(this.data.keysdata[i].name=="at"){
              this.data.keysdata[i].name="tan";
            }
          }
          this.setData({keysdata:this.data.keysdata});
          break;
        case 9:// 退格
          if(this.data.resultNum.length==1){
            this.data.resultNum = "0";
            break;
          }
          this.data.resultNum = this.data.resultNum.slice(0,-1);
          break;
        case 10:
          if(this.data.resultNum=="="){
            break;
          }
          this.setData({pre_expression:this.data.resultNum});
          this.equalRes();
          break;
      }
      this.setData({resultNum:this.data.resultNum});  
  },
  // 清除
  clearScreen () {
      this.setData({ resultNum: "0" });
      this.data.lastbtn = 0;  //更新最新按下按钮
      console.clear()
  },
  showList() {
    this.setData({ showlist: true });
  },

  onListClose() {
    this.setData({ showlist: false });
  },
  // 结果
  equalRes() {
    wx.request({
      url: 'http://43.136.122.18:8083/cs/calculate',
      method:'POST',
      data:{
        expression:this.data.resultNum,
      },
      success: res => {
        console.log("请求成功",res);
        this.data.lastbtn =0;
        if (res.data.status_code==-1){
          this.setData({resultNum:"[error]expression",lastbtn:0});
        }
        this.setData({resultNum:res.data.result});
      },
      fail: err => {
        console.log("请求失败",err);
        this.data.lastbtn =0;
        this.setData({resultNum:"[error] expression",lastbtn:0 });
      }
    })
  },
})
