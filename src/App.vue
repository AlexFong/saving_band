<template>
<div id="app">
  <!-- 任意元素中加 v-wechat-title 指令 建议将标题放在 route 对应meta对象的定义中 -->
  <div v-wechat-title="$route.meta.title"></div>
  <!--或者-->
  <!-- <router-view v-wechat-title="$route.meta.title"></router-view> -->


  <!-- 显示路由路径下的内容 -->
  <router-view/>

  <div id="footer">
    <van-tabbar style="height:16vw;padding-bottom:4vw" v-model="active">
      <van-tabbar-item badge="" to="/">
        <span>日常开支</span>
        <template #icon="props">
          <van-icon class="iconfont" class-prefix='icon' name='piechart' />
        </template>
      </van-tabbar-item>
      <van-tabbar-item badge="" to="/funnel">
        <span>记账漏斗</span>
        <template #icon="props">
          <van-icon class="iconfont" class-prefix='icon' name='barchart' />
        </template>
      </van-tabbar-item>
      <van-tabbar-item badge="" to="/wishlist">
        <span>心愿清单</span>
        <template #icon="props">
          <van-icon class="iconfont" class-prefix='icon' name='heart' />
        </template>
      </van-tabbar-item>
      <van-tabbar-item badge="99" to="/mine">
        <span>我的1.00</span>
        <template #icon="props">
          <van-icon class="iconfont" class-prefix='icon' name='user' />
        </template>
      </van-tabbar-item>
      <!-- <van-tabbar-item icon="search" to="/funnel">统计</van-tabbar-item>
      <van-tabbar-item icon="search" to="/wishlist">愿望清单</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/mine">我的</van-tabbar-item> -->
    </van-tabbar>
  </div>
</div>
</template>


<script>
// iconfont引入用法（2/2)
import "./assets/font_2356633_61czw08nnlw/iconfont.css";
import Vue from 'vue';
import { Button, Tabbar, TabbarItem } from 'vant';

// vConsole工作台
// import Vconsole from 'vconsole';
// new Vconsole();

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Button);

export default {
  data() {
    return {
      time:0,
      todayTime:0,



      active: 0,
      icon: {
        active: 'https://img01.yzcdn.cn/vant/user-active.png',
        inactive: 'https://img01.yzcdn.cn/vant/user-inactive.png',
      },

    };
  },
  methods: {
    
  },
  watch:{

  },
  beforeCreate() {
    console.log("App beforeCreate");
  },
  created() {
    // y是time，yy是todayTime
    console.log("App created");
    this.todayTime = new Date(parseInt(new Date().getTime()))
    let yy = this.todayTime.getFullYear();
    let mm = this.todayTime.getMonth();
    let dd = this.todayTime.getDate();

    this.time = this.todayTime;
    let y = this.time.getFullYear();
    let m = this.time.getMonth();
    let d = this.time.getDate();
    let ym = formatLongDate(this.time,2);  // ym

    // 首次登录新建数据
    if(!localStorage.userData){
      // 新建userData
      localStorage.userData = JSON.stringify({
        fisrtLoginDate:this.todayTime,
        name:"default",
        latestLoginDate:this.todayTime,
        budjet:300,
        wishId:0,
      })

      // 新建wishList
      localStorage.wishList = JSON.stringify([]);

      // 新建inExData
      localStorage.inExData = JSON.stringify({
        monthData:{[y]:{[m]:{
          fixedSalary:0,
          fixedRentIncome:0,
          otherSalary:0,
          otherIncome:0,
          otherIncomeList:[],
          necessarySpending:'',
          optionalSpending:'',
        }}},
        necessarySpendingList:[],
        optionalSpendingList:[],
      });

      let billData = initBillData({},y,m,d,300);
      // 计算各层Balance
      billData[y]["list"][m]["list"][d]["data"]["dateBalance"] = calcDateBalance(tempBillData,y,m,d);
      billData[y]["list"][m]["data"]["monthBalance"] = calcMonthBalance(tempBillData,y,m);
      billData[y]["data"]["yearBalance"] = calcYearBalance(tempBillData,y);
      // 新建billData
      localStorage.billData = JSON.stringify(billData);
    }else{
      // 老用户登录逻辑+++++++++++++++++++++
      let userData = JSON.parse(localStorage.userData);
      let billData = JSON.parse(localStorage.billData);
      let inExData = JSON.parse(localStorage.inExData);
      let wishList = JSON.parse(localStorage.wishList);

      // 计算日期差
      let dateStart = new Date(userData.latestLoginDate);
      userData.latestLoginDate = formatLongDate(this.todayTime,1);
      let dateEnd = new Date(userData.latestLoginDate);
      let diffValue = (dateEnd - dateStart) / (1000 * 60 * 60 * 24);
      // 1、更新userData
      localStorage.userData = JSON.stringify(userData);

      // 2、更新billData
      if (diffValue == 0){  
        // 当天重复登录
      }else if(diffValue <= 31){ 
        let tempTime = dateStart;
        for (let i = diffValue; i > 0; i--) {
          // 满足条件执行，执行完再对数值进行调整
          tempTime = new Date(tempTime.setDate(tempTime.getDate()+1));
          let yyy = tempTime.getFullYear();
          let mmm = tempTime.getMonth();
          let ddd = tempTime.getDate();
          initBillData(billData,yyy,mmm,ddd,userData.budjet);
        };
        localStorage.billData = JSON.stringify(billData);
      }else if(diffValue > 31){  
        // 如果大于31天，只新建今天的日表。
        initBillData(billData,y,m,d);
        localStorage.billData = JSON.stringify(billData);
        alert("太久没登录了，我们没给你更新数据了~");
      }else{
        alert("时间出错了，请重试");
      }
    
      // 逐月更新
      // 3、更新inExData
      // 4、更新wishList
      if(diffValue>0){
        for(tempTime = dateStart;formatLongDate(dateEnd,2) - formatLongDate(tempTime,2) != 0;){
          // 遍历每个月
          // 当月不用，下个月才要
          let tempTimeStart = tempTime;
          tempTime = new Date(tempTime.setMonth(tempTime.getMonth()+1));
          console.log('tempTime',tempTimeStart,tempTime);
          ym = formatLongDate(tempTime,2);

          // going的
            // 永续的
              // 年
              // 月

            // 不是永续的
              // 年
              // 月

          // 更新necessarySpendingList
          for(const i in inExData['necessarySpendingList']){
            let a = inExData['necessarySpendingList'][i];
            // status有going和finish两种状态
            if(a['status'] == 'going'){
              // 1.如果是永续的
              if(a['sustainable'] == 'true'){
                // 2.如果是月缴的
                if(a['interval'] == 'month'){
                  inExData['necessarySpendingList'][i]['payList'][ym] = a['payment'];
                }else{
                  if(a['payMonth']-1 == tempTime.getMonth()){
                    inExData['necessarySpendingList'][i]['payList'][ym] = a['payment'];
                  }
                }
              }
              // 1.如果不是永续的
              else{
                // 计算payList已支付总额
                let sumPayList = 0;
                for(const j in a['payList']){
                  sumPayList += Number(a['payList'][j]);
                };
                // 2.如果是月缴的
                if(a['interval'] == 'month'){
                  if(a['payment'] + sumPayList > a['price']){
                    inExData['necessarySpendingList'][i]['payList'][ym] = a['price'] - sumPayList;
                    inExData['necessarySpendingList'][i]['status'] = 'finish';
                  }else{
                    inExData['necessarySpendingList'][i]['payList'][ym] = a['payment'];
                  }
                }else{
                  if(a['payMonth']-1 == tempTime.getMonth()){
                    if(a['payment'] + sumPayList > a['price']){
                      inExData['necessarySpendingList'][i]['payList'][ym] = a['price'] - sumPayList;
                      inExData['necessarySpendingList'][i]['status'] = 'finish';
                    }else{
                      inExData['necessarySpendingList'][i]['payList'][ym] = a['payment'];
                    }
                  }
                }
              }
            }
          }
          // interval: "month"
          // m: "03"       
          // name: "房租"
          // payList: {202103: "1500"}
          // payMonth: ""
          // payment: "1500"
          // price: ""
          // status: "going"
          // sustainable: "true"
          // y: 2021



          // status是going的
            // sustainable是true的

            // sustainable是false的

          // 更新optionalSpendingList +++++++++++++++++++++++++++++
          for(const i in inExData['optionalSpendingList']){
            let a = inExData['optionalSpendingList'][i];
            // status有going和finish两种状态
            if(a['status'] == 'going'){
              // 如果是永续的
              if(a['sustainable'] == 'true'){
                inExData['optionalSpendingList'][i]['payList'][ym] = a['payment'];
              }
              // 如果不是永续的
              else{
                // 计算payList已支付总额
                let sumPayList = 0;
                for(const j in a['payList']){
                  sumPayList += Number(a['payList'][j]);
                };
                if(a['payment'] + sumPayList > a['price']){
                  inExData['optionalSpendingList'][i]['payList'][ym] = a['price'] - sumPayList;
                  inExData['optionalSpendingList'][i]['status'] = 'finish';
                }else{
                  inExData['optionalSpendingList'][i]['payList'][ym] = a['payment'];
                }
              }
            }
          }

          // m: "03"
          // name: "投资"
          // payList: {202103: "100"}
          // payment: "100"
          // period: "oneTime"
          // price: ""
          // status: "finish"
          // sustainable: "true"
          // y: 2021



          // status = aim时，

          // 更新wishList
          for(const i in wishList){
            let a = wishList[i];
            // status有4种状态
            if(a['status'] == 'aim'){
              // 计算payList已支付总额
              let sumPayList = 0;
              for(const j in a['payList']){
                sumPayList += Number(a['payList'][j]);
              };
              if(a['payment'] + sumPayList > a['price']){
                wishList[i]['payList'][ym] = a['price'] - sumPayList;
                wishList[i]['status'] = 'finish';
              }else{
                wishList[i]['payList'][ym] = a['payment'];
              }
            }
          }
          // addDate: "2021-03-15T11:14:02.627Z"
          // finishDate: ""
          // id: 13
          // name: "IPhone mini12"
          // noWaste: "circle"
          // payList: {}
          // payment: ""
          // price: "5300"
          // ps: ""
          // saveMoney: "circle"
          // saveTime: "circle"
          // status: "circle"


          // 更新monthData
          let a = inExData['monthData'][tempTimeStart.getFullYear()][tempTimeStart.getMonth()];
          // 新建年
          if(!inExData['monthData'][tempTime.getFullYear()]){
            inExData['monthData'][tempTime.getFullYear()] = {}
          }
          // 新建月
          inExData['monthData'][tempTime.getFullYear()][tempTime.getMonth()] = {
            fixedRentIncome: a.fixedRentIncome,
            fixedSalary: a.fixedSalary,
            // necessarySpending: "",
            // optionalSpending: "",
            otherIncome: 0,
            otherIncomeList: [],
            otherSalary: "",
          };


        }
      };
      // 遍历完

      // 把数据存回localStorage
      localStorage.userData = JSON.stringify(userData)
      localStorage.billData = JSON.stringify(billData)
      localStorage.inExData = JSON.stringify(inExData)
      localStorage.wishList = JSON.stringify(wishList)
    }
    // 通用逻辑还有要补充的吗？？++++++++++++
    
  },
  beforeMount() {
    console.log("App beforeMount");
  },
  mounted() {
    console.log("App mounted");
  },
  beforeUpdate() {
    console.log("App beforeUpdate",this.time,this.todayTime);
    this.todayTime = new Date(parseInt(new Date().getTime()));
  },
  updated() {
    console.log("App updated");
    console.log(document.activeElement);
  },
  beforeDestroy() {
    console.log("App beforeDestroy");
  },
  destroyed() {
    console.log("App destroyed");
  },
};

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
  
  let a = '';
  if(type==1){
    a = myyear + '-' + mymonth + '-' + myweekday;
  }else if(type==2){
    a = myyear + mymonth;
  }else{
    a = myyear + '' + mymonth + '' + myweekday + ' ' + myHour + ':' + myMin + ':' + mySec;
  }
  return (a)
};

// 建立好数据结构,年月日表新建
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
  if(dateBalance > 0){
    dateBalance = parseInt(dateBalance * 10 + 0.1)/10;
  }else if(dateBalance < 0){
    dateBalance = parseInt(dateBalance * 10 - 0.1)/10;
  }
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


// created : 2017.8.21
// author  : Guozhi_Han 
// Email   : Guozhi_Han@126.com
// 把屏幕旋转，封装成一个自执行的js ，只要有用到，直接引用就可以了
(function rotate(){
  var orientation=window.orientation;
  var pd = null;
  function createPd(){
    if(document.getElementById('preventTran') === null){
      var imgData = 'data:image/png;base64,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';
      pd = document.createElement('div');
      pd.setAttribute('id','preventTran');
      pd.style.position = 'fixed';
      pd.style.left = '0';
      pd.style.top = '0';
      pd.style.width = '100%';
      pd.style.height = '100%';
      pd.style.overflow = 'hidden';
      pd.style.backgroundColor = '#2e2e2e';
      pd.style.textAlign = 'center';
      pd.style.zIndex = '99999';
      document.getElementsByTagName('body')[0].appendChild(pd);
      var img = document.createElement('img');
      img.src = imgData;
      pd.appendChild(img);
      img.style.margin = '30vh auto 3vh auto'
      var br = document.createElement('br');
      var p = document.createElement('p');
      p.style.width = '100%';
      p.style.height = 'auto';
      p.style.fontSize = '4.5vh';
      p.style.color = '#626262';
      p.style.lineHeight = '6vh';
      p.style.textAlign = 'center';
      p.innerHTML = '为了您的良好体验';
      p.appendChild(br);
      p.innerHTML += '请将手机/平板竖屏操作';
      pd.appendChild(p);
    }
  }
  if(orientation==90||orientation==-90){
      if(pd == null && document.getElementById('preventTran') === null) createPd();
      document.getElementById('preventTran').style.display = 'block';
  }
  window.onorientationchange=function(){
    if(pd == null && document.getElementById('preventTran') == null) createPd();
    document.getElementById('preventTran').style.display='none';
    rotate();
  };
})();

</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  font-size: 4vw;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100vw;
  height: 100vh;
  // overflow: hidden;
}

#footer{
  height: 20vw;
  .van-tabbar-item__icon{
    margin-bottom: -1vw;
  }

  .van-tabbar-item{
    .icon{
      font-size: 6vw;
      line-height: 6.5vw;
    }
  }
  
  .van-tabbar-item__text{
    span{
      font-size: 2vw;
    }
  }
}

.van-info{
  margin-top: 2vw;
  font-size:2vw;
  line-height:4vw;
  width: 5vw;
  height: 5vw;
  border-radius: 5vw;
}

</style>
