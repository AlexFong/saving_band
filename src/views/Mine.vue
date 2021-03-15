<template>
<div class="mine">
<div id="header">
  <div style="height:5vw"></div>
  <div style="height:15vw;line-height:15vw">我的1.01</div>
</div>
<br>
<div>
  <div>
    <span>设置每日预算:</span>
    <input type="number" v-model="budjet" placeholder="设置每日预算" />
    <button @click="changeBudjet()">调整</button>
  </div>
  <br><br>
  <button @click="chosen='inExData';showInfo='清理记账漏斗缓存/inExData';Dialog()">清理记账漏斗缓存/inExData</button><br><br>
  <button @click="chosen='billData';showInfo='清理天天记账缓存/billData';Dialog()">清理天天记账缓存/billData</button><br><br>
  <button @click="chosen='userData';showInfo='清理用户数据缓存/userData';Dialog()">清理用户数据缓存/userData</button><br><br>
  <button @click="chosen='wishList';showInfo='清理心愿清单缓存/wishList';Dialog()">清理心愿清单缓存/wishList</button><br><br>
  <!-- <div>总余额:{{ balance }}</div> -->

  <!-- <van-dialog v-model="show" title="" show-cancel-button>
    你正准备{{showInfo}}。
    <br>
    请认真确认，再点击下一步。
  </van-dialog> -->
</div>
</div>
</template>


<script>
import { Component, Vue } from "vue-property-decorator";
import { Dialog } from 'vant';

Vue.use(Dialog);

export default {
  name: "mine",
  // 数据父传子
  props: {
    msg: {
      type: String,
      default: "test msg",
    },
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      // 未删 
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
      showInfo:'',
      chosen:'',
    };
  },
  methods: {
    changeBudjet: function(){
      if(this.budjet >= 0){
        let tempUserData = JSON.parse(localStorage.userData);
        tempUserData.budjet = this.budjet;
        localStorage.userData = JSON.stringify(tempUserData);
      }else{
        alert("预算不能为负数哦~");
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
    
    let tempUserData = JSON.parse(localStorage.userData)
    let tempBillData = JSON.parse(localStorage.billData)

    // 更新显示balance、budjet
    this.balance = calcBalance(tempBillData,y,m,d);
    this.budjet = tempUserData.budjet;
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



</script>

<style lang="css">
.mine{
  min-height: calc(100vh - 20vw);
}
</style>