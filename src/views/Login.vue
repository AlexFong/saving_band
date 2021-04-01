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
          <van-button round block type="info" native-type="submit" @click="login">登录</van-button>
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
  <!-- <button @click="getUrlVar('debug')">get Url</button> -->
</div>
</div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import axios from 'axios';
import { Button, Cell, CellGroup, Field, Form, Tab, Tabs, Toast } from 'vant';
Vue.use(Toast);Vue.use(Field);Vue.use(Cell);Vue.use(CellGroup);Vue.use(Button);Vue.use(Tab);Vue.use(Tabs);Vue.use(Form);
import commonjs from '../store/common';

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
  methods: {
    login(){
      console.log('login function');
      let that = this;
      axios.post('/login', {
        password: this.password,
        mobile: this.phoneNumber,
      })
      .then(function (response) {
        console.log('then',response);
        if(response.data.code == 200){
          console.log('请求成功，成功登录');
          // 请求都绑定token
          localStorage.token = response.data.data.token;
          window.token = response.data.data.token;
          axios.defaults.headers.token = response.data.data.token;
          window.loginStatus = true;
          // 通知App.vue下载数据
          // console.log('登录成功！',that.$root.bus);
          that.$root.bus.$emit("loginStatus", that.username);
          that.phoneNumber = '';
          that.password = '';
          that.passwordVerify = '';
          that.username = '';
          that.passwordIcon = '';
        }else{
          console.log('then请求错误',response.data.code,response.data.errMsg);
        }
      })
      .catch(function (error) {
        console.log('catch',error);
      });
    },

    signup(){
      console.log('signup function');
      let that = this;
      axios.post('/signup', {
        username: this.username,
        password: this.password,
        mobile: this.phoneNumber,
      })
      .then(function (response) {
        console.log('then',response);
        if(response.data.code == 200){
          Toast('注册成功！');
          window.userInfo = {
            username:that.username,
            mobile:that.phoneNumber
          };
          console.log(window.userInfo);
          that.login();
        }else{
          console.log('请求失败',response.data.code,response.data.errMsg)
        }
      })
      .catch(function (error) {
        console.log('catch',error);
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
    
    getUrlVar(v){
      let src = window.location.href;
      let index = src.indexOf("?");
      if (index === -1) {
        return ;
      }
      let dataStr = src.substring(src.indexOf("?") + 1);
      let dataArray = dataStr.split("&");

      for (let i = 0; i < dataArray.length; i++) {
        let param = dataArray[i].split("=");
        if(param[0] == v) console.log(param[1]); return param[1];
      }
    },
    
    urlGO(url){
      this.$router.push(url);
    }
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
      console.log("a: ",val, oldVal);
    },

  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");

    // this.todayTime = new Date(parseInt(new Date().getTime()));
    // let y = this.todayTime.getFullYear();
    // let m = this.todayTime.getMonth();
    // let d = this.todayTime.getDate();
    axios.defaults.baseURL = 'http://simbas.work:7001';
    axios.defaults.headers.token = localStorage.token;
    

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
  min-height: 100vh;
  /* min-height: calc(100vh - 20vw); */
  background-color: #f5f5f5;
}

/* .van-field__label{
  text-align: center;
  color: black;
} */
</style>