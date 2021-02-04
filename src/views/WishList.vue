<template>
  <div class="wishList">
    <div id="header">

    </div>
    
    <br>
    <div>总余额:{{ balance }}</div>
    <div v-for="(item, index) in wishList">
      {{ item.status }}  
      {{ item.name }}
      ￥{{ item.price }}
      {{ item.addDate }}
      {{ item.finishDate }}
      {{ item.ps }}
      {{ item.saveMoney }}
      {{ item.noWaste }}
      {{ item.saveTime }}
    </div>
    
  </div>
</template>


<script>
import { Component, Vue } from "vue-property-decorator";

export default {
  name: "wishList",
  // 数据父传子
  props: {
    msg: {
      type: String,
      default: "test msg",
    },
  },
  data() {
    return {
      // 未删 
      balance: 0,
      todayTime: 0,
      wishList: [
        {
          id:0,
          status:0,
          name:"电脑1",
          price:5000,
          addDate:0,
          finishDate:0,
          ps:0,
          noWaste:0,
          saveTime:0,
          saveMoney:0,
        },
        {
          id:1,
          status:0,
          name:"电脑2",
          price:5000,
          addDate:0,
          finishDate:0,
          ps:0,
          noWaste:0,
          saveTime:0,
          saveMoney:0,
        },
        {
          id:2,
          status:0,
          name:"电脑3",
          price:5000,
          addDate:0,
          finishDate:0,
          ps:0,
          noWaste:0,
          saveTime:0,
          saveMoney:0,
        }
      ]
      
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
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
    for (let index = 0; index < 5; index++) {
        console.log(index);
    }
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

  return(balance)
}

</script>

<style lang="css">
#header {
  width: 100%;
  height: 15vw;
  background-color: bisque;
}
</style>