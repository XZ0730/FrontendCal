// pages/rate/rate.js
const options = [
  {
    text: '三个月',
    value: '1',
    rate:0,
  },{
    text: '半年',
    value: '2',
    rate:0,
  },{
    text: '一年',
    value: '3',
    rate:0,
  },{
    text: '两年',
    value: '4',
    rate:0,
  },{
    text: '三年',
    value: '5',
    rate:0,
  },{
    text: '五年',
    value: '6',
    rate:0,
  }
];
const options2 = [
  {
    text: '六个月',
    value: '1',
    rate:0,
  },{
    text: '一年',
    value: '2',
    rate:0,
  },{
    text: '一-三年',
    value: '3',
    rate:0,
  },{
    text: '三-五年',
    value: '5',
    rate:0,
  },{
    text: '五年',
    value: '6',
    rate:0,
  }
];
const m = new Map([
	["三个月", 0],
	["半年", 1],
  ["一年", 2],
  ["两年", 3],
  ["三年", 4],
  ["五年", 5],
]);
const m2 = new Map([
	["六个月", 0],
	["一年", 1],
  ["一-三年", 2],
  ["三-五年", 3],
  ["五年", 4],
]);
var m3 = new Map([
  ["m1", ],
	["m2", 0],
  ["m3", 0],
  ["m4", 0],
  ["m5", 0],
  ["m6", 0],
])
var m4 = new Map([
  ["m1", 0],
	["m2", 0],
  ["m3", 0],
  ["m4", 0],
  ["m5", 0],
])
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tab 栏数据
    tabs:[
      {
        id:0,
        name:'存款',
        isActive:true,
      },
      {
        id: 1,
        name: '贷款',
        isActive: false,
      },
    ],
    show: false,
    show2:false,
    result_show:false,
    interest:'',
    options,
    options2,
    fieldValue: '',
    cascaderValue: '',
    duration:'',
    money:'',
    cunkuan:[
      {rate:0,},
      {rate:0,},
      {rate:0,},
      {rate:0,},
      {rate:0,},
      {rate:0,},
    ],
    daikuan:[
      {rate:0,},
      {rate:0,},
      {rate:0,},
      {rate:0,},
      {rate:0,},
    ],
    result:0,
    type:0,
  },
  onClick() {
    this.setData({
      show: true,
    });
  },
  onClick2() {
    this.setData({
      show2: true,
    });
  },
  funcs(){
    this.setData({
      show:true
    })
  },
  onClose() {
    this.setData({
      show: false,
      show2:false,
      result_show:false,
    });
  },

  onFinish(e) {
    const { selectedOptions, value } = e.detail;
    const fieldValue = selectedOptions
        .map((option) => option.text || option.name)
        .join('/');
    this.setData({
      fieldValue,
      duration:fieldValue,
      cascaderValue: value,
    })
    console.log(this.data.duration);
  },
  // 切换 tab栏 选项
  changeTab(e){
    console.log(e)
    let index = e.currentTarget.dataset.index;
    let {tabs} = this.data;
    tabs.forEach((item)=>{
      item.id===index ? item.isActive=true : item.isActive=false;
    });
    this.setData({
      tabs,
    });
    if (tabs[0].isActive){
      this.setData({type:0});
    }else{
      this.setData({type:1});
    }
    console.log("type:",this.data.type);
  },
  formSubmit(e){
      
      // 计算
      if (this.data.type==0){
        this.setData({result:Number(this.data.money)*0.01*this.data.cunkuan[m.get(this.data.duration)].rate})
        console.log(Number(this.data.money));
      }else{
        console.log(this.data.daikuan[this.data.duration]);
        this.setData({result:Number(this.data.money)*0.01*this.data.daikuan[m2.get(this.data.duration)].rate})
        console.log(this.data.result);
      }
      this.setData({duration:'',money:'',result_show:true});

  },
  onChangemoney(e){
      console.log(e.detail);
      this.setData({money:e.detail});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
      url: 'http://43.136.122.18:8083/cs/rate/get',
      method:'GET',
      success: res => {
        console.log("请求成功",res);
        if(res.data.status_code=='-1'){
          return;
        }
        console.log(res.data.rate_list[0]);
        var obj = JSON.parse(res.data.rate_list[0]);
        console.log(obj.m1);
        this.setData({
          cunkuan:[{
          rate:obj.m1},{
            rate:obj.m2
          },{
            rate:obj.m3
          },{
            rate:obj.m4
          },{
            rate:obj.m5
          },{
            rate:obj.m6
          }
        ]
        })
        m3.set("m1",obj.m1);
        m3.set("m2",obj.m2);
        m3.set("m3",obj.m3);
        m3.set("m4",obj.m4);
        m3.set("m5",obj.m5);
        m3.set("m6",obj.m6);
        obj = JSON.parse(res.data.rate_list[1]);
        this.setData({
          daikuan:[{
            rate:obj.m1},{
              rate:obj.m2
            },{
              rate:obj.m3
            },{
              rate:obj.m4
            },{
              rate:obj.m5
            }
          ]
        })
        m4.set("m1",obj.m1)
        m4.set("m2",obj.m2)
        m4.set("m3",obj.m3)
        m4.set("m4",obj.m4)
        m4.set("m5",obj.m5)
        console.log("=====",this.data.daikuan[0]);
      },
      fail: err => {
        console.log("请求成功",err);
      },
    })

  },
  rateChange1(e){
    var json;
    if (this.data.type==0){
      this.data.cunkuan[0].rate = Number(e.detail.value);
       m3.set("m1",Number(e.detail.value));
      this.setData({cunkuan:this.data.cunkuan});
      json = Object.fromEntries(m3);
    }else{
      this.data.daikuan[0].rate = Number(e.detail.value);
      m4.set("m1",Number(e.detail.value));
      this.setData({daikuan:this.data.daikuan});
      json = Object.fromEntries(m4);
    }
    console.log(json);
    wx.request({
      url: 'http://43.136.122.18:8083/cs/rate/set',
      method:'POST',
      data:{
        the_type:this.data.type,
        data:JSON.stringify(json),
      },
      success:res=>{
        console.log(res);
      }
    }) 
  },
  rateChange2(e){
    var json;
    if (this.data.type==0){
      this.data.cunkuan[1].rate = Number(e.detail.value);
       m3.set("m2",Number(e.detail.value));
      this.setData({cunkuan:this.data.cunkuan});
      json = Object.fromEntries(m3);
    }else{
      this.data.daikuan[1].rate = Number(e.detail.value);
      m4.set("m2",Number(e.detail.value));
      this.setData({daikuan:this.data.daikuan});
      json = Object.fromEntries(m4);
    }
    console.log(json);
    wx.request({
      url: 'http://43.136.122.18:8083/cs/rate/set',
      method:'POST',
      data:{
        the_type:this.data.type,
        data:JSON.stringify(json),
      },
      success:res=>{
        console.log(res);
      }
    }) 
  },
  rateChange3(e){
    var json;
    if (this.data.type==0){
      this.data.cunkuan[2].rate = Number(e.detail.value);
       m3.set("m3",Number(e.detail.value));
      this.setData({cunkuan:this.data.cunkuan});
      json = Object.fromEntries(m3);
    }else{
      this.data.daikuan[2].rate = Number(e.detail.value);
      m4.set("m3",Number(e.detail.value));
      this.setData({daikuan:this.data.daikuan});
      json = Object.fromEntries(m4);
    }
    console.log(json);
    wx.request({
      url: 'http://43.136.122.18:8083/cs/rate/set',
      method:'POST',
      data:{
        the_type:this.data.type,
        data:JSON.stringify(json),
      },
      success:res=>{
        console.log(res);
      }
    }) 
  },
  rateChange4(e){
    var json;
    if (this.data.type==0){
      this.data.cunkuan[3].rate = Number(e.detail.value);
       m3.set("m4",Number(e.detail.value));
      this.setData({cunkuan:this.data.cunkuan});
      json = Object.fromEntries(m3); 
    }else{
      this.data.daikuan[3].rate = Number(e.detail.value);
      m4.set("m4",Number(e.detail.value));
      this.setData({daikuan:this.data.daikuan});
      json = Object.fromEntries(m4);
    }
    console.log(json);
    wx.request({
      url: 'http://43.136.122.18:8083/cs/rate/set',
      method:'POST',
      data:{
        the_type:this.data.type,
        data:JSON.stringify(json),
      },
      success:res=>{
        console.log(res);
      }
    }) 
  },
  rateChange5(e){
    var json;
    if (this.data.type==0){
      this.data.cunkuan[4].rate = Number(e.detail.value);
      m3.set("m5",Number(e.detail.value));
      this.setData({cunkuan:this.data.cunkuan});
      json = Object.fromEntries(m3);
    }else{
      this.data.daikuan[4].rate = Number(e.detail.value);
      m4.set("m5",Number(e.detail.value));
      this.setData({daikuan:this.data.daikuan});
      json = Object.fromEntries(m4);
    }
    console.log(json);
    wx.request({
      url: 'http://43.136.122.18:8083/cs/rate/set',
      method:'POST',
      data:{
        the_type:this.data.type,
        data:JSON.stringify(json),
      },
      success:res=>{
        console.log(res);
      }
    }) 
  },
  rateChange6(e){
      this.data.cunkuan[5].rate = Number(e.detail.value);
      m3.set("m6",Number(e.detail.value));
      this.setData({cunkuan:this.data.cunkuan});
      var json = Object.fromEntries(m3);
      console.log(json);
      wx.request({
        url: 'http://43.136.122.18:8083/cs/rate/set',
        method:'POST',
        data:{
          the_type:this.data.type,
          data:JSON.stringify(json),
        },
        success:res=>{
          console.log(res);
        }
      }) 
  },
  // rateChange(e){
  //   if (this.data.type==0){
  //     m3.set('m'+e.detail.cursor.toString(),Number(e.detail.value));
  //     const json = Object.fromEntries(m3);
  //     let idx = (e.detail.cursor-1);
  //     console.log(e.detail);
  //     this.data.cunkuan[idx].rate = Number(e.detail.value)
  //     this.setData({cunkuan:this.data.cunkuan});
  //     console.log("detail",e.detail.value);
  //     console.log(this.data.cunkuan[0],"--",e.detail.value);
  //     wx.request({
  //       url: 'http://43.136.122.18:8083/cs/rate/set',
  //       method:'POST',
  //       data:{
  //         "the_type":0,
  //         "data":JSON.stringify(json)
  //       },
  //       success:res =>{
  //         console.log(res);
  //       }
  //     })
  //   }else{
  //     m4.set('m'+e.detail.cursor.toString(),Number(e.detail.value));
  //     const json = Object.fromEntries(m4);
  //     let idx = (e.detail.cursor-1);
  //     console.log(idx);
  //     let position = "daikuan["+idx+"].rate";
  //     this.setData({[position]:Number(e.detail.value)});
  //     console.log(e.detail.value);
  //     wx.request({
  //       url: 'http://43.136.122.18:8083/cs/rate/set',
  //       method:'POST',
  //       data:{
  //         "the_type":1,
  //         "data":JSON.stringify(json)
  //       },
  //       success:res =>{
  //         console.log(res);
  //       }
  //     })
  //   }
    
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
})