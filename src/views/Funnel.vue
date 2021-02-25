<template>
  <div class="funnel" id="funnel" @click="closePopup($event)">
    <!-- <h1>This is an funnel page</h1> -->
    <div id="header">
      <div style="width:20vw;"></div>
      <div style="width:60vw;">记账漏斗——{{time.getFullYear()}}-{{time.getMonth()}}</div>
      <div style="width:20vw;"></div>
    </div>

    <van-collapse v-model="activeNames">
      <van-collapse-item name="1">
        <template #title>
          <div style="display:flex">
            <div style="width:40%">收入</div>
            <div style="width:30%"></div>
            <div style="width:20%;">{{Number(fixedSalary)+Number(fixedRentIncome)+Number(otherSalary)+Number(otherIncome)}}</div>
          </div>
        </template>

        <!-- 稳定收入 -->
        <div style="display:flex;align-content:center;justify-content:center">
          <div style="width:40%">固定工资</div>
          <div style="width:20%"></div>
          <div id="switch11" style="width:40%">
            <!-- 原始样式 -->
            <div :style="{display: switch11 == 'true' ? 'none' : 'flex'}">
              <div style="width:90%">{{fixedSalary}}</div>
              <van-icon style="align-self:center" @click="switch11 = 'true'" name="edit" />
            </div>
            <!-- 改数值样式 -->
            <div style="justify-content:space-around;align-items:center;" :style="{display: switch11 == 'true'  ? 'flex' : 'none'}">
              <van-button style="height:100%" size="small" type="danger" @click="switch11 = 'false'">x</van-button>
              <input style="width:50%;height:100%" type="number" name="" id="" :placeholder='fixedSalary' v-model="tempFixedSalary">
              <van-button style="height:100%" size="small" type="primary" @click="switch11 = 'false';changeIncome('fixedSalary',tempFixedSalary,time.getFullYear(),time.getMonth())">√</van-button>
            </div>
          </div>
        </div>

        <!-- 租金收入 -->
        <div style="display:flex;align-content:center;justify-content:center">
          <div style="width:40%">租金收入</div>
          <div style="width:20%"></div>
          <div id="switch12" style="width:40%">
            <!-- 原始样式 -->
            <div :style="{display: switch12 == 'true' ? 'none' : 'flex'}">
              <div style="width:90%">{{fixedRentIncome}}</div>
              <van-icon style="align-self:center" @click="switch12 = 'true'" name="edit" />
            </div>
            <!-- 改数值样式 -->
            <div style="justify-content:space-around;align-items:center;" :style="{display: switch12 == 'true'  ? 'flex' : 'none'}">
              <van-button style="height:100%" size="small" type="danger" @click="switch12 = 'false'">x</van-button>
              <input style="width:50%;height:100%" type="number" name="" id="" :placeholder='fixedRentIncome' v-model="tempFixedRentIncome">
              <van-button style="height:100%" size="small" type="primary" @click="switch12 = 'false';changeIncome('fixedRentIncome',tempFixedRentIncome,time.getFullYear(),time.getMonth())">√</van-button>
            </div>
          </div>
        </div>

        <!-- <div>波动收入（投资、交易、奖金、回扣）</div> -->
        <div style="display:flex;align-content:center;justify-content:center">
          <div style="width:40%">绩效/奖金</div>
          <div style="width:20%"></div>
          <div id="switch13" style="width:40%">
            <!-- 原始样式 -->
            <div :style="{display: switch13 == 'true' ? 'none' : 'flex'}">
              <div style="width:90%">{{otherSalary}}</div>
              <van-icon style="align-self:center" @click="switch13 = 'true'" name="edit" />
            </div>
            <!-- 改数值样式 -->
            <div style="justify-content:space-around;align-items:center;" :style="{display: switch13 == 'true'  ? 'flex' : 'none'}">
              <van-button style="height:100%" size="small" type="danger" @click="switch13 = 'false'">x</van-button>
              <input style="width:50%;height:100%" type="number" name="" id="" :placeholder='otherSalary' v-model="tempOtherSalary">
              <van-button style="height:100%" size="small" type="primary" @click="switch13 = 'false';changeIncome('otherSalary',tempOtherSalary,time.getFullYear(),time.getMonth())">√</van-button>
            </div>
          </div>
        </div>

        <!-- 自定义添加的收入 -->
        <div v-for="item,index in otherIncomeList">
          <van-swipe-cell>
            <div style="display:flex">
              <div style="width:40%">{{item.incomeName}}</div>
              <div style="width:30%"></div>
              <div style="width:20%">{{item.incomeNumber}}</div>
              <div style="width:10%"><van-icon id="billList" class="iconfont" class-prefix='icon' name='left' /></div>
            </div>
            <template #right>
              <van-button @click="delIncome(index,time.getFullYear(),time.getMonth())" square text="删除" type="danger" class="delete-button" />
            </template>
          </van-swipe-cell>
        </div>

        <!-- 增加按钮 -->
        <div style="display:flex">
          <div style="width:35%"></div>
          <van-button style="width:30%" @click="showPopup('addIncomeShow')">+添加</van-button>
        </div>
      </van-collapse-item>


      <van-collapse-item name="2">
        <template #title>
          <div style="display:flex">
            <div style="width:40%">必要开支</div>
            <div style="width:30%"></div>
            <div style="width:20%">-1000</div>
          </div>
        </template>

        <div v-for="item,index in necessarySpending">
          <van-swipe-cell>
            <div style="display:flex">
              <div style="width:40%">{{item.name}}</div>
              <div style="width:30%"></div>
              <div style="width:20%">{{item.payment}}</div>
              <div style="width:10%"><van-icon id="billList" class="iconfont" class-prefix='icon' name='left' /></div>
            </div>
            <template #right>
              <van-button @click="delIncome(index,time.getFullYear(),time.getMonth())" square text="删除" type="danger" class="delete-button" />
            </template>
          </van-swipe-cell>
        </div>

        
        <div style="display:flex">
          <div style="width:35%"></div>
          <van-button style="width:30%" @click="showPopup('addNecessarySpendingShow')">+添加</van-button>
          <p>还要写：1.增2.删3.改(怎样借一个开关用？)</p>
        </div>
      </van-collapse-item>

      <van-collapse-item name="3">
        <template #title>
          <div style="display:flex">
            <div style="width:40%"></div>
            <div style="width:30%"></div>
            <div style="width:20%">={{Number(fixedSalary)+Number(fixedRentIncome)+Number(otherSalary)+Number(otherIncome)-1000}}</div>
          </div>
          <div style="display:flex">
            <div style="width:40%">可选开支</div>
            <div style="width:30%"></div>
            <div style="width:20%">-1000</div>
          </div>
          
          
        </template>
        <div>投资开支</div>
        <div style="display:flex">
          <div style="width:35%"></div>
          <van-button style="width:30%">+添加</van-button>
        </div>
      </van-collapse-item>

      <van-collapse-item name="4">
        <template #title>
          <div style="display:flex">
            <div style="width:40%"></div>
            <div style="width:30%"></div>
            <div style="width:20%">={{Number(fixedSalary)+Number(fixedRentIncome)+Number(otherSalary)+Number(otherIncome)-1000-1000}}</div>
          </div>
          <div style="display:flex">
            <div style="width:40%">自由支配开支</div>
            <div style="width:30%"></div>
            <div style="width:20%">-1000</div>
          </div>
          <!-- <div style="display:flex">
            <div style="width:40%"></div>
            <div style="width:30%"></div>
            <div style="width:20%">{{Number(fixedSalary)+Number(fixedRentIncome)+Number(otherSalary)+Number(otherIncome)-1000-1000-1000}}</div>
          </div> -->
          
        </template>
        <div>天天记账/心愿清单的范畴</div>
      </van-collapse-item>
    </van-collapse>

    <br>

    <div>剩余资产={{Number(fixedSalary)+Number(fixedRentIncome)+Number(otherSalary)+Number(otherIncome)-1000-1000-1000}}</div>
    


    <!-- 添加收入的弹窗 -->
    <van-popup v-model="addIncomeShow" position="bottom" :style="{ 
      height: '28vh',
      'justify-content': 'space-between',
      display: addIncomeShow ? 'flex' : 'none',
      'flex-direction': 'column'}">
      <div style="background-color:#f1f1f1;padding:1.5vh">添加收入项目</div>
      <!-- 输入框 -->
      <div>
        <!-- 输入任意文本 -->
        <van-field style="line-height:8vw" v-model="incomeName" label="收入来源" placeholder="请输入来源"  />
        <!-- 允许输入正整数，调起纯数字键盘 -->
        <!-- <van-field v-model="digit" type="digit" label="整数" placeholder="请输入用户名"  /> -->
        <!-- 允许输入数字，调起带符号的纯数字键盘 -->
        <van-field style="line-height:8vw"  v-model="incomeNumber" type="number" label="金额" placeholder="请输入金额"  />
      </div>
      <van-button type="primary" round  size="normal" style="width:30vw;margin:0 0 4vh 35vw" @click="addIncome(incomeName,incomeNumber,time.getFullYear(),time.getMonth())">提交</van-button>
    </van-popup>



    <!-- 添加必要开支的弹窗 -->
    <van-popup v-model="addNecessarySpendingShow" position="bottom" :style="{ 
      height: '70vh',
      'justify-content': 'space-between',
      display: 'flex',
      'flex-direction': 'column' }">
      <div style="background-color:#f1f1f1;padding:1.5vh">添加必要开支</div>
      <!-- 输入框 -->
      <div>
        <!-- 输入任意文本 -->
        <div>
          <van-button class="tag" @click="temp1 = '房贷'">房贷</van-button>
          <van-button class="tag" @click="temp1 = '房租'">房租</van-button>
          <van-button class="tag" @click="temp1 = '车贷'">车贷</van-button>
          <van-button class="tag" @click="temp1 = '保费'">保费</van-button>
          <van-button class="tag" @click="temp1 = '分期'">分期</van-button>
          <van-button class="tag" @click="temp1 = '耗材基金'">耗材基金</van-button>
          <van-button class="tag" @click="temp1 = '净水滤芯'">净水滤芯</van-button>
          <van-button class="tag" @click="temp1 = '空气滤芯'">空气滤芯</van-button>
        </div>
        <van-field style="height:10vw;line-height:10vw" v-model="temp1" label="支出项目" placeholder="请输入支出项目名"  />

        <van-field name="radio" label="缴费周期" style="line-height:10vw;height:10vw">
          <template #input>
            <van-radio-group v-model="temp2" direction="horizontal">
              <van-radio name="month">月缴</van-radio>
              <van-radio name="year">年缴</van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <van-field name="radio" label="是否永续" style="line-height:10vw;height:10vw">
          <template #input>
            <van-radio-group v-model="temp3" direction="horizontal">
              <van-radio name="true">永续</van-radio>
              <van-radio name="false">有限期</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        
        
        <van-field style="line-height:8vw"  v-model="temp4" type="number" label="每期金额" placeholder="请输入每期金额" @blur="switch15=='false' & temp4 != '' ?changeSwitch('switch15'):''" />
        <van-field style="line-height:8vw"  v-model="temp5" type="digit" label="期数" placeholder="请输入期数"  :style="{display:temp3 == 'true'? 'none' : ''}" @blur="switch16=='false' & temp5 != '' ?changeSwitch('switch16'):''" />
        <van-field style="line-height:8vw"  v-model="temp6" type="number" label="总金额" placeholder="请输入总金额"  :style="{display:temp3 == 'true'? 'none' : ''}" @blur="switch17=='false' & temp6 != '' ?changeSwitch('switch17'):''" />
        
        
      </div>
      <van-button type="primary" round  size="normal" style="width:30vw;margin:0 0 4vh 35vw" @click="addNecessarySpending(temp1,temp2,temp3,temp4,temp5,time.getFullYear(),time.getMonth())">提交</van-button>

      
    </van-popup>
    
  </div>
  
  
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import { Collapse, CollapseItem, Popup, Field, Button, Toast, SwipeCell, Form, Radio, RadioGroup } from 'vant';

Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Form);
Vue.use(Toast);
Vue.use(Button);
Vue.use(Field);
Vue.use(Popup);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(SwipeCell);

export default {
  name: "funnel",
  // 数据父传子
  props: {
    msg: {
      type: String,
      default: "test msg",
    },
  },
  data() {
    return {
      activeNames: ["2","3","4"],
      todayTime: 0,
      time:0,
      fixedSalary:1,
      tempFixedSalary:'',
      fixedRentIncome:1,
      tempFixedRentIncome:'',
      // otherFixedIncome:1,
      otherSalary:1,
      tempOtherSalary:'',
      otherIncome:1,
      otherIncomeList:[],

      necessarySpending:[],
      optionalSpending:[],
      investSpending:1000,
      freedomSpending:100,
      remainAsset:1000,
      
      addIncomeShow: false,
      addNecessarySpendingShow: true,
      incomeName: '',
      incomeNumber: '',
      switch11:'false',
      switch12:'false',
      switch13:'false',

      switch14:'false',

      switch15:'false',
      switch16:'false',
      switch17:'false',

      switch18:'false',
      switch19:'false',

      temp1:'',
      temp2:'month',
      temp3:'false',
      temp4:'',
      temp5:'',
      temp6:'',
      radio: '1',
    };
  },
  methods: {
    showPopup(item) {
      // this.addIncomeShow = true;
      this[item] = true;
    },
    addIncome(name,number,y,m){
      if(!name){
        Toast('请输入收入来源');
      }else if(!number){
        Toast('请输入金额');
      }else{
        let tempInExData = JSON.parse(localStorage.inExData);
        tempInExData["monthData"][y][m]["otherIncomeList"].push({incomeName:name,incomeNumber:number});

        tempInExData["monthData"][y][m]["otherIncome"] += Number(number);
        this.otherIncome = tempInExData["monthData"][y][m]["otherIncome"];
        this.otherIncomeList = tempInExData["monthData"][y][m]["otherIncomeList"];
        localStorage.inExData = JSON.stringify(tempInExData);
        this.addIncomeShow = false;
        this.incomeName = '';
        this.incomeNumber = '';
      };
    },
    delIncome(index,y,m){
      let tempInExData = JSON.parse(localStorage.inExData);
      tempInExData["monthData"][y][m]["otherIncome"] -= tempInExData["monthData"][y][m]["otherIncomeList"][index].incomeNumber;
      tempInExData["monthData"][y][m]["otherIncomeList"].splice(index,1);
      console.log(index);
      this.otherIncome = tempInExData["monthData"][y][m]["otherIncome"];
      this.otherIncomeList = tempInExData["monthData"][y][m]["otherIncomeList"];
      localStorage.inExData = JSON.stringify(tempInExData)
    },
    addNecessarySpending(temp1,temp2,temp3,temp4,temp5,y,m){
      if(!temp1){
        Toast('请输入开支名');
      }else if(!temp4){
        Toast('请输入总金额');
      }else if(temp3 == 'false' & !temp5){
        Toast('请输入每期金额');
      }else{
        let tempInExData = JSON.parse(localStorage.inExData);
        tempInExData["monthData"][y][m]["necessarySpending"].push({name:temp1,sustainable:temp3,interval:temp2,price:temp4,payment:temp5,y:y,m:m});

        console.log('------',tempInExData["monthData"][y][m]["necessarySpending"]);
        this.necessarySpending = tempInExData["monthData"][y][m]["necessarySpending"];

        console.log('-00000--');
        localStorage.inExData = JSON.stringify(tempInExData);
        this.temp1='';
        this.temp2='month';
        this.temp3='false';
        this.temp4='';
        this.temp5='';
        this.temp6='';
        this.addNecessarySpendingShow = true;
        this.switch15 = 'false';
        this.switch16 = 'false';
        this.switch17 = 'false';
        // console.log(this.switch15,this.switch16,this.switch17);
      };
    },
    delNecessarySpending(index,y,m){
      let tempInExData = JSON.parse(localStorage.inExData);
      tempInExData["monthData"][y][m]["otherIncome"] -= tempInExData["monthData"][y][m]["otherIncomeList"][index].incomeNumber;
      tempInExData["monthData"][y][m]["otherIncomeList"].splice(index,1);
      console.log(index);
      this.otherIncome = tempInExData["monthData"][y][m]["otherIncome"];
      this.otherIncomeList = tempInExData["monthData"][y][m]["otherIncomeList"];
      localStorage.inExData = JSON.stringify(tempInExData)
    },
    addOptionalSpending(name,number,y,m){
      if(!name){
        Toast('请输入收入来源');
      }else if(!number){
        Toast('请输入金额');
      }else{
        let tempInExData = JSON.parse(localStorage.inExData);
        tempInExData["monthData"][y][m]["otherIncomeList"].push({incomeName:name,incomeNumber:number});

        tempInExData["monthData"][y][m]["otherIncome"] += Number(number);
        this.otherIncome = tempInExData["monthData"][y][m]["otherIncome"];
        this.otherIncomeList = tempInExData["monthData"][y][m]["otherIncomeList"];
        localStorage.inExData = JSON.stringify(tempInExData);
        this.addIncomeShow = false;
        this.incomeName = '';
        this.incomeNumber = '';
      };
    },
    delOptionalSpending(index,y,m){
      let tempInExData = JSON.parse(localStorage.inExData);
      tempInExData["monthData"][y][m]["otherIncome"] -= tempInExData["monthData"][y][m]["otherIncomeList"][index].incomeNumber;
      tempInExData["monthData"][y][m]["otherIncomeList"].splice(index,1);
      console.log(index);
      this.otherIncome = tempInExData["monthData"][y][m]["otherIncome"];
      this.otherIncomeList = tempInExData["monthData"][y][m]["otherIncomeList"];
      localStorage.inExData = JSON.stringify(tempInExData)
    },
    changeIncome(item,tempFixedSalary,y,m){
      if(tempFixedSalary){
        console.log(item,tempFixedSalary,y,m);
        this[item] = tempFixedSalary;
        this['temp'+item.charAt(0).toUpperCase()+item.slice(1)] = '';
        let tempInExData = JSON.parse(localStorage.inExData);
        tempInExData["monthData"][y][m][item] = tempFixedSalary;
        localStorage.inExData = JSON.stringify(tempInExData);
      }else(
        Toast("!!!")
      )
    },
    closePopup(event){
      // console.log(event);
      // 点击其他地方，关闭临时窗口

      if(this.switch11 == "true"){    
        //以外的区域
        let btn = document.querySelector("#switch11");
        if(!btn.contains(event.target)){
          this.switch11 = false;
        }
      }
    },
    changeSwitch(tempSwitch){
      if(this[tempSwitch] == 'false'){
        this[tempSwitch] = 'true';
      }else if(this[tempSwitch] == 'true'){
        this[tempSwitch] = 'false';
      }
      console.log('++++++++',tempSwitch,this[tempSwitch]);

      // 第一次赋值
      // if(this.switch14 == 'false'){
      //   if(this.temp5 != '' & this.temp6 == '' & this.switch15 == 'true'){
      //     this.temp6 = this.temp5 * this.temp4;
      //   }else if(this.temp5 == '' & this.temp6 != '' & this.switch15 == 'true'){
      //     this.temp5 = Math.ceil(this.temp6 / this.temp4);
      //   }

      //   this.switch14 = 'true';
      //   setTimeout(() => {
      //     this.switch14 = 'false';
      //   }, 20);
      // }

      // if(this.switch14 == 'false'){
      //   if(this.temp4 != '' & this.temp6 == '' & this.switch16 == 'true'){
      //     this.temp6 = this.temp4 * this.temp5;
      //   }else if(this.temp4 == '' & this.temp6 != '' & this.switch16 == 'true'){
      //     this.temp4 = Math.ceil(this.temp6 / this.temp5);
      //   }

      //   this.switch14 = 'true';
      //   setTimeout(() => {
      //     this.switch14 = 'false';
      //   }, 20);
      // }

      // if(this.switch14 == 'false'){
      //   if(this.temp4 != '' & this.temp5 == '' & this.switch17 == 'true'){
      //     this.temp5 = Math.ceil(this.temp6 / this.temp4);
      //   }else if(this.temp4 == '' & this.temp5 != '' & this.switch17 == 'true'){
      //     this.temp4 = Math.ceil(this.temp6 / this.temp5);
      //   }

      //   this.switch14 = 'true';
      //   setTimeout(() => {
      //     this.switch14 = 'false';
      //   }, 20);
      // }
    },
    // changeSwitch111(tempSwitch,status=''){
    //   console.log("------前------",tempSwitch,this[tempSwitch]);
    //   if(status == 'true' || status == 'false'){
    //     this[tempSwitch] = status;
    //     console.log(1);
    //   }else if(this[tempSwitch] == 'false'){
    //     this[tempSwitch] = 'true';
    //     console.log(2);
    //   }else if(this[tempSwitch] == 'true'){
    //     this[tempSwitch] = 'false';
    //     console.log(3);
    //   }
      
    //   console.log(tempSwitch,this[tempSwitch]);
    // }
  },
  
  watch:{
    temp4(newval,val){
      // 每期金额
      if(this.switch14 == 'false'){
        if(this.switch16 == 'true' && this.switch17 == 'false'){
          this.temp6 = this.temp5 * newval == 0 ? '' : this.temp5 * newval;
        }else if(this.switch17 == 'true' && this.switch16 == 'false'){
          this.temp5 = Math.ceil(this.temp6 / newval) == 0 ? '' : Math.ceil(this.temp6 / newval);
        }else if(this.temp5 != '' & this.temp6 != ''){
          this.temp5 = Math.ceil(this.temp6 / newval) == 0 ? '' : Math.ceil(this.temp6 / newval);
        }

        this.switch14 = 'true';
        setTimeout(() => {
          this.switch14 = 'false';
        }, 20);
      };
      console.log('+++++++newval:',newval);
      if(newval == ''){
        this.switch15 = 'false';
        console.log('++++++++','switch15',this.switch15);
      }
    },
      
    temp5(newval,val){
      // 期数
      if(this.switch14 == 'false'){
        if(this.switch15 == 'true' && this.switch17 == 'false'){
          this.temp6 = this.temp4 * newval == 0 ? '' : this.temp4 * newval;
        }else if(this.switch17 == 'true' && this.switch15 == 'false'){
          this.temp4 = Math.ceil(this.temp6 / newval) == 0 ? '' : Math.ceil(this.temp6 / newval);
        }else if(this.temp4 != '' & this.temp6 != ''){
          this.temp4 = Math.ceil(this.temp6 / newval) == 0 ? '' : Math.ceil(this.temp6 / newval);
        }

        this.switch14 = 'true';
        setTimeout(() => {
          this.switch14 = 'false';
        }, 20);
      };
      console.log('+++++++newval:',newval);
      if(newval == ''){
        this.switch16 = 'false';
        console.log('++++++++','switch16',this.switch16);
      }
    },
      
    temp6(newval,val){
      // 总金额
      if(this.switch14 == 'false'){
        if(this.switch15 == 'true' && this.switch16 == 'false'){
          this.temp5 = Math.ceil(newval / this.temp4) == 0 ? '' : Math.ceil(newval / this.temp4);
        }else if(this.switch16 == 'true' && this.switch15 == 'false'){
          this.temp4 = Math.ceil(newval / this.temp5) == 0 ? '' : Math.ceil(newval / this.temp5);
        }else if(this.temp4 != '' & this.temp5 != ''){
          this.temp5 = Math.ceil(newval / this.temp4) == 0 ? '' : Math.ceil(newval / this.temp4);
        }

        this.switch14 = 'true';
        setTimeout(() => {
          this.switch14 = 'false';
        }, 20);
      };
      console.log('+++++++newval:',newval);
      if(newval == ''){
        this.switch17 = 'false';
        console.log('++++++++','switch17',this.switch17);
      }
    }
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
    this.todayTime = new Date(parseInt(new Date().getTime()))
    let y = this.todayTime.getFullYear();
    let m = this.todayTime.getMonth();

    this.time = this.todayTime;
    let yy = this.todayTime.getFullYear();
    let mm = this.todayTime.getMonth();

    // 不存在就新建
    if(!localStorage.inExData){
      localStorage.inExData = JSON.stringify({
        monthData:{[y]:{[m]:{
          fixedSalary:5000,
          fixedRentIncome:1,
          // otherFixedIncome:2,
          otherSalary:7,
          otherIncome:0,
          otherIncomeList:[],
          necessarySpending:[
            {name:"房贷",sustainable:'false',interval:'month',price:7654321,payment:50000,times:10,y:2021,m:1},
            {name:"车贷",sustainable:'false',interval:'year',price:54321,payment:3000,times:10,y:2021,m:1},
            {name:"房租",sustainable:'true',interval:'month',price:0,payment:2000,times:10,y:2021,m:1},
            {name:"净水滤芯",sustainable:'true',interval:'year',price:0,payment:500,times:10,y:2021,m:1},
          ],
          optionalSpending:[],
          investSpending:1000,
          freedomSpending:100,
          remainAsset:1000,
        }}},
        // userData:{
        //   fixedSalary:5000,
        //   fixedRentIncome:0,
        //   otherFixedIncome:0,
        // },
        itemData:{}
      });
    }
    let tempInExData = JSON.parse(localStorage.inExData);
    // let tempFixedSalary = tempInExData.userData.fixedSalary

    // 读取月度数据显示出来
    this.fixedSalary = tempInExData["monthData"][y][m]["fixedSalary"]
    this.fixedRentIncome = tempInExData["monthData"][y][m]["fixedRentIncome"]
    this.otherFixedIncome = tempInExData["monthData"][y][m]["otherFixedIncome"]
    this.otherSalary = tempInExData["monthData"][y][m]["otherSalary"]
    this.otherIncome = tempInExData["monthData"][y][m]["otherIncome"]
    this.otherIncomeList = tempInExData["monthData"][y][m]["otherIncomeList"]
    this.necessarySpending = tempInExData["monthData"][y][m]["necessarySpending"]
    // 读取心愿清单数据显示出来


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



</script>

<style lang="css">
#header {
  width: 100%;
  height: 15vw;
  background-color: bisque;
  line-height: 15vw;
  display: flex;
}

.van-collapse-item__content{
  line-height: 10vw;
}
.goods-card {
  margin: 0;
  background-color: @white;
}

.delete-button {
  height: 100%;
  line-height: 100%;
}

.van-field__label{
  display: flex;
  justify-content: center;
}

.van-radio__label{
  line-height: 100%;
  font-size: 100%;
}

.van-field__label{
  line-height: 100%;
  align-items: center;
}

.van-field__value{
  align-items: center;
  line-height: 100%;
  display: flex;
}

.van-field__body{
  line-height: 100%;
  font-size: 100%;
}

.tag{
  margin:1vw;
  height: 8vw;
}
</style>