import { Component, Vue } from "vue-property-decorator";
import { DatetimePicker, Collapse, CollapseItem, Popup, Field, Button, Toast, SwipeCell, Form, Radio, RadioGroup, Popover, Grid, GridItem, Divider, Icon,Col, Row, Calendar } from 'vant';

// iconfont引入用法（2/2)
import "./assets/font_2356633_61czw08nnlw/iconfont.css";


Vue.use(Radio);Vue.use(RadioGroup);Vue.use(Form);Vue.use(Toast);Vue.use(Button);Vue.use(Field);Vue.use(Popup);Vue.use(Popover);Vue.use(Collapse);Vue.use(CollapseItem);Vue.use(SwipeCell);Vue.use(Grid);Vue.use(GridItem);Vue.use(Divider);Vue.use(Icon);Vue.use(DatetimePicker);Vue.use(Col);Vue.use(Row);Vue.use(Calendar);

import App from './App.vue'
import router from './router'
import store from './store'
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  data: {
    bus: new Vue()
  },
  render: h => h(App)
}).$mount('#app')




