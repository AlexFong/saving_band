<template>
<div class="funnel" id="funnel" @click="closePopup($event)">
<!-- <h1>This is an funnel page</h1> -->
<div id="header">
  <div style="height:5vw"></div>
  <div style="height:15vw">
    <!-- <div style="width:20vw;"></div> -->
    <div style="margin:0 20vw;width:60vw;line-height:15vw;display:flex;justify-content:center;align-items:center">
      <button style="border:none;background-color:unset" @click="changeTime(-1)"><van-icon class="iconfont fontSize7vw" class-prefix='icon' name='left' /></button>
      <div @click="changeTime(0)">{{time.getFullYear()}}-{{time.getMonth()+1}}</div>
      <van-icon class="iconfont fontSize7vw" class-prefix='icon' name='accountbook' />
      <button style="border:none;background-color:unset" @click="changeTime(1)"><van-icon class="iconfont fontSize7vw" class-prefix='icon' name='right' /></button>
    </div>
    <!-- <div style="width:20vw;"></div> -->
  </div>
  
</div>

<div id="body">
  <van-collapse v-model="activeNames">
    
    <!-- 1 -->
    <van-collapse-item name="1">
      <template #title>
        <div style="display:flex">
          <div style="width:40%">本月收入</div>
          <div style="width:30%"></div>
          <div style="width:20%;">
            {{Number(fixedSalary)+fixedRentIncome+otherSalary+otherIncome}}
            <!-- {{fixedSalary?Number(fixedSalary):Number(0)+fixedRentIncome?fixedRentIncome:0+otherSalary?otherSalary:0+otherIncome?otherIncome:0}} -->
          </div>
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
            <van-button style="height:100%" size="small" type="danger" @click="switch11 = 'false';tempFixedSalary = ''">x</van-button>
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
            <van-button style="height:100%" size="small" type="danger" @click="switch12 = 'false';tempFixedRentIncome = ''">x</van-button>
            <input style="width:50%;height:100%" type="number" name="" id="" :placeholder='fixedRentIncome' v-model="tempFixedRentIncome">
            <van-button style="height:100%" size="small" type="primary" @click="switch12 = 'false';changeIncome('fixedRentIncome',tempFixedRentIncome,time.getFullYear(),time.getMonth())">√</van-button>
          </div>
        </div>
      </div>

      <!-- 绩效/奖金-->
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
            <van-button style="height:100%" size="small" type="danger" @click="switch13 = 'false';tempOtherSalary = ''">x</van-button>
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

      <!-- 添加按钮 -->
      <div style="display:flex">
        <div style="width:35%"></div>
        <van-button style="width:30%" @click="showPopup('addIncomeShow')">+添加</van-button>
      </div>
    </van-collapse-item>

    <!-- 2 -->
    <van-collapse-item name="2">
      <template #title>
        <div style="display:flex">
          <div style="width:40%">必要开支</div>
          <div style="width:30%"></div>
          <div style="width:20%">-{{necessarySpending}}</div>
        </div>
        <div style="display:flex">
          <div style="width:40%"></div>
          <div style="width:30%"></div>
          <div style="width:20%">={{Number(fixedSalary)+Number(fixedRentIncome)+Number(otherSalary)+Number(otherIncome)-Number(necessarySpending)}}</div>
        </div>
      </template>

      <div v-for="item,index in necessarySpendingList">
        <van-swipe-cell>
          <div :id="'necessarySpending'+index" style="display:flex">
            <div style="width:40%">{{item.name}}</div>
            <div style="width:20%"></div>
            <div style="width:40%">
              <!-- 原始样式 -->
              <div :style="{display: necessarySpendingListSwitch[index].switch == 'true' ? 'none' : 'flex'}">
                <div style="width:90%" @click="necessarySpendingListSwitch[index].switch = 'true'">
                  {{ item.payList[formatLongDate(time,2)] ? item.payList[formatLongDate(time,2)] : 0 }}
                </div>
                <van-icon id="billList" style="width:10%" class="iconfont" class-prefix='icon' name='left' />
                <!-- <van-icon style="align-self:center" name="edit" /> -->
              </div>
              <!-- 改数值样式 -->
              <div style="justify-content:space-around;align-items:center;" :style="{display: necessarySpendingListSwitch[index].switch == 'true'  ? 'flex' : 'none'}">
                <van-button style="height:100%" size="small" type="danger" @click="necessarySpendingListSwitch[index].switch = 'false';temp8 = ''">x</van-button>
                <input style="width:50%;height:100%" type="number" name="" id="" :placeholder='item.payList[formatLongDate(time,2)]' v-model="temp8">
                <van-button style="height:100%" size="small" type="primary" @click="necessarySpendingListSwitch[index].switch = 'false';changeNecessarySpendingPay(index,temp8,formatLongDate(time,2))">√</van-button>
              </div>
            </div>
          </div>
          <template #right>
            <van-button @click="delNecessarySpending(index,formatLongDate(time,2))" square text="*删除*" type="danger" class="delete-button" />
            <!-- <van-button @click="" square text="*编辑*" type="primary" class="delete-button" /> -->
          </template>
        </van-swipe-cell>
      </div>

      
      <div style="display:flex">
        <div style="width:35%"></div>
        <van-button style="width:30%" @click="showPopup('addNecessarySpendingShow')">+添加</van-button>
        <!-- <van-button style="width:30%" @click="showPopup('addNecessarySpendingShow')">*明细*</van-button> -->
      </div>
      <!-- <p>还要写：编辑改动</p> -->
    </van-collapse-item>

    <!-- 3 -->
    <van-collapse-item name="3">
      <template #title>
        <div style="display:flex">
          <div style="width:40%">可选开支</div>
          <div style="width:30%"></div>
          <div style="width:20%">-{{optionalSpending}}</div>
        </div>
        <div id="" style="display:flex">
          <div style="width:40%"></div>
          <div style="width:20%"></div>
          <div style="width:40%">={{Number(fixedSalary)+Number(fixedRentIncome)+Number(otherSalary)+Number(otherIncome)-Number(necessarySpending)-optionalSpending}}</div>
        </div>
      </template>

      <div v-for="item,index in optionalSpendingList">
        <van-swipe-cell>
          <div :id="'optionalSpending'+index" style="display:flex">
            <div style="width:40%">{{item.name}}</div>
            <div style="width:20%"></div>
            <div style="width:40%">
              <!-- 原始样式 -->
              <div :style="{display: optionalSpendingListSwitch[index].switch == 'true' ? 'none' : 'flex'}">
                <div style="width:90%" @click="optionalSpendingListSwitch[index].switch = 'true'">
                  {{item.payList[formatLongDate(time,2)] ? item.payList[formatLongDate(time,2)] : 0}}
                </div>
                <van-icon id="billList" style="width:10%" class="iconfont" class-prefix='icon' name='left' />
                <!-- <van-icon style="align-self:center" name="edit" /> -->
              </div>
              <!-- 改数值样式 -->
              <div style="justify-content:space-around;align-items:center;" :style="{display: optionalSpendingListSwitch[index].switch == 'true'  ? 'flex' : 'none'}">
                <van-button style="height:100%" size="small" type="danger" @click="optionalSpendingListSwitch[index].switch = 'false';temp17 = ''">x</van-button>
                <input style="width:50%;height:100%" type="number" name="" id="" :placeholder='item.payList[formatLongDate(time,2)]' v-model="temp17">
                <van-button style="height:100%" size="small" type="primary" @click="optionalSpendingListSwitch[index].switch = 'false';changeOptionalSpendingPay(index,temp17,formatLongDate(time,2))">√</van-button>
              </div>
            </div>
          </div>
          <template #right>
            <van-button @click="delOptionalSpending(index,formatLongDate(time,2))" square text="删除" type="danger" class="delete-button" />
            <van-button @click="" square text="*编辑*" type="primary" class="delete-button" />
          </template>
        </van-swipe-cell>
      </div>

      <div style="display:flex">
        <div style="width:35%"></div>
        <van-button style="width:30%"  @click="showPopup('addOptionalSpendingShow')">+添加</van-button>
      </div>
    </van-collapse-item>

    <!-- 4 -->
    <van-collapse-item name="4">
      <template #title>
        <div id="" style="display:flex">
          <div style="width:40%">日常开支</div>
          <div style="width:20%"></div>
          <div style="width:40%">-{{monthCost}}/-{{monthBudjet}}</div>
        </div>
      </template>
      <div style="display:flex">
        <div style="width:40%">本月开支</div>
        <div style="width:20%"></div>
        <div style="width:40%">{{monthCost}}</div>
      </div>
      <div style="display:flex">
        <div style="width:40%">本月预算</div>
        <div style="width:20%"></div>
        <div style="width:40%">{{monthBudjet}}</div>
      </div>
      <div style="display:flex">
        <div style="width:40%">历史累计余额</div>
        <div style="width:20%"></div>
        <div style="width:40%">{{balance}}</div>
      </div>
    </van-collapse-item>

    <!-- 5 -->
    <van-collapse-item name="5">
      <template #title>
        <div id="" style="display:flex">
          <div style="width:40%;color:black">本月剩余资产</div>
          <div style="width:20%;color:black"></div>
          <div style="width:40%;color:black">={{Number(fixedSalary)+Number(fixedRentIncome)+Number(otherSalary)+Number(otherIncome)-Number(necessarySpending)-Number(optionalSpending)-monthCost}}/{{Number(fixedSalary)+Number(fixedRentIncome)+Number(otherSalary)+Number(otherIncome)-Number(necessarySpending)-Number(optionalSpending)-monthBudjet}}</div>
        </div>
      </template>
      <div style="display:flex">
        <div style="width:40%">实际剩余资产</div>
        <div style="width:20%"></div>
        <div style="width:40%">{{Number(fixedSalary)+Number(fixedRentIncome)+Number(otherSalary)+Number(otherIncome)-Number(necessarySpending)-Number(optionalSpending)-monthCost}}</div>
      </div>
      <div style="display:flex">
        <div style="width:40%">预计剩余资产</div>
        <div style="width:20%"></div>
        <div style="width:40%">{{Number(fixedSalary)+Number(fixedRentIncome)+Number(otherSalary)+Number(otherIncome)-Number(necessarySpending)-Number(optionalSpending)-monthBudjet}}</div>
      </div>
    </van-collapse-item>
    
    <br>
    <div style="color:#ccc">------月/总分割线------</div>
    <br>
    <!-- <van-divider dashed :style="{borderColor: '#aaa', padding: '0 16px' }"></van-divider> -->

    <!-- 6 -->
    <van-collapse-item name="6" style="padding-top:1vw">
      <template #title>
        <div id="" style="display:flex">
          <div style="width:40%;color:black">上期剩余资产</div>
          <div style="width:20%;color:black"></div>
          <div style="width:40%;color:black">{{addUpAsset}}</div>
        </div>
        <!-- <div id="" style="display:flex;opacity:0">
          <div style="width:40%;color:black">嘿嘿</div>
          <div style="width:20%;color:black"></div>
          <div style="width:40%;color:black"></div>
        </div> -->
        <div id="" style="display:flex">
          <div style="width:40%;color:black">总资产合计</div>
          <div style="width:20%;color:black"></div>
          <div style="width:40%;color:black">={{addUpAsset+fixedSalary+fixedRentIncome+otherSalary+otherIncome-necessarySpending-Number(optionalSpending)-monthCost}}/{{addUpAsset+fixedSalary+fixedRentIncome+otherSalary+otherIncome-necessarySpending-Number(optionalSpending)-monthBudjet}}</div>
        </div>
      </template>
      <div style="display:flex">
        <div style="width:40%">实际剩余资产</div>
        <div style="width:20%"></div>
        <div style="width:40%">{{addUpAsset+Number(fixedSalary)+fixedRentIncome+otherSalary+otherIncome-necessarySpending-optionalSpending-monthCost}}</div>
      </div>
      <div style="display:flex">
        <div style="width:40%">预计剩余资产</div>
        <div style="width:20%"></div>
        <div style="width:40%">{{addUpAsset+Number(fixedSalary)+Number(fixedRentIncome)+Number(otherSalary)+Number(otherIncome)-Number(necessarySpending)-Number(optionalSpending)-monthBudjet}}</div>
      </div>
    </van-collapse-item>
    
  </van-collapse>

  <br>
  <div>
  </div>


  <!-- 1、添加收入的弹窗 -->
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


  <!-- 2、添加必要开支的弹窗 -->
  <van-popup v-model="addNecessarySpendingShow" position="bottom" :style="{ 
    height: '60vh',
    'justify-content': 'space-between',
    display: addNecessarySpendingShow ? 'flex' : 'none',
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
      <van-field id="temp1" style="height:10vw;line-height:10vw" v-model="temp1" label="支出项目" placeholder="请输入支出项目名"  />

      <van-field name="radio1" label="缴费周期" style="line-height:10vw;height:10vw">
        <template #input>
          <van-radio-group v-model="temp2" direction="horizontal">
            <van-radio name="month">月缴</van-radio>
            <van-radio name="year">年缴</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-popover v-model="showPopover" trigger="click" style="width:100%"
      :style="{
        display:temp2 == 'year' ? 'unset' : 'none',
      }">
        <van-grid
          clickable
          column-num="3"
          :border=true
          style="width: 60vw;height: 50vw;"
        >
          <van-grid-item
            v-for="i in 12"
            :key="i"
            :text="String(i)"
            @click="showPopover = false,temp7 = i"
          />
        </van-grid>
        <template #reference>
          <van-field id="temp7" style="line-height:8vw"  v-model="temp7" type="number" label="支出月份" placeholder="请选择支出月份" :readonly=true />
        </template>
      </van-popover>

      <van-field name="radio2" label="是否永续" style="line-height:10vw;height:10vw">
        <template #input>
          <van-radio-group v-model="temp3" direction="horizontal">
            <van-radio name="true">永续</van-radio>
            <van-radio name="false">有限期</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      
      <van-field id="temp4" style="line-height:8vw"  v-model="temp4" type="number" label="每期金额" placeholder="请输入每期金额" @blur="switch15=='false' & temp4 != '' ?changeSwitch('switch15'):''" />

      <van-field id="temp5" style="line-height:8vw"  v-model="temp5" type="digit" label="期数" placeholder="请输入期数"  :style="{display:temp3 == 'true'? 'none' : ''}" @blur="switch16=='false' & temp5 != '' ?changeSwitch('switch16'):''" />

      <van-field id="temp6" style="line-height:8vw"  v-model="temp6" type="number" label="总金额" placeholder="请输入总金额"  :style="{display:temp3 == 'true'? 'none' : ''}" @blur="switch17=='false' & temp6 != '' ?changeSwitch('switch17'):''" />
      
      
    </div>
    <van-button type="primary" round  size="normal" style="width:30vw;margin:0 0 4vh 35vw" @click="addNecessarySpending(temp1,temp2,temp3,temp4,temp5,temp6,temp7,time.getFullYear(),time.getMonth())">提交</van-button>

    
  </van-popup>


  <!-- 3、添加可选开支的弹窗 -->
  <van-popup v-model="addOptionalSpendingShow" position="bottom" :style="{ 
    height: '60vh',
    'justify-content': 'space-between',
    display: addOptionalSpendingShow ? 'flex' : 'none',
    'flex-direction': 'column' }">
    <div style="background-color:#f1f1f1;padding:1.5vh">添加可选开支</div>

    <!-- 输入框 -->
    <div>
      <!-- 输入任意文本 -->
      <div>
        <van-button class="tag" @click="temp11 = '投资'">投资</van-button>
        <van-button class="tag" @click="temp11 = '旅游'">旅游</van-button>
        <van-button class="tag" @click="temp11 = '社交'">社交</van-button>
        <van-button class="tag" @click="temp11 = '学习'">学习</van-button>
        <van-button class="tag" @click="temp11 = '会员'">会员</van-button>
        <van-button class="tag" @click="temp11 = '电器'">电器</van-button>
        <van-button class="tag" @click="temp11 = '电子产品'">电子产品</van-button>
        <van-button class="tag" @click="temp11 = '手机'">手机</van-button>
      </div>
      <van-field id="temp11" style="height:10vw;line-height:10vw" v-model="temp11" label="支出项目" placeholder="请输入支出项目名"  />

      <van-field name="radio3" label="缴费周期" style="line-height:10vw;height:10vw">
        <template #input>
          <van-radio-group v-model="temp12" direction="horizontal">
            <van-radio name="oneTime">一次性</van-radio>
            <van-radio name="month">每月</van-radio>
          </van-radio-group>
        </template>
      </van-field>


      <van-field name="radio4" label="是否永续" style="line-height:10vw;height:10vw" :style="{
        display:temp12 == 'month' ? '' : 'none',
      }">
        <template #input>
          <van-radio-group v-model="temp13" direction="horizontal">
            <van-radio name="true">持续每月</van-radio>
            <van-radio name="false">有限期</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      
      <van-field id="temp14" style="line-height:8vw"  v-model="temp14" type="number" label="每期金额" placeholder="请输入每期金额" @blur="switch18=='false' & temp14 != '' ?changeSwitch('switch18'):''" />

      <van-field id="temp15" style="line-height:8vw"  v-model="temp15" type="digit" label="期数" placeholder="请输入期数"  :style="{display: temp12 == 'oneTime' || temp13 == 'true'? 'none' : ''}" @blur="switch19=='false' & temp15 != '' ?changeSwitch('switch19'):''" />

      <van-field id="temp16" style="line-height:8vw"  v-model="temp16" type="number" label="总金额" placeholder="请输入总金额"  :style="{display: temp12 == 'oneTime' || temp13 == 'true'? 'none' : ''}" @blur="switch20=='false' & temp16 != '' ?changeSwitch('switch20'):''" />
      
      
    </div>

    <van-button type="primary" round  size="normal" style="width:30vw;margin:0 0 4vh 35vw" @click="addOptionalSpending(temp11,temp12,temp13,temp14,temp15,temp16,time.getFullYear(),time.getMonth())">提交</van-button>

    
  </van-popup>

  </div>
</div>
  
  
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import { Collapse, CollapseItem, Popup, Field, Button, Toast, SwipeCell, Form, Radio, RadioGroup, Popover, Grid, GridItem, Divider, Icon } from 'vant';

Vue.use(Radio);Vue.use(RadioGroup);Vue.use(Form);Vue.use(Toast);Vue.use(Button);Vue.use(Field);Vue.use(Popup);Vue.use(Popover);Vue.use(Collapse);Vue.use(CollapseItem);Vue.use(SwipeCell);Vue.use(Grid);Vue.use(GridItem);Vue.use(Divider);Vue.use(Icon);

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
      activeNames: [],
      todayTime: 0,
      time:0,

      fixedSalary:0,
      tempFixedSalary:'',
      fixedRentIncome:0,
      tempFixedRentIncome:'',
      otherSalary:0,
      tempOtherSalary:'',
      otherIncome:0,
      otherIncomeList:[],
      addIncomeShow: false,
      incomeName: '',
      incomeNumber: '',
      switch11:'false',
      switch12:'false',
      switch13:'false',

      
      temp1:'',
      temp2:'month',
      temp3:'true',
      temp4:'',
      temp5:'',
      temp6:'',
      temp7:'',
      temp8:'',
      showPopover: false,
      // 14是时间锁
      switch14:'false',
      switch15:'false',
      switch16:'false',
      switch17:'false',
      necessarySpending:'',
      necessarySpendingList:[],
      addNecessarySpendingShow: false,
      necessarySpendingListSwitch:[],

      temp11:'',
      temp12:'oneTime',
      temp13:'true',
      temp14:'',
      temp15:'',
      temp16:'',
      temp17:'',
      showPopover11: false,
      switch18:'false',
      switch19:'false',
      switch20:'false',
      optionalSpending:'',
      optionalSpendingList:[],
      addOptionalSpendingShow: false,
      optionalSpendingListSwitch:[],

      balance:0,
      monthCost:0,
      monthBudjet:0,
      addUpAsset:0,

    };
  },
  methods: {
    showPopup(item) {
      // this.addIncomeShow = true;
      this[item] = true;
    },
    addIncome(name,number,y,m){
      // 这里的m的逻辑跟后面的不一样，有点混乱
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
      this.otherIncome = tempInExData["monthData"][y][m]["otherIncome"];
      this.otherIncomeList = tempInExData["monthData"][y][m]["otherIncomeList"];
      localStorage.inExData = JSON.stringify(tempInExData)
    },
    // changeIncome针对写死的几个部分
    changeIncome(item,tempFixedSalary,y,m){
      if(tempFixedSalary){
        this[item] = tempFixedSalary;
        this['temp'+item.charAt(0).toUpperCase()+item.slice(1)] = '';
        let tempInExData = JSON.parse(localStorage.inExData);
        tempInExData["monthData"][y][m][item] = tempFixedSalary;
        localStorage.inExData = JSON.stringify(tempInExData);
      }else(
        Toast("!!!")
      )
    },
    addNecessarySpending(temp1,temp2,temp3,temp4,temp5,temp6,temp7,y,m){
      m++;
      if(m < 10){
        m = '0' + m;
      }
      let ym = String(y) + String(m);

      if(!temp1){
        Toast('请输入开支名');
        document.querySelector('#temp1').focus();
      }else if(temp2 == 'year' & !temp7){
        Toast("请选择支出月份")
        document.querySelector('#temp7').click();
      }else if(!temp4){
        Toast("请输入每期金额")
        document.querySelector('#temp4').focus();
      }else if(temp3 == 'false' & !temp5){
        Toast('请输入期数');
        document.querySelector('#temp5').focus();
      }else if(temp3 == 'false' & !temp6){
        Toast('请输入总金额');
        document.querySelector('#temp6').focus();
      }else{
        let tempInExData = JSON.parse(localStorage.inExData);
        tempInExData["necessarySpendingList"].push({
          name:temp1,
          interval:temp2,
          sustainable:temp3,
          payment:temp4,
          price:temp6,
          payMonth:temp7,
          y:y,m:m,
          payList: temp2 == 'year' && temp7 != m+1 ? 
            {} : {[''+y+m]:temp4},
          status: temp5 == 1 && (temp2 == 'month' || temp2 == 'year' && temp7 != m+1)? 'finish' : 'going',
        });

        Toast("添加成功!");
        this.necessarySpendingList = tempInExData["necessarySpendingList"];
        this.necessarySpending = updateNecessarySpending(ym,this.necessarySpendingList);
        this.necessarySpendingListSwitch.push({switch: "false"});
        localStorage.inExData = JSON.stringify(tempInExData);
        this.temp1='';
        this.temp2='month';
        this.temp3='true';
        this.temp4='';
        this.temp5='';
        this.temp6='';
        this.temp7='';
        this.addNecessarySpendingShow = false;
        this.switch15 = 'false';
        this.switch16 = 'false';
        this.switch17 = 'false';
      };
    },
    delNecessarySpending(index,ym){
      let tempInExData = JSON.parse(localStorage.inExData);
      tempInExData["necessarySpendingList"].splice(index,1);
      this.necessarySpendingList = tempInExData["necessarySpendingList"];
      this.necessarySpending = updateNecessarySpending(ym,this.necessarySpendingList);
      localStorage.inExData = JSON.stringify(tempInExData)
    },
    changeNecessarySpendingPay(index,temp,ym){
      if(temp){
        // console.log(index,temp,ym);
        this.necessarySpendingList[index].payList[ym] = temp;
        let tempInExData = JSON.parse(localStorage.inExData);
        tempInExData["necessarySpendingList"][index].payList[ym] = temp;
        localStorage.inExData = JSON.stringify(tempInExData);
        // console.log(JSON.parse(localStorage.inExData));
        
        this.temp8 = '';
        this.necessarySpending = updateNecessarySpending(ym,this.necessarySpendingList);
      }
    },
    changeOptionalSpendingPay(index,temp,ym){
      if(temp){
        this.optionalSpendingList[index].payList[ym] = temp;
        let tempInExData = JSON.parse(localStorage.inExData);
        tempInExData["optionalSpendingList"][index].payList[ym] = temp;
        localStorage.inExData = JSON.stringify(tempInExData);
        
        this.temp17 = '';
        this.optionalSpending = updateOptionalSpending(ym,this.optionalSpendingList);
      }
    },
    addOptionalSpending(temp11,temp12,temp13,temp14,temp15,temp16,y,m){
      m++;
      if(m < 10){
        m = '0' + m;
      }
      let ym = String(y) + String(m);

      if(!temp11){
        Toast('请输入开支名');
        document.querySelector('#temp11').focus();
      }else if(!temp14){
        Toast("请输入每期金额")
        document.querySelector('#temp14').focus();
      }else if(temp13 == 'false' & !temp15){
        Toast('请输入期数');
        document.querySelector('#temp15').focus();
      }else if(temp13 == 'false' & !temp16){
        Toast('请输入总金额');
        document.querySelector('#temp16').focus();
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
          status: temp12 == 'oneTime' || temp15 == 1 ? 'finish' : 'going'});
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
        this.switch18 = 'false';
        this.switch19 = 'false';
        this.switch20 = 'false';
      };
    },
    delOptionalSpending(index,ym){
      let tempInExData = JSON.parse(localStorage.inExData);
      tempInExData["optionalSpendingList"].splice(index,1);
      this.optionalSpendingList = tempInExData["optionalSpendingList"];
      this.noptionalSpending = updateOptionalSpending(ym,this.optionalSpendingList);
      localStorage.inExData = JSON.stringify(tempInExData)
    },
    closePopup(event){
      // console.log(event);
      // 点击其他地方，关闭临时窗口

      if(this.switch11 == "true"){    
        //以外的区域
        let btn = document.querySelector("#switch11");
        if(!btn.contains(event.target)){
          this.switch11 = false;
          this.tempFixedSalary = '';
        }
      }
      if(this.switch12 == "true"){    
        //以外的区域
        let btn = document.querySelector("#switch12");
        if(!btn.contains(event.target)){
          this.switch12 = false;
          this.tempFixedRentIncome = '';
        }
      }
      if(this.switch13 == "true"){    
        //以外的区域
        let btn = document.querySelector("#switch13");
        if(!btn.contains(event.target)){
          this.switch13 = false;
          this.tempOtherSalary = '';
        }
      }

      for (const i in this.necessarySpendingListSwitch) {
        if (this.necessarySpendingListSwitch[i].switch == "true") {
          let btn = document.querySelector("#necessarySpending" + i);
          if(!btn.contains(event.target)){
            this.necessarySpendingListSwitch[i].switch = false;
            this.temp8 = '';
          }
        }
      }
      for (const i in this.optionalSpendingListSwitch) {
        if (this.optionalSpendingListSwitch[i].switch == "true") {
          let btn = document.querySelector("#optionalSpending" + i);
          if(!btn.contains(event.target)){
            this.optionalSpendingListSwitch[i].switch = false;
            this.temp17 = '';
          }
        }
      }


    },
    changeSwitch(tempSwitch){
      if(this[tempSwitch] == 'false'){
        this[tempSwitch] = 'true';
      }else if(this[tempSwitch] == 'true'){
        this[tempSwitch] = 'false';
      }
      // console.log('++++++++',tempSwitch,this[tempSwitch]);

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
    cl(i){
      console.log(i);
    },
    // HTML里面要调用
    formatLongDate (date,type=0) {
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
    changeTime (index){
      let y = this.time.getFullYear();
      let m = this.time.getMonth();
      let d = this.time.getDate();
      let yy = this.todayTime.getFullYear();
      let mm = this.todayTime.getMonth();
      let dd = this.todayTime.getDate();

      if(index == 1 || index == -1){   // 加减月份
        this.time=new Date(parseInt(new Date(y,m+1+index,0,'23','59','59').getTime()));
        if(this.time.getMonth() == this.todayTime.getMonth() & this.time.getFullYear() == this.todayTime.getFullYear()){
          this.time = this.todayTime;
        }
      }else if(index == 0){   // 回到现在
        this.time = this.todayTime;
      }else{    //设置日期，这里还没写
        this.time = new Date(parseInt(index.setDate(index.getDate())));
      }
      y = this.time.getFullYear();
      m = this.time.getMonth();
      d = this.time.getDate();

      let tempInExData = JSON.parse(localStorage.inExData);
      // 读取月度数据显示出来
      if(!tempInExData["monthData"][y]){  // 不存在年数据
        this.fixedSalary = 0;
        this.fixedRentIncome = 0;
        this.otherSalary = 0;
        this.otherIncome = 0;
        this.otherIncomeList = [];
      }else{  // 存在年数据
        if(!tempInExData["monthData"][y][m]){ // 不存在月数据
          this.fixedSalary = 0;
          this.fixedRentIncome = 0;
          this.otherSalary = 0;
          this.otherIncome = 0;
          this.otherIncomeList = [];
        }else{  // 存在月数据
          this.fixedSalary = tempInExData["monthData"][y][m]["fixedSalary"];
          this.fixedRentIncome = tempInExData["monthData"][y][m]["fixedRentIncome"];
          this.otherSalary = tempInExData["monthData"][y][m]["otherSalary"];
          this.otherIncome = tempInExData["monthData"][y][m]["otherIncome"];
          this.otherIncomeList = tempInExData["monthData"][y][m]["otherIncomeList"];
        }
      }
      
      this.necessarySpendingList = tempInExData["necessarySpendingList"];
      this.optionalSpendingList = tempInExData["optionalSpendingList"];
      // 读取心愿清单数据显示出来

      // 新建必要开支开关/可选开关
      this.necessarySpendingListSwitch = [];
      for (const i in this.necessarySpendingList) {
        this.necessarySpendingListSwitch.push({switch:'false'});
      }
      this.optionalSpendingListSwitch = [];
      for (const i in this.optionalSpendingList) {
        this.optionalSpendingListSwitch.push({switch:'false'});
      }

      // 更新必要开支/可选开支
      let a = formatLongDate(this.time,2);
      this.necessarySpending = updateNecessarySpending(a,this.necessarySpendingList)
      this.optionalSpending = updateOptionalSpending(a,this.optionalSpendingList)

      let tempBillData = JSON.parse(localStorage.billData);
      let tempUserData = JSON.parse(localStorage.userData)
      this.balance = calcBalance(tempBillData,y,m,d);
      // +++++++++++++++++calcBalance只计算到当前的数据，可能会有冲突，要留意

      let b = 0;
      let c = 0;
      if(tempBillData[y]){
        if(tempBillData[y]['list'][m]){
          for(const k in tempBillData[y]['list'][m]['list']){
            for(const l in tempBillData[y]['list'][m]['list'][k]['list']){
              b += Number(tempBillData[y]['list'][m]['list'][k]['list'][l]['cost']);
            }
            c += Number(tempBillData[y]['list'][m]['list'][k]['data']['budjet']);
          }
        }
      }
      this.monthCost = Math.ceil(b);

      // 获得当前月份天数的方法,date写0可以获取上月最后一天
      let ddd = new Date(y,m+1,0);
      // 只有在当月才执行此预算计算逻辑
      if(y==yy & m==mm){
        this.monthBudjet = Math.ceil(c + (ddd.getDate() - d) * tempUserData['budjet']);
      }else{
        this.monthBudjet = c;
      };

      let dddd = new Date(y,m,0);
      this.addUpAsset = Math.ceil(updateAddUpAsset(tempInExData,tempBillData,dddd.getFullYear(),dddd.getMonth()));
    },
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
      if(newval == ''){
        this.switch15 = 'false';
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
      if(newval == ''){
        this.switch16 = 'false';
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
      if(newval == ''){
        this.switch17 = 'false';
      }
    },

    temp14(newval,val){
      // 每期金额
      if(this.switch14 == 'false'){
        if(this.switch19 == 'true' && this.switch20 == 'false'){
          this.temp16 = this.temp15 * newval == 0 ? '' : this.temp15 * newval;
        }else if(this.switch20 == 'true' && this.switch19 == 'false'){
          this.temp15 = Math.ceil(this.temp16 / newval) == 0 ? '' : Math.ceil(this.temp16 / newval);
        }else if(this.temp15 != '' & this.temp16 != ''){
          this.temp15 = Math.ceil(this.temp16 / newval) == 0 ? '' : Math.ceil(this.temp16 / newval);
        }
        this.switch14 = 'true';
        setTimeout(() => {
          this.switch14 = 'false';
        }, 20);
      };
      if(newval == ''){
        this.switch18 = 'false';
      }
    },
      
    temp15(newval,val){
      // 期数
      if(this.switch14 == 'false'){
        if(this.switch18 == 'true' && this.switch20 == 'false'){
          this.temp16 = this.temp14 * newval == 0 ? '' : this.temp14 * newval;
        }else if(this.switch20 == 'true' && this.switch18 == 'false'){
          this.temp14 = Math.ceil(this.temp16 / newval) == 0 ? '' : Math.ceil(this.temp16 / newval);
        }else if(this.temp14 != '' & this.temp16 != ''){
          this.temp14 = Math.ceil(this.temp16 / newval) == 0 ? '' : Math.ceil(this.temp16 / newval);
        }
        this.switch14 = 'true';
        setTimeout(() => {
          this.switch14 = 'false';
        }, 20);
      };
      if(newval == ''){
        this.switch19 = 'false';
      }
    },
      
    temp16(newval,val){
      // 总金额
      if(this.switch14 == 'false'){
        if(this.switch18 == 'true' && this.switch19 == 'false'){
          this.temp15 = Math.ceil(newval / this.temp14) == 0 ? '' : Math.ceil(newval / this.temp14);
        }else if(this.switch19 == 'true' && this.switch18 == 'false'){
          this.temp14 = Math.ceil(newval / this.temp15) == 0 ? '' : Math.ceil(newval / this.temp15);
        }else if(this.temp14 != '' & this.temp15 != ''){
          this.temp15 = Math.ceil(newval / this.temp14) == 0 ? '' : Math.ceil(newval / this.temp14);
        }
        this.switch14 = 'true';
        setTimeout(() => {
          this.switch14 = 'false';
        }, 20);
      };
      if(newval == ''){
        this.switch20 = 'false';
      }
    },
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
    this.todayTime = new Date(parseInt(new Date().getTime()))
    let y = this.todayTime.getFullYear();
    let m = this.todayTime.getMonth();
    let d = this.todayTime.getDate();

    this.time = this.todayTime;
    let yy = this.todayTime.getFullYear();
    let mm = this.todayTime.getMonth();
    let dd = this.todayTime.getDate();

    // 不存在就新建
    if(!localStorage.inExData){
      localStorage.inExData = JSON.stringify({
        monthData:{[y]:{[m]:{
          fixedSalary:0,
          fixedRentIncome:0,
          otherSalary:0,
          otherIncome:0,
          otherIncomeList:[
            // {incomeName: "睡觉", incomeNumber: "3000"},
            // {incomeName: "红包", incomeNumber: "1000"}
            ],
          necessarySpending:'',
          optionalSpending:'',
          // investSpending:1000,
          // freedomSpending:100,
          // remainAsset:1000,
        }}},
        necessarySpendingList:[
          // {name:"房贷",sustainable:'false',interval:'month',price:7654321,payment:50000,payMonth:'',y:2021,m:1,payList:{'202103':500},status:'finish'},
          // {name:"车贷",sustainable:'false',interval:'year',price:54321,payment:3000,payMonth:3,y:2021,m:1,payList:{'202102':500},status:'going'},
          // {name:"房租",sustainable:'true',interval:'month',price:0,payment:2000,payMonth:'',y:2021,m:1,payList:{'202101':500},status:'pause'},
          // {name:"净水滤芯",sustainable:'true',interval:'year',price:0,payment:500,payMonth:3,y:2021,m:1,payList:{'202003':500},status:'going'},
        ],
        optionalSpendingList:[
          // {name:'投资',period:'month',sustainable:'true',payment:5000,price:50000,payList:{'202103':500},y:2021,m:'03',status:'going'},
          // {name:'投资',period:'month',sustainable:'true',payment:5000,price:50000,payList:{'202101':500},y:2021,m:3,status:'pause'},
        ],
        itemData:{}
      });
    }

    let tempInExData = JSON.parse(localStorage.inExData);
    // 读取月度数据显示出来
    this.fixedSalary = tempInExData["monthData"][y][m]["fixedSalary"];
    this.fixedRentIncome = tempInExData["monthData"][y][m]["fixedRentIncome"];
    this.otherSalary = tempInExData["monthData"][y][m]["otherSalary"];
    this.otherIncome = tempInExData["monthData"][y][m]["otherIncome"];
    this.otherIncomeList = tempInExData["monthData"][y][m]["otherIncomeList"];
    this.necessarySpendingList = tempInExData["necessarySpendingList"];
    this.optionalSpendingList = tempInExData["optionalSpendingList"];
    // 读取心愿清单数据显示出来

    // 新建必要开支开关/可选开关
    for (const i in this.necessarySpendingList) {
      this.necessarySpendingListSwitch.push({switch:'false'});
    }
    for (const i in this.optionalSpendingList) {
      this.optionalSpendingListSwitch.push({switch:'false'});
    }

    // 更新必要开支/可选开支
    let a = formatLongDate(this.time,2);
    this.necessarySpending = updateNecessarySpending(a,this.necessarySpendingList)
    this.optionalSpending = updateOptionalSpending(a,this.optionalSpendingList)

    let tempBillData = JSON.parse(localStorage.billData);
    let tempUserData = JSON.parse(localStorage.userData)
    this.balance = calcBalance(tempBillData,y,m,d);
    
    let b = 0;
    let c = 0;
    if(tempBillData[y]){
      if(tempBillData[y]['list'][m]){
        for(const k in tempBillData[y]['list'][m]['list']){
          for(const l in tempBillData[y]['list'][m]['list'][k]['list']){
            b += Number(tempBillData[y]['list'][m]['list'][k]['list'][l]['cost']);
          }
          c += Number(tempBillData[y]['list'][m]['list'][k]['data']['budjet']);
        }
      }
    }
    this.monthCost = Math.ceil(b);

    // 获得当前月份天数的方法,date写0可以获取上月最后一天
    let ddd = new Date(y,m+1,0);
    // 只有在当月才执行此预算计算逻辑
    if(y==yy & m==mm){
      this.monthBudjet = Math.ceil(c + (ddd.getDate() - d) * tempUserData['budjet']);
    }else{
      this.monthBudjet = c;
    };

    let dddd = new Date(y,m,0);
    this.addUpAsset = Math.ceil(updateAddUpAsset(tempInExData,tempBillData,dddd.getFullYear(),dddd.getMonth()));
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
    console.log();
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  },
  destroyed() {
    console.log("destroyed");
  },
};

// 这里的脚本可以在项目未加载完成时调用
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

function updateNecessarySpending(ym,necessarySpendingList){
  let a = 0;
  for (const i in necessarySpendingList) {
    if(necessarySpendingList[i]['payList'][ym]){
      a += Number(necessarySpendingList[i]['payList'][ym]);
    }
  };
  return a;
};

function updateOptionalSpending(ym,optionalSpendingList){
  let a = 0;
  for (const i in optionalSpendingList) {
    if(optionalSpendingList[i]['payList'][ym]){
      a += Number(optionalSpendingList[i]['payList'][ym]);
    }
  };
  return a;
};

function updateAddUpAsset(inExData,billData,y,m){
  // 计算的范围含y、m
  let a = 0;

  // 遍历monthData
  for (const i in inExData.monthData) {
    if(i < y){
      // 老年份的全部遍历计算
      for(const j in inExData.monthData[i]){
        a += inExData.monthData[i][j]['fixedSalary'] + inExData.monthData[i][j]['fixedRentIncome'] + inExData.monthData[i][j]['otherSalary'] + inExData.monthData[i][j]['otherIncome'];
      }
    }else if(i == y){
      // 当年的老月份遍历计算
      for(const j in inExData.monthData[i]){
        if(j <= m){
          a += inExData.monthData[i][j]['fixedSalary'] + inExData.monthData[i][j]['fixedRentIncome'] + inExData.monthData[i][j]['otherSalary'] + inExData.monthData[i][j]['otherIncome'];
        }
      }
    }
  }

  // 计算ym
  let ym = 0;
  if(0 <= m & m <= 8){
    ym = y + '0' + (m+1); 
  }else if(9 <= m & m <= 11){
    ym = String(y) + m;
  }
 
  // 遍历necessarySpending
  for(const i in inExData.necessarySpendingList){
    for(const j in inExData.necessarySpendingList[i]['payList']){
      // 判定键的时间比本日小
      if(j <= ym){
        a -= inExData.necessarySpendingList[i]['payList'][j];
      }
    }
  }

  // 遍历optionalSpending
  for(const i in inExData.optionalSpendingList){
    for(const j in inExData.optionalSpendingList[i]['payList']){
      // 判定键的时间比本日小
      if(j <= ym){
        a -= inExData.optionalSpendingList[i]['payList'][j];
      }
    }
  }

  // 遍历日常开支
  a -= updateAddUpMonthCost(billData,y,m);
  return a;
}

function updateAddUpMonthCost(billData,y,m){
  let a = 0;
  for (const i in billData) {
    if(i < y){
      for (const j in billData[i]['list']){
        for(const k in billData[i]['list'][j]['list']){
          for(const l in billData[i]['list'][j]['list'][k]['list']){
            a += Number(billData[i]['list'][j]['list'][k]['list'][l]['cost']);
          }
        }
      }
    }else if(i == y){
      for (const j in billData[y]['list']){
        if(j <= m){
          for(const k in billData[i]['list'][j]['list']){
            for(const l in billData[i]['list'][j]['list'][k]['list']){
              a += Number(billData[i]['list'][j]['list'][k]['list'][l]['cost']);
            }
          }
        }
      }
    }
  };
  return a;
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
  if(tempBillData[y]){
    for (const i in tempBillData[y]["list"]) {
      if(i < m){
        balance += Number(tempBillData[y]["list"][i]["data"]["monthBalance"]);
      }
    }
    if(tempBillData[y]["list"][m]){
      // 加总日表
      for (const i in tempBillData[y]["list"][m]["list"]) {
        if(i <= d){
          balance += Number(tempBillData[y]["list"][m]["list"][i]["data"]["dateBalance"]);
        }
      }
    }
  }

  // 消除浮点影响，取小数后一位
  if(balance > 0){
    balance = parseInt(balance * 10 + 0.1)/10;
  }else if(balance < 0){
    balance = parseInt(balance * 10 - 0.1)/10;
  }
  return(balance)
};

</script>

<style lang="css">
#funnel{
  height: calc(100vh - 40vw);
}

#header {
  width: 100%;
  height: 20vw;
  background-color: bisque;
  /* line-height: 15vw; */
  /* display: flex; */
}

#body{
  height:100%;
  overflow-y: scroll;
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
  /* font-size: 100%; */
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
  /* font-size: 100%; */
}

.tag{
  margin:1vw;
  height: 8vw;
}

.van-grid-item__text{
  /* font-size:6vw; */
}

.van-grid-item__content{
  padding:0
}

.fontSize7vw{
  font-size:4vw;
}

.van-cell{
  font-size: 3vw;
  line-height:5vw;
}

.van-collapse-item__content{
  font-size: 3vw;
  line-height:7vw;
}
</style>