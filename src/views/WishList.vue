<template>
<div class="wishList">
<div id="header">
  <div style="height:5vw"></div>
  <div style="height:15vw;line-height:15vw">心愿清单1.01</div>
</div>

<div style="display:flex;">
  <van-dropdown-menu style="width:75vw">
    <!-- 1 -->
    <van-dropdown-item v-model="value" :options="option" @change="activeNames=[]"/>
    <!-- 2 -->
    <van-dropdown-item title="筛选?" ref="item">
      <van-cell center title="包邮?" style="text-align:left">
        <template #right-icon>
          <van-switch v-model="switch1" size="24" active-color="#ee0a24"/>
        </template>
      </van-cell>
      <van-cell center title="团购?" style="text-align:left">
        <template #right-icon>
          <van-switch v-model="switch2" size="24" active-color="#ee0a24" />
        </template>
      </van-cell>
      <div style="padding: 5px 16px;">
        <van-button type="danger" block round @click="onConfirm">
          确认
        </van-button>
      </div>
    </van-dropdown-item>
  </van-dropdown-menu>
  <!-- 3 -->
  <div style="display:flex;width:25vw;align-self:center;justify-content:center">
    <div style="width:15vw;height:8vw;line-height:8vw;background-color:#fff;border-radius:5vw;" @click="showPopup('addWishShow')">
      +添加
    </div>
  </div>
</div>


<van-collapse v-model="activeNames">
  <!-- evenWishList是computed里监听的 -->
  <van-collapse-item :name="index"  v-for="(item, index) in evenWishList">
    <!-- title栏 -->
    <template #title>
      <div style="display:flex;flex-direction:row">
        <!-- 状态 -->
        <div style="width:6vw">
          <van-icon :name=item.status :class=colorStyle[item.status] @click.stop="show = true;tempId = item.id;tempName = item.name;temp5 = item.price" />
        </div>
        <!-- 心愿名字 -->
        <div style="width:36vw;overflow:hidden;white-space:nowrap;margin:0 6vw 0 2vw">{{ item.name }}</div>
        <!-- 价格 -->
        <div style="width:35vw;display:flex;flex-direction:row;white-space:nowrap;border:2px solid #ccc"
        :style="{
          display: item.status == 'aim' ? 'unset' : 'none',
        }">
          <div style="background-color:#aaffaa;height:100%;float:left;position:relative"
          :style="{
            width : 35*(item.payment/item.price) + 'vw',
          }">
          </div>
          <div style="width:35vw;position:absolute">
            ￥{{ item.payment }}/{{ item.price }}
          </div>
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
    <!-- 1 -->
    <div style="display:flex;background-color:#fff;border-bottom:1px solid #eee">
      <div style="margin:0 5vw">
        添加日期:
        <br>
        {{ formatLongDate(item.addDate,1) }}
      </div>
      <div
      :style="{
        display: item.status == 'clear' || item.status == 'checked' ? 'unset' : 'none',
      }">
        完成日期:
        <br>
        {{ formatLongDate(item.finishDate,1) }}
      </div> 
    </div>
    <!-- 2 -->
    <div style="margin:2vw 0">
      <span @click="changeIcon(item.saveMoney,'saveMoney',item.id)">
        <van-icon :name=item.saveMoney :class=colorStyle[item.saveMoney] />
        省钱？
      </span>
      <span @click="changeIcon(item.noWaste,'noWaste',item.id)">
        <van-icon :name=item.noWaste :class=colorStyle[item.noWaste] />
        不浪费？
      </span>
      <span @click="changeIcon(item.saveTime,'saveTime',item.id)">
        <van-icon :name=item.saveTime :class=colorStyle[item.saveTime] />
        省时间？
      </span>
    </div>
  </van-collapse-item>
</van-collapse>


<!-- <br>
<p>【完成日期】要看情况显示。未执行时不需要显示。</p>
<p>【致命3问】执行逻辑是怎样？后期要捋一捋。</p>
<p>导航条默认选中状态优化</p>
<p>【+】添加愿望清单的功能</p>
<p>create里的代码可以放在App.vue里</p>
<p>删除记录</p>
<p>已完成的，下次打开时隐藏</p>
<p>愿望清单执行过程————加入可选消费</p>
-->

<!-- 改变状态的面板 -->
<van-action-sheet
  v-model="show"
  :actions="actions"
  cancel-text="取消"
  close-on-click-action
  @cancel="onCancel"
  @select="onSelect" 
/>

<!-- 1、添加心愿的弹窗 -->
<van-popup v-model="addWishShow" position="bottom" style="height:28vh;justify-content:space-between;flex-direction:column;" :style="{ 
  display: addWishShow ? 'flex' : 'none',
}">
  <div style="background-color:#f1f1f1;padding:1.5vh">添加愿望</div>
  <!-- 输入框 -->
  <div>
    <!-- 输入任意文本 -->
    <van-field style="line-height:8vw" v-model="wishName" label="愿望" placeholder="请输入愿望名"  />
    <!-- 允许输入数字，调起带符号的纯数字键盘 -->
    <van-field style="line-height:8vw"  v-model="wishPrice" type="number" label="金额" placeholder="请输入金额"  />
  </div>
  <van-button type="primary" round  size="normal" style="width:30vw;margin:0 0 4vh 35vw" @click="addWish(wishName,wishPrice)">提交</van-button>
</van-popup>


<!-- 3、添加可选开支的弹窗 -->
<van-popup v-model="addOptionalSpendingShow" position="bottom" :style="{ 
  height: '50vh',
  'justify-content': 'space-between',
  display: addOptionalSpendingShow ? 'flex' : 'none',
  'flex-direction': 'column' }">
  <div style="background-color:#f1f1f1;padding:1.5vh">添加可选开支</div>

  <!-- 输入框 -->
  <div>
    <!-- 输入任意文本 -->
    <van-field id="" style="height:10vw;line-height:10vw" v-model="tempName" label="支出项目" placeholder="请输入支出项目名" :readonly=true />

    <van-field name="radio1" label="缴费周期" style="line-height:10vw;height:10vw">
      <template #input>
        <van-radio-group v-model="temp1" direction="horizontal" disabled>
          <van-radio name="oneTime">一次性</van-radio>
          <van-radio name="month">每月</van-radio>
        </van-radio-group>
      </template>
    </van-field>

    <van-field id="temp3" style="line-height:8vw"  v-model="temp3" type="number" label="每期金额" placeholder="请输入每期金额" @blur="switch3==false & temp3 != '' ?changeSwitch('switch3'):''" :style="{display: temp1 == 'oneTime' ? 'none' : ''}" />

    <van-field id="temp4" style="line-height:8vw"  v-model="temp4" type="digit" label="期数" placeholder="请输入期数"  :style="{display: temp1 == 'oneTime'? 'none' : ''}" @blur="switch4==false & temp4 != '' ?changeSwitch('switch4'):''" />

    <van-field id="temp5" style="line-height:8vw"  v-model="temp5" type="number" label="总金额" placeholder="请输入总金额" @blur="switch5==false & temp5 != '' ?changeSwitch('switch5'):''"/>
  </div>

  <van-button type="primary" round  size="normal" style="width:30vw;margin:0 0 4vh 35vw" @click="addOptionalSpending(tempName,temp1,false,temp3,temp4,temp5,todayTime.getFullYear(),todayTime.getMonth())">提交</van-button>
</van-popup>


</div>
</template>


<script>
// iconfont引入用法（2/2)
import "../assets/font_2356633_61czw08nnlw/iconfont.css";
import { Component, Vue } from "vue-property-decorator";
import { Switch,Cell,Collapse, CollapseItem, Icon, Progress, ActionSheet, Toast, Popup,DropdownItem,DropdownMenu, Field, Button, RadioGroup, Radio } from 'vant';

Vue.use(Button);Vue.use(Field);Vue.use(Switch);Vue.use(Cell);Vue.use(Collapse);Vue.use(CollapseItem);Vue.use(Icon);Vue.use(Progress);Vue.use(ActionSheet);Vue.use(Popup);Vue.use(DropdownMenu);Vue.use(DropdownItem);Vue.use(RadioGroup);Vue.use(Radio);

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
      wishList: [],
      activeNames: [],
      colorStyle:{
        "checked":"green",
        "circle":"",
        "clear":"red",
        "aim":"",
      },

      show: false,
      tempId:'',
      tempName:'',
      actions: [
        { name: '待定',icon: "circle" }, 
        { name: '执行中...',icon: "aim" }, 
        { name: '完成',icon: "checked" }, 
        { name: '取消',icon: "clear" }
      ],
      show: false,
      value: 'unfinished',
      option: [
        { text: '全部心愿', value: 'all' },
        { text: '未完成', value: 'unfinished' },
        { text: '进行中', value: 'aim' },
        { text: '考虑中', value: 'circle' },
        { text: '已实现', value: 'checked' },
        { text: '已放弃', value: 'clear' },
      ],
      switch1: false,
      switch2: false,

      addWishShow: false,
      wishName:'',
      wishPrice:'',
      addOptionalSpendingShow: false,

      temp1 : 'oneTime',
      temp2 : 'true',
      temp3 : '',
      temp4 : '',
      temp5 : '',
      // temp6 : '',
      // temp7 : '',
      // temp8 : '',
      // temp9 : '',
      // temp10 : '',
      switch3: false,
      switch4: false,
      switch5: true,
      // 时间锁
      switch6: false,
    };
  },
  methods: {
    // A2
    addOptionalSpending(temp11,temp12,temp13,temp14,temp15,temp16,y,m){
      // 做了本地化处理

      m++;
      if(m < 10){
        m = '0' + m;
      }
      let ym = String(y) + String(m);

      if(!temp11){
        Toast('请输入开支名');
        // document.querySelector('#temp11').focus();
      }else if(temp12 == false & !temp14){
        Toast("请输入每期金额")
        document.querySelector('#temp3').focus();
      }else if(temp12 == false & !temp15){
        Toast('请输入期数');
        document.querySelector('#temp4').focus();
      }else if(!temp16){
        Toast('请输入总金额');
        document.querySelector('#temp5').focus();
      }else{
        let tempInExData = JSON.parse(localStorage.inExData);
        tempInExData["optionalSpendingList"].push({
          name:temp11,
          period:temp12,
          sustainable:temp13,
          payment:temp14,
          price:temp16,
          y:y,m:m,
          payList: {[''+y+m]:temp14},
          status: temp12 == 'oneTime' || temp15 == 1 ? 'finish' : 'going',
        });
        Toast("添加成功!");
        this.optionalSpendingList = tempInExData["optionalSpendingList"];
        this.optionalSpending = updateOptionalSpending(ym,this.optionalSpendingList)
        localStorage.inExData = JSON.stringify(tempInExData);
        this.temp11='';
        this.temp12='oneTime';
        this.temp13='true';
        this.temp14='';
        this.temp15='';
        this.temp16='';
        this.addOptionalSpendingShow = false;
        this.switch3 = 'false';
        this.switch4 = 'false';
        this.switch5 = 'false';

        this.tempName = '';
        // 改变显示状态
        for (const i in this.wishList) {
          if(this.wishList[i]['id'] == this.tempId){
            this.wishList[i]['status'] = 'aim';
          }
        };
        localStorage.wishList = JSON.stringify(this.wishList);
      };

    },
    changeSwitch(tempSwitch){
      if(this[tempSwitch] == false){
        this[tempSwitch] = true;
      }else if(this[tempSwitch] == true){
        this[tempSwitch] = false;
      }
    },
    changeIcon: function(status,key,id){
      // console.log("-----------");
      for (const i in this.wishList) {
        if(this.wishList[i]['id'] == id){
          if(status == "circle"){
            this.wishList[i][key] = "checked";
          }else if(status == "checked"){
            this.wishList[i][key] = "clear";
          }else if(status == "clear"){
            this.wishList[i][key] = "circle";
          }else{
            this.wishList[i][key] = "circle";
          }
        }
      }
      localStorage.wishList = JSON.stringify(this.wishList);
    },
    onCancel() {
      Toast('取消');
    },
    showPopup(e) {
      this[e] = true;
    },
    // A1
    onSelect(item) {
      // 可以通过 close-on-click-action 属性开启自动收起
      // 传入的item是actions里的其中选中项
      Toast(item.name);

      // addOptionalSpending(temp11,temp12,temp13,temp14,temp15,temp16,y,m)
      if(item.icon == 'aim'){
        this.addOptionalSpendingShow = true;
        this.temp1 = 'month';
        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++
      }else if(item.icon == 'checked'){
        this.addOptionalSpendingShow = true;
        this.temp1 = 'oneTime';
        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++
      }else{
        for (const i in this.wishList) {
          if(this.wishList[i]['id'] == this.tempId){
            this.wishList[i]['status'] = item.icon;
          }
        };
        localStorage.wishList = JSON.stringify(this.wishList);
      };
      this.show = false;
    },
    onConfirm() {
      this.$refs.item.toggle();
    },
    addWish(name,price){
      let tempWishList = JSON.parse(localStorage.wishList);
      let tempUserData = JSON.parse(localStorage.userData);
      tempUserData.wishId += 1;
      tempWishList.push({
        id:tempUserData.wishId,
        status:"circle",
        name:name,
        price:price,
        payment:[],
        addDate:this.todayTime,
        finishDate:'',
        ps:'',
        noWaste:"circle",
        saveTime:"circle",
        saveMoney:"circle",
      });
      this.addWishShow = false;
      this.wishName = '';
      this.wishPrice = '';

      localStorage.userData = JSON.stringify(tempUserData);
      localStorage.wishList = JSON.stringify(tempWishList);
      this.wishList = JSON.parse(localStorage.wishList);
      Toast('添加成功！')
    },
    // 这里的脚本可以在html render时调用
    formatLongDate (date,type=0) {
      // date = new Date(parseInt(new Date().getTime()));
      date = new Date(date);

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
    },
  },
  watch:{
    temp3(newval,val){
      // 每期金额
      if(this.switch6 == false){
        if(this.switch4 == true && this.switch5 == false){
          this.temp5 = this.temp4 * newval == 0 ? '' : this.temp4 * newval;
        }else if(this.switch5 == true && this.switch4 == false){
          this.temp4 = Math.ceil(this.temp5 / newval) == 0 ? '' : Math.ceil(this.temp5 / newval);
        }else if(this.temp4 != '' & this.temp5 != ''){
          this.temp4 = Math.ceil(this.temp5 / newval) == 0 ? '' : Math.ceil(this.temp5 / newval);
        }
        this.switch6 = true;
        setTimeout(() => {
          this.switch6 = false;
        }, 20);
      };
      if(newval == ''){
        this.switch3 = false;
      }
    },
      
    temp4(newval,val){
      // 期数
      if(this.switch6 == false){
        if(this.switch3 == true && this.switch5 == false){
          this.temp5 = this.temp3 * newval == 0 ? '' : this.temp3 * newval;
        }else if(this.switch5 == true && this.switch3 == false){
          this.temp3 = Math.ceil(this.temp5 / newval) == 0 ? '' : Math.ceil(this.temp5 / newval);
        }else if(this.temp3 != '' & this.temp5 != ''){
          this.temp3 = Math.ceil(this.temp5 / newval) == 0 ? '' : Math.ceil(this.temp5 / newval);
        }
        this.switch6 = true;
        setTimeout(() => {
          this.switch6 = false;
        }, 20);
      };
      if(newval == ''){
        this.switch4 = false;
      }
    },
      
    temp5(newval,val){
      // 总金额
      if(this.switch6 == false){
        if(this.switch3 == true && this.switch4 == false){
          this.temp4 = Math.ceil(newval / this.temp3) == 0 ? '' : Math.ceil(newval / this.temp3);
        }else if(this.switch4 == true && this.switch3 == false){
          this.temp3 = Math.ceil(newval / this.temp4) == 0 ? '' : Math.ceil(newval / this.temp4);
        }else if(this.temp3 != '' & this.temp4 != ''){
          this.temp4 = Math.ceil(newval / this.temp3) == 0 ? '' : Math.ceil(newval / this.temp3);
        }
        this.switch6 = true;
        setTimeout(() => {
          this.switch6 = false;
        }, 20);
      };
      if(newval == ''){
        this.switch5 = false;
      }
    },
  },
  computed: {
    evenWishList(){
      if(this.value == 'all'){
        let a = this.wishList.filter((val) => {return val.status === 'aim'});
        a = a.concat(this.wishList.filter((val) => {return val.status === 'circle'}));
        a = a.concat(this.wishList.filter((val) => {return val.status === 'checked'}));
        a = a.concat(this.wishList.filter((val) => {return val.status === 'clear'}));
        return a;
      }else if(this.value == 'unfinished'){
        let a = this.wishList.filter((val) => {return val.status === 'aim'});
        a = a.concat(this.wishList.filter((val) => {return val.status === 'circle'}));
        return a;
      }else{
        return this.wishList.filter((val) => {
          return val.status === this.value
        })
      }
      
    }
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
    if(!localStorage.wishList){
      localStorage.wishList = JSON.stringify([
        {
          id:0,
          status:"checked",
          name:"电脑11111111111111111111",
          price:5000,
          payment:1000,
          addDate:"Thu Mar 11 2021 11:48:06 GMT+0800 (中国标准时间)",
          finishDate:"Thu Mar 11 2021 11:48:06 GMT+0800 (中国标准时间)",
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
          addDate:"Thu Mar 11 2021 11:48:06 GMT+0800 (中国标准时间)",
          finishDate:"Thu Mar 11 2021 11:48:06 GMT+0800 (中国标准时间)",
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
          addDate:"Thu Mar 11 2021 11:48:06 GMT+0800 (中国标准时间)",
          finishDate:"Thu Mar 11 2021 11:48:06 GMT+0800 (中国标准时间)",
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
          addDate:"Thu Mar 11 2021 11:48:06 GMT+0800 (中国标准时间)",
          finishDate:"Thu Mar 11 2021 11:48:06 GMT+0800 (中国标准时间)",
          ps:0,
          noWaste:"clear",
          saveTime:"clear",
          saveMoney:"clear",
        }
      ])
    };
    if(!tempUserData.wishId){
      tempUserData.wishId = 3;
      localStorage.userData = JSON.stringify(tempUserData);
    }

    this.wishList = JSON.parse(localStorage.wishList);
    // 更新显示balance、budjet
    this.balance = calcBalance(tempBillData,y,m,d);


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
    console.log("updated",this.activeNames);
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  },
  destroyed() {
    console.log("destroyed");
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
.wishList{
  min-height: calc(100vh - 20vw);
}

#header {
  width: 100%;
  height: 20vw;
  background-color: bisque;
}

.van-collapse-item__content{
  color:#666;
}

.red{
  color: red;
}
.green{
  color: green;
}

.van-switch__node{
  font-size: unset;
}
</style>