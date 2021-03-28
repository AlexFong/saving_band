<template>
<div id="home">
<div id="header">
  <div style="height:5vw"></div>
  <div style="display:flex;line-height:15vw">
    <div style="width:34vw;text-align:left">
      <div style="line-height:15vw;font-size:3vw;padding-left:2vw">余额:{{ balance }}</div> 
      <!-- <div style="background-color:#fff;font-size:4vw;border:1px solid #ccc;width:30vw;border-radius:1vw;margin-left:-0.5vw"></div> -->
    </div>
    <div style="width:32vw;line-height:15vw;">天天记账1.22</div>
    <div style="width:34vw;"></div>
  </div>
</div>

<!-- 分割矩形区域 -->
<van-row style="height:55vh;border-top:1px solid black;border-bottom:1px solid black">
  <van-col span="8" style="height:55vh">
    <van-row style="height:10vh;border-bottom:1px solid black;display:flex;justify-content:space-around;flex-direction:column;">
      <div style="height:4vh;display:flex;align-items:center;justify-content:center">
        <div style="line-height:4.5vh;">
          {{ time.getMonth() + 1 }}月{{ time.getDate() }}日
        </div>
        <!-- iconfont引入用法（1/2) -->
        <van-icon class="iconfont fontSize7vw" class-prefix='icon' name='accountbook' @click="calendarShow=true"/>
      </div>

      <div style="height:4vh;line-height:4vh;display:flex;align-item:center;justify-content:center">
        <button style="border:none;background-color:unset" @click="changeTime(-1)"><van-icon class="iconfont fontSize7vw" class-prefix='icon' name='left' /></button>
        <span @click="changeTime(0)" style="margin:0 0.5vw;width:14vw;border:1px solid #aaa;border-radius:2vw;height:4vh">今天</span>
        <button style="border:none;background-color:unset" @click="changeTime(1)"><van-icon class="iconfont fontSize7vw" class-prefix='icon' name='right' /></button>
      </div>
    </van-row>

    <van-row style="height:10vh;border-bottom:1px solid black;display:flex;justify-content:space-around;flex-direction:column">
      <div style="height:3vh;line-height:3vh;text-align:center;padding-top:0.5vh;">
        本日预算:
      </div> 
      <div style="height:4vh;line-height:4vh;display:flex;justify-content:center">
        <input type="number" v-model="todayBudjet" style="width:47%;text-align:center;margin-right:1vw;border:1px solid #aaa;height:4vh" placeholder="设置今日预算" />
        <span @click="changeTodayBudjet()" style="width:38%;border:1px solid #aaa;border-radius:2vw;height:4vh">设置</span>
      </div>
    </van-row>

    <van-row style="height:35vh;justify-content:space-around;display:flex;flex-direction:column">
      <!-- 纸币100元 -->
      <div style="height:4vh;line-height:4vh;display:flex;justify-content:center;padding-top:1vh;align-item:center;"
        :style="{
          display: todayBalanceShow[100] > 0 ? 'flex' : 'none',
        }">
        <div class="money" style="background-color:red;position:relative;margin-right:2vw">100</div>
        <div>x{{ todayBalanceShow[100]}}</div>
      </div>

      <!-- 纸币 -->
      <div style="height:14vh;position:relative;align-item:center;"
        :style="{
          display: !todayBalanceShow.paper || todayBalanceShow.paper.length == 0 ? 'none' : 'block',
        }">
        <div v-for="(item, index) in todayBalanceShow.paper">
          <div class="money" style=""
            :style="{
              'background-color':moneyColor[item],
              transform:'rotate('+ (-30-15*todayBalanceShow.paper.length+30*index) + 'deg)',
              left:moneyPosition[todayBalanceShow.paper.length][index].left + 'vw',
              top: moneyPosition[todayBalanceShow.paper.length][index].top +'vh',
              'z-index':9-index}">
            {{item}}
          </div>
        </div>
      </div>

      <!-- 硬币1元 -->
      <div style="width:30vw;margin:0vh 1.5vw;display:flex;flex-direction:row;align-content:space-around;justify-content:space-around;"
        :style="{
          display: todayBalanceShow[1] > 0 ? 'flex' : 'none',
        }">
        <div v-for="item of todayBalanceShow[1]">
          <div class="coin" style="background-color:#eee;border-radius:3vh;width:3vh;height:3vh;font-size:2.5vh;line-height:3vh">1</div>
        </div>
      </div>

      <!-- 硬币角 -->
      <div style="width:30vw;margin:0vh 1.5vw;display:flex;flex-direction:row;align-content:space-around;justify-content:space-around;"
        :style="{
          display: !todayBalanceShow.coin || todayBalanceShow.coin.length == 0 ? 'none' : 'flex',
        }">
        <div v-for="(item, index) in todayBalanceShow.coin">
          <div class="coin" style="border-radius:2.5vh;width:2.5vh;height:2.5vh;font-size:2vh;line-height:2.5vh"
            :style="{
              'background-color':moneyColor[item],
            }">
            {{ String(item).slice(1,3) }}
          </div>
        </div>
      </div>

      <!-- 显示余额 -->
      <div style="align-content:center;justify-content:center;align-item:center;display:flex">
        <div
          :style="{
            display: todayBalanceShow < 0 || todayBalance == 0 ? 'none' : 'unset',
          }">
          余额:{{ todayBalance }}
        </div>
        <div style="top:4vh;position:relative;font-weight:bolder"
          :style="{
            display: todayBalanceShow < 0 || todayBalance == 0 ? 'unset' : 'none',
          }">
          <div style="font-size:7vw;line-height:9vw;">余额:</div>
          <div style="font-size:7vw;line-height:9vw;"
            :style="{
              color: todayBalanceShow < 0 ? 'red' : 'unset',
            }">
            {{ todayBalance }}
          </div>
          
        </div> 
      </div>
      
    </van-row>
  </van-col>

  <van-col span="16" style="height:55vh;border-left:1px solid black">
    <div style="height:5vh;line-height:5vh;border-bottom:1px solid black">本日账单</div>
    <div id="billListOuter" style="height:49.5vh">
      <div id="billListInner">
        <div v-for="(item, index) in bill">
          <van-swipe-cell style="margin-bottom:1.5vw;border-radius:2vw;width:63vw">
            <div style="line-height:7vw;background-color:#ffffff;border:2px solid #f0ffff;display:flex">
              <span style="width:14vw;font-size:3vw;">
                {{ new Date(item.time).getHours() }}:{{
                  new Date(item.time).getMinutes() < 10
                    ? "0" + new Date(item.time).getMinutes()
                    : new Date(item.time).getMinutes()
                }}
              </span>
              <span style="width:28vw;font-size:3vw;">{{ checkList[item.id] }}</span>
              <span style="width:12vw;font-size:3vw;">￥{{ item.cost }} </span>
              <van-icon id="billList" class="iconfont fontSize3vw" class-prefix='icon' name='left' />
            </div>
            <template #right>
              <van-button @click="delFun(index,item)" square text="删除" type="danger" class="delete-button" />
            </template>
          </van-swipe-cell>
        </div>
      </div>
    </div>
  </van-col>
</van-row>


<!-- tabbar高度是15vw -->
<div id="addBill" style="height:calc(45vh - 40vw);display:flex;flex-direction:column;"
:style="{
  'justify-content': height/width > 1.5 ? 'space-around' : 'flex-end',
}">
  <div style="display:flex;flex-wrap:wrap;justify-content:center;line-height:5vw"
  :style="{
    width: height/width > 1.5 ? '90%' : '70%',
    margin : height/width > 1.5 ? '0 5%': '0 15%',
  }">
  <!-- type="radio"时为单选题，type="checkbox"时为多选题 -->
    <div v-for="(item, index) in typeList" class="item">
      <input style="font-size:3.5vw;" type="radio" :id="item.id" :value="item.id" v-model="typeId" />
      <label style="font-size:3.5vw;" :for="item.id">{{ item.name }}</label>
    </div>
  </div>

  <div style="display:flex;justify-content:center;line-height:6vw;"
  :style="{
    margin : height/width > 1.5 ? 0: 2 + 'vh ' + 0 ,
  }">
    <span>￥</span> 
    <input style="width:40vw;" type="number" v-model="cost" placeholder="输入金额" />
    <span @click="addFun" style="width:12vw;border:1px solid #aaa;border-radius:2vw;margin-left:2vw;">花钱</span>
    <span @click="dataRollBack(1)" style="width:12vw;border:1px solid #aaa;border-radius:2vw;margin-left:2vw;">回滚</span>
    <!-- <button @click="sendMsg()">传值</button> -->
  </div>
</div>

<!-- 日历 -->
<van-calendar v-model="calendarShow" @confirm="onConfirm" first-day-of-week="1" :min-date="new Date('2020-01-01')" :default-date="time" :show-confirm="false" />

</div>
</template>


<script>
// iconfont引入用法（2/2)
import "../assets/font_2356633_61czw08nnlw/iconfont.css";
import { Component, Vue } from "vue-property-decorator";
import { Col, Row, Icon, SwipeCell, Calendar } from 'vant';
Vue.use(SwipeCell);Vue.use(Icon);Vue.use(Col);Vue.use(Row);Vue.use(Calendar);

import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    billDataSwitch: true,
    userDataSwitch: true,
    inExDataSwitch: true,
    wishListSwitch: true,
  },
  // 注意是通过store.commit('increment')方法来改变状态。
  mutations: {
    stateChange (state,name) {
      state[name] = !state[name];
    }
  }
})

export default {
  name: "home",
  store,
  // 数据父传子
  props: {
    msg: {
      type: String,
      default: "test msg",
    },
  },
  data() {
    return {
      balance: 0,
      todayBalance: 0,
      cost: "",
      typeId: "a",
      typeList: [
        { name: "餐饮", id: "a" },
        { name: "生活", id: "b" },
        { name: "服饰", id: "c" },
        { name: "交通", id: "d" },
        { name: "购物", id: "e" },
        { name: "学习", id: "f" },
        { name: "娱乐", id: "g" },
        { name: "旅游", id: "h" },
        { name: "亲子", id: "i" },
        { name: "宠物", id: "j" },
        { name: "医疗", id: "k" },
        { name: "红包", id: "l" },
        { name: "礼物", id: "m" },
        { name: "美容", id: "n" },
        { name: "其他", id: "o" },
      ],
      checkList: {
        a: "餐饮",
        b: "生活",
        c: "服饰",
        d: "交通",
        e: "购物",
        f: "学习",
        g: "娱乐",
        h: "旅游",
        i: "亲子",
        j: "宠物",
        k: "医疗",
        l: "红包",
        m: "礼物",
        n: "美容",
        o: "其他",
      },
      bill: [],
      todayTime:"",
      time:"",
      budjet:400,
      todayBudjet:0,
      todayBalanceShow:{
        100:0,
        paper:[],
        coinYuan:0,
        coinJiao:[]
      },
      moneyColor:{
        100:"red",
        50:"turquoise",
        20:"orange",
        10:"skyblue",
        5:"violet",
        1:"#eee",
        0.5:"#ffcc55",
        0.1:"#bbb",
      },
      moneyPosition:{
        4:[{left:0,top:3},{left:5,top:4},{left:10,top:6},{left:13,top:9}],
        3:[{left:3,top:3},{left:8,top:5},{left:11,top:8}],
        2:[{left:5,top:4},{left:10,top:7}],
        1:[{left:8,top:5}],
      },
      width:0,
      height:0,
      calendarDate:'',
      calendarShow:false,
    };
  },
  methods: {
    // formatDate(date) {
    //   return `${date.getMonth() + 1}/${date.getDate()}`;
    // },
    onConfirm(date) {
      this.calendarShow = false;
      // this.calendarDate = this.formatDate(date);
      this.changeTime(date);
    },
    addFun: function () {
      if (this.cost) {
        // 建立好数据结构
        let billData = JSON.parse(localStorage.billData) ;
        let y = this.time.getFullYear();
        let m = this.time.getMonth();
        let d = this.time.getDate();
        let yy = this.todayTime.getFullYear();
        let mm = this.todayTime.getMonth();
        let dd = this.todayTime.getDate();
        // 如果当天数据不存在，则会新建档案
        billData = initBillData(billData,y,m,d,this.budjet);
        // 因为新增消费条款时，会init当前数据，budjet可能从无到有，要读取一下。
        this.todayBudjet = billData['list'][y]["list"][m]["list"][d]["data"]["budjet"];
        
        billData['list'][y]["list"][m]["list"][d]["list"].push({
          id: this.typeId,
          cost: Number(this.cost),
          time: this.time,
        });

        this.cost = "";

        // 计算各层Balance
        billData['list'][y]["list"][m]["list"][d]["data"]["dateBalance"] = calcDateBalance(billData,y,m,d);
        billData['list'][y]["list"][m]["data"]["monthBalance"] = calcMonthBalance(billData,y,m);
        billData['list'][y]["data"]["yearBalance"] = calcYearBalance(billData,y);
        // 如果改变的是未来的数据，calcBalance可不执行-------------优化方向，不一定有好处--------------
        this.balance = calcBalance(billData,yy,mm,dd);
        this.todayBalance = billData['list'][y]["list"][m]["list"][d]["data"]["dateBalance"];
        this.todayBalanceShow = calcTodayBalanceShow(this.todayBalance);

        // stringify再parse会使时间格式发生变化
        localStorage.billData = JSON.stringify(billData);
        // 使时间格式保持一致
        this.bill = JSON.parse(localStorage.billData)['list'][y]["list"][m]["list"][d]["list"];
      } else {
        alert("请输入金额");
      }
    },
    delFun: function(index,item){
      let billData = JSON.parse(localStorage.billData) ;
      let y = this.time.getFullYear();
      let m = this.time.getMonth();
      let d = this.time.getDate();
      let yy = this.todayTime.getFullYear();
      let mm = this.todayTime.getMonth();
      let dd = this.todayTime.getDate();
      
      billData['list'][y]["list"][m]["list"][d]["list"].splice(index,1);

      // 计算各层Balance
      billData['list'][y]["list"][m]["list"][d]["data"]["dateBalance"] = calcDateBalance(billData,y,m,d);
      billData['list'][y]["list"][m]["data"]["monthBalance"] = calcMonthBalance(billData,y,m);
      billData['list'][y]["data"]["yearBalance"] = calcYearBalance(billData,y);
      // 如果改变的是未来的数据，calcBalance可不执行-------------优化方向，不一定有好处--------------
      this.balance = calcBalance(billData,yy,mm,dd);
      this.todayBalance = calcDateBalance(billData,y,m,d);
      this.todayBalanceShow = calcTodayBalanceShow(this.todayBalance);
      
      // stringify再parse会使时间格式发生变化
      localStorage.billData = JSON.stringify(billData);
      // 使时间格式保持一致
      this.bill = JSON.parse(localStorage.billData)['list'][y]["list"][m]["list"][d]["list"];
    },
    changeTime: function(index){
      // 输出的时间格式new Date(parseInt(new Date().getTime()))
      if(index == 1 || index == -1){   // 加减日期
        this.time = new Date(parseInt(this.time.setDate(this.time.getDate()+index)));
      }else if(index == 0){   // 回到现在
        this.time = new Date(parseInt(new Date().getTime()));
      }else{    //设置日期
        this.time = new Date(parseInt(index.setDate(index.getDate())));
      }

      // 如果不是本日，把时间设为最后一秒
      if(formatLongDate(this.time,1) != formatLongDate(this.todayTime,1)){
        let y=(new Date(this.time)).getFullYear();
        let m=(new Date(this.time)).getMonth();
        let d=(new Date(this.time)).getDate();
        this.time=new Date( parseInt(new Date(y,m,d,'23','59','59').getTime()) );//毫秒
      }else{
        this.time = this.todayTime;
      }

      // 把页面展示的数据更新(只查)
      let billData = JSON.parse(localStorage.billData) ;
      let y = this.time.getFullYear();
      let m = this.time.getMonth();
      let d = this.time.getDate();
      
      // 当天有无可查数据
      if(!billData['list'][y] || !billData['list'][y]["list"][m] || !billData['list'][y]["list"][m]["list"][d]){
        // addFun里会init数据，这里先不动数据
        this.bill = [];
        this.todayBudjet = 0;
        this.todayBalance = 0;
        this.todayBalanceShow = calcTodayBalanceShow(this.todayBalance);
      }else{
        this.bill = billData['list'][y]["list"][m]["list"][d]["list"];
        this.todayBudjet = billData['list'][y]["list"][m]["list"][d]["data"]["budjet"];
        this.todayBalance = calcDateBalance(billData,y,m,d);
        this.todayBalanceShow = calcTodayBalanceShow(this.todayBalance);
      }
    },
    changeTodayBudjet: function(){
      if(this.todayBudjet >= 0){
        let billData = JSON.parse(localStorage.billData);
        let y = this.time.getFullYear();
        let m = this.time.getMonth();
        let d = this.time.getDate();
        let yy = this.todayTime.getFullYear();
        let mm = this.todayTime.getMonth();
        let dd = this.todayTime.getDate();
        billData['list'][y]["list"][m]["list"][d]["data"]["budjet"] = this.todayBudjet;

        // 计算各层Balance
        billData['list'][y]["list"][m]["list"][d]["data"]["dateBalance"] = calcDateBalance(billData,y,m,d);
        billData['list'][y]["list"][m]["data"]["monthBalance"] = calcMonthBalance(billData,y,m);
        billData['list'][y]["data"]["yearBalance"] = calcYearBalance(billData,y);
        this.balance = calcBalance(billData,yy,mm,dd);
        this.todayBalance = calcDateBalance(billData,y,m,d);
        this.todayBalanceShow = calcTodayBalanceShow(this.todayBalance);

        localStorage.billData = JSON.stringify(billData);
      }else{
        alert("预算不能为负数哦~");
      }
    },
    // 测试用：数据回滚清除
    dataRollBack: function(n){
      let userData = JSON.parse(localStorage.userData);
      let billData = JSON.parse(localStorage.billData);
      let wishList = JSON.parse(localStorage.wishList);
      let inExData = JSON.parse(localStorage.inExData);
      let dateTime = this.todayTime;
      // 遍历时y和ym会动态变化，判断条件(当前剩余数据的最新日期)
      let y = this.todayTime.getFullYear();
      let ym = formatLongDate(this.todayTime,2);

      // 回滚i天
      for(let i = 0;i<n;i++){
        console.log('回滚',i);
        let yy = dateTime.getFullYear();
        let mm = dateTime.getMonth();
        let dd = dateTime.getDate();
        let yymm = formatLongDate(dateTime,2);

        // 1、billData回滚  3、遍历inExData-monthData
        if(y - yy > 0){
          // 如果跨年了
          // 删掉上一年
          delete billData['list'][yy+1];
          delete billData['list'][yy]["list"][mm]["list"][dd];

          delete inExData['monthData'][yy+1];

          y = yy;
        }else if(ym - yymm > 0){
          // 如果跨月了
          // 删掉上个月
          delete billData['list'][yy]["list"][mm+1];
          delete billData['list'][yy]["list"][mm]["list"][dd];

          delete inExData['monthData'][yy][mm+1];
        }else{
          delete billData['list'][yy]["list"][mm]["list"][dd];
        };
        // 还要更新month/yearBalance，暂时先不加，好像没问题的


        // 2、wishlist回滚  3、inExData回滚
        // 如果跨月了
        if(ym - yymm > 0) {
          console.log('跨月了',ym);

          // 遍历wishlist，checked/aim
          for(const i in wishList['list']){
            if(wishList['list'][i]['status']=='checked' && Number(wishList['list'][i]['payList'][ym])>0){
              wishList['list'][i]['status']='aim';
            };
            delete wishList['list'][i]['payList'][ym];
          };

          // 遍历inExData-necessarySpendingList，going/finish
          for(const i in inExData['necessarySpendingList']){
            if(inExData['necessarySpendingList'][i]['status']=='finish' && Number(inExData['necessarySpendingList'][i]['payList'][ym])>0){
              inExData['necessarySpendingList'][i]['status']='going';
            };
            delete inExData['necessarySpendingList'][i]['payList'][ym];
          };

          // 遍历inExData-optionalSpendingList
          for(const i in inExData['optionalSpendingList']){
            if(inExData['optionalSpendingList'][i]['status']=='finish' && Number(inExData['optionalSpendingList'][i]['payList'][ym])>0){
              inExData['optionalSpendingList'][i]['status']='going';
            };
            delete inExData['optionalSpendingList'][i]['payList'][ym];
          };
          ym = yymm;
        };

        // 遍历完改变日期再遍历
        dateTime = new Date(dateTime.setDate(dateTime.getDate()-1));
      };

      // 4、userData回滚
      userData.latestLoginDate = formatLongDate(dateTime,1);

      localStorage.userData = JSON.stringify(userData);
      localStorage.billData = JSON.stringify(billData);
      localStorage.wishList = JSON.stringify(wishList);
      localStorage.inExData = JSON.stringify(inExData);
    },
    sendMsg: function(){
      this.$root.bus.$emit("billDataSwitch", store.state.billDataSwitch)
    }
    
  },
  beforeCreate() {
    console.log("beforeCreate");
    console.log('++',JSON.parse(localStorage.billData));
  },
  created() {
    console.log("created");
    this.width = document.body.clientWidth;
    this.height = document.body.clientHeight;

    this.todayTime = new Date(parseInt(new Date().getTime()));
    this.time = this.todayTime;
    let y = this.todayTime.getFullYear();
    let m = this.todayTime.getMonth();
    let d = this.todayTime.getDate();
    let yy = this.todayTime.getFullYear();
    let mm = this.todayTime.getMonth();
    let dd = this.todayTime.getDate();
    
    let tempUserData = JSON.parse(localStorage.userData)
    let billData = JSON.parse(localStorage.billData)

    // 更新显示的账单、todayBalance、balance、todayBudjet
    this.todayBudjet = billData['list'][y]["list"][m]["list"][d]["data"]["budjet"];
    this.todayBalance = billData['list'][y]["list"][m]["list"][d]["data"]["dateBalance"];
    this.balance = calcBalance(billData,yy,mm,dd);
    this.budjet = tempUserData.budjet;
    this.todayBalanceShow = calcTodayBalanceShow(this.todayBalance);

    // stringify再parse会使时间格式发生变化
    localStorage.billData = JSON.stringify(billData);
    // 使时间格式保持一致
    this.bill = JSON.parse(localStorage.billData)["list"][y]["list"][m]["list"][d]["list"];


  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
    console.log(new Date('2000-01-01'));
  },
  beforeUpdate() {
    console.log("beforeUpdate");
    this.todayTime = new Date(parseInt(new Date().getTime()));
    this.width = document.body.clientWidth;
    this.height = document.body.clientHeight;
  },
  updated() {
    console.log("updated");
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  },
  destroyed() {
    console.log("destroyed");
  },
};

// 脚本，让时间格式化
function formatLongDate (date,type=0) {
  let myyear = date.getFullYear();
  let mymonth = date.getMonth() + 1;
  let myweekday = date.getDate();
  let myHour = date.getHours();
  let myMin = date.getMinutes();
  let mySec = date.getSeconds();

  if (mymonth < 10) {
      mymonth = '0' + mymonth;
  }
  if (myweekday < 10) {
      myweekday = '0' + myweekday;
  }
  if (myHour < 10) {
      myHour = '0' + myHour;
  }
  if (myMin < 10) {
      myMin = '0' + myMin;
  }
  if (mySec < 10) {
      mySec = '0' + mySec;
  }
  
  let a
  if(type==1){
    a = myyear + '-' + mymonth + '-' + myweekday;
  }else if(type==2){
    a = myyear + mymonth;
  }else{
    a = myyear + '' + mymonth + '' + myweekday + ' ' + myHour + ':' + myMin + ':' + mySec;
  }
  return (a)
};

// 建立好数据结构,年月日表新建(每天都要保存数据，不然日预算一调整，就没法计算一个正确的值了)
function initBillData(billData,y,m,d,budjet){
  if(!billData['list'][y]){
    billData['list'][y] = {
      data : {yearBalance:budjet},
      list : {
        [m] : {
          data : {monthBalance:budjet},
          list : {
            [d] : {
              data:{budjet : budjet,dateBalance:budjet},
              list : []
            }
          },
        },
      }
    };
  } else if(!billData['list'][y]["list"][m]){
    billData['list'][y]["list"][m] = {
      data : {monthBalance:budjet},
      list : {
        [d] : {
          data:{budjet : budjet,dateBalance:budjet},
          list : []
        }
      },
    }
  } else if(!billData['list'][y]["list"][m]["list"][d]){
    billData['list'][y]["list"][m]["list"][d] = {
      data:{budjet : budjet,dateBalance:budjet},
      list : []
    }
  };
  
  return(billData);
};

// 封装日余额数据更新
function calcDateBalance(billData,y,m,d){
  let dateBalance = billData['list'][y]["list"][m]["list"][d]["data"]["budjet"];
  // 直接遍历(正常情况下，初始化后每天都会有数据)
  for (const i in billData['list'][y]["list"][m]["list"][d]["list"]) {
    dateBalance -= Number(billData['list'][y]["list"][m]["list"][d]["list"][i]["cost"]);
  }
  // 消除浮点影响，取小数后一位
  if(dateBalance > 0){
    dateBalance = parseInt(dateBalance * 10 + 0.1)/10;
  }else if(dateBalance < 0){
    dateBalance = parseInt(dateBalance * 10 - 0.1)/10;
  }
  return(dateBalance);
}

// 封装月余额数据更新
function calcMonthBalance(billData,y,m){
  let monthBalance = 0;

  // 直接遍历每天数据
  for (const i in billData['list'][y]["list"][m]["list"]) {
    monthBalance += Number(billData['list'][y]["list"][m]["list"][i]["data"]["dateBalance"]);
  }
  return(monthBalance);
}

// 封装年余额数据更新
function calcYearBalance(billData,y){
  let yearBalance = 0;

  // 直接遍历(正常情况下，初始化后每月都会有数据)
  for (const i in billData['list'][y]["list"]) {
    yearBalance += Number(billData['list'][y]["list"][i]["data"]["monthBalance"]);
  }
  return(yearBalance);
}

// 总余额计算（会计算未来）
function calcBalanceFuture(billData){
  let balance = 0;
  
  // 直接加总年表的总值
  for (const i in billData['list']) {
    balance += billData['list'][i]["data"]["yearBalance"]
  }
  return(balance)
}

// 总余额计算（截至当天）
function calcBalance(billData,y,m,d){
  let balance = 0;

  // 加总年表
  for (const i in billData['list']) {
    if(i < y){
      balance += Number(billData['list'][i]["data"]["yearBalance"]);
    }
  }
  // 加总月表
  for (const i in billData['list'][y]["list"]) {
    if(i < m){
      balance += Number(billData['list'][y]["list"][i]["data"]["monthBalance"]);
    }
  }
  // 加总日表
  for (const i in billData['list'][y]["list"][m]["list"]) {
    if(i <= d){
      balance += Number(billData['list'][y]["list"][m]["list"][i]["data"]["dateBalance"]);
    }
  }

  // 消除浮点影响，取小数后一位
  if(balance > 0){
    balance = parseInt(balance * 10 + 0.1)/10;
  }else if(balance < 0){
    balance = parseInt(balance * 10 - 0.1)/10;
  }
  return(balance)
}

// 计算要显示的货币数量
function calcTodayBalanceShow(todayBalance){
  let todayBalanceShow = {
    100:0,
    paper:[],
    1:0,
    coin:[]
  };

  if(todayBalance < 0){
    return todayBalance;
  }

  // 取整，有多少设置多少
  todayBalanceShow[100] = parseInt(todayBalance/100);
  // 余数
  let a = todayBalance - parseInt(todayBalance/100)*100;
  if(a == 0){
    return todayBalanceShow;
  }

  if(parseInt(a/50)){
    todayBalanceShow.paper.push(50);
    a = a%50;
    if(a == 0){
      return todayBalanceShow;
    }
  }

  for (let i = parseInt(a/20); i > 0; i--) {
    todayBalanceShow.paper.push(20);
  }
  a = a%20;
  if(a == 0){
    return todayBalanceShow;
  }

  if(parseInt(a/10)){
    todayBalanceShow.paper.push(10);
    a = a%10;
    if(a == 0){
      return todayBalanceShow;
    }
  }

  if(parseInt(a/5)){
    todayBalanceShow.paper.push(5);
    a = a%5;
    if(a == 0){
      return todayBalanceShow;
    }
  }

  todayBalanceShow[1] = parseInt(a/1);
  a = a%1;
  if(a == 0){
    return todayBalanceShow;
  }

  if(parseInt(a/0.5)){
    todayBalanceShow.coin.push(0.5);
    a = a%0.5;
    if(a == 0){
      return todayBalanceShow;
    }
  }
  
  // +0.1是为了消除浮点的影响。先进到循环,再减
  for (let i = parseInt(a/0.1+0.1); i > 0; i--) {
    todayBalanceShow.coin.push(0.1);
  }
  return todayBalanceShow;
}

</script>

<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
  font-size: 4vw;
}
#header {
  width: 100%;
  height: 20vw;
  background-color: bisque;
}

#home{
  height: calc(100vh - 20vw);
}

#billListOuter{
  position: relative;
  width: 100%;
  overflow: hidden;
  touch-action: auto;
  pointer-events: auto;
}

#billListInner{
  height: 100%;
  padding: 0 1%;
  margin: 1% 0;
  overflow-y: scroll;
}


#addBill{
  // position: fixed;
  // height: calc(45vh - 30vw);
}

.money{
  font-size:2.5vh;
  width:7vh;
  height:3.5vh;
  line-height:3.5vh;
  position: absolute;
  float:left;
  text-align: right;
  padding-right: 0.5vh;
  border: solid 1px #aaa;
}

.coin{
  word-wrap:break-word;
  border: solid 1px #aaa;
  // text-align: ;
}

.van-swipe-cell__wrapper{
  transform: translate3d(20vw, 0, 0);

  .van-swipe-cell__right{
    width: 20vw;
    transform: translate3d(102%,0,0);
    .delete-button{
      height: 100%;
      width: 20vw;
      padding:0;
      .van-button__content{
        width: 20vw;
        .van-button__text{
          width: 20vw;
        }
      }
    }
  }
}

.fontSize7vw{
  font-size:4vw;
}

.fontSize3vw{
  font-size:3vw;
}

#billList{
  margin-left:3vw;
  width:5vw;
}

.item{
  white-space: nowrap;
  padding: 0.5vw 1.5vw;
}

</style>