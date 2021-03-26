<template>
<div class="mine">
<div id="header">
  <div style="height:5vw"></div>
  <div style="height:15vw;line-height:15vw">我的1.04</div>
</div>
<br>
<div>
  <div style="display:flex;justify-content:center;align-items:center">
    <span>设置每日预算:</span>
    <input style="margin:0 2vw;width:30vw" type="number" v-model="budjet" placeholder="设置每日预算" />
    <span style="padding:0.5vw 0.5vw;width:14vw;border:1px solid #aaa;border-radius:2vw;" @click="changeBudjet()">调整</span>
  </div>
  <br><br>
  <button @click="chosen='inExData';showInfo='清理记账漏斗缓存/inExData';Dialog()">清理记账漏斗缓存<br>inExData</button><br><br>
  <button @click="chosen='billData';showInfo='清理天天记账缓存/billData';Dialog()">清理日常开支缓存<br>billData</button><br><br>
  <button @click="chosen='userData';showInfo='清理用户数据缓存/userData';Dialog()">清理用户数据缓存<br>userData</button><br><br>
  <button @click="chosen='wishList';showInfo='清理心愿清单缓存/wishList';Dialog()">清理心愿清单缓存<br>wishList</button><br><br>
  
  父组件的<input type="text" v-model="author">

  <!-- <br>在父组件绑定一个值传给子组件用props接。<br> -->
  <child1 :notice='author' @childPastValue="childByValue"></child1>
  <!-- 被子组件的childValue事件触发父组件的childByValue -->
</div>
</div>
</template>


<script>
import { Component, Vue } from "vue-property-decorator";
import { Dialog, Toast } from 'vant';
import child1 from '../components/child1';

Vue.use(Dialog);Vue.use(Toast);

export default {
  name: "mine",
  // 数据父传子,子接收的数据
  props: {
    msg: {
      type: String,
      default: "test msg",
    },
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
    child1  // 这个名字必须与import的名字相同
  },
  data() {
    return {
      // 未删 
      todayTime:"",
      time:"",
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
      budjet:400,
      todayBudjet:0,
      showInfo:'',
      chosen:'',
      author:''
    };
  },
  methods: {
    changeBudjet: function(){
      if(this.budjet >= 0){
        let userData = JSON.parse(localStorage.userData);
        userData.budjet = this.budjet;
        localStorage.userData = JSON.stringify(userData);

        let y = this.todayTime.getFullYear();
        let m = this.todayTime.getMonth();
        let d = this.todayTime.getDate();

        // 今天的数值也改了
        let billData = JSON.parse(localStorage.billData);
        billData[y]['list'][m]['list'][d]['data']['budjet'] = this.budjet;

        // 计算各层Balance
        billData[y]["list"][m]["list"][d]["data"]["dateBalance"] = calcDateBalance(billData,y,m,d);
        billData[y]["list"][m]["data"]["monthBalance"] = calcMonthBalance(billData,y,m);
        billData[y]["data"]["yearBalance"] = calcYearBalance(billData,y);
        localStorage.billData = JSON.stringify(billData);

        Toast('预算调整成功！')
      }else{
        Toast("预算不能为负数哦~");
      };
    },
    delLocalStorage(e){
      // console.log(123);
      if(!e){
        // localStorage.clear()
      }else{
        // localStorage.removeItem(e)
        console.log(e);
      }
    },
    //（确认、取消）的弹出框
    Dialog(){
      this.$dialog.confirm({
      title:'警告！',
      message:"你正准备"+this.showInfo+"。<br>请认真确认，再点击下一步。",
      confirmButtonColor:'red'
    }).then(()=>{
      console.log('点击了确认');
      if(!this.chosen){
        // localStorage.clear()
      }else{
        localStorage.removeItem(this.chosen)
        // console.log(this.chosen);
      }
    }).catch(()=>{
     console.log('点击了取消')
    })
    },
    childByValue(val){
      console.log(2,val);
      this.author = val;
    },
    
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");

    this.todayTime = new Date(parseInt(new Date().getTime()));
    let y = this.todayTime.getFullYear();
    let m = this.todayTime.getMonth();
    let d = this.todayTime.getDate();
    
    let userData = JSON.parse(localStorage.userData)
    let billData = JSON.parse(localStorage.billData)

    // 更新显示balance、budjet
    this.balance = calcBalance(billData,y,m,d);
    this.budjet = userData.budjet;
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
  },
  beforeUpdate() {
    console.log("beforeUpdate");
    this.todayTime = new Date(parseInt(new Date().getTime()))
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
  if(balance > 0){
    balance = parseInt(balance * 10 + 0.1)/10;
  }else if(balance < 0){
    balance = parseInt(balance * 10 - 0.1)/10;
  }
  return(balance)
}

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


// var getData1 = function(callback){
//   console.log('getData1');
//   callback(1)
//   return 1
// }
// var getData2 = function(a,callback){
//   console.log('getData2');
//   callback(a+1)
//   return a+1
// }
// var getData3 = function(a,callback){
//   console.log('getData3');
//   callback(a+1)
//   return a+1
// }
// getData1(function(alex1){
//   getData2(alex1,function(alex2){
//     getData3(alex2,function(alex3){
//       console.log('getData3',alex3);
//     })
//   })
// })

</script>

<style lang="css">
.mine{
  min-height: calc(100vh - 20vw);
}
</style>