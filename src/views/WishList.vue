<template>
<div class="wishList">
<div id="header">
  <div style="height:5vw"></div>
  <div style="height:15vw;line-height:15vw">心愿清单</div>
</div>

<!-- 导航条 -->
<div style="display:flex;">
  <van-dropdown-menu style="width:75vw">
    <!-- 1 -->
    <van-dropdown-item v-model="value" :options="option" @change="activeNames=[]"/>
    <!-- 2 -->
    <!-- <van-dropdown-item title="筛选?" ref="item">
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
    </van-dropdown-item> -->
  </van-dropdown-menu>
  <!-- 3 -->
  <div style="display:flex;width:25vw;align-self:center;justify-content:center">
    <div style="width:15vw;height:8vw;line-height:8vw;background-color:#fff;border-radius:5vw;" @click="showPopup('addWishShow')">
      +添加
    </div>
  </div>
</div>

<!-- 主体 -->
<van-collapse v-model="activeNames">
  <!-- evenWishList是computed里监听的 -->
  <van-collapse-item :name="index"  v-for="(item, index) in evenWishList">
    <!-- title栏 -->
    <template #title>
      <div style="display:flex;flex-direction:row">
        <!-- 状态 -->
        <div style="width:8vw">
          <van-icon :name=item.status :class=colorStyle[item.status] @click.stop="chooseWish(item)" />
        </div>
        <!-- 心愿名字 -->
        <div style="width:36vw;overflow:hidden;white-space:nowrap;margin:0 6vw 0 2vw;font-size:3vw;">{{ item.name }}</div>
        <!-- 价格进度 -->
        <div style="width:30vw;display:flex;flex-direction:row;white-space:nowrap;border:2px solid #ccc"
        :style="{
          display: sumList(item.payList) != 0 && item.status != 'checked' ? 'unset' : 'none',
        }">
          <div style="background-color:#aaffaa;height:100%;float:left;position:relative"
          :style="{
            width : 30*( sumList(item.payList)/item.price) + 'vw',
          }">
          </div>
          <div style="width:30vw;position:absolute;font-size:3vw;">
            {{ sumList(item.payList) }}/{{ item.price }}
          </div>
        </div>
        <!-- 价格 -->
        <div style="width:30vw;font-size:3vw;"
          :style="{
            display: sumList(item.payList) != 0 && item.status != 'checked' ? 'none' : 'unset',
          }">
            ￥{{ item.price }}
        </div>
      </div>
    </template>
    
    <!-- 折叠内容 -->
    <!-- 1 -->
    <div style="display:flex;background-color:#fff;border-bottom:1px solid #eee">
      <div style="margin:0 5vw;font-size:3vw;">
        添加日期:
        <br>
        {{ formatLongDate(item.addDate,1) }}
      </div>
      <div style="font-size:3vw;"
      :style="{
        display: item.status == 'clear' || item.status == 'checked' ? 'unset' : 'none',
      }">
        完成日期:
        <br>
        {{ formatLongDate(item.finishDate,1) }}
      </div> 
    </div>
    <!-- 2 -->
    <div style="margin:2vw 0 0 0">
      <span style="font-size:3vw;" @click="changeIcon(item.saveMoney,'saveMoney',item.id)">
        <van-icon :name=item.saveMoney :class=colorStyle[item.saveMoney] />
        省钱？
      </span>
      <span style="font-size:3vw;" @click="changeIcon(item.noWaste,'noWaste',item.id)">
        <van-icon :name=item.noWaste :class=colorStyle[item.noWaste] />
        不浪费？
      </span>
      <span style="font-size:3vw;" @click="changeIcon(item.saveTime,'saveTime',item.id)">
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
<van-popup v-model="addWishShow" position="bottom" style="height:40vh;justify-content:space-between;flex-direction:column;" 
:style="{ 
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
<van-popup v-model="achieveWishShow" position="bottom" style="height:65vh;justify-content:space-between;flex-direction: column;" :style="{
  display: achieveWishShow ? 'flex' : 'none',
}">
  <div style="background-color:#f1f1f1;padding:1.5vh">实现心愿(可选开支)</div>

  <!-- 输入框 -->
  <div>
    <!-- 输入任意文本 -->
    <van-field id="" style="line-height:8vw" v-model="tempName" label="支出项目" placeholder="请输入支出项目名" />

    <van-field name="radio1" label="缴费周期" style="line-height:8vw;" disabled>
      <template #input>
        <van-radio-group v-model="temp1" direction="horizontal" disabled>
          <van-radio name="oneTime">一次性</van-radio>
          <van-radio name="month">每月</van-radio>
        </van-radio-group>
      </template>
    </van-field>

    <van-field id="temp3" style="line-height:8vw"  v-model="temp3" type="number" label="每期金额" placeholder="请输入每期金额" @blur="switch3==false & temp3 != '' ?changeSwitch('switch3'):''" :style="{display: temp1 == 'oneTime' ? 'none' : ''}" />

    <van-field id="temp4" style="line-height:8vw"  v-model="temp4" type="digit" label="期数" placeholder="请输入期数"  :style="{display: temp1 == 'oneTime'? 'none' : ''}" @blur="switch4==false & temp4 != '' ?changeSwitch('switch4'):''" />

    <van-field id="temp5" style="line-height:8vw"  v-model="temp5" type="number" label="待付金额" placeholder="请输入待付金额" @blur="switch5==false & temp5 != '' ?changeSwitch('switch5'):''"/>

    <van-field id="temp7" style="line-height:8vw"  v-model="temp7" type="number" label="已付金额" placeholder="" :readonly=true disabled/>

    <van-field id="temp6" style="line-height:8vw"  v-model="temp6" type="number" label="总金额" placeholder="请输入总金额" />
  </div>

  <van-button type="primary" round  size="normal" style="width:30vw;margin:0 0 4vh 35vw" @click="achieveWish(tempName,temp1,temp3,temp4,temp5,todayTime.getFullYear(),todayTime.getMonth())">提交</van-button>
</van-popup>


</div>
</template>


<script>
import { Component, Vue } from "vue-property-decorator";
import commonjs from '../store/common';
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
      todayTime: 0,
      wishList: {},
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
        { name: '先放着想想看',icon: "circle" }, 
        { name: '分期实现心愿',icon: "aim" }, 
        { name: '直接实现心愿',icon: "checked" }, 
        { name: '忍痛放弃',icon: "clear" }
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
      achieveWishShow: false,

      temp1 : 'oneTime',
      temp2 : 'true',
      temp3 : '',
      temp4 : '',
      temp5 : '',
      temp6 : '',
      temp7 : '',
      temp8 : '',
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
    // A1
    chooseWish(item){
      this.show = true;
      this.tempId = item.id;
      this.tempName = item.name;
      console.log('+++',item,item.payList);

      let a = 0;
      for(const i in item.payList){
        a += Number(item.payList[i]);
        console.log(item.payList[i],a);
      }
      this.temp7 = a;
      this.temp6 = item.price;
      this.temp5 = Number(this.temp6) - Number(this.temp7);
    },
    // A2
    onSelect(item) {
      // 可以通过 close-on-click-action 属性开启自动收起
      // 传入的item是actions里的其中选中项
      Toast(item.name);

      if(item.icon == 'aim'){
        this.achieveWishShow = true;
        this.temp1 = 'month';
        this.temp8 = item.icon;
        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // 是否需要增加暂停状态
      }else if(item.icon == 'checked'){
        this.achieveWishShow = true;
        this.temp1 = 'oneTime';
        this.temp8 = item.icon;
      }else{
        for (const i in this.wishList['list']) {
          if(this.wishList['list'][i]['id'] == this.tempId){
            this.wishList['list'][i]['status'] = item.icon;
          }
        };
        this.wishList.data.updateDate = new Date(parseInt(new Date().getTime()));
        localStorage.wishList = JSON.stringify(this.wishList);
        this.$root.bus.$emit("wishListSwitch", true);
      };
      this.show = false;
    },
    // A3
    achieveWish(tempName,temp1,temp3,temp4,temp5,y,m){
      m++;
      if(m < 10){m = '0' + m;}
      let ym = String(y) + String(m);

      if(!tempName){
        Toast('请输入开支名');
        document.querySelector('#temp1').focus();
      }else if(temp1 == false & !temp3){
        Toast("请输入每期金额");
        document.querySelector('#temp3').focus();
      }else if(temp1 == false & !temp4){
        Toast('请输入期数');
        document.querySelector('#temp4').focus();
      }else if(!temp5){
        Toast('请输入待付金额');
        document.querySelector('#temp5').focus();
      }else{
        // 改变状态
        for (const i in this.wishList['list']) {
          if(this.wishList['list'][i]['id'] == this.tempId){
            this.wishList['list'][i]['name'] = tempName;
            this.wishList['list'][i]['payment'] = Number(temp3);
            this.wishList['list'][i]['price'] = Number(temp5);
            if(!this.wishList['list'][i]['payList'][ym]){
              if(temp3 == ''){
                this.wishList['list'][i]['payList'][ym] = Number(temp5);
              }else{
                this.wishList['list'][i]['payList'][ym] = Number(temp3);
              }
            }else{
              if(temp3 == ''){
                this.wishList['list'][i]['payList'][ym] += Number(temp5);
              }else{
                this.wishList['list'][i]['payList'][ym] += Number(temp3);
              }
            };
            this.wishList['list'][i]['status'] = this.temp8;
            if(this.temp8 == 'checked'){
              this.wishList['list'][i]['finishDate'] = this.todayTime;
            }
          }
        };
        this.wishList.data.updateDate = new Date(parseInt(new Date().getTime()));
        localStorage.wishList = JSON.stringify(this.wishList);
        this.$root.bus.$emit("wishListSwitch", true);

        Toast("添加请求发送成功!");
        
        this.achieveWishShow = false;
        this.switch3 = 'false';
        this.switch4 = 'false';
        this.switch5 = 'false';

        this.tempName = '';
        this.temp3 = '';
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
      for (const i in this.wishList['list']) {
        if(this.wishList['list'][i]['id'] == id){
          if(status == "circle"){
            this.wishList['list'][i][key] = "checked";
          }else if(status == "checked"){
            this.wishList['list'][i][key] = "clear";
          }else if(status == "clear"){
            this.wishList['list'][i][key] = "circle";
          }else{
            this.wishList['list'][i][key] = "circle";
          }
        }
      };
      this.wishList.data.updateDate = new Date(parseInt(new Date().getTime()));
      localStorage.wishList = JSON.stringify(this.wishList);
      this.$root.bus.$emit("wishListSwitch", true);
    },
    onCancel() {
      Toast('取消');
    },
    showPopup(e) {
      this[e] = true;
    },
    onConfirm() {
      this.$refs.item.toggle();
    },
    addWish(name,price){
      let wishList = JSON.parse(localStorage.wishList);
      // 后面可改用uuid来设置独立id+++++++++++++++++
      wishList.data.wishId += 1;
      wishList['list'].push({
        id:wishList.data.wishId,
        status:"circle",
        name:name,
        price:Number(price),
        payment:0,
        payList:{},
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

      wishList.data.updateDate = new Date(parseInt(new Date().getTime()));
      localStorage.wishList = JSON.stringify(wishList);
      this.wishList = wishList;
      this.$root.bus.$emit("wishListSwitch", true);
      Toast('添加请求发送成功！')
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
    sumList(list){
      let a = 0;
      for(const i in list){
        a += Number(list[i]);
      }
      return a;
    }
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
        this.temp6 = Number(this.temp7) + Number(newval);

        this.switch6 = true;
        setTimeout(() => {
          this.switch6 = false;
        }, 20);
      };
      if(newval == ''){
        this.switch5 = false;
      }
    },

    temp6(newval,val){
      if(this.switch6 == false){
        this.temp5 = Number(newval) - Number(this.temp7);

        // this.switch6 = true;
        // setTimeout(() => {
        //   this.switch6 = false;
        // }, 20);
      }
      
    },
  },
  computed: {
    evenWishList(){
      if(this.value == 'all'){
        let a = this.wishList['list'].filter((val) => {return val.status === 'aim'});
        a = a.concat(this.wishList['list'].filter((val) => {return val.status === 'circle'}));
        a = a.concat(this.wishList['list'].filter((val) => {return val.status === 'checked'}));
        a = a.concat(this.wishList['list'].filter((val) => {return val.status === 'clear'}));
        return a;
      }else if(this.value == 'unfinished'){
        let a = this.wishList['list'].filter((val) => {return val.status === 'aim'});
        a = a.concat(this.wishList['list'].filter((val) => {return val.status === 'circle'}));
        return a;
      }else{
        return this.wishList['list'].filter((val) => {
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
    // let y = this.todayTime.getFullYear();
    // let m = this.todayTime.getMonth();
    // let d = this.todayTime.getDate();
    this.wishList = JSON.parse(localStorage.wishList);

    // 检测wishListDownload的变化状态
    this.$root.bus.$on("wishListDownload",(t)=>{
      console.log("wishListDownload触发成功,值为：",t);
      this.wishList = JSON.parse(localStorage.wishList);
    });
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

</script>

<style lang="css" scoped>
*{
  margin: 0;
  padding: 0;
  font-size: 4vw;
}
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

.van-field__label{
  text-align: center;
}
</style>