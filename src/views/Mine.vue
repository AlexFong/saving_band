<template>
<div class="mine">
<div id="header">
  <div style="height:5vw"></div>
  <div style="height:15vw;line-height:15vw">我的</div>
</div>
<div>
  <van-cell-group>
    <van-cell title="用户昵称" :value="username" />
    <van-cell title="用户账号" :value="mobile" />
  </van-cell-group>
  <div style="display:flex;align-items:center;height:14vw;border-bottom:1px solid black;color:#444">
    <div style="width:5vw"></div>
    <span>每日预算</span>
    <div style="width:32vw"></div>
    <input style="margin:0 2vw;width:20vw" type="number" v-model="budjet" placeholder="设置每日预算" />
    <span style="padding:0.5vw 0vw;width:12vw;border:1px solid #aaa;border-radius:2vw;" @click="changeBudjet()">调整</span>
  </div>
  <!-- <div style="height:10vh"></div> -->
  <div style="margin:5vw">
    <van-button type="primary" round size="large" @click="loadOut">退出登录</van-button>
  </div><!-- <van-button type="danger" style="padding:5vw 0vw;width:40vw;border:1px solid #aaa;border-radius:5vw;" @click="chosen='inExData';showInfo='清理记账漏斗缓存/inExData';Dialog()">清除记账漏斗</van-button><br><br>
  <van-button type="danger" style="padding:5vw 0vw;width:40vw;border:1px solid #aaa;border-radius:5vw;" @click="chosen='billData';showInfo='清理天天记账缓存/billData';Dialog()">清除日常开支</van-button><br><br>
  <van-button type="danger" style="padding:5vw 0vw;width:40vw;border:1px solid #aaa;border-radius:5vw;" @click="chosen='userData';showInfo='清理用户数据缓存/userData';Dialog()">清除用户数据</van-button><br><br>
  <van-button type="danger" style="padding:5vw 0vw;width:40vw;border:1px solid #aaa;border-radius:5vw;" @click="chosen='wishList';showInfo='清理心愿清单缓存/wishList';Dialog()">清除心愿清单</van-button><br><br> -->
  
  <!-- 父组件的<input type="text" v-model="author"> -->
  <!-- <br>在父组件绑定一个值传给子组件用props接。<br> -->
  <!-- <child1 :notice='author' @childPastValue="childByValue"></child1> -->
  <!-- 被子组件的childValue事件触发父组件的childByValue -->
</div>
</div>
</template>


<script>
import { Component, Vue } from "vue-property-decorator";
import { Button, Cell, CellGroup, Dialog, Toast } from 'vant';
import child1 from '../components/child1';
import commonjs from '../store/common';

Vue.use(Dialog);Vue.use(Toast);Vue.use(Cell);Vue.use(CellGroup);Vue.use(Button);

export default {
  name: "mine",
  // 数据父传子,子接收的数据
  props: {
    msg: {
      type: String,
      default: "test msg",
    },
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
    child1  // 这个名字必须与import的名字相同
  },
  data() {
    return {
      // 未删 
      todayTime:"",
      time:"",
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
      budjet:400,
      todayBudjet:0,
      showInfo:'',
      chosen:'',
      author:'',
      username:'',
      mobile:'',
    };
  },
  methods: {
    changeBudjet: function(){
      if(this.budjet >= 0){
        let y = this.todayTime.getFullYear();
        let m = this.todayTime.getMonth();
        let d = this.todayTime.getDate();

        let billData = JSON.parse(localStorage.billData);
        billData.data.budjet = this.budjet;
        billData['list'][y]['list'][m]['list'][d]['data']['budjet'] = this.budjet;

        // 计算各层Balance
        billData['list'][y]["list"][m]["list"][d]["data"]["dateBalance"] = commonjs.calcDateBalance(billData,y,m,d);
        billData['list'][y]["list"][m]["data"]["monthBalance"] = commonjs.calcMonthBalance(billData,y,m);
        billData['list'][y]["data"]["yearBalance"] = commonjs.calcYearBalance(billData,y);

        billData.data.updateDate = new Date(parseInt(new Date().getTime()));
        localStorage.billData = JSON.stringify(billData);

        this.$root.bus.$emit("billDataSwitch", true);
        Toast('预算调整请求已发送！')
      }else{
        Toast("预算不能为负数哦~");
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
    childByValue(val){
      console.log(2,val);
      this.author = val;
    },
    loadOut(){
      localStorage.clear();
      window.loginStatus = false;
      // window.token = '';
      // axios.defaults.headers.token = '';
      Toast("成功退出登录。")
      this.$router.push('/login');
    },
    
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
    this.todayTime = new Date(parseInt(new Date().getTime()));
    
    let billData = JSON.parse(localStorage.billData);
    this.budjet = billData.data.budjet;

    let userData = JSON.parse(localStorage.userData);
    this.username = userData.username;
    this.mobile = userData.mobile;

    // 检测billDataDownload的变化状态
    this.$root.bus.$on("billDataDownload",(t)=>{
      console.log("billDataDownload触发成功,值为：",t);
      let billData = JSON.parse(localStorage.billData);
      this.budjet = billData.data.budjet;
    });
    // 检测userDataDownload的变化状态
    this.$root.bus.$on("userDataDownload",(t)=>{
      console.log("userDataDownload触发成功,值为：",t);
      let userData = JSON.parse(localStorage.userData);

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

<style lang="scss" scoped>

#header {
  width: 100%;
  height: 20vw;
  background-color: bisque;
}

*{
  margin: 0;
  padding: 0;
  font-size: 4vw;
  line-height: 5vw;
}

.mine{
  height: calc(100vh - 20vw);
}

.van-cell{
  border-bottom: 1px solid black;
  padding: 3vw 5vw;
  // margin: 0 0 3vw 0;

  .van-cell__title{
    line-height: 8vw;
    text-align: left;
  }
  .van-cell__value{
    line-height: 8vw;
    text-align: center;
  }
}
</style>