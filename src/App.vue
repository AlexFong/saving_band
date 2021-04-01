
<template>
<div id="app">
  <!-- updateData -->
  <!-- downloadData -->
  <!-- <button @click="updateData('wishList')">上传w</button>
  <button @click="updateData('billData')">上传b</button>
  <button @click="updateData('inExData')">上传i</button>
  <button @click="updateData('userData')">上传u</button>
  <button @click="downloadData('wishList')">下载w</button>
  <button @click="downloadData('billData')">下载b</button>
  <button @click="downloadData('inExData')">下载i</button>
  <button @click="downloadData('userData')">下载u</button> -->


  <!-- 任意元素中加 v-wechat-title 指令 建议将标题放在 route 对应meta对象的定义中 -->
  <div v-wechat-title="$route.meta.title"></div>
  <!--或者-->
  <!-- <router-view v-wechat-title="$route.meta.title"></router-view> -->


  <!-- 显示路由路径下的内容 -->
  <router-view/>

  <div id="footer" v-if="footerShow">
    <van-tabbar route style="height:16vw;padding-bottom:4vw" v-model="active">
      <van-tabbar-item badge="" to="/">
        <span>日常开支</span>
        <template #icon="props">
          <van-icon class="iconfont" class-prefix='icon' name='piechart' />
        </template>
      </van-tabbar-item>
      <van-tabbar-item badge="" to="/funnel">
        <span>记账漏斗</span>
        <template #icon="props">
          <van-icon class="iconfont" class-prefix='icon' name='barchart' />
        </template>
      </van-tabbar-item>
      <van-tabbar-item badge="" to="/wishlist">
        <span>心愿清单</span>
        <template #icon="props">
          <van-icon class="iconfont" class-prefix='icon' name='heart' />
        </template>
      </van-tabbar-item>
      <van-tabbar-item badge="" to="/mine">
        <span>我的</span>
        <template #icon="props">
          <van-icon class="iconfont" class-prefix='icon' name='user' />
        </template>
      </van-tabbar-item>
      <!-- <van-tabbar-item icon="search" to="/funnel">统计</van-tabbar-item>
      <van-tabbar-item icon="search" to="/wishlist">愿望清单</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/mine">我的</van-tabbar-item> -->
    </van-tabbar>
  </div>
</div>
</template>


<script>
// iconfont引入用法（2/2)
import "./assets/font_2356633_61czw08nnlw/iconfont.css";
import Vue from 'vue';
import { Button, Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar);Vue.use(TabbarItem);Vue.use(Button);
import axios from 'axios';
import commonjs from './store/common';

// vConsole工作台
import Vconsole from 'vconsole';


import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    billDataSwitch: false,
    userDataSwitch: false,
    inExDataSwitch: false,
    wishListSwitch: false,
  },
  // 注意是通过store.commit('increment')方法来改变状态。
  mutations: {
    stateChange (state,change) {
      state[change.name] = change.status;
    }
  }
})


export default {
  name: "app",
  store,
  data() {
    return {
      time:0,
      todayTime:0,
      active: 0,
      icon: {
        active: 'https://img01.yzcdn.cn/vant/user-active.png',
        inactive: 'https://img01.yzcdn.cn/vant/user-inactive.png',
      },
      footerShow:false,
    };
  },
  methods: {
    // 把新建的表单推上云
    updateData(list){
      return new Promise(function(resolve,reject){
        axios.post('/' + list, JSON.parse(localStorage[list]))
        .then(function (response) {
          console.log('then resolve',response);
          resolve(response)
        })
        .catch(function (error) {
          console.log('catch reject',error);
          reject(response)
        });
      })
    },
    downloadData(list){
      let that = this;
      return new Promise(function(resolve,reject){
        axios.get('/' + list)
        .then(function (response) {
          console.log('then',response);
          // 如果服务器发回了原始数据，本地赋值
          let todayTime = new Date(parseInt(new Date().getTime()));
          let y = todayTime.getFullYear();
          let m = todayTime.getMonth();
          let d = todayTime.getDate();
          let tempData = response.data.data;
          
          if(JSON.stringify(tempData) == '{}'){
            that.$root.bus.$emit(list + "Switch", true);
            if(list == 'wishList'){
              tempData = {
                data:{
                  updateDate:todayTime,
                  wishId:0,
                },
                list:[],  
              }
            }else if(list == 'inExData'){
              tempData = {
                monthData:{[y]:{[m]:{
                  fixedSalary:0,
                  fixedRentIncome:0,
                  otherSalary:0,
                  otherIncome:0,
                  otherIncomeList:[],
                }}},
                necessarySpendingList:[],
                optionalSpendingList:[],
                data:{
                  updateDate:todayTime
                },
              }
            }else if(list == 'billData'){
              let billData = commonjs.initBillData({
                data:{
                  updateDate:todayTime,
                  budjet:188.8,
                },
                list:{}
              },y,m,d,188.8);
              // 计算各层Balance
              billData['list'][y]["list"][m]["list"][d]["data"]["dateBalance"] = commonjs.calcDateBalance(billData,y,m,d);
              billData['list'][y]["list"][m]["data"]["monthBalance"] = commonjs.calcMonthBalance(billData,y,m);
              billData['list'][y]["data"]["yearBalance"] = commonjs.calcYearBalance(billData,y);
              tempData = billData;
            }else if(list == 'userData'){
              tempData = {
                fisrtLoginDate:todayTime,
                // name:"default",
                latestLoginDate:todayTime,
                updateDate:todayTime,
                username:window.userInfo?window.userInfo.username:'unknown',
                mobile:window.userInfo?window.userInfo.mobile:'unknown',
              }
            }
          }
          localStorage[list] = JSON.stringify(tempData);
          that.$root.bus.$emit(list + "Download", Math.random());
          resolve(response)
        })
        .catch(function (error) {
          console.log('catch reject',error);
          reject(error);
        });
      })
    },
  },
  watch:{
    $route(to,from){
      // 路由变化时
      this.footerShow = Boolean(window.location.hash != '#/login');
    },
  },
  beforeCreate() {
    console.log("App beforeCreate");
    if(localStorage.token) {
      window.token = localStorage.token;
      window.loginStatus = true;
    }
    else {
      window.token = false;
      window.loginStatus = false;
    }
  },
  created() {
    // y是time，yy是todayTime
    console.log("App created");
    this.todayTime = new Date(parseInt(new Date().getTime()))
    this.time = this.todayTime;

    axios.defaults.baseURL = 'http://simbas.work:7001';
    axios.defaults.headers.token = localStorage.token;
    
    // 如果已登录，发送获取数据的请求
    if(window.loginStatus == true){
      console.log("自动登录，无需登录，确实可以一个个来~");
      let that = this;
      that.downloadData('wishList').then(function(){
        // 对正在登陆中的界面进行更新
        that.$root.bus.$emit("wishListDownload", Math.random());
        return that.downloadData('userData');
      }).then(function(){
        that.$root.bus.$emit("userDataDownload", Math.random());
        return that.downloadData('inExData');
      }).then(function(){
        that.$root.bus.$emit("inExDataDownload", Math.random());
        return that.downloadData('billData');
      }).then(function(){
        that.$root.bus.$emit("billDataDownload", Math.random());
        console.log('自动登录download请求已依次完成') 
      })
    }else{
      let that = this;
      // 监听login状态的改变
      this.$root.bus.$on("loginStatus",(t)=>{
        console.log("成功登录",this);
        // let that = this;
        that.downloadData('wishList').then(function(){
          return that.downloadData('userData');
        }).then(function(){
          return that.downloadData('inExData');
        }).then(function(){
          return that.downloadData('billData');
        }).then(function(){
          console.log('登录download已完成，转跳至home.that:',that);
          that.$router.push({ path: 'home' });
        })
      });
    }
    
    // 添加条件，检测url？debug字段的值来启动Vconsole
    if(commonjs.getUrlVar('debug')=="true") new Vconsole();

    // 判断footer要不要显示
    this.footerShow = Boolean(window.location.hash != '#/login');
    
    // 检测Switch的变化状态
    this.$root.bus.$on("billDataSwitch",(t)=>{
      console.log("billDataSwitch触发成功,值为：",t);
      store.commit('stateChange',{
        name:"billDataSwitch",
        status:t,
      });
      console.log('验证billDataSwitch',store.state.billDataSwitch)
    });
    this.$root.bus.$on("userDataSwitch",(t)=>{
      console.log("userDataSwitch触发成功,值为：",t);
      store.commit('stateChange',{
        name:"userDataSwitch",
        status:t,
      });
      console.log('验证userDataSwitch',store.state.userDataSwitch)
    });
    this.$root.bus.$on("inExDataSwitch",(t)=>{
      console.log("inExDataSwitch触发成功,值为：",t);
      store.commit('stateChange',{
        name:"inExDataSwitch",
        status:t,
      });
      console.log('验证inExDataSwitch',store.state.inExDataSwitch)
    });
    this.$root.bus.$on("wishListSwitch",(t)=>{
      console.log("wishListSwitch触发成功,值为：",t);
      store.commit('stateChange',{
        name:"wishListSwitch",
        status:t,
      });
      console.log('验证wishListSwitch',store.state.wishListSwitch)
    });

    // 定时服务器更新数据
    setInterval(()=>{
      console.log('上传检测触发');
      let that = this;
      if(store.state.billDataSwitch == true){
        console.log("更新服务器的billData");
        that.updateData('billData').then(function(){
          // 接受到成功接口后变回false
          store.commit('stateChange',{
            name:"billDataSwitch",
            status:false,
          });
          console.log('服务器成功接收到billData');
        })
      }

      if(store.state.userDataSwitch == true){
        console.log("更新服务器的userData");
        that.updateData('userData').then(function(){
          // 接受到成功接口后变回false
          store.commit('stateChange',{
            name:"userDataSwitch",
            status:false,
          });
          console.log('服务器成功接收到userData');
        })
      }

      if(store.state.inExDataSwitch == true){
        console.log("更新服务器的inExData");
        that.updateData('inExData').then(function(){
        // 接受到成功接口后变回false
          store.commit('stateChange',{
            name:"inExDataSwitch",
            status:false,
          });
          console.log('服务器成功接收到inExData');
        })
      }

      if(store.state.wishListSwitch == true){
        console.log("更新服务器的wishList");
        that.updateData('wishList').then(function(){
        // 接受到成功接口后变回false
          store.commit('stateChange',{
            name:"wishListSwitch",
            status:false,
          });
          console.log('服务器成功接收到wishList');
        })
      }

    },3000)
  },
  beforeMount() {
    console.log("App beforeMount");
  },
  mounted() {
    console.log("App mounted");
    // 持续监听
    
  },
  beforeUpdate() {
    console.log("App beforeUpdate");
    this.todayTime = new Date(parseInt(new Date().getTime()));
  },
  updated() {
    console.log("App updated");
    // console.log(document.activeElement);
  },
  beforeDestroy() {
    console.log("App beforeDestroy");
  },
  destroyed() {
    console.log("App destroyed");
  },
};






// created : 2017.8.21
// author  : Guozhi_Han 
// Email   : Guozhi_Han@126.com
// 把屏幕旋转，封装成一个自执行的js ，只要有用到，直接引用就可以了
(function rotate(){
  var orientation=window.orientation;
  var pd = null;
  console.log('调用了ratate函数');
  function createPd(){
    if(document.getElementById('preventTran') === null){
      var imgData = 'data:image/png;base64,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';
      pd = document.createElement('div');
      pd.setAttribute('id','preventTran');
      pd.style.position = 'fixed';
      pd.style.left = '0';
      pd.style.top = '0';
      pd.style.width = '100%';
      pd.style.height = '100%';
      pd.style.overflow = 'hidden';
      pd.style.backgroundColor = '#2e2e2e';
      pd.style.textAlign = 'center';
      pd.style.zIndex = '99999';
      document.getElementsByTagName('body')[0].appendChild(pd);
      var img = document.createElement('img');
      img.src = imgData;
      pd.appendChild(img);
      img.style.margin = '30vh auto 3vh auto'
      var br = document.createElement('br');
      var p = document.createElement('p');
      p.style.width = '100%';
      p.style.height = 'auto';
      p.style.fontSize = '4.5vh';
      p.style.color = '#626262';
      p.style.lineHeight = '6vh';
      p.style.textAlign = 'center';
      p.innerHTML = '为了您的良好体验';
      p.appendChild(br);
      p.innerHTML += '请将手机/平板竖屏操作';
      pd.appendChild(p);
    }
  }

  if(orientation==90||orientation==-90){
      if(pd == null && document.getElementById('preventTran') === null) createPd();
      document.getElementById('preventTran').style.display = 'block';
  }

  // 监听状态改变
  window.onorientationchange=function(){
    if(pd == null && document.getElementById('preventTran') == null) createPd();
    // 还原状态
    document.getElementById('preventTran').style.display='none';
    rotate();
  };
})();

</script>

<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
  font-size: 4vw;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100vw;
  height: 100vh;
}

#footer{
  height: 20vw;
  .van-tabbar-item__icon{
    margin-bottom: -1vw;
  }

  .van-tabbar-item{
    .icon{
      font-size: 6vw;
      line-height: 6.5vw;
    }
  }
  
  .van-tabbar-item__text{
    span{
      font-size: 2vw;
    }
  }
}

</style>
