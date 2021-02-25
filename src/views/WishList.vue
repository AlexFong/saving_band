<template>
  <div class="wishList">
    <div id="header">

    </div>

    <div>总余额:{{ balance }}</div>

    <van-collapse v-model="activeNames">
      <van-collapse-item :name="index"  v-for="(item, index) in wishList">
        <!-- title栏 -->
        <template #title>
          <div style="display:flex;flex-direction:row">
            <!-- 状态 -->
            <div style="width:6vw">
              <van-icon :name=item.status :class=colorStyle[item.status] @click.stop="show = true;tempIndex = index" />
            </div>

            <div style="width:36vw;overflow:hidden;white-space:nowrap;margin:0 6vw 0 2vw">{{ item.name }}</div>

            <!-- 钱 -->
            <div style="width:35vw;display:flex;flex-direction:row;white-space:nowrap;border:2px solid #ccc"
              :style="{
                display: item.status == 'aim' ? 'unset' : 'none',
              }">
                <div style="background-color:#aaffaa;height:100%;float:left;position:relative"
                  :style="{
                    width : 35*(item.payment/item.price) + 'vw',
                  }">
                </div>
                <div style="width:35vw;position:absolute">￥{{ item.payment }}/{{ item.price }}</div>
            </div>
            <div style="width:35vw"
              :style="{
                display: item.status == 'aim' ? 'none' : 'unset',
              }">
                ￥{{ item.price }}
            </div>
          </div>
        </template>
        
        <!-- 折叠内容 -->
        <div style="display:flex;background-color:#fff;border-bottom:1px solid #eee">
          <div style="margin:0 5vw">添加日期:<br>{{ item.addDate }}</div>
          <div>完成日期:<br>{{ item.finishDate }}</div> 
        </div>
        
        <div>{{item.budjet}}</div>
        
        <!-- <van-icon id="billList" class="iconfont red" class-prefix='icon' name='left' /> -->
        <div style="margin:2vw 0">
          <span @click="changeIcon(item.saveMoney,'saveMoney',index)">
            <van-icon :name=item.saveMoney :class=colorStyle[item.saveMoney] />
            省钱？
          </span>
          <span @click="changeIcon(item.noWaste,'noWaste',index)">
            <van-icon :name=item.noWaste :class=colorStyle[item.noWaste] />
            不浪费？
          </span>
          <span @click="changeStatus(item.saveTime,'saveTime',index)">
            <van-icon :name=item.saveTime :class=colorStyle[item.saveTime] />
            省时间？
          </span>
        </div>
      </van-collapse-item>
    </van-collapse>

    
    <br>
    <p>收入漏斗</p>
    <p>【完成日期】要看情况显示。未执行时不需要显示。</p>
    <p>【致命3问】执行逻辑是怎样？后期要捋一捋。</p>
    <p>导航条默认选中状态优化</p>
    <p>【+】添加愿望清单的功能</p>
    <p>create里的代码可以放在App.vue里</p>
    <p>删除记录</p>
    <p>已完成的，下次打开时隐藏</p>
    <p>愿望清单执行过程——每日扣钱等</p>
    <div @click="showPopup">展示弹出层</div>

    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @cancel="onCancel"
      @select="onSelect" 
    />
  </div>
  

</template>


<script>
// iconfont引入用法（2/2)
import "../assets/font_2356633_61czw08nnlw/iconfont.css";
import { Component, Vue } from "vue-property-decorator";
import { Collapse, CollapseItem, Icon, Progress, ActionSheet, Toast, Popup } from 'vant';

Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Icon);
Vue.use(Progress);
Vue.use(ActionSheet);
Vue.use(Popup);

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
          status:"checked",
          name:"电脑11111111111111111111",
          price:5000,
          payment:1000,
          addDate:"2020-12-23",
          finishDate:"2020-12-23",
          ps:0,
          noWaste:"checked",
          saveTime:"checked",
          saveMoney:"checked",
        },
        {
          id:1,
          status:"circle",
          name:"电脑2",
          price:4000,
          payment:0,
          addDate:"2020-12-23",
          finishDate:"2020-12-23",
          ps:0,
          noWaste:"circle",
          saveTime:"circle",
          saveMoney:"circle",
        },
        {
          id:2,
          status:"clear",
          name:"电脑333",
          price:3000,
          payment:2000,
          addDate:"2020-12-23",
          finishDate:"2020-12-23",
          ps:0,
          noWaste:"clear",
          saveTime:"clear",
          saveMoney:"clear",
        },
        {
          id:3,
          status:"aim",
          name:"电脑4444444444444444444",
          price:2000,
          payment:1500,
          addDate:"2020-12-23",
          finishDate:"2020-12-23",
          ps:0,
          noWaste:"clear",
          saveTime:"clear",
          saveMoney:"clear",
        }
      ],
      activeNames: ['1'],
      colorStyle:{
        "checked":"green",
        "circle":"",
        "clear":"red",
        "aim":"",
      },
      show: false,
      tempIndex:0,
      actions: [
        { name: '待定',icon: "circle" }, 
        { name: '执行中...',icon: "aim" }, 
        { name: '完成',icon: "checked" }, 
        { name: '取消',icon: "clear" }
      ],
      show: false,
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
    changeIcon: function(status,key,index){
      // console.log("-----------");
      if(status == "circle"){
        // console.log("circle-------",this.wishList[index]); 
        this.wishList[index][key] = "checked";
      }else if(status == "checked"){
        this.wishList[index][key] = "clear";
      }else if(status == "clear"){
        this.wishList[index][key] = "circle";
      }else{
        this.wishList[index][key] = "circle";
      }
    },
    onCancel() {
      Toast('取消');
    },
    showPopup() {
      this.show = true;
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      Toast(item.name);
      this.wishList[this.tempIndex]['status'] = item.icon;
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
*{
  border: 0;
  padding: 0;
  font-size: 4.5vw;
  line-height: 4.5vw;
}

#header {
  width: 100%;
  height: 15vw;
  background-color: bisque;
}

.van-collapse-item__content{
  font-size:5vw;
  color:#666;
}

.van-cell{
  background-color: #fafafa;
}

.red{
  color: red;
}
.green{
  color: green;
}
</style>