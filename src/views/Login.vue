<template>
<div class="login">
<div id="header">
  <div style="height:5vw"></div>
  <div style="height:15vw;line-height:15vw">登录天天记账1.00</div>
</div>
<br>
<div>
  <van-tabs v-model="active">
    <van-tab title="登录">
      <van-form validate-first @failed="onFailed">
        <!-- 通过 pattern 进行正则校验 -->
        <!-- 允许输入数字，调起带符号的纯数字键盘 -->
        <van-field
          v-model="phoneNumber"
          name="手机"
          label="手机"
          placeholder="手机"
          :rules="[{ required: true, message: '请填写手机号码' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>
    </van-tab>
    <van-tab title="注册">
      <van-form validate-first @failed="onFailed">
        <!-- 通过 pattern 进行正则校验 -->
        <!-- 允许输入数字，调起带符号的纯数字键盘 -->
        <van-field
          v-model="username"
          name="用户昵称"
          label="用户昵称"
          placeholder="用户昵称"
          :rules="[{ required: true, message: '请填写用户昵称' }]"
        />
        <van-field
          v-model="phoneNumber"
          name="手机"
          label="手机"
          placeholder="手机"
          :rules="[{ required: true, message: '请填写手机号码' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="passwordVerify"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" @click="signup">注册</van-button>
        </div>
      </van-form>
    </van-tab>
  </van-tabs>
</div>
</div>
</template>


<script>
import { Component, Vue } from "vue-property-decorator";
import axios from 'axios';
import { Button, Cell, CellGroup, Field, Form, Tab, Tabs, Toast } from 'vant';
Vue.use(Toast);Vue.use(Field);Vue.use(Cell);Vue.use(CellGroup);Vue.use(Button);Vue.use(Tab);Vue.use(Tabs);Vue.use(Form);

export default {
  name: "mine",
  // 数据父传子,子接收的数据
  props: {
  },
  components: {
  },
  data() {
    return {
      phoneNumber: '',
      password: '',
      passwordVerify:'',
      username: '',
      passwordIcon: '',
      active: 0,
      // info:'',
      pattern: /\d{6}/,
    };
  },
  watch:{
    password2(val, oldVal){//普通的watch监听
      console.log("a: "+val, oldVal);
      if(this.password3 == ''){
        this.passwordIcon = 'checked';
      }else if(val == this.password3){
        // this
      }else{

      }
    },
    password3(val, oldVal){//普通的watch监听
      console.log("a: "+val, oldVal);
    },

  },
  methods: {
    login:function(){
      console.log('login function');
    },
    signup:function(){
      console.log('signup function');
      axios.post('http://simbas.work:7001/signup', {
        username: this.username,
        password: this.password,
        mobile: this.phoneNumber,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    // 点击事件
    onSubmit(values) {
      console.log('submit', values);
    },
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validator(val) {
      return /1\d{10}/.test(val);
    },
    // 异步校验函数返回 Promise
    asyncValidator(val) {
      return new Promise((resolve) => {
        Toast.loading('验证中...');

        setTimeout(() => {
          Toast.clear();
          resolve(/\d{6}/.test(val));
        }, 1000);
      });
    },
    onFailed(errorInfo) {
      console.log('failed', errorInfo);
      Toast("表单验证失败")
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



</script>

<style lang="css" scoped>
*{
  font-size: 4vw;
}
.login{
  min-height: calc(100vh - 20vw);
  background-color: #f5f5f5;
}

/* .van-field__label{
  text-align: center;
  color: black;
} */
</style>