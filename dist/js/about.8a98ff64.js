(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"0a4e":function(t,e,i){"use strict";i.r(e);var n,o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"mine"},[t._m(0),i("br"),i("div",[i("div",{staticStyle:{display:"flex","justify-content":"center"}},[i("span",[t._v("设置每日预算:")]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.budjet,expression:"budjet"}],staticStyle:{margin:"0 2vw",width:"30vw"},attrs:{type:"number",placeholder:"设置每日预算"},domProps:{value:t.budjet},on:{input:function(e){e.target.composing||(t.budjet=e.target.value)}}}),i("span",{staticStyle:{margin:"0 0.5vw",width:"14vw",border:"1px solid #aaa","border-radius":"2vw",height:"4vh"},on:{click:function(e){return t.changeBudjet()}}},[t._v("调整")])]),i("br"),i("br"),i("button",{on:{click:function(e){t.chosen="inExData",t.showInfo="清理记账漏斗缓存/inExData",t.Dialog()}}},[t._v("清理记账漏斗缓存"),i("br"),t._v("inExData")]),i("br"),i("br"),i("button",{on:{click:function(e){t.chosen="billData",t.showInfo="清理天天记账缓存/billData",t.Dialog()}}},[t._v("清理日常开支缓存"),i("br"),t._v("billData")]),i("br"),i("br"),i("button",{on:{click:function(e){t.chosen="userData",t.showInfo="清理用户数据缓存/userData",t.Dialog()}}},[t._v("清理用户数据缓存"),i("br"),t._v("userData")]),i("br"),i("br"),i("button",{on:{click:function(e){t.chosen="wishList",t.showInfo="清理心愿清单缓存/wishList",t.Dialog()}}},[t._v("清理心愿清单缓存"),i("br"),t._v("wishList")]),i("br"),i("br")])])},a=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"header"}},[i("div",{staticStyle:{height:"5vw"}}),i("div",{staticStyle:{height:"15vw","line-height":"15vw"}},[t._v("我的1.04")])])}],s=(i("b0c0"),i("a9e3"),i("ade3")),c=(i("e7e5"),i("d399")),l=(i("68ef"),i("a71a"),i("9d70"),i("3743"),i("4d75"),i("e3b3"),i("bc1b"),i("1175"),i("4cf9"),i("2fcb"),i("c31d")),r=i("2b0e"),h=i("2638"),u=i.n(h),d=i("d282"),f=i("ea8e"),p=i("b1d2"),m=i("6605"),v=i("b650"),b=i("9884"),g=Object(d["a"])("goods-action"),w=g[0],y=g[1],S=w({mixins:[Object(b["b"])("vanGoodsAction")],props:{safeAreaInsetBottom:{type:Boolean,default:!0}},render:function(){var t=arguments[0];return t("div",{class:y({unfit:!this.safeAreaInsetBottom})},[this.slots()])}}),O=i("48f4"),k=Object(d["a"])("goods-action-button"),x=k[0],C=k[1],j=x({mixins:[Object(b["a"])("vanGoodsAction")],props:Object(l["a"])({},O["c"],{type:String,text:String,icon:String,color:String,loading:Boolean,disabled:Boolean}),computed:{isFirst:function(){var t=this.parent&&this.parent.children[this.index-1];return!t||t.$options.name!==this.$options.name},isLast:function(){var t=this.parent&&this.parent.children[this.index+1];return!t||t.$options.name!==this.$options.name}},methods:{onClick:function(t){this.$emit("click",t),Object(O["b"])(this.$router,this)}},render:function(){var t=arguments[0];return t(v["a"],{class:C([{first:this.isFirst,last:this.isLast},this.type]),attrs:{size:"large",type:this.type,icon:this.icon,color:this.color,loading:this.loading,disabled:this.disabled},on:{click:this.onClick}},[this.slots()||this.text])}}),B=Object(d["a"])("dialog"),L=B[0],N=B[1],T=B[2],D=L({mixins:[Object(m["a"])()],props:{title:String,theme:String,width:[Number,String],message:String,className:null,callback:Function,beforeClose:Function,messageAlign:String,cancelButtonText:String,cancelButtonColor:String,confirmButtonText:String,confirmButtonColor:String,showCancelButton:Boolean,overlay:{type:Boolean,default:!0},allowHtml:{type:Boolean,default:!0},transition:{type:String,default:"van-dialog-bounce"},showConfirmButton:{type:Boolean,default:!0},closeOnPopstate:{type:Boolean,default:!0},closeOnClickOverlay:{type:Boolean,default:!1}},data:function(){return{loading:{confirm:!1,cancel:!1}}},methods:{onClickOverlay:function(){this.handleAction("overlay")},handleAction:function(t){var e=this;this.$emit(t),this.value&&(this.beforeClose?(this.loading[t]=!0,this.beforeClose(t,(function(i){!1!==i&&e.loading[t]&&e.onClose(t),e.loading.confirm=!1,e.loading.cancel=!1}))):this.onClose(t))},onClose:function(t){this.close(),this.callback&&this.callback(t)},onOpened:function(){this.$emit("opened")},onClosed:function(){this.$emit("closed")},genRoundButtons:function(){var t=this,e=this.$createElement;return e(S,{class:N("footer")},[this.showCancelButton&&e(j,{attrs:{size:"large",type:"warning",text:this.cancelButtonText||T("cancel"),color:this.cancelButtonColor,loading:this.loading.cancel},class:N("cancel"),on:{click:function(){t.handleAction("cancel")}}}),this.showConfirmButton&&e(j,{attrs:{size:"large",type:"danger",text:this.confirmButtonText||T("confirm"),color:this.confirmButtonColor,loading:this.loading.confirm},class:N("confirm"),on:{click:function(){t.handleAction("confirm")}}})])},genButtons:function(){var t,e=this,i=this.$createElement,n=this.showCancelButton&&this.showConfirmButton;return i("div",{class:[p["e"],N("footer")]},[this.showCancelButton&&i(v["a"],{attrs:{size:"large",loading:this.loading.cancel,text:this.cancelButtonText||T("cancel")},class:N("cancel"),style:{color:this.cancelButtonColor},on:{click:function(){e.handleAction("cancel")}}}),this.showConfirmButton&&i(v["a"],{attrs:{size:"large",loading:this.loading.confirm,text:this.confirmButtonText||T("confirm")},class:[N("confirm"),(t={},t[p["c"]]=n,t)],style:{color:this.confirmButtonColor},on:{click:function(){e.handleAction("confirm")}}})])},genContent:function(t,e){var i=this.$createElement;if(e)return i("div",{class:N("content")},[e]);var n=this.message,o=this.messageAlign;if(n){var a,s,c={class:N("message",(a={"has-title":t},a[o]=o,a)),domProps:(s={},s[this.allowHtml?"innerHTML":"textContent"]=n,s)};return i("div",{class:N("content",{isolated:!t})},[i("div",u()([{},c]))])}}},render:function(){var t=arguments[0];if(this.shouldRender){var e=this.message,i=this.slots(),n=this.slots("title")||this.title,o=n&&t("div",{class:N("header",{isolated:!e&&!i})},[n]);return t("transition",{attrs:{name:this.transition},on:{afterEnter:this.onOpened,afterLeave:this.onClosed}},[t("div",{directives:[{name:"show",value:this.value}],attrs:{role:"dialog","aria-labelledby":this.title||e},class:[N([this.theme]),this.className],style:{width:Object(f["a"])(this.width)}},[o,this.genContent(n,i),"round-button"===this.theme?this.genRoundButtons():this.genButtons()])])}}}),_=i("a142");function W(t){return document.body.contains(t)}function I(){n&&n.$destroy(),n=new(r["a"].extend(D))({el:document.createElement("div"),propsData:{lazyRender:!1}}),n.$on("input",(function(t){n.value=t}))}function z(t){return _["g"]?Promise.resolve():new Promise((function(e,i){n&&W(n.$el)||I(),Object(l["a"])(n,z.currentOptions,t,{resolve:e,reject:i})}))}z.defaultOptions={value:!0,title:"",width:"",theme:null,message:"",overlay:!0,className:"",allowHtml:!0,lockScroll:!0,transition:"van-dialog-bounce",beforeClose:null,overlayClass:"",overlayStyle:null,messageAlign:"",getContainer:"body",cancelButtonText:"",cancelButtonColor:null,confirmButtonText:"",confirmButtonColor:null,showConfirmButton:!0,showCancelButton:!1,closeOnPopstate:!0,closeOnClickOverlay:!1,callback:function(t){n["confirm"===t?"resolve":"reject"](t)}},z.alert=z,z.confirm=function(t){return z(Object(l["a"])({showCancelButton:!0},t))},z.close=function(){n&&(n.value=!1)},z.setDefaultOptions=function(t){Object(l["a"])(z.currentOptions,t)},z.resetDefaultOptions=function(){z.currentOptions=Object(l["a"])({},z.defaultOptions)},z.resetDefaultOptions(),z.install=function(){r["a"].use(D)},z.Component=D,r["a"].prototype.$dialog=z;var $=z,P=i("1b40");P["a"].use($),P["a"].use(c["a"]);var M={name:"mine",props:{msg:{type:String,default:"test msg"}},components:Object(s["a"])({},$.Component.name,$.Component),data:function(){return{todayTime:"",time:"",balance:0,todayBalance:0,cost:"",typeId:"a",typeList:[{name:"餐饮",id:"a"},{name:"住房生活",id:"b"},{name:"服饰美容",id:"c"},{name:"交通",id:"d"},{name:"购物",id:"e"},{name:"学习",id:"f"},{name:"娱乐",id:"g"},{name:"旅游",id:"h"},{name:"亲子",id:"i"},{name:"宠物",id:"j"},{name:"医疗",id:"k"},{name:"红包",id:"l"},{name:"礼物",id:"m"},{name:"保险",id:"n"},{name:"投资",id:"o"},{name:"意外",id:"p"},{name:"其他",id:"q"}],checkList:{a:"餐饮",b:"住房生活",c:"服饰美容",d:"交通",e:"购物",f:"学习",g:"娱乐",h:"旅游",i:"亲子",j:"宠物",k:"医疗",l:"红包",m:"礼物",n:"保险",o:"投资",p:"意外",q:"其他"},bill:[],budjet:400,todayBudjet:0,showInfo:"",chosen:""}},methods:{changeBudjet:function(){if(this.budjet>=0){var t=JSON.parse(localStorage.userData);t.budjet=this.budjet,localStorage.userData=JSON.stringify(t);var e=this.todayTime.getFullYear(),i=this.todayTime.getMonth(),n=this.todayTime.getDate(),o=JSON.parse(localStorage.billData);o[e]["list"][i]["list"][n]["data"]["budjet"]=this.budjet,o[e]["list"][i]["list"][n]["data"]["dateBalance"]=J(o,e,i,n),o[e]["list"][i]["data"]["monthBalance"]=E(o,e,i),o[e]["data"]["yearBalance"]=F(o,e),localStorage.billData=JSON.stringify(o),Object(c["a"])("预算调整成功！")}else Object(c["a"])("预算不能为负数哦~")},delLocalStorage:function(t){t&&console.log(t)},Dialog:function(){var t=this;this.$dialog.confirm({title:"警告！",message:"你正准备"+this.showInfo+"。<br>请认真确认，再点击下一步。",confirmButtonColor:"red"}).then((function(){console.log("点击了确认"),t.chosen&&localStorage.removeItem(t.chosen)})).catch((function(){console.log("点击了取消")}))}},beforeCreate:function(){console.log("beforeCreate")},created:function(){console.log("created"),this.todayTime=new Date(parseInt((new Date).getTime()));var t=this.todayTime.getFullYear(),e=this.todayTime.getMonth(),i=this.todayTime.getDate(),n=JSON.parse(localStorage.userData),o=JSON.parse(localStorage.billData);this.balance=A(o,t,e,i),this.budjet=n.budjet},beforeMount:function(){console.log("beforeMount")},mounted:function(){console.log("mounted")},beforeUpdate:function(){console.log("beforeUpdate"),this.todayTime=new Date(parseInt((new Date).getTime()))},updated:function(){console.log("updated")},beforeDestroy:function(){console.log("beforeDestroy")},destroyed:function(){console.log("destroyed")}};function A(t,e,i,n){var o=0;for(var a in t)a<e&&(o+=Number(t[a]["data"]["yearBalance"]));for(var s in t[e]["list"])s<i&&(o+=Number(t[e]["list"][s]["data"]["monthBalance"]));for(var c in t[e]["list"][i]["list"])c<=n&&(o+=Number(t[e]["list"][i]["list"][c]["data"]["dateBalance"]));return o>0?o=parseInt(10*o+.1)/10:o<0&&(o=parseInt(10*o-.1)/10),o}function J(t,e,i,n){var o=t[e]["list"][i]["list"][n]["data"]["budjet"];for(var a in t[e]["list"][i]["list"][n]["list"])o-=Number(t[e]["list"][i]["list"][n]["list"][a]["cost"]);return o>0?o=parseInt(10*o+.1)/10:o<0&&(o=parseInt(10*o-.1)/10),o}function E(t,e,i){var n=0;for(var o in t[e]["list"][i]["list"])n+=Number(t[e]["list"][i]["list"][o]["data"]["dateBalance"]);return n}function F(t,e){var i=0;for(var n in t[e]["list"])i+=Number(t[e]["list"][n]["data"]["monthBalance"]);return i}var R=M,q=(i("5fb1"),i("2877")),H=Object(q["a"])(R,o,a,!1,null,null,null);e["default"]=H.exports},1175:function(t,e,i){},"119a":function(t,e,i){"use strict";i("7333")},"2fcb":function(t,e,i){},"4cf9":function(t,e,i){},"4fbc":function(t,e,i){},"57d2":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"wishList"},[t._m(0),i("div",{staticStyle:{display:"flex"}},[i("van-dropdown-menu",{staticStyle:{width:"75vw"}},[i("van-dropdown-item",{attrs:{options:t.option},on:{change:function(e){t.activeNames=[]}},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}}),i("van-dropdown-item",{ref:"item",attrs:{title:"筛选?"}},[i("van-cell",{staticStyle:{"text-align":"left"},attrs:{center:"",title:"包邮?"},scopedSlots:t._u([{key:"right-icon",fn:function(){return[i("van-switch",{attrs:{size:"24","active-color":"#ee0a24"},model:{value:t.switch1,callback:function(e){t.switch1=e},expression:"switch1"}})]},proxy:!0}])}),i("van-cell",{staticStyle:{"text-align":"left"},attrs:{center:"",title:"团购?"},scopedSlots:t._u([{key:"right-icon",fn:function(){return[i("van-switch",{attrs:{size:"24","active-color":"#ee0a24"},model:{value:t.switch2,callback:function(e){t.switch2=e},expression:"switch2"}})]},proxy:!0}])}),i("div",{staticStyle:{padding:"5px 16px"}},[i("van-button",{attrs:{type:"danger",block:"",round:""},on:{click:t.onConfirm}},[t._v(" 确认 ")])],1)],1)],1),i("div",{staticStyle:{display:"flex",width:"25vw","align-self":"center","justify-content":"center"}},[i("div",{staticStyle:{width:"15vw",height:"8vw","line-height":"8vw","background-color":"#fff","border-radius":"5vw"},on:{click:function(e){return t.showPopup("addWishShow")}}},[t._v(" +添加 ")])])],1),i("van-collapse",{model:{value:t.activeNames,callback:function(e){t.activeNames=e},expression:"activeNames"}},t._l(t.evenWishList,(function(e,n){return i("van-collapse-item",{attrs:{name:n},scopedSlots:t._u([{key:"title",fn:function(){return[i("div",{staticStyle:{display:"flex","flex-direction":"row"}},[i("div",{staticStyle:{width:"8vw"}},[i("van-icon",{class:t.colorStyle[e.status],attrs:{name:e.status},on:{click:function(i){return i.stopPropagation(),t.chooseWish(e)}}})],1),i("div",{staticStyle:{width:"36vw",overflow:"hidden","white-space":"nowrap",margin:"0 6vw 0 2vw","font-size":"3vw"}},[t._v(t._s(e.name))]),i("div",{staticStyle:{width:"30vw",display:"flex","flex-direction":"row","white-space":"nowrap",border:"2px solid #ccc"},style:{display:0!=t.sumList(e.payList)&&"checked"!=e.status?"unset":"none"}},[i("div",{staticStyle:{"background-color":"#aaffaa",height:"100%",float:"left",position:"relative"},style:{width:t.sumList(e.payList)/e.price*30+"vw"}}),i("div",{staticStyle:{width:"30vw",position:"absolute","font-size":"3vw"}},[t._v(" "+t._s(t.sumList(e.payList))+"/"+t._s(e.price)+" ")])]),i("div",{staticStyle:{width:"30vw","font-size":"3vw"},style:{display:0!=t.sumList(e.payList)&&"checked"!=e.status?"none":"unset"}},[t._v(" ￥"+t._s(e.price)+" ")])])]},proxy:!0}],null,!0)},[i("div",{staticStyle:{display:"flex","background-color":"#fff","border-bottom":"1px solid #eee"}},[i("div",{staticStyle:{margin:"0 5vw","font-size":"3vw"}},[t._v(" 添加日期: "),i("br"),t._v(" "+t._s(t.formatLongDate(e.addDate,1))+" ")]),i("div",{staticStyle:{"font-size":"3vw"},style:{display:"clear"==e.status||"checked"==e.status?"unset":"none"}},[t._v(" 完成日期: "),i("br"),t._v(" "+t._s(t.formatLongDate(e.finishDate,1))+" ")])]),i("div",{staticStyle:{margin:"2vw 0 0 0"}},[i("span",{staticStyle:{"font-size":"3vw"},on:{click:function(i){return t.changeIcon(e.saveMoney,"saveMoney",e.id)}}},[i("van-icon",{class:t.colorStyle[e.saveMoney],attrs:{name:e.saveMoney}}),t._v(" 省钱？ ")],1),i("span",{staticStyle:{"font-size":"3vw"},on:{click:function(i){return t.changeIcon(e.noWaste,"noWaste",e.id)}}},[i("van-icon",{class:t.colorStyle[e.noWaste],attrs:{name:e.noWaste}}),t._v(" 不浪费？ ")],1),i("span",{staticStyle:{"font-size":"3vw"},on:{click:function(i){return t.changeIcon(e.saveTime,"saveTime",e.id)}}},[i("van-icon",{class:t.colorStyle[e.saveTime],attrs:{name:e.saveTime}}),t._v(" 省时间？ ")],1)])])})),1),i("van-action-sheet",{attrs:{actions:t.actions,"cancel-text":"取消","close-on-click-action":""},on:{cancel:t.onCancel,select:t.onSelect},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}}),i("van-popup",{staticStyle:{height:"40vh","justify-content":"space-between","flex-direction":"column"},style:{display:t.addWishShow?"flex":"none"},attrs:{position:"bottom"},model:{value:t.addWishShow,callback:function(e){t.addWishShow=e},expression:"addWishShow"}},[i("div",{staticStyle:{"background-color":"#f1f1f1",padding:"1.5vh"}},[t._v("添加愿望")]),i("div",[i("van-field",{staticStyle:{"line-height":"8vw"},attrs:{label:"愿望",placeholder:"请输入愿望名"},model:{value:t.wishName,callback:function(e){t.wishName=e},expression:"wishName"}}),i("van-field",{staticStyle:{"line-height":"8vw"},attrs:{type:"number",label:"金额",placeholder:"请输入金额"},model:{value:t.wishPrice,callback:function(e){t.wishPrice=e},expression:"wishPrice"}})],1),i("van-button",{staticStyle:{width:"30vw",margin:"0 0 4vh 35vw"},attrs:{type:"primary",round:"",size:"normal"},on:{click:function(e){return t.addWish(t.wishName,t.wishPrice)}}},[t._v("提交")])],1),i("van-popup",{staticStyle:{height:"65vh","justify-content":"space-between","flex-direction":"column"},style:{display:t.achieveWishShow?"flex":"none"},attrs:{position:"bottom"},model:{value:t.achieveWishShow,callback:function(e){t.achieveWishShow=e},expression:"achieveWishShow"}},[i("div",{staticStyle:{"background-color":"#f1f1f1",padding:"1.5vh"}},[t._v("实现心愿(可选开支)")]),i("div",[i("van-field",{staticStyle:{"line-height":"8vw"},attrs:{id:"",label:"支出项目",placeholder:"请输入支出项目名"},model:{value:t.tempName,callback:function(e){t.tempName=e},expression:"tempName"}}),i("van-field",{staticStyle:{"line-height":"8vw"},attrs:{name:"radio1",label:"缴费周期",disabled:""},scopedSlots:t._u([{key:"input",fn:function(){return[i("van-radio-group",{attrs:{direction:"horizontal",disabled:""},model:{value:t.temp1,callback:function(e){t.temp1=e},expression:"temp1"}},[i("van-radio",{attrs:{name:"oneTime"}},[t._v("一次性")]),i("van-radio",{attrs:{name:"month"}},[t._v("每月")])],1)]},proxy:!0}])}),i("van-field",{staticStyle:{"line-height":"8vw"},style:{display:"oneTime"==t.temp1?"none":""},attrs:{id:"temp3",type:"number",label:"每期金额",placeholder:"请输入每期金额"},on:{blur:function(e){0==t.switch3&""!=t.temp3&&t.changeSwitch("switch3")}},model:{value:t.temp3,callback:function(e){t.temp3=e},expression:"temp3"}}),i("van-field",{staticStyle:{"line-height":"8vw"},style:{display:"oneTime"==t.temp1?"none":""},attrs:{id:"temp4",type:"digit",label:"期数",placeholder:"请输入期数"},on:{blur:function(e){0==t.switch4&""!=t.temp4&&t.changeSwitch("switch4")}},model:{value:t.temp4,callback:function(e){t.temp4=e},expression:"temp4"}}),i("van-field",{staticStyle:{"line-height":"8vw"},attrs:{id:"temp5",type:"number",label:"待付金额",placeholder:"请输入待付金额"},on:{blur:function(e){0==t.switch5&""!=t.temp5&&t.changeSwitch("switch5")}},model:{value:t.temp5,callback:function(e){t.temp5=e},expression:"temp5"}}),i("van-field",{staticStyle:{"line-height":"8vw"},attrs:{id:"temp7",type:"number",label:"已付金额",placeholder:"",readonly:!0,disabled:""},model:{value:t.temp7,callback:function(e){t.temp7=e},expression:"temp7"}}),i("van-field",{staticStyle:{"line-height":"8vw"},attrs:{id:"temp6",type:"number",label:"总金额",placeholder:"请输入总金额"},model:{value:t.temp6,callback:function(e){t.temp6=e},expression:"temp6"}})],1),i("van-button",{staticStyle:{width:"30vw",margin:"0 0 4vh 35vw"},attrs:{type:"primary",round:"",size:"normal"},on:{click:function(e){t.achieveWish(t.tempName,t.temp1,t.temp3,t.temp4,t.temp5,t.todayTime.getFullYear(),t.todayTime.getMonth())}}},[t._v("提交")])],1)],1)},o=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"header"}},[i("div",{staticStyle:{height:"5vw"}}),i("div",{staticStyle:{height:"15vw","line-height":"15vw"}},[t._v("心愿清单1.05")])])}],a=(i("99af"),i("4de4"),i("b0c0"),i("a9e3"),i("e7e5"),i("d399")),s=i("ade3"),c=(i("4ddd"),i("9f14")),l=(i("a44c"),i("e27c")),r=(i("68ef"),i("a71a"),i("9d70"),i("3743"),i("1a04"),i("4d75"),i("b2cc"),i("d282")),h=i("1325"),u=i("1421"),d=i("9884"),f=i("7744"),p=i("ad06"),m=i("e41f"),v=Object(r["a"])("dropdown-item"),b=v[0],g=v[1],w=b({mixins:[Object(u["a"])({ref:"wrapper"}),Object(d["a"])("vanDropdownMenu")],props:{value:null,title:String,disabled:Boolean,titleClass:String,options:{type:Array,default:function(){return[]}},lazyRender:{type:Boolean,default:!0}},data:function(){return{transition:!0,showPopup:!1,showWrapper:!1}},computed:{displayTitle:function(){var t=this;if(this.title)return this.title;var e=this.options.filter((function(e){return e.value===t.value}));return e.length?e[0].text:""}},watch:{showPopup:function(t){this.bindScroll(t)}},beforeCreate:function(){var t=this,e=function(e){return function(){return t.$emit(e)}};this.onOpen=e("open"),this.onClose=e("close"),this.onOpened=e("opened")},methods:{toggle:function(t,e){void 0===t&&(t=!this.showPopup),void 0===e&&(e={}),t!==this.showPopup&&(this.transition=!e.immediate,this.showPopup=t,t&&(this.parent.updateOffset(),this.showWrapper=!0))},bindScroll:function(t){var e=this.parent.scroller,i=t?h["b"]:h["a"];i(e,"scroll",this.onScroll,!0)},onScroll:function(){this.parent.updateOffset()},onClickWrapper:function(t){this.getContainer&&t.stopPropagation()}},render:function(){var t=this,e=arguments[0],i=this.parent,n=i.zIndex,o=i.offset,a=i.overlay,s=i.duration,c=i.direction,l=i.activeColor,r=i.closeOnClickOverlay,h=this.options.map((function(i){var n=i.value===t.value;return e(f["a"],{attrs:{clickable:!0,icon:i.icon,title:i.text},key:i.value,class:g("option",{active:n}),style:{color:n?l:""},on:{click:function(){t.showPopup=!1,i.value!==t.value&&(t.$emit("input",i.value),t.$emit("change",i.value))}}},[n&&e(p["a"],{class:g("icon"),attrs:{color:l,name:"success"}})])})),u={zIndex:n};return"down"===c?u.top=o+"px":u.bottom=o+"px",e("div",[e("div",{directives:[{name:"show",value:this.showWrapper}],ref:"wrapper",style:u,class:g([c]),on:{click:this.onClickWrapper}},[e(m["a"],{attrs:{overlay:a,position:"down"===c?"top":"bottom",duration:this.transition?s:0,lazyRender:this.lazyRender,overlayStyle:{position:"absolute"},closeOnClickOverlay:r},class:g("content"),on:{open:this.onOpen,close:this.onClose,opened:this.onOpened,closed:function(){t.showWrapper=!1,t.$emit("closed")}},model:{value:t.showPopup,callback:function(e){t.showPopup=e}}},[h,this.slots("default")])])])}}),y=(i("aec8"),i("a142")),S=i("a8c1"),O=i("b222"),k=Object(r["a"])("dropdown-menu"),x=k[0],C=k[1],j=x({mixins:[Object(d["b"])("vanDropdownMenu"),Object(O["a"])({event:"click",method:"onClickOutside"})],props:{zIndex:[Number,String],activeColor:String,overlay:{type:Boolean,default:!0},duration:{type:[Number,String],default:.2},direction:{type:String,default:"down"},closeOnClickOverlay:{type:Boolean,default:!0}},data:function(){return{offset:0}},computed:{scroller:function(){return Object(S["c"])(this.$el)},opened:function(){return this.children.some((function(t){return t.showWrapper}))},barStyle:function(){if(this.opened&&Object(y["c"])(this.zIndex))return{zIndex:1+this.zIndex}}},methods:{updateOffset:function(){if(this.$refs.bar){var t=this.$refs.bar.getBoundingClientRect();"down"===this.direction?this.offset=t.bottom:this.offset=window.innerHeight-t.top}},toggleItem:function(t){this.children.forEach((function(e,i){i===t?e.toggle():e.showPopup&&e.toggle(!1,{immediate:!0})}))},onClickOutside:function(){this.children.forEach((function(t){t.toggle(!1)}))}},render:function(){var t=this,e=arguments[0],i=this.children.map((function(i,n){return e("div",{attrs:{role:"button",tabindex:i.disabled?-1:0},class:C("item",{disabled:i.disabled}),on:{click:function(){i.disabled||t.toggleItem(n)}}},[e("span",{class:[C("title",{active:i.showPopup,down:i.showPopup===("down"===t.direction)}),i.titleClass],style:{color:i.showPopup?t.activeColor:""}},[e("div",{class:"van-ellipsis"},[i.slots("title")||i.displayTitle])])])}));return e("div",{class:C()},[e("div",{ref:"bar",style:this.barStyle,class:C("bar",{opened:this.opened})},[i]),this.slots("default")])}}),B=(i("8a58"),i("e3b3"),i("8400"),i("c31d")),L=i("2638"),N=i.n(L),T=i("2b0e"),D=i("ba31"),_=i("6605"),W=i("543e"),I=Object(r["a"])("action-sheet"),z=I[0],$=I[1];function P(t,e,i,n){var o=e.title,a=e.cancelText,s=e.closeable;function c(){Object(D["a"])(n,"input",!1),Object(D["a"])(n,"cancel")}function l(){if(o)return t("div",{class:$("header")},[o,s&&t(p["a"],{attrs:{name:e.closeIcon},class:$("close"),on:{click:c}})])}function r(i,o){var a=i.disabled,s=i.loading,c=i.callback;function l(t){t.stopPropagation(),a||s||(c&&c(i),e.closeOnClickAction&&Object(D["a"])(n,"input",!1),T["a"].nextTick((function(){Object(D["a"])(n,"select",i,o)})))}function r(){return s?t(W["a"],{class:$("loading-icon")}):[t("span",{class:$("name")},[i.name]),i.subname&&t("div",{class:$("subname")},[i.subname])]}return t("button",{attrs:{type:"button"},class:[$("item",{disabled:a,loading:s}),i.className],style:{color:i.color},on:{click:l}},[r()])}function h(){if(a)return[t("div",{class:$("gap")}),t("button",{attrs:{type:"button"},class:$("cancel"),on:{click:c}},[a])]}function u(){var n=(null==i.description?void 0:i.description())||e.description;if(n)return t("div",{class:$("description")},[n])}return t(m["a"],N()([{class:$(),attrs:{position:"bottom",round:e.round,value:e.value,overlay:e.overlay,duration:e.duration,lazyRender:e.lazyRender,lockScroll:e.lockScroll,getContainer:e.getContainer,closeOnPopstate:e.closeOnPopstate,closeOnClickOverlay:e.closeOnClickOverlay,safeAreaInsetBottom:e.safeAreaInsetBottom}},Object(D["b"])(n,!0)]),[l(),u(),t("div",{class:$("content")},[e.actions&&e.actions.map(r),null==i.default?void 0:i.default()]),h()])}P.props=Object(B["a"])({},_["b"],{title:String,actions:Array,duration:[Number,String],cancelText:String,description:String,getContainer:[String,Function],closeOnPopstate:Boolean,closeOnClickAction:Boolean,round:{type:Boolean,default:!0},closeable:{type:Boolean,default:!0},closeIcon:{type:String,default:"cross"},safeAreaInsetBottom:{type:Boolean,default:!0},overlay:{type:Boolean,default:!0},closeOnClickOverlay:{type:Boolean,default:!0}});var M=z(P),A=(i("4fbc"),i("ea8e")),J=Object(r["a"])("progress"),E=J[0],F=J[1],R=E({props:{color:String,inactive:Boolean,pivotText:String,textColor:String,pivotColor:String,trackColor:String,strokeWidth:[Number,String],percentage:{type:[Number,String],required:!0,validator:function(t){return t>=0&&t<=100}},showPivot:{type:Boolean,default:!0}},data:function(){return{pivotWidth:0,progressWidth:0}},mounted:function(){this.resize()},watch:{showPivot:"resize",pivotText:"resize"},methods:{resize:function(){var t=this;this.$nextTick((function(){t.progressWidth=t.$el.offsetWidth,t.pivotWidth=t.$refs.pivot?t.$refs.pivot.offsetWidth:0}))}},render:function(){var t=arguments[0],e=this.pivotText,i=this.percentage,n=null!=e?e:i+"%",o=this.showPivot&&n,a=this.inactive?"#cacaca":this.color,s={color:this.textColor,left:(this.progressWidth-this.pivotWidth)*i/100+"px",background:this.pivotColor||a},c={background:a,width:this.progressWidth*i/100+"px"},l={background:this.trackColor,height:Object(A["a"])(this.strokeWidth)};return t("div",{class:F(),style:l},[t("span",{class:F("portion"),style:c},[o&&t("span",{ref:"pivot",style:s,class:F("pivot")},[n])])])}}),q=(i("c3a6"),i("342a"),i("1437")),H=(i("5d17"),i("f9bd")),V=(i("d9d2"),{size:[Number,String],value:null,loading:Boolean,disabled:Boolean,activeColor:String,inactiveColor:String,activeValue:{type:null,default:!0},inactiveValue:{type:null,default:!1}}),Y=i("78eb"),U=Object(r["a"])("switch"),G=U[0],K=U[1],Q=G({mixins:[Y["a"]],props:V,computed:{checked:function(){return this.value===this.activeValue},style:function(){return{fontSize:Object(A["a"])(this.size),backgroundColor:this.checked?this.activeColor:this.inactiveColor}}},methods:{onClick:function(t){if(this.$emit("click",t),!this.disabled&&!this.loading){var e=this.checked?this.inactiveValue:this.activeValue;this.$emit("input",e),this.$emit("change",e)}},genLoading:function(){var t=this.$createElement;if(this.loading){var e=this.checked?this.activeColor:this.inactiveColor;return t(W["a"],{class:K("loading"),attrs:{color:e}})}}},render:function(){var t=arguments[0],e=this.checked,i=this.loading,n=this.disabled;return t("div",{class:K({on:e,loading:i,disabled:n}),attrs:{role:"switch","aria-checked":String(e)},style:this.style,on:{click:this.onClick}},[t("div",{class:K("node")},[this.genLoading()])])}}),X=(i("be7f"),i("565f")),Z=(i("66b9"),i("b650")),tt=(i("2e74"),i("1b40"));tt["a"].use(Z["a"]),tt["a"].use(X["a"]),tt["a"].use(Q),tt["a"].use(f["a"]),tt["a"].use(H["a"]),tt["a"].use(q["a"]),tt["a"].use(p["a"]),tt["a"].use(R),tt["a"].use(M),tt["a"].use(m["a"]),tt["a"].use(j),tt["a"].use(w),tt["a"].use(l["a"]),tt["a"].use(c["a"]);var et={name:"wishList",props:{msg:{type:String,default:"test msg"}},data:function(){var t;return t={balance:0,todayTime:0,wishList:[],activeNames:[],colorStyle:{checked:"green",circle:"",clear:"red",aim:""},show:!1,tempId:"",tempName:"",actions:[{name:"想想看",icon:"circle"},{name:"分期实现",icon:"aim"},{name:"实现心愿",icon:"checked"},{name:"暂时取消",icon:"clear"}]},Object(s["a"])(t,"show",!1),Object(s["a"])(t,"value","unfinished"),Object(s["a"])(t,"option",[{text:"全部心愿",value:"all"},{text:"未完成",value:"unfinished"},{text:"进行中",value:"aim"},{text:"考虑中",value:"circle"},{text:"已实现",value:"checked"},{text:"已放弃",value:"clear"}]),Object(s["a"])(t,"switch1",!1),Object(s["a"])(t,"switch2",!1),Object(s["a"])(t,"addWishShow",!1),Object(s["a"])(t,"wishName",""),Object(s["a"])(t,"wishPrice",""),Object(s["a"])(t,"achieveWishShow",!1),Object(s["a"])(t,"temp1","oneTime"),Object(s["a"])(t,"temp2","true"),Object(s["a"])(t,"temp3",""),Object(s["a"])(t,"temp4",""),Object(s["a"])(t,"temp5",""),Object(s["a"])(t,"temp6",""),Object(s["a"])(t,"temp7",""),Object(s["a"])(t,"temp8",""),Object(s["a"])(t,"switch3",!1),Object(s["a"])(t,"switch4",!1),Object(s["a"])(t,"switch5",!0),Object(s["a"])(t,"switch6",!1),t},methods:{chooseWish:function(t){this.show=!0,this.tempId=t.id,this.tempName=t.name,console.log("+++",t,t.payList);var e=0;for(var i in t.payList)e+=Number(t.payList[i]),console.log(t.payList[i],e);this.temp7=e,this.temp6=t.price,this.temp5=Number(this.temp6)-Number(this.temp7)},onSelect:function(t){if(Object(a["a"])(t.name),"aim"==t.icon)this.achieveWishShow=!0,this.temp1="month",this.temp8=t.icon;else if("checked"==t.icon)this.achieveWishShow=!0,this.temp1="oneTime",this.temp8=t.icon;else{for(var e in this.wishList)this.wishList[e]["id"]==this.tempId&&(this.wishList[e]["status"]=t.icon);localStorage.wishList=JSON.stringify(this.wishList)}this.show=!1},achieveWish:function(t,e,i,n,o,s,c){c++,c<10&&(c="0"+c);var l=String(s)+String(c);if(t)if(0==e&!i)Object(a["a"])("请输入每期金额"),document.querySelector("#temp3").focus();else if(0==e&!n)Object(a["a"])("请输入期数"),document.querySelector("#temp4").focus();else if(o){for(var r in this.wishList)this.wishList[r]["id"]==this.tempId&&(this.wishList[r]["name"]=t,this.wishList[r]["payment"]=Number(i),this.wishList[r]["price"]=Number(o),this.wishList[r]["payList"][l]?this.wishList[r]["payList"][l]+=Number(""==i?o:i):this.wishList[r]["payList"][l]=Number(""==i?o:i),this.wishList[r]["status"]=this.temp8,"checked"==this.temp8&&(this.wishList[r]["finishDate"]=this.todayTime));localStorage.wishList=JSON.stringify(this.wishList),Object(a["a"])("添加成功!"),this.achieveWishShow=!1,this.switch3="false",this.switch4="false",this.switch5="false",this.tempName="",this.temp3=""}else Object(a["a"])("请输入待付金额"),document.querySelector("#temp5").focus();else Object(a["a"])("请输入开支名"),document.querySelector("#temp1").focus()},changeSwitch:function(t){0==this[t]?this[t]=!0:1==this[t]&&(this[t]=!1)},changeIcon:function(t,e,i){for(var n in this.wishList)this.wishList[n]["id"]==i&&(this.wishList[n][e]="circle"==t?"checked":"checked"==t?"clear":"circle");localStorage.wishList=JSON.stringify(this.wishList)},onCancel:function(){Object(a["a"])("取消")},showPopup:function(t){this[t]=!0},onConfirm:function(){this.$refs.item.toggle()},addWish:function(t,e){var i=JSON.parse(localStorage.wishList),n=JSON.parse(localStorage.userData);n.wishId+=1,i.push({id:n.wishId,status:"circle",name:t,price:Number(e),payment:0,payList:{},addDate:this.todayTime,finishDate:"",ps:"",noWaste:"circle",saveTime:"circle",saveMoney:"circle"}),this.addWishShow=!1,this.wishName="",this.wishPrice="",localStorage.userData=JSON.stringify(n),localStorage.wishList=JSON.stringify(i),this.wishList=JSON.parse(localStorage.wishList),Object(a["a"])("添加成功！")},formatLongDate:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;t=new Date(t);var i=t.getFullYear(),n=t.getMonth()+1,o=t.getDate(),a=t.getHours(),s=t.getMinutes(),c=t.getSeconds();n<10&&(n="0"+n),o<10&&(o="0"+o),a<10&&(a="0"+a),s<10&&(s="0"+s),c<10&&(c="0"+c);var l="";return l=1==e?i+"-"+n+"-"+o:2==e?i+n:i+""+n+o+" "+a+":"+s+":"+c,l},sumList:function(t){var e=0;for(var i in t)e+=Number(t[i]);return e}},watch:{temp3:function(t,e){var i=this;0==this.switch6&&(1==this.switch4&&0==this.switch5?this.temp5=this.temp4*t==0?"":this.temp4*t:(1==this.switch5&&0==this.switch4||""!=this.temp4&""!=this.temp5)&&(this.temp4=0==Math.ceil(this.temp5/t)?"":Math.ceil(this.temp5/t)),this.switch6=!0,setTimeout((function(){i.switch6=!1}),20)),""==t&&(this.switch3=!1)},temp4:function(t,e){var i=this;0==this.switch6&&(1==this.switch3&&0==this.switch5?this.temp5=this.temp3*t==0?"":this.temp3*t:(1==this.switch5&&0==this.switch3||""!=this.temp3&""!=this.temp5)&&(this.temp3=0==Math.ceil(this.temp5/t)?"":Math.ceil(this.temp5/t)),this.switch6=!0,setTimeout((function(){i.switch6=!1}),20)),""==t&&(this.switch4=!1)},temp5:function(t,e){var i=this;0==this.switch6&&(1==this.switch3&&0==this.switch4?this.temp4=0==Math.ceil(t/this.temp3)?"":Math.ceil(t/this.temp3):1==this.switch4&&0==this.switch3?this.temp3=0==Math.ceil(t/this.temp4)?"":Math.ceil(t/this.temp4):""!=this.temp3&""!=this.temp4&&(this.temp4=0==Math.ceil(t/this.temp3)?"":Math.ceil(t/this.temp3)),this.temp6=Number(this.temp7)+Number(t),this.switch6=!0,setTimeout((function(){i.switch6=!1}),20)),""==t&&(this.switch5=!1)},temp6:function(t,e){0==this.switch6&&(this.temp5=Number(t)-Number(this.temp7))}},computed:{evenWishList:function(){var t=this;if("all"==this.value){var e=this.wishList.filter((function(t){return"aim"===t.status}));return e=e.concat(this.wishList.filter((function(t){return"circle"===t.status}))),e=e.concat(this.wishList.filter((function(t){return"checked"===t.status}))),e=e.concat(this.wishList.filter((function(t){return"clear"===t.status}))),e}if("unfinished"==this.value){var i=this.wishList.filter((function(t){return"aim"===t.status}));return i=i.concat(this.wishList.filter((function(t){return"circle"===t.status}))),i}return this.wishList.filter((function(e){return e.status===t.value}))}},beforeCreate:function(){console.log("beforeCreate")},created:function(){console.log("created"),this.todayTime=new Date(parseInt((new Date).getTime()));var t=this.todayTime.getFullYear(),e=this.todayTime.getMonth(),i=this.todayTime.getDate(),n=JSON.parse(localStorage.billData);this.wishList=JSON.parse(localStorage.wishList),this.balance=it(n,t,e,i)},beforeMount:function(){console.log("beforeMount")},mounted:function(){console.log("mounted")},beforeUpdate:function(){console.log("beforeUpdate"),this.todayTime=new Date(parseInt((new Date).getTime()))},updated:function(){console.log("updated")},beforeDestroy:function(){console.log("beforeDestroy")},destroyed:function(){console.log("destroyed")}};function it(t,e,i,n){var o=0;for(var a in t)a<e&&(o+=Number(t[a]["data"]["yearBalance"]));for(var s in t[e]["list"])s<i&&(o+=Number(t[e]["list"][s]["data"]["monthBalance"]));for(var c in t[e]["list"][i]["list"])c<=n&&(o+=Number(t[e]["list"][i]["list"][c]["data"]["dateBalance"]));return o>0?o=parseInt(10*o+.1)/10:o<0&&(o=parseInt(10*o-.1)/10),o}var nt=et,ot=(i("119a"),i("2877")),at=Object(ot["a"])(nt,n,o,!1,null,null,null);e["default"]=at.exports},"5d2f":function(t,e,i){},"5fb1":function(t,e,i){"use strict";i("5d2f")},7333:function(t,e,i){},8400:function(t,e,i){},"99af":function(t,e,i){"use strict";var n=i("23e7"),o=i("d039"),a=i("e8b5"),s=i("861d"),c=i("7b0b"),l=i("50c4"),r=i("8418"),h=i("65f0"),u=i("1dde"),d=i("b622"),f=i("2d00"),p=d("isConcatSpreadable"),m=9007199254740991,v="Maximum allowed index exceeded",b=f>=51||!o((function(){var t=[];return t[p]=!1,t.concat()[0]!==t})),g=u("concat"),w=function(t){if(!s(t))return!1;var e=t[p];return void 0!==e?!!e:a(t)},y=!b||!g;n({target:"Array",proto:!0,forced:y},{concat:function(t){var e,i,n,o,a,s=c(this),u=h(s,0),d=0;for(e=-1,n=arguments.length;e<n;e++)if(a=-1===e?s:arguments[e],w(a)){if(o=l(a.length),d+o>m)throw TypeError(v);for(i=0;i<o;i++,d++)i in a&&r(u,d,a[i])}else{if(d>=m)throw TypeError(v);r(u,d++,a)}return u.length=d,u}})},aec8:function(t,e,i){},b0c0:function(t,e,i){var n=i("83ab"),o=i("9bf2").f,a=Function.prototype,s=a.toString,c=/^\s*function ([^ (]*)/,l="name";n&&!(l in a)&&o(a,l,{configurable:!0,get:function(){try{return s.call(this).match(c)[1]}catch(t){return""}}})},b2cc:function(t,e,i){},d9d2:function(t,e,i){}}]);
//# sourceMappingURL=about.8a98ff64.js.map