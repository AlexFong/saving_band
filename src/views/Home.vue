<template>
  <div id="home">
    <div id="header">
      <div style="width:36vw;line-height:6vw;font-size:4vw;margin:1vw 0 0 2vw;justify-content:left;text-align:left">
        总余额:
        <div style="background-color:#fff;font-size:4vw;border:1px solid #ccc;width:30vw;border-radius:1vw;margin-left:-0.5vw">
          ￥{{ balance }}
        </div>
      </div>
      <div style="width:28vw;">天天记账</div>
      <div style="width:36vw;">
      </div>
    </div>
    
    <!-- 分割矩形区域 -->
    <van-row style="height:55vh;border-top:1px solid black;border-bottom:1px solid black">
      <van-col span="8" style="height:55vh">
        <van-row style="height:10vh;border-bottom:1px solid black;display:flex;justify-content:space-around;flex-direction:column;">
          <div style="height:4vh;display:flex;align-item:center;justify-content:center">
            <div style="font-size:3vh;line-height:4.5vh;">
              {{ time.getMonth() + 1 }}月{{ time.getDate() }}日
            </div>
            <!-- iconfont引入用法（1/2) -->
            <van-icon class="iconfont fontSize3vw" class-prefix='icon' name='accountbook' />
          </div>

          <div style="height:4vh;line-height:4vh;display:flex;align-item:center;justify-content:center">
            <button style="border:none;background-color:unset" @click="changeTime(-1)"><van-icon class="iconfont fontSize3vw" class-prefix='icon' name='left' /></button>
            <button @click="changeTime(0)" style="margin:0 0.5vh;font-size:2.5vh;line-height:3.5vh">今天</button>
            <button style="border:none;background-color:unset" @click="changeTime(1)"><van-icon class="iconfont fontSize3vw" class-prefix='icon' name='right' /></button>
          </div>
        </van-row>

        <van-row style="height:10vh;border-bottom:1px solid black;display:flex;justify-content:space-around;flex-direction:column">
          <div style="height:3vh;line-height:3vh;font-size:3vh;text-align:center;padding-top:0.5vh;">
            今日预算:
          </div> 
          <div style="height:3.5vh;line-height:3.5vh">
            <input type="number" v-model="todayBudjet" style="font-size:2.5vh;width:50%;text-align:center;margin-right:0.3vh" placeholder="设置今日预算" />
            <button @click="changeTodayBudjet()" style="font-size:2.5vh">设置</button>
          </div>
        </van-row>

        <van-row style="height:35vh;justify-content:space-around;display:flex;flex-direction:column">
          
          <!-- 纸币100元 -->
          <div style="height:5vh;display:flex;justify-content:center;padding:0vh 0vw 0vh;align-item:center;"
            :style="{
              display: todayBalanceShow[100] > 0 ? 'flex' : 'none',
            }">
            <div class="money" style="background-color:red;position:relative;margin-right:2vw">
              100
            </div>
            <div style="font-size:2.5vh">x{{ todayBalanceShow[100]}}</div>
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
          <div style="height:4vh;width:30vw;margin:0vh 1.5vw;display:flex;flex-direction:row;align-content:space-around;justify-content:space-around;"
            :style="{
              display: todayBalanceShow[1] > 0 ? 'flex' : 'none',
            }">
            <div v-for="item of todayBalanceShow[1]">
              <div class="coin" style="background-color:#eee;border-radius:3vh;width:3vh;height:3vh;font-size:2.5vh;line-height:3.5vh">1</div>
            </div>
          </div>

          <!-- 硬币角 -->
          <div style="height:3.5vh;width:30vw;margin:0vh 1.5vw;display:flex;flex-direction:row;align-content:space-around;justify-content:space-around;"
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
          <div style="align-content:center;height:2.5vh;align-item:center;">
            <div style="height:2.5vh;line-height:2.5vh;"
            :style="{
              top: todayBalanceShow < 0 ? 7 + 'vh' : 0 + 'vh',
              position: todayBalanceShow < 0 ? 'relative' : 'unset',
              'font-size': todayBalanceShow < 0 ? 3.5+'vh' : 2.5+'vh',
              'font-weight': todayBalanceShow < 0 ? 'bolder' : 'normal',
            }">
              余额:{{ todayBalance }}
            </div> 
          </div>
          
        </van-row>
      </van-col>

      <van-col span="16" style="height:55vh;border-left:1px solid black">
        <div id="billListOuter" style="height:55vh">
          <div id="billListInner">
            <div v-for="(item, index) in bill">
              <van-swipe-cell style="margin-bottom:2vw;border-radius:2vw">
                <div style="font-size:5vw;line-height:10vw;background-color:#fff;display:flex">
                  <span style="font-size:4.5vw;width:20vw">
                    {{ new Date(item.time).getHours() }}:{{
                      new Date(item.time).getMinutes() < 10
                        ? "0" + new Date(item.time).getMinutes()
                        : new Date(item.time).getMinutes()
                    }}
                  </span>
                  <span style="font-size:4.5vw;width:22vw">{{ checkList[item.id] }}</span>
                  <span style="font-size:4.5vw;width:15vw">￥{{ item.cost }} </span>
                  <van-icon style="font-size:4vw;margin-left:3vw;width:5vw" class="iconfont" class-prefix='icon' name='left' />
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
    <div id="addBill" style="height:23vh;bottom: 16vw;display:flex;flex-direction:column;justify-content:flex-end;">
      <div style="margin:1vh 3vh">
      <!-- type="radio"时为单选题，type="checkbox"时为多选题 -->
        <span v-for="(item, index) in typeList" style="white-space: nowrap;">
          <input type="radio" :id="item.id" :value="item.id" v-model="typeId" />
          <label :for="item.id" style="font-size:2.5vh">{{ item.name }}</label>
        </span>
      </div>

      <div style="font-size:2.5vh">
        ￥<input type="number" v-model="cost" placeholder="输入金额" />
        <button @click="addFun">花钱</button>
        <button @click="dayRollBack">回滚1天</button>
      </div>
    </div>
  </div>
    
</template>


<script>
// iconfont引入用法（2/2)
import "../assets/font_2356633_61czw08nnlw/iconfont.css";
import { Component, Vue } from "vue-property-decorator";
import { Col, Row, Icon, SwipeCell } from 'vant';

Vue.use(SwipeCell);
Vue.use(Icon);
Vue.use(Col);
Vue.use(Row);

export default {
  name: "home",
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
        { name: "住房生活", id: "b" },
        { name: "服饰美容", id: "c" },
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
        { name: "保险", id: "n" },
        { name: "投资", id: "o" },
        { name: "意外", id: "p" },
        { name: "其他", id: "q" },
      ],
      checkList: {
        a: "餐饮",
        b: "住房生活",
        c: "服饰美容",
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
        n: "保险",
        o: "投资",
        p: "意外",
        q: "其他",
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
        1:[{left:7,top:6}],
      }
    };
  },
  methods: {
    addFun: function () {
      if (this.cost) {
        // 建立好数据结构
        let tempBillData = JSON.parse(localStorage.billData) ;
        let y = this.time.getFullYear();
        let m = this.time.getMonth();
        let d = this.time.getDate();
        let yy = this.todayTime.getFullYear();
        let mm = this.todayTime.getMonth();
        let dd = this.todayTime.getDate();
        // 如果当天数据不存在，则会新建档案
        tempBillData = initBillData(tempBillData,y,m,d,this.budjet);
        // 因为新增消费条款时，会init当前数据，budjet可能从无到有，要读取一下。
        this.todayBudjet = tempBillData[y]["list"][m]["list"][d]["data"]["budjet"];
        
        tempBillData[y]["list"][m]["list"][d]["list"].push({
          id: this.typeId,
          cost: Number(this.cost),
          time: this.time,
        });

        this.cost = "";

        // 计算各层Balance
        tempBillData[y]["list"][m]["list"][d]["data"]["dateBalance"] = calcDateBalance(tempBillData,y,m,d);
        tempBillData[y]["list"][m]["data"]["monthBalance"] = calcMonthBalance(tempBillData,y,m);
        tempBillData[y]["data"]["yearBalance"] = calcYearBalance(tempBillData,y);
        // 如果改变的是未来的数据，calcBalance可不执行-------------优化方向，不一定有好处--------------
        this.balance = calcBalance(tempBillData,yy,mm,dd);
        this.todayBalance = tempBillData[y]["list"][m]["list"][d]["data"]["dateBalance"];
        this.todayBalanceShow = calcTodayBalanceShow(this.todayBalance);

        // stringify再parse会使时间格式发生变化
        localStorage.billData = JSON.stringify(tempBillData);
        // 使时间格式保持一致
        this.bill = JSON.parse(localStorage.billData)[y]["list"][m]["list"][d]["list"];
      } else {
        alert("请输入金额");
      }
    },
    delFun: function(index,item){
      let tempBillData = JSON.parse(localStorage.billData) ;
      let y = this.time.getFullYear();
      let m = this.time.getMonth();
      let d = this.time.getDate();
      let yy = this.todayTime.getFullYear();
      let mm = this.todayTime.getMonth();
      let dd = this.todayTime.getDate();
      
      tempBillData[y]["list"][m]["list"][d]["list"].splice(index,1);

      // 计算各层Balance
      tempBillData[y]["list"][m]["list"][d]["data"]["dateBalance"] = calcDateBalance(tempBillData,y,m,d);
      tempBillData[y]["list"][m]["data"]["monthBalance"] = calcMonthBalance(tempBillData,y,m);
      tempBillData[y]["data"]["yearBalance"] = calcYearBalance(tempBillData,y);
      // 如果改变的是未来的数据，calcBalance可不执行-------------优化方向，不一定有好处--------------
      this.balance = calcBalance(tempBillData,y,m,d);
      this.todayBalance = calcDateBalance(tempBillData,yy,mm,dd);
      this.todayBalanceShow = calcTodayBalanceShow(this.todayBalance);
      
      // stringify再parse会使时间格式发生变化
      localStorage.billData = JSON.stringify(tempBillData);
      // 使时间格式保持一致
      this.bill = JSON.parse(localStorage.billData)[y]["list"][m]["list"][d]["list"];
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
      let tempBillData = JSON.parse(localStorage.billData) ;
      let y = this.time.getFullYear();
      let m = this.time.getMonth();
      let d = this.time.getDate();
      
      // 当天有无可查数据
      if(!tempBillData[y] || !tempBillData[y]["list"][m] || !tempBillData[y]["list"][m]["list"][d]){
        // addFun里会init数据，这里先不动数据
        this.bill = [];
        this.todayBudjet = 0;
        this.todayBalance = 0;
        this.todayBalanceShow = calcTodayBalanceShow(this.todayBalance);
      }else{
        this.bill = tempBillData[y]["list"][m]["list"][d]["list"];
        this.todayBudjet = tempBillData[y]["list"][m]["list"][d]["data"]["budjet"];
        this.todayBalance = calcDateBalance(tempBillData,y,m,d);
        this.todayBalanceShow = calcTodayBalanceShow(this.todayBalance);
      }
    },
    changeTodayBudjet: function(){
      if(this.todayBudjet >= 0){
        let tempBillData = JSON.parse(localStorage.billData);
        let y = this.time.getFullYear();
        let m = this.time.getMonth();
        let d = this.time.getDate();
        let yy = this.todayTime.getFullYear();
        let mm = this.todayTime.getMonth();
        let dd = this.todayTime.getDate();
        tempBillData[y]["list"][m]["list"][d]["data"]["budjet"] = this.todayBudjet;

        // 计算各层Balance
        tempBillData[y]["list"][m]["list"][d]["data"]["dateBalance"] = calcDateBalance(tempBillData,y,m,d);
        tempBillData[y]["list"][m]["data"]["monthBalance"] = calcMonthBalance(tempBillData,y,m);
        tempBillData[y]["data"]["yearBalance"] = calcYearBalance(tempBillData,y);
        this.balance = calcBalance(tempBillData,yy,mm,dd);
        this.todayBalance = calcDateBalance(tempBillData,y,m,d);
        this.todayBalanceShow = calcTodayBalanceShow(this.todayBalance);

        localStorage.billData = JSON.stringify(tempBillData);
      }else{
        alert("预算不能为负数哦~");
      }
    },
    // 测试：回滚一天
    dayRollBack: function(){
      let tempUserData = JSON.parse(localStorage.userData);
      let tempBillData = JSON.parse(localStorage.billData);

      // 第二天：new Date(dateTime.setDate(dateTime.getDate()+1))
      let dateTime = this.todayTime;

      let yy = dateTime.getFullYear();
      let mm = dateTime.getMonth();
      let dd = dateTime.getDate();

      // let y = this.todayTime.getFullYear();
      // let m = this.todayTime.getMonth();
      // let d = this.todayTime.getDate();

      // 删除对象键值对
      if(tempBillData[yy]["list"][mm]["list"][dd]){
        delete tempBillData[yy]["list"][mm]["list"][dd]
      }
      

      // this.todayBudjet = tempBillData[y]["list"][m]["list"][d]["data"]["budjet"];
      // this.todayBalance = tempBillData[y]["list"][m]["list"][d]["data"]["dateBalance"];
      // this.balance = calcBalance(tempBillData,yy,mm,dd);
      // this.budjet = tempUserData.budjet;
      // this.todayBalanceShow = calcTodayBalanceShow(this.todayBalance);

      dateTime = new Date(dateTime.setDate(dateTime.getDate()-1));

      tempUserData.latestLoginDate = formatLongDate(dateTime,1);
      localStorage.userData = JSON.stringify(tempUserData);

      localStorage.billData = JSON.stringify(tempBillData);
      // this.bill = JSON.parse(localStorage.billData)[y]["list"][m]["list"][d]["list"];
    }
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");

    this.todayTime = new Date(parseInt(new Date().getTime()));
    this.time = this.todayTime;
    let y = this.todayTime.getFullYear();
    let m = this.todayTime.getMonth();
    let d = this.todayTime.getDate();
    let yy = this.todayTime.getFullYear();
    let mm = this.todayTime.getMonth();
    let dd = this.todayTime.getDate();
    
    if(!localStorage.userData){
      // 新建userData,可以多加逻辑，记录用户首次登录时的信息+++++++++++++++++++++
      localStorage.userData = JSON.stringify({
        // 记录首次登录日期
        fisrtLoginDate:this.todayTime,
        name:"default",
        latestLoginDate:this.todayTime,
        budjet:400,
      })

      // 新建billData
      let tempBillData = initBillData({},y,m,d,this.budjet);

      // 计算各层Balance
      tempBillData[y]["list"][m]["list"][d]["data"]["dateBalance"] = calcDateBalance(tempBillData,y,m,d);
      tempBillData[y]["list"][m]["data"]["monthBalance"] = calcMonthBalance(tempBillData,y,m);
      tempBillData[y]["data"]["yearBalance"] = calcYearBalance(tempBillData,y);
      this.balance = calcBalance(tempBillData,yy,mm,dd);
      this.todayBalance = tempBillData[y]["list"][m]["list"][d]["data"]["dateBalance"];
      this.todayBudjet = tempBillData[y]["list"][m]["list"][d]["data"]["budjet"];

      // stringify再parse会使时间格式发生变化
      localStorage.billData = JSON.stringify(tempBillData);
      // 使时间格式保持一致
      this.bill = JSON.parse(localStorage.billData)[y]["list"][m]["list"][d]["list"];
    }else{
      let tempUserData = JSON.parse(localStorage.userData)
      let tempBillData = JSON.parse(localStorage.billData)

      // 更新日期
      let dateStart = new Date(tempUserData.latestLoginDate);
      // 临时先用登录时间来记录最后一次登录时间+++++++++++++++++++++++++++++++
      tempUserData.latestLoginDate = formatLongDate(this.todayTime,1);
      let dateEnd = new Date(tempUserData.latestLoginDate);
      let diffValue = (dateEnd - dateStart) / (1000 * 60 * 60 * 24);
      localStorage.userData = JSON.stringify(tempUserData)


      // init好没有建立的日表
      if (diffValue == 0){
        // 保险起见
        initBillData(tempBillData,y,m,d,tempUserData.budjet);
        // 初始化后更新每日余额 tempBillData[y]["list"][m]["list"][d]["data"]["dateBalance"] = calcDateBalance(tempBillData,y,m,d);
        console.log("diffValue == 0");
      }else if(diffValue <= 7){ // 如果天数差大于7天，就不执行逻辑。新建中间空掉的日表。
        for (let i = diffValue; i > 0; i--) {
          // 满足条件执行，执行完再对数值进行调整
          // 第二天：new Date(dateTime.setDate(dateTime.getDate()+1))
          dateStart = new Date(dateStart.setDate(dateStart.getDate()+1))
          let yy = dateStart.getFullYear();
          let mm = dateStart.getMonth();
          let dd = dateStart.getDate();
          initBillData(tempBillData,yy,mm,dd,tempUserData.budjet);
          console.log("----------------测试看出现几次----------------", dateStart);
          console.log("diffValue <= 7 1111111");
        }
        console.log("diffValue <= 7 2222222");
      }else if(diffValue > 7){  // 如果大于7天，只新建今天的日表。
        initBillData(tempBillData,y,m,d);
        console.log("太久没登录了，我们没给你更新数据了~");
        alert("太久没登录了，我们没给你更新数据了~")
      }else{
        console.log("时间出错了，请重试");
        alert("时间出错了，请重试")
      }

      // 更新显示的账单、todayBalance、balance、todayBudjet
      this.todayBudjet = tempBillData[y]["list"][m]["list"][d]["data"]["budjet"];
      this.todayBalance = tempBillData[y]["list"][m]["list"][d]["data"]["dateBalance"];
      this.balance = calcBalance(tempBillData,yy,mm,dd);
      this.budjet = tempUserData.budjet;
      this.todayBalanceShow = calcTodayBalanceShow(this.todayBalance);

      // stringify再parse会使时间格式发生变化
      localStorage.billData = JSON.stringify(tempBillData);
      // 使时间格式保持一致
      this.bill = JSON.parse(localStorage.billData)[y]["list"][m]["list"][d]["list"];
    }


  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
  },
  beforeUpdate() {
    console.log("beforeUpdate");
    this.todayTime = new Date(parseInt(new Date().getTime()));
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
  }else{
    a = myyear + '' + mymonth + '' + myweekday + ' ' + myHour + ':' + myMin + ':' + mySec;
  }
  return (a)
};

// 建立好数据结构,年月日表新建(每天都要保存数据，不然日预算一调整，就没法计算一个正确的值了)
function initBillData(tempData,y,m,d,budjet){
  if(!tempData[y]){
    tempData[y] = {
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
  } else if(!tempData[y]["list"][m]){
    tempData[y]["list"][m] = {
      data : {monthBalance:budjet},
      list : {
        [d] : {
          data:{budjet : budjet,dateBalance:budjet},
          list : []
        }
      },
    }
  } else if(!tempData[y]["list"][m]["list"][d]){
    tempData[y]["list"][m]["list"][d] = {
      data:{budjet : budjet,dateBalance:budjet},
      list : []
    }
  };
  
  return(tempData);
};

// 封装日余额数据更新
function calcDateBalance(tempBillData,y,m,d){
  let dateBalance = tempBillData[y]["list"][m]["list"][d]["data"]["budjet"];
  // 直接遍历(正常情况下，初始化后每天都会有数据)
  for (const i in tempBillData[y]["list"][m]["list"][d]["list"]) {
    dateBalance -= Number(tempBillData[y]["list"][m]["list"][d]["list"][i]["cost"]);
  }
  // 消除浮点影响，取小数后一位
  dateBalance = parseInt(dateBalance * 10 + 0.1)/10;
  return(dateBalance);
}

// 封装月余额数据更新
function calcMonthBalance(tempBillData,y,m){
  let monthBalance = 0;

  // 直接遍历每天数据
  for (const i in tempBillData[y]["list"][m]["list"]) {
    monthBalance += Number(tempBillData[y]["list"][m]["list"][i]["data"]["dateBalance"]);
  }
  return(monthBalance);
}

// 封装年余额数据更新
function calcYearBalance(tempBillData,y){
  let yearBalance = 0;

  // 直接遍历(正常情况下，初始化后每月都会有数据)
  for (const i in tempBillData[y]["list"]) {
    yearBalance += Number(tempBillData[y]["list"][i]["data"]["monthBalance"]);
  }
  return(yearBalance);
}

// 总余额计算（会计算未来）
function calcBalanceFuture(tempBillData){
  let balance = 0;
  
  // 直接加总年表的总值
  for (const i in tempBillData) {
    balance += tempBillData[i]["data"]["yearBalance"]
  }
  return(balance)
}

// 总余额计算（截至当天）
function calcBalance(tempBillData,y,m,d){
  let balance = 0;

  // 加总年表
  for (const i in tempBillData) {
    if(i < y){
      balance += Number(tempBillData[i]["data"]["yearBalance"]);
    }
  }
  // 加总月表
  for (const i in tempBillData[y]["list"]) {
    if(i < m){
      balance += Number(tempBillData[y]["list"][i]["data"]["monthBalance"]);
    }
  }
  // 加总日表
  for (const i in tempBillData[y]["list"][m]["list"]) {
    if(i <= d){
      balance += Number(tempBillData[y]["list"][m]["list"][i]["data"]["dateBalance"]);
    }
  }

  // 消除浮点影响，取小数后一位
  balance = parseInt(balance * 10 + 0.1)/10;
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
  console.log(1,"---------",todayBalance,parseInt(todayBalance/100)*100);
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
    console.log(i);
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
    console.log(i);
  }
  return todayBalanceShow;
}

</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  font-size: 5vw;
  /* background-color: #f5f5f5; */
}

#header {
  width: 100%;
  height: 15vw;
  background-color: bisque;
  line-height: 15vw;
  display: flex;
}

#home{
  height: calc(100vh - 50px);
}

#billListOuter{
    position: relative;
    width: 100%;
    overflow: hidden;
    touch-action: auto;
    pointer-events: auto;
    background-color: aliceblue;
}

#billListInner{
    height: 100%;
    padding: 1%;
    overflow-y: scroll;
}


#addBill{
  
  position: fixed;
  /* background-color: rgb(184, 217, 245); */
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
}

.van-swipe-cell__wrapper{
  transform: translate3d(20vw, 0, 0);

  .van-swipe-cell__right{
    // padding-left: 0.5vw;
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

.fontSize3vw{
  font-size:3.5vh;
}
</style>