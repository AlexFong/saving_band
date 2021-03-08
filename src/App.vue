<template>
<div id="app">
  <!-- 显示路由路径下的内容 -->
  <router-view/>

  <div id="footer">
    <van-tabbar style="height:15vw" v-model="active">
      <van-tabbar-item badge="" to="/">
        <span>天天记账</span>
        <template #icon="props">
          <van-icon style="font-size:7vw" class="iconfont" class-prefix='icon' name='piechart' />
        </template>
      </van-tabbar-item>
      <van-tabbar-item badge="" to="/funnel">
        <span>记账漏斗</span>
        <template #icon="props">
          <van-icon style="font-size:7vw" class="iconfont" class-prefix='icon' name='barchart' />
        </template>
      </van-tabbar-item>
      <van-tabbar-item badge="" to="/wishlist">
        <span>心愿清单</span>
        <template #icon="props">
          <van-icon style="font-size:7vw" class="iconfont" class-prefix='icon' name='heart' />
        </template>
      </van-tabbar-item>
      <van-tabbar-item badge="3" to="/mine">
        <span>我的</span>
        <template #icon="props">
          <van-icon style="font-size:7vw" class="iconfont" class-prefix='icon' name='user' />
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
import Vconsole from 'vconsole';
new Vconsole();
// console.log('Hello world');

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Button);

export default {
  data() {
    return {
      active: 0,
      icon: {
        active: 'https://img01.yzcdn.cn/vant/user-active.png',
        inactive: 'https://img01.yzcdn.cn/vant/user-inactive.png',
      },
    };
  },
};
  
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffca57;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

#footer{
  height: 20vw;
  // .van-tabbar-item__icon{
  //   height: 6vh;
  //   font-size: 4vh;
  // }
  .van-tabbar-item__icon{
    margin-bottom: -1vw;
  }

  .iconfont{
    font-size:8vw
  }
  .van-tabbar-item{
    .icon{
      font-size: 7vw;
    }
    // &.van-tabbar-item--active{
    //   .icon{
    //     font-size: 7vw;
    //   }
    // }
  }
  
  .van-tabbar-item__text{
    span{
      font-size: 3vw;
    }
  }
}

// #nav {
//   padding: 30px;
  
//   // router-link 转译之后变成a标签
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     height: 6vh;

//     img{
//       width: 5vh;
//       height: 5vh;
//     }
//     // 导航条激活时的样式
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }


</style>
