(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"0a4e":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"mine"},[i("h1",[t._v("This is a mine page")]),i("div",[t._v(" 设置每日预算: "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.budjet,expression:"budjet"}],attrs:{type:"number",placeholder:"设置每日预算"},domProps:{value:t.budjet},on:{input:function(e){e.target.composing||(t.budjet=e.target.value)}}}),i("button",{on:{click:function(e){return t.changeBudjet()}}},[t._v("调整")])]),i("br"),i("div",[t._v("总余额:"+t._s(t.balance))])])},n=[],s=(i("a9e3"),i("1b40"),{name:"mine",props:{msg:{type:String,default:"test msg"}},data:function(){return{balance:0,todayBalance:0,cost:"",typeId:"a",typeList:[{name:"餐饮",id:"a"},{name:"住房生活",id:"b"},{name:"服饰美容",id:"c"},{name:"交通",id:"d"},{name:"购物",id:"e"},{name:"学习",id:"f"},{name:"娱乐",id:"g"},{name:"旅游",id:"h"},{name:"亲子",id:"i"},{name:"宠物",id:"j"},{name:"医疗",id:"k"},{name:"红包",id:"l"},{name:"礼物",id:"m"},{name:"保险",id:"n"},{name:"投资",id:"o"},{name:"意外",id:"p"},{name:"其他",id:"q"}],checkList:{a:"餐饮",b:"住房生活",c:"服饰美容",d:"交通",e:"购物",f:"学习",g:"娱乐",h:"旅游",i:"亲子",j:"宠物",k:"医疗",l:"红包",m:"礼物",n:"保险",o:"投资",p:"意外",q:"其他"},bill:[],todayTime:"",time:"",budjet:400,todayBudjet:0}},methods:{changeBudjet:function(){if(this.budjet>=0){var t=JSON.parse(localStorage.userData);t.budjet=this.budjet,localStorage.userData=JSON.stringify(t)}else alert("预算不能为负数哦~")}},beforeCreate:function(){console.log("beforeCreate")},created:function(){console.log("created"),this.todayTime=new Date(parseInt((new Date).getTime()));var t=this.todayTime.getFullYear(),e=this.todayTime.getMonth(),i=this.todayTime.getDate(),a=JSON.parse(localStorage.userData),n=JSON.parse(localStorage.billData);this.balance=o(n,t,e,i),this.budjet=a.budjet},beforeMount:function(){console.log("beforeMount")},mounted:function(){console.log("mounted");for(var t=0;t<5;t++)console.log(t)},beforeUpdate:function(){console.log("beforeUpdate"),this.todayTime=new Date(parseInt((new Date).getTime()))},updated:function(){console.log("updated")},beforeDestroy:function(){console.log("beforeDestroy")},destroyed:function(){console.log("destroyed")}});function o(t,e,i,a){var n=0;for(var s in t)s<e&&(n+=Number(t[s]["data"]["yearBalance"]));for(var o in t[e]["list"])o<i&&(n+=Number(t[e]["list"][o]["data"]["monthBalance"]));for(var c in t[e]["list"][i]["list"])c<=a&&(n+=Number(t[e]["list"][i]["list"][c]["data"]["dateBalance"]));return n>0?n=parseInt(10*n+.1)/10:n<0&&(n=parseInt(10*n-.1)/10),n}var c=s,r=(i("5fb1"),i("2877")),l=Object(r["a"])(c,a,n,!1,null,null,null);e["default"]=l.exports},"119a":function(t,e,i){"use strict";i("7333")},"4de4":function(t,e,i){"use strict";var a=i("23e7"),n=i("b727").filter,s=i("1dde"),o=i("ae40"),c=s("filter"),r=o("filter");a({target:"Array",proto:!0,forced:!c||!r},{filter:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}})},"4fbc":function(t,e,i){},"57d2":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"wishList"},[t._m(0),i("div",{staticStyle:{display:"flex"}},[i("van-dropdown-menu",{staticStyle:{width:"75vw"}},[i("van-dropdown-item",{attrs:{options:t.option},on:{change:function(e){t.activeNames=[]}},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}}),i("van-dropdown-item",{ref:"item",attrs:{title:"筛选?"}},[i("van-cell",{staticStyle:{"text-align":"left"},attrs:{center:"",title:"包邮?"},scopedSlots:t._u([{key:"right-icon",fn:function(){return[i("van-switch",{attrs:{size:"24","active-color":"#ee0a24"},model:{value:t.switch1,callback:function(e){t.switch1=e},expression:"switch1"}})]},proxy:!0}])}),i("van-cell",{staticStyle:{"text-align":"left"},attrs:{center:"",title:"团购?"},scopedSlots:t._u([{key:"right-icon",fn:function(){return[i("van-switch",{attrs:{size:"24","active-color":"#ee0a24"},model:{value:t.switch2,callback:function(e){t.switch2=e},expression:"switch2"}})]},proxy:!0}])}),i("div",{staticStyle:{padding:"5px 16px"}},[i("van-button",{attrs:{type:"danger",block:"",round:""},on:{click:t.onConfirm}},[t._v(" 确认 ")])],1)],1)],1),i("div",{staticStyle:{display:"flex",width:"25vw","align-self":"center","justify-content":"center"}},[i("div",{staticStyle:{width:"15vw",height:"8vw","line-height":"8vw","background-color":"#fff","border-radius":"5vw"},on:{click:function(e){return t.showPopup("addWishShow")}}},[t._v(" +添加 ")])])],1),i("van-collapse",{model:{value:t.activeNames,callback:function(e){t.activeNames=e},expression:"activeNames"}},t._l(t.evenWishList,(function(e,a){return i("van-collapse-item",{attrs:{name:a},scopedSlots:t._u([{key:"title",fn:function(){return[i("div",{staticStyle:{display:"flex","flex-direction":"row"}},[i("div",{staticStyle:{width:"6vw"}},[i("van-icon",{class:t.colorStyle[e.status],attrs:{name:e.status},on:{click:function(i){i.stopPropagation(),t.show=!0,t.tempId=e.id,t.tempName=e.name,t.temp5=e.price}}})],1),i("div",{staticStyle:{width:"36vw",overflow:"hidden","white-space":"nowrap",margin:"0 6vw 0 2vw"}},[t._v(t._s(e.name))]),i("div",{staticStyle:{width:"35vw",display:"flex","flex-direction":"row","white-space":"nowrap",border:"2px solid #ccc"},style:{display:"aim"==e.status?"unset":"none"}},[i("div",{staticStyle:{"background-color":"#aaffaa",height:"100%",float:"left",position:"relative"},style:{width:e.payment/e.price*35+"vw"}}),i("div",{staticStyle:{width:"35vw",position:"absolute"}},[t._v(" ￥"+t._s(e.payment)+"/"+t._s(e.price)+" ")])]),i("div",{staticStyle:{width:"35vw"},style:{display:"aim"==e.status?"none":"unset"}},[t._v(" ￥"+t._s(e.price)+" ")])])]},proxy:!0}],null,!0)},[i("div",{staticStyle:{display:"flex","background-color":"#fff","border-bottom":"1px solid #eee"}},[i("div",{staticStyle:{margin:"0 5vw"}},[t._v(" 添加日期: "),i("br"),t._v(" "+t._s(t.formatLongDate(e.addDate,1))+" ")]),i("div",{style:{display:"clear"==e.status||"checked"==e.status?"unset":"none"}},[t._v(" 完成日期: "),i("br"),t._v(" "+t._s(t.formatLongDate(e.finishDate,1))+" ")])]),i("div",{staticStyle:{margin:"2vw 0"}},[i("span",{on:{click:function(i){return t.changeIcon(e.saveMoney,"saveMoney",e.id)}}},[i("van-icon",{class:t.colorStyle[e.saveMoney],attrs:{name:e.saveMoney}}),t._v(" 省钱？ ")],1),i("span",{on:{click:function(i){return t.changeIcon(e.noWaste,"noWaste",e.id)}}},[i("van-icon",{class:t.colorStyle[e.noWaste],attrs:{name:e.noWaste}}),t._v(" 不浪费？ ")],1),i("span",{on:{click:function(i){return t.changeIcon(e.saveTime,"saveTime",e.id)}}},[i("van-icon",{class:t.colorStyle[e.saveTime],attrs:{name:e.saveTime}}),t._v(" 省时间？ ")],1)])])})),1),i("van-action-sheet",{attrs:{actions:t.actions,"cancel-text":"取消","close-on-click-action":""},on:{cancel:t.onCancel,select:t.onSelect},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}}),i("van-popup",{staticStyle:{height:"28vh","justify-content":"space-between","flex-direction":"column"},style:{display:t.addWishShow?"flex":"none"},attrs:{position:"bottom"},model:{value:t.addWishShow,callback:function(e){t.addWishShow=e},expression:"addWishShow"}},[i("div",{staticStyle:{"background-color":"#f1f1f1",padding:"1.5vh"}},[t._v("添加愿望")]),i("div",[i("van-field",{staticStyle:{"line-height":"8vw"},attrs:{label:"愿望",placeholder:"请输入愿望名"},model:{value:t.wishName,callback:function(e){t.wishName=e},expression:"wishName"}}),i("van-field",{staticStyle:{"line-height":"8vw"},attrs:{type:"number",label:"金额",placeholder:"请输入金额"},model:{value:t.wishPrice,callback:function(e){t.wishPrice=e},expression:"wishPrice"}})],1),i("van-button",{staticStyle:{width:"30vw",margin:"0 0 4vh 35vw"},attrs:{type:"primary",round:"",size:"normal"},on:{click:function(e){return t.addWish(t.wishName,t.wishPrice)}}},[t._v("提交")])],1),i("van-popup",{style:{height:"50vh","justify-content":"space-between",display:t.addOptionalSpendingShow?"flex":"none","flex-direction":"column"},attrs:{position:"bottom"},model:{value:t.addOptionalSpendingShow,callback:function(e){t.addOptionalSpendingShow=e},expression:"addOptionalSpendingShow"}},[i("div",{staticStyle:{"background-color":"#f1f1f1",padding:"1.5vh"}},[t._v("添加可选开支")]),i("div",[i("van-field",{staticStyle:{height:"10vw","line-height":"10vw"},attrs:{id:"",label:"支出项目",placeholder:"请输入支出项目名",readonly:!0},model:{value:t.tempName,callback:function(e){t.tempName=e},expression:"tempName"}}),i("van-field",{staticStyle:{"line-height":"10vw",height:"10vw"},attrs:{name:"radio1",label:"缴费周期"},scopedSlots:t._u([{key:"input",fn:function(){return[i("van-radio-group",{attrs:{direction:"horizontal",disabled:""},model:{value:t.temp1,callback:function(e){t.temp1=e},expression:"temp1"}},[i("van-radio",{attrs:{name:"oneTime"}},[t._v("一次性")]),i("van-radio",{attrs:{name:"month"}},[t._v("每月")])],1)]},proxy:!0}])}),i("van-field",{staticStyle:{"line-height":"8vw"},style:{display:"oneTime"==t.temp1?"none":""},attrs:{id:"temp3",type:"number",label:"每期金额",placeholder:"请输入每期金额"},on:{blur:function(e){0==t.switch3&""!=t.temp3&&t.changeSwitch("switch3")}},model:{value:t.temp3,callback:function(e){t.temp3=e},expression:"temp3"}}),i("van-field",{staticStyle:{"line-height":"8vw"},style:{display:"oneTime"==t.temp1?"none":""},attrs:{id:"temp4",type:"digit",label:"期数",placeholder:"请输入期数"},on:{blur:function(e){0==t.switch4&""!=t.temp4&&t.changeSwitch("switch4")}},model:{value:t.temp4,callback:function(e){t.temp4=e},expression:"temp4"}}),i("van-field",{staticStyle:{"line-height":"8vw"},attrs:{id:"temp5",type:"number",label:"总金额",placeholder:"请输入总金额"},on:{blur:function(e){0==t.switch5&""!=t.temp5&&t.changeSwitch("switch5")}},model:{value:t.temp5,callback:function(e){t.temp5=e},expression:"temp5"}})],1),i("van-button",{staticStyle:{width:"30vw",margin:"0 0 4vh 35vw"},attrs:{type:"primary",round:"",size:"normal"},on:{click:function(e){t.addOptionalSpending(t.tempName,t.temp1,!1,t.temp3,t.temp4,t.temp5,t.todayTime.getFullYear(),t.todayTime.getMonth())}}},[t._v("提交")])],1)],1)},n=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"header"}},[i("div",{staticStyle:{height:"5vw"}}),i("div",{staticStyle:{height:"15vw","line-height":"15vw"}},[t._v("心愿清单")])])}],s=(i("99af"),i("4de4"),i("b0c0"),i("a9e3"),i("e7e5"),i("d399")),o=i("ade3"),c=(i("4ddd"),i("9f14")),r=(i("a44c"),i("e27c")),l=(i("68ef"),i("a71a"),i("9d70"),i("3743"),i("1a04"),i("4d75"),i("b2cc"),i("d282")),d=i("1325"),h=i("1421"),u=i("9884"),p=i("7744"),f=i("ad06"),m=i("e41f"),v=Object(l["a"])("dropdown-item"),w=v[0],g=v[1],b=w({mixins:[Object(h["a"])({ref:"wrapper"}),Object(u["a"])("vanDropdownMenu")],props:{value:null,title:String,disabled:Boolean,titleClass:String,options:{type:Array,default:function(){return[]}},lazyRender:{type:Boolean,default:!0}},data:function(){return{transition:!0,showPopup:!1,showWrapper:!1}},computed:{displayTitle:function(){var t=this;if(this.title)return this.title;var e=this.options.filter((function(e){return e.value===t.value}));return e.length?e[0].text:""}},watch:{showPopup:function(t){this.bindScroll(t)}},beforeCreate:function(){var t=this,e=function(e){return function(){return t.$emit(e)}};this.onOpen=e("open"),this.onClose=e("close"),this.onOpened=e("opened")},methods:{toggle:function(t,e){void 0===t&&(t=!this.showPopup),void 0===e&&(e={}),t!==this.showPopup&&(this.transition=!e.immediate,this.showPopup=t,t&&(this.parent.updateOffset(),this.showWrapper=!0))},bindScroll:function(t){var e=this.parent.scroller,i=t?d["b"]:d["a"];i(e,"scroll",this.onScroll,!0)},onScroll:function(){this.parent.updateOffset()},onClickWrapper:function(t){this.getContainer&&t.stopPropagation()}},render:function(){var t=this,e=arguments[0],i=this.parent,a=i.zIndex,n=i.offset,s=i.overlay,o=i.duration,c=i.direction,r=i.activeColor,l=i.closeOnClickOverlay,d=this.options.map((function(i){var a=i.value===t.value;return e(p["a"],{attrs:{clickable:!0,icon:i.icon,title:i.text},key:i.value,class:g("option",{active:a}),style:{color:a?r:""},on:{click:function(){t.showPopup=!1,i.value!==t.value&&(t.$emit("input",i.value),t.$emit("change",i.value))}}},[a&&e(f["a"],{class:g("icon"),attrs:{color:r,name:"success"}})])})),h={zIndex:a};return"down"===c?h.top=n+"px":h.bottom=n+"px",e("div",[e("div",{directives:[{name:"show",value:this.showWrapper}],ref:"wrapper",style:h,class:g([c]),on:{click:this.onClickWrapper}},[e(m["a"],{attrs:{overlay:s,position:"down"===c?"top":"bottom",duration:this.transition?o:0,lazyRender:this.lazyRender,overlayStyle:{position:"absolute"},closeOnClickOverlay:l},class:g("content"),on:{open:this.onOpen,close:this.onClose,opened:this.onOpened,closed:function(){t.showWrapper=!1,t.$emit("closed")}},model:{value:t.showPopup,callback:function(e){t.showPopup=e}}},[d,this.slots("default")])])])}}),y=(i("aec8"),i("a142")),S=i("a8c1"),O=i("b222"),k=Object(l["a"])("dropdown-menu"),x=k[0],j=k[1],T=x({mixins:[Object(u["b"])("vanDropdownMenu"),Object(O["a"])({event:"click",method:"onClickOutside"})],props:{zIndex:[Number,String],activeColor:String,overlay:{type:Boolean,default:!0},duration:{type:[Number,String],default:.2},direction:{type:String,default:"down"},closeOnClickOverlay:{type:Boolean,default:!0}},data:function(){return{offset:0}},computed:{scroller:function(){return Object(S["b"])(this.$el)},opened:function(){return this.children.some((function(t){return t.showWrapper}))},barStyle:function(){if(this.opened&&Object(y["c"])(this.zIndex))return{zIndex:1+this.zIndex}}},methods:{updateOffset:function(){if(this.$refs.bar){var t=this.$refs.bar.getBoundingClientRect();"down"===this.direction?this.offset=t.bottom:this.offset=window.innerHeight-t.top}},toggleItem:function(t){this.children.forEach((function(e,i){i===t?e.toggle():e.showPopup&&e.toggle(!1,{immediate:!0})}))},onClickOutside:function(){this.children.forEach((function(t){t.toggle(!1)}))}},render:function(){var t=this,e=arguments[0],i=this.children.map((function(i,a){return e("div",{attrs:{role:"button",tabindex:i.disabled?-1:0},class:j("item",{disabled:i.disabled}),on:{click:function(){i.disabled||t.toggleItem(a)}}},[e("span",{class:[j("title",{active:i.showPopup,down:i.showPopup===("down"===t.direction)}),i.titleClass],style:{color:i.showPopup?t.activeColor:""}},[e("div",{class:"van-ellipsis"},[i.slots("title")||i.displayTitle])])])}));return e("div",{class:j()},[e("div",{ref:"bar",style:this.barStyle,class:j("bar",{opened:this.opened})},[i]),this.slots("default")])}}),N=(i("8a58"),i("e3b3"),i("8400"),i("c31d")),C=i("2638"),L=i.n(C),M=i("2b0e"),D=i("ba31"),_=i("6605"),W=i("543e"),I=Object(l["a"])("action-sheet"),P=I[0],B=I[1];function z(t,e,i,a){var n=e.title,s=e.cancelText,o=e.closeable;function c(){Object(D["a"])(a,"input",!1),Object(D["a"])(a,"cancel")}function r(){if(n)return t("div",{class:B("header")},[n,o&&t(f["a"],{attrs:{name:e.closeIcon},class:B("close"),on:{click:c}})])}function l(i,n){var s=i.disabled,o=i.loading,c=i.callback;function r(t){t.stopPropagation(),s||o||(c&&c(i),e.closeOnClickAction&&Object(D["a"])(a,"input",!1),M["a"].nextTick((function(){Object(D["a"])(a,"select",i,n)})))}function l(){return o?t(W["a"],{class:B("loading-icon")}):[t("span",{class:B("name")},[i.name]),i.subname&&t("div",{class:B("subname")},[i.subname])]}return t("button",{attrs:{type:"button"},class:[B("item",{disabled:s,loading:o}),i.className],style:{color:i.color},on:{click:r}},[l()])}function d(){if(s)return[t("div",{class:B("gap")}),t("button",{attrs:{type:"button"},class:B("cancel"),on:{click:c}},[s])]}function h(){var a=(null==i.description?void 0:i.description())||e.description;if(a)return t("div",{class:B("description")},[a])}return t(m["a"],L()([{class:B(),attrs:{position:"bottom",round:e.round,value:e.value,overlay:e.overlay,duration:e.duration,lazyRender:e.lazyRender,lockScroll:e.lockScroll,getContainer:e.getContainer,closeOnPopstate:e.closeOnPopstate,closeOnClickOverlay:e.closeOnClickOverlay,safeAreaInsetBottom:e.safeAreaInsetBottom}},Object(D["b"])(a,!0)]),[r(),h(),t("div",{class:B("content")},[e.actions&&e.actions.map(l),null==i.default?void 0:i.default()]),d()])}z.props=Object(N["a"])({},_["b"],{title:String,actions:Array,duration:[Number,String],cancelText:String,description:String,getContainer:[String,Function],closeOnPopstate:Boolean,closeOnClickAction:Boolean,round:{type:Boolean,default:!0},closeable:{type:Boolean,default:!0},closeIcon:{type:String,default:"cross"},safeAreaInsetBottom:{type:Boolean,default:!0},overlay:{type:Boolean,default:!0},closeOnClickOverlay:{type:Boolean,default:!0}});var J=P(z),$=(i("4fbc"),i("ea8e")),E=Object(l["a"])("progress"),A=E[0],G=E[1],q=A({props:{color:String,inactive:Boolean,pivotText:String,textColor:String,pivotColor:String,trackColor:String,strokeWidth:[Number,String],percentage:{type:[Number,String],required:!0,validator:function(t){return t>=0&&t<=100}},showPivot:{type:Boolean,default:!0}},data:function(){return{pivotWidth:0,progressWidth:0}},mounted:function(){this.resize()},watch:{showPivot:"resize",pivotText:"resize"},methods:{resize:function(){var t=this;this.$nextTick((function(){t.progressWidth=t.$el.offsetWidth,t.pivotWidth=t.$refs.pivot?t.$refs.pivot.offsetWidth:0}))}},render:function(){var t=arguments[0],e=this.pivotText,i=this.percentage,a=null!=e?e:i+"%",n=this.showPivot&&a,s=this.inactive?"#cacaca":this.color,o={color:this.textColor,left:(this.progressWidth-this.pivotWidth)*i/100+"px",background:this.pivotColor||s},c={background:s,width:this.progressWidth*i/100+"px"},r={background:this.trackColor,height:Object($["a"])(this.strokeWidth)};return t("div",{class:G(),style:r},[t("span",{class:G("portion"),style:c},[n&&t("span",{ref:"pivot",style:o,class:G("pivot")},[a])])])}}),F=(i("c3a6"),i("342a"),i("1437")),R=(i("5d17"),i("f9bd")),V=(i("d9d2"),{size:[Number,String],value:null,loading:Boolean,disabled:Boolean,activeColor:String,inactiveColor:String,activeValue:{type:null,default:!0},inactiveValue:{type:null,default:!1}}),U=i("78eb"),Y=Object(l["a"])("switch"),H=Y[0],K=Y[1],Q=H({mixins:[U["a"]],props:V,computed:{checked:function(){return this.value===this.activeValue},style:function(){return{fontSize:Object($["a"])(this.size),backgroundColor:this.checked?this.activeColor:this.inactiveColor}}},methods:{onClick:function(t){if(this.$emit("click",t),!this.disabled&&!this.loading){var e=this.checked?this.inactiveValue:this.activeValue;this.$emit("input",e),this.$emit("change",e)}},genLoading:function(){var t=this.$createElement;if(this.loading){var e=this.checked?this.activeColor:this.inactiveColor;return t(W["a"],{class:K("loading"),attrs:{color:e}})}}},render:function(){var t=arguments[0],e=this.checked,i=this.loading,a=this.disabled;return t("div",{class:K({on:e,loading:i,disabled:a}),attrs:{role:"switch","aria-checked":String(e)},style:this.style,on:{click:this.onClick}},[t("div",{class:K("node")},[this.genLoading()])])}}),X=(i("be7f"),i("565f")),Z=(i("66b9"),i("b650")),tt=(i("2e74"),i("1b40"));tt["a"].use(Z["a"]),tt["a"].use(X["a"]),tt["a"].use(Q),tt["a"].use(p["a"]),tt["a"].use(R["a"]),tt["a"].use(F["a"]),tt["a"].use(f["a"]),tt["a"].use(q),tt["a"].use(J),tt["a"].use(m["a"]),tt["a"].use(T),tt["a"].use(b),tt["a"].use(r["a"]),tt["a"].use(c["a"]);var et={name:"wishList",props:{msg:{type:String,default:"test msg"}},data:function(){var t;return t={balance:0,todayTime:0,wishList:[],activeNames:[],colorStyle:{checked:"green",circle:"",clear:"red",aim:""},show:!1,tempId:"",tempName:"",actions:[{name:"待定",icon:"circle"},{name:"执行中...",icon:"aim"},{name:"完成",icon:"checked"},{name:"取消",icon:"clear"}]},Object(o["a"])(t,"show",!1),Object(o["a"])(t,"value","unfinished"),Object(o["a"])(t,"option",[{text:"全部心愿",value:"all"},{text:"未完成",value:"unfinished"},{text:"进行中",value:"aim"},{text:"考虑中",value:"circle"},{text:"已实现",value:"checked"},{text:"已放弃",value:"clear"}]),Object(o["a"])(t,"switch1",!1),Object(o["a"])(t,"switch2",!1),Object(o["a"])(t,"addWishShow",!1),Object(o["a"])(t,"wishName",""),Object(o["a"])(t,"wishPrice",""),Object(o["a"])(t,"addOptionalSpendingShow",!1),Object(o["a"])(t,"temp1","oneTime"),Object(o["a"])(t,"temp2","true"),Object(o["a"])(t,"temp3",""),Object(o["a"])(t,"temp4",""),Object(o["a"])(t,"temp5",""),Object(o["a"])(t,"switch3",!1),Object(o["a"])(t,"switch4",!1),Object(o["a"])(t,"switch5",!0),Object(o["a"])(t,"switch6",!1),t},methods:{addOptionalSpending:function(t,e,i,a,n,c,r,l){l++,l<10&&(l="0"+l);var d=String(r)+String(l);if(t)if(0==e&!a)Object(s["a"])("请输入每期金额"),document.querySelector("#temp3").focus();else if(0==e&!n)Object(s["a"])("请输入期数"),document.querySelector("#temp4").focus();else if(c){var h=JSON.parse(localStorage.inExData);for(var u in h["optionalSpendingList"].push({name:t,period:e,sustainable:i,payment:a,price:c,y:r,m:l,payList:Object(o["a"])({},""+r+l,a),status:"oneTime"==e||1==n?"finish":"going"}),Object(s["a"])("添加成功!"),this.optionalSpendingList=h["optionalSpendingList"],this.optionalSpending=updateOptionalSpending(d,this.optionalSpendingList),localStorage.inExData=JSON.stringify(h),this.temp11="",this.temp12="oneTime",this.temp13="true",this.temp14="",this.temp15="",this.temp16="",this.addOptionalSpendingShow=!1,this.switch3="false",this.switch4="false",this.switch5="false",this.tempName="",this.wishList)this.wishList[u]["id"]==this.tempId&&(this.wishList[u]["status"]="aim");localStorage.wishList=JSON.stringify(this.wishList)}else Object(s["a"])("请输入总金额"),document.querySelector("#temp5").focus();else Object(s["a"])("请输入开支名")},changeSwitch:function(t){0==this[t]?this[t]=!0:1==this[t]&&(this[t]=!1)},changeIcon:function(t,e,i){for(var a in this.wishList)this.wishList[a]["id"]==i&&(this.wishList[a][e]="circle"==t?"checked":"checked"==t?"clear":"circle");localStorage.wishList=JSON.stringify(this.wishList)},onCancel:function(){Object(s["a"])("取消")},showPopup:function(t){this[t]=!0},onSelect:function(t){if(Object(s["a"])(t.name),"aim"==t.icon)this.addOptionalSpendingShow=!0,this.temp1="month";else if("checked"==t.icon)this.addOptionalSpendingShow=!0,this.temp1="oneTime";else{for(var e in this.wishList)this.wishList[e]["id"]==this.tempId&&(this.wishList[e]["status"]=t.icon);localStorage.wishList=JSON.stringify(this.wishList)}this.show=!1},onConfirm:function(){this.$refs.item.toggle()},addWish:function(t,e){var i=JSON.parse(localStorage.wishList),a=JSON.parse(localStorage.userData);a.wishId+=1,i.push({id:a.wishId,status:"circle",name:t,price:e,payment:[],addDate:this.todayTime,finishDate:"",ps:"",noWaste:"circle",saveTime:"circle",saveMoney:"circle"}),this.addWishShow=!1,this.wishName="",this.wishPrice="",localStorage.userData=JSON.stringify(a),localStorage.wishList=JSON.stringify(i),this.wishList=JSON.parse(localStorage.wishList),Object(s["a"])("添加成功！")},formatLongDate:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;t=new Date(t);var i=t.getFullYear(),a=t.getMonth()+1,n=t.getDate(),s=t.getHours(),o=t.getMinutes(),c=t.getSeconds();a<10&&(a="0"+a),n<10&&(n="0"+n),s<10&&(s="0"+s),o<10&&(o="0"+o),c<10&&(c="0"+c);var r="";return r=1==e?i+"-"+a+"-"+n:2==e?i+a:i+""+a+n+" "+s+":"+o+":"+c,r}},watch:{temp3:function(t,e){var i=this;0==this.switch6&&(1==this.switch4&&0==this.switch5?this.temp5=this.temp4*t==0?"":this.temp4*t:(1==this.switch5&&0==this.switch4||""!=this.temp4&""!=this.temp5)&&(this.temp4=0==Math.ceil(this.temp5/t)?"":Math.ceil(this.temp5/t)),this.switch6=!0,setTimeout((function(){i.switch6=!1}),20)),""==t&&(this.switch3=!1)},temp4:function(t,e){var i=this;0==this.switch6&&(1==this.switch3&&0==this.switch5?this.temp5=this.temp3*t==0?"":this.temp3*t:(1==this.switch5&&0==this.switch3||""!=this.temp3&""!=this.temp5)&&(this.temp3=0==Math.ceil(this.temp5/t)?"":Math.ceil(this.temp5/t)),this.switch6=!0,setTimeout((function(){i.switch6=!1}),20)),""==t&&(this.switch4=!1)},temp5:function(t,e){var i=this;0==this.switch6&&(1==this.switch3&&0==this.switch4?this.temp4=0==Math.ceil(t/this.temp3)?"":Math.ceil(t/this.temp3):1==this.switch4&&0==this.switch3?this.temp3=0==Math.ceil(t/this.temp4)?"":Math.ceil(t/this.temp4):""!=this.temp3&""!=this.temp4&&(this.temp4=0==Math.ceil(t/this.temp3)?"":Math.ceil(t/this.temp3)),this.switch6=!0,setTimeout((function(){i.switch6=!1}),20)),""==t&&(this.switch5=!1)}},computed:{evenWishList:function(){var t=this;if("all"==this.value){var e=this.wishList.filter((function(t){return"aim"===t.status}));return e=e.concat(this.wishList.filter((function(t){return"circle"===t.status}))),e=e.concat(this.wishList.filter((function(t){return"checked"===t.status}))),e=e.concat(this.wishList.filter((function(t){return"clear"===t.status}))),e}if("unfinished"==this.value){var i=this.wishList.filter((function(t){return"aim"===t.status}));return i=i.concat(this.wishList.filter((function(t){return"circle"===t.status}))),i}return this.wishList.filter((function(e){return e.status===t.value}))}},beforeCreate:function(){console.log("beforeCreate")},created:function(){console.log("created"),this.todayTime=new Date(parseInt((new Date).getTime()));var t=this.todayTime.getFullYear(),e=this.todayTime.getMonth(),i=this.todayTime.getDate(),a=JSON.parse(localStorage.userData),n=JSON.parse(localStorage.billData);localStorage.wishList||(localStorage.wishList=JSON.stringify([{id:0,status:"checked",name:"电脑11111111111111111111",price:5e3,payment:1e3,addDate:"Thu Mar 11 2021 11:48:06 GMT+0800 (中国标准时间)",finishDate:"Thu Mar 11 2021 11:48:06 GMT+0800 (中国标准时间)",ps:0,noWaste:"checked",saveTime:"checked",saveMoney:"checked"},{id:1,status:"circle",name:"电脑2",price:4e3,payment:0,addDate:"Thu Mar 11 2021 11:48:06 GMT+0800 (中国标准时间)",finishDate:"Thu Mar 11 2021 11:48:06 GMT+0800 (中国标准时间)",ps:0,noWaste:"circle",saveTime:"circle",saveMoney:"circle"},{id:2,status:"clear",name:"电脑333",price:3e3,payment:2e3,addDate:"Thu Mar 11 2021 11:48:06 GMT+0800 (中国标准时间)",finishDate:"Thu Mar 11 2021 11:48:06 GMT+0800 (中国标准时间)",ps:0,noWaste:"clear",saveTime:"clear",saveMoney:"clear"},{id:3,status:"aim",name:"电脑4444444444444444444",price:2e3,payment:1500,addDate:"Thu Mar 11 2021 11:48:06 GMT+0800 (中国标准时间)",finishDate:"Thu Mar 11 2021 11:48:06 GMT+0800 (中国标准时间)",ps:0,noWaste:"clear",saveTime:"clear",saveMoney:"clear"}])),a.wishId||(a.wishId=3,localStorage.userData=JSON.stringify(a)),this.wishList=JSON.parse(localStorage.wishList),this.balance=it(n,t,e,i)},beforeMount:function(){console.log("beforeMount")},mounted:function(){console.log("mounted")},beforeUpdate:function(){console.log("beforeUpdate"),this.todayTime=new Date(parseInt((new Date).getTime()))},updated:function(){console.log("updated",this.activeNames)},beforeDestroy:function(){console.log("beforeDestroy")},destroyed:function(){console.log("destroyed")}};function it(t,e,i,a){var n=0;for(var s in t)s<e&&(n+=Number(t[s]["data"]["yearBalance"]));for(var o in t[e]["list"])o<i&&(n+=Number(t[e]["list"][o]["data"]["monthBalance"]));for(var c in t[e]["list"][i]["list"])c<=a&&(n+=Number(t[e]["list"][i]["list"][c]["data"]["dateBalance"]));return n>0?n=parseInt(10*n+.1)/10:n<0&&(n=parseInt(10*n-.1)/10),n}var at=et,nt=(i("119a"),i("2877")),st=Object(nt["a"])(at,a,n,!1,null,null,null);e["default"]=st.exports},"5d2f":function(t,e,i){},"5fb1":function(t,e,i){"use strict";i("5d2f")},7333:function(t,e,i){},8400:function(t,e,i){},"99af":function(t,e,i){"use strict";var a=i("23e7"),n=i("d039"),s=i("e8b5"),o=i("861d"),c=i("7b0b"),r=i("50c4"),l=i("8418"),d=i("65f0"),h=i("1dde"),u=i("b622"),p=i("2d00"),f=u("isConcatSpreadable"),m=9007199254740991,v="Maximum allowed index exceeded",w=p>=51||!n((function(){var t=[];return t[f]=!1,t.concat()[0]!==t})),g=h("concat"),b=function(t){if(!o(t))return!1;var e=t[f];return void 0!==e?!!e:s(t)},y=!w||!g;a({target:"Array",proto:!0,forced:y},{concat:function(t){var e,i,a,n,s,o=c(this),h=d(o,0),u=0;for(e=-1,a=arguments.length;e<a;e++)if(s=-1===e?o:arguments[e],b(s)){if(n=r(s.length),u+n>m)throw TypeError(v);for(i=0;i<n;i++,u++)i in s&&l(h,u,s[i])}else{if(u>=m)throw TypeError(v);l(h,u++,s)}return h.length=u,h}})},aec8:function(t,e,i){},b0c0:function(t,e,i){var a=i("83ab"),n=i("9bf2").f,s=Function.prototype,o=s.toString,c=/^\s*function ([^ (]*)/,r="name";a&&!(r in s)&&n(s,r,{configurable:!0,get:function(){try{return o.call(this).match(c)[1]}catch(t){return""}}})},b2cc:function(t,e,i){},b727:function(t,e,i){var a=i("0366"),n=i("44ad"),s=i("7b0b"),o=i("50c4"),c=i("65f0"),r=[].push,l=function(t){var e=1==t,i=2==t,l=3==t,d=4==t,h=6==t,u=7==t,p=5==t||h;return function(f,m,v,w){for(var g,b,y=s(f),S=n(y),O=a(m,v,3),k=o(S.length),x=0,j=w||c,T=e?j(f,k):i||u?j(f,0):void 0;k>x;x++)if((p||x in S)&&(g=S[x],b=O(g,x,y),t))if(e)T[x]=b;else if(b)switch(t){case 3:return!0;case 5:return g;case 6:return x;case 2:r.call(T,g)}else switch(t){case 4:return!1;case 7:r.call(T,g)}return h?-1:l||d?d:T}};t.exports={forEach:l(0),map:l(1),filter:l(2),some:l(3),every:l(4),find:l(5),findIndex:l(6),filterOut:l(7)}},d9d2:function(t,e,i){}}]);
//# sourceMappingURL=about.e9b1bcc1.js.map