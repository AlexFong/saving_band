(function(t){function e(e){for(var i,n,s=e[0],r=e[1],c=e[2],d=0,u=[];d<s.length;d++)n=s[d],Object.prototype.hasOwnProperty.call(o,n)&&o[n]&&u.push(o[n][0]),o[n]=0;for(i in r)Object.prototype.hasOwnProperty.call(r,i)&&(t[i]=r[i]);h&&h(e);while(u.length)u.shift()();return l.push.apply(l,c||[]),a()}function a(){for(var t,e=0;e<l.length;e++){for(var a=l[e],i=!0,n=1;n<a.length;n++){var s=a[n];0!==o[s]&&(i=!1)}i&&(l.splice(e--,1),t=r(r.s=a[0]))}return t}var i={},n={app:0},o={app:0},l=[];function s(t){return r.p+"js/"+({"about~funnel":"about~funnel",about:"about",funnel:"funnel"}[t]||t)+"."+{"about~funnel":"b233c95d",about:"a1be2299",funnel:"37516755"}[t]+".js"}function r(e){if(i[e])return i[e].exports;var a=i[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.e=function(t){var e=[],a={"about~funnel":1,about:1,funnel:1};n[t]?e.push(n[t]):0!==n[t]&&a[t]&&e.push(n[t]=new Promise((function(e,a){for(var i="css/"+({"about~funnel":"about~funnel",about:"about",funnel:"funnel"}[t]||t)+"."+{"about~funnel":"d5ea1887",about:"d44743c5",funnel:"0a04589e"}[t]+".css",o=r.p+i,l=document.getElementsByTagName("link"),s=0;s<l.length;s++){var c=l[s],d=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(d===i||d===o))return e()}var u=document.getElementsByTagName("style");for(s=0;s<u.length;s++){c=u[s],d=c.getAttribute("data-href");if(d===i||d===o)return e()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=e,h.onerror=function(e){var i=e&&e.target&&e.target.src||o,l=new Error("Loading CSS chunk "+t+" failed.\n("+i+")");l.code="CSS_CHUNK_LOAD_FAILED",l.request=i,delete n[t],h.parentNode.removeChild(h),a(l)},h.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(h)})).then((function(){n[t]=0})));var i=o[t];if(0!==i)if(i)e.push(i[2]);else{var l=new Promise((function(e,a){i=o[t]=[e,a]}));e.push(i[2]=l);var c,d=document.createElement("script");d.charset="utf-8",d.timeout=120,r.nc&&d.setAttribute("nonce",r.nc),d.src=s(t);var u=new Error;c=function(e){d.onerror=d.onload=null,clearTimeout(h);var a=o[t];if(0!==a){if(a){var i=e&&("load"===e.type?"missing":e.type),n=e&&e.target&&e.target.src;u.message="Loading chunk "+t+" failed.\n("+i+": "+n+")",u.name="ChunkLoadError",u.type=i,u.request=n,a[1](u)}o[t]=void 0}};var h=setTimeout((function(){c({type:"timeout",target:d})}),12e4);d.onerror=d.onload=c,document.head.appendChild(d)}return Promise.all(e)},r.m=t,r.c=i,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(a,i,function(e){return t[e]}.bind(null,i));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/saving_band/",r.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],d=c.push.bind(c);c.push=e,c=c.slice();for(var u=0;u<c.length;u++)e(c[u]);var h=d;l.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("cd49")},"21bb":function(t,e,a){"use strict";a("2dad")},"2dad":function(t,e,a){},"2e74":function(t,e,a){},"5c0b":function(t,e,a){"use strict";a("9c0c")},"9c0c":function(t,e,a){},cd49:function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var i=a("2b0e"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("router-view"),a("div",{attrs:{id:"footer"}},[a("van-tabbar",{staticStyle:{height:"16vw","padding-bottom":"4vw"},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[a("van-tabbar-item",{attrs:{badge:"",to:"/"},scopedSlots:t._u([{key:"icon",fn:function(t){return[a("van-icon",{staticClass:"iconfont",attrs:{"class-prefix":"icon",name:"piechart"}})]}}])},[a("span",[t._v("天天记账")])]),a("van-tabbar-item",{attrs:{badge:"",to:"/funnel"},scopedSlots:t._u([{key:"icon",fn:function(t){return[a("van-icon",{staticClass:"iconfont",attrs:{"class-prefix":"icon",name:"barchart"}})]}}])},[a("span",[t._v("记账漏斗")])]),a("van-tabbar-item",{attrs:{badge:"",to:"/wishlist"},scopedSlots:t._u([{key:"icon",fn:function(t){return[a("van-icon",{staticClass:"iconfont",attrs:{"class-prefix":"icon",name:"heart"}})]}}])},[a("span",[t._v("心愿清单")])]),a("van-tabbar-item",{attrs:{badge:"3",to:"/mine"},scopedSlots:t._u([{key:"icon",fn:function(t){return[a("van-icon",{staticClass:"iconfont",attrs:{"class-prefix":"icon",name:"user"}})]}}])},[a("span",[t._v("我的")])])],1)],1)],1)},o=[],l=(a("66b9"),a("b650")),s=(a("a52c"),a("2ed4")),r=(a("537a"),a("ac28")),c=(a("2e74"),a("3a34")),d=a.n(c);new d.a,i["a"].use(r["a"]),i["a"].use(s["a"]),i["a"].use(l["a"]);var u={data:function(){return{active:0,icon:{active:"https://img01.yzcdn.cn/vant/user-active.png",inactive:"https://img01.yzcdn.cn/vant/user-inactive.png"}}}},h=u,f=(a("5c0b"),a("2877")),v=Object(f["a"])(h,n,o,!1,null,null,null),p=v.exports,g=(a("d3b7"),a("8c4f")),y=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"home"}},[a("div",{attrs:{id:"header"}},[a("div",{staticStyle:{height:"5vw"}}),a("div",{staticStyle:{display:"flex","line-height":"15vw"}},[a("div",{staticStyle:{width:"34vw","text-align":"left"}},[a("div",{staticStyle:{"line-height":"15vw","font-size":"3vw","padding-left":"2vw"}},[t._v("余额:"+t._s(t.balance))])]),a("div",{staticStyle:{width:"32vw","line-height":"15vw"}},[t._v("天天记账1.15")]),a("div",{staticStyle:{width:"34vw"}})])]),a("van-row",{staticStyle:{height:"55vh","border-top":"1px solid black","border-bottom":"1px solid black"}},[a("van-col",{staticStyle:{height:"55vh"},attrs:{span:"8"}},[a("van-row",{staticStyle:{height:"10vh","border-bottom":"1px solid black",display:"flex","justify-content":"space-around","flex-direction":"column"}},[a("div",{staticStyle:{height:"4vh",display:"flex","align-items":"center","justify-content":"center"}},[a("div",{staticStyle:{"line-height":"4.5vh"}},[t._v(" "+t._s(t.time.getMonth()+1)+"月"+t._s(t.time.getDate())+"日 ")]),a("van-icon",{staticClass:"iconfont fontSize7vw",attrs:{"class-prefix":"icon",name:"accountbook"}})],1),a("div",{staticStyle:{height:"4vh","line-height":"4vh",display:"flex","align-item":"center","justify-content":"center"}},[a("button",{staticStyle:{border:"none","background-color":"unset"},on:{click:function(e){return t.changeTime(-1)}}},[a("van-icon",{staticClass:"iconfont fontSize7vw",attrs:{"class-prefix":"icon",name:"left"}})],1),a("span",{staticStyle:{margin:"0 0.5vw",width:"14vw",border:"1px solid #aaa","border-radius":"2vw",height:"4vh"},on:{click:function(e){return t.changeTime(0)}}},[t._v("今天")]),a("button",{staticStyle:{border:"none","background-color":"unset"},on:{click:function(e){return t.changeTime(1)}}},[a("van-icon",{staticClass:"iconfont fontSize7vw",attrs:{"class-prefix":"icon",name:"right"}})],1)])]),a("van-row",{staticStyle:{height:"10vh","border-bottom":"1px solid black",display:"flex","justify-content":"space-around","flex-direction":"column"}},[a("div",{staticStyle:{height:"3vh","line-height":"3vh","text-align":"center","padding-top":"0.5vh"}},[t._v(" 本日预算: ")]),a("div",{staticStyle:{height:"4vh","line-height":"4vh",display:"flex","justify-content":"center"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.todayBudjet,expression:"todayBudjet"}],staticStyle:{width:"47%","text-align":"center","margin-right":"1vw",border:"1px solid #aaa","border-radius":"2vw",height:"4vh"},attrs:{type:"number",placeholder:"设置今日预算"},domProps:{value:t.todayBudjet},on:{input:function(e){e.target.composing||(t.todayBudjet=e.target.value)}}}),a("span",{staticStyle:{width:"38%",border:"1px solid #aaa","border-radius":"2vw",height:"4vh"},on:{click:function(e){return t.changeTodayBudjet()}}},[t._v("设置")])])]),a("van-row",{staticStyle:{height:"35vh","justify-content":"space-around",display:"flex","flex-direction":"column"}},[a("div",{staticStyle:{height:"4vh","line-height":"4vh",display:"flex","justify-content":"center","padding-top":"1vh","align-item":"center"},style:{display:t.todayBalanceShow[100]>0?"flex":"none"}},[a("div",{staticClass:"money",staticStyle:{"background-color":"red",position:"relative","margin-right":"2vw"}},[t._v("100")]),a("div",[t._v("x"+t._s(t.todayBalanceShow[100]))])]),a("div",{staticStyle:{height:"14vh",position:"relative","align-item":"center"},style:{display:t.todayBalanceShow.paper&&0!=t.todayBalanceShow.paper.length?"block":"none"}},t._l(t.todayBalanceShow.paper,(function(e,i){return a("div",[a("div",{staticClass:"money",style:{"background-color":t.moneyColor[e],transform:"rotate("+(-30-15*t.todayBalanceShow.paper.length+30*i)+"deg)",left:t.moneyPosition[t.todayBalanceShow.paper.length][i].left+"vw",top:t.moneyPosition[t.todayBalanceShow.paper.length][i].top+"vh","z-index":9-i}},[t._v(" "+t._s(e)+" ")])])})),0),a("div",{staticStyle:{width:"30vw",margin:"0vh 1.5vw",display:"flex","flex-direction":"row","align-content":"space-around","justify-content":"space-around"},style:{display:t.todayBalanceShow[1]>0?"flex":"none"}},t._l(t.todayBalanceShow[1],(function(e){return a("div",[a("div",{staticClass:"coin",staticStyle:{"background-color":"#eee","border-radius":"3vh",width:"3vh",height:"3vh","font-size":"2.5vh","line-height":"3vh"}},[t._v("1")])])})),0),a("div",{staticStyle:{width:"30vw",margin:"0vh 1.5vw",display:"flex","flex-direction":"row","align-content":"space-around","justify-content":"space-around"},style:{display:t.todayBalanceShow.coin&&0!=t.todayBalanceShow.coin.length?"flex":"none"}},t._l(t.todayBalanceShow.coin,(function(e,i){return a("div",[a("div",{staticClass:"coin",staticStyle:{"border-radius":"2.5vh",width:"2.5vh",height:"2.5vh","font-size":"2vh","line-height":"2.5vh"},style:{"background-color":t.moneyColor[e]}},[t._v(" "+t._s(String(e).slice(1,3))+" ")])])})),0),a("div",{staticStyle:{"align-content":"center","justify-content":"center","align-item":"center",display:"flex"}},[a("div",{style:{display:t.todayBalanceShow<0||0==t.todayBalance?"none":"unset"}},[t._v(" 余额:"+t._s(t.todayBalance)+" ")]),a("div",{staticStyle:{top:"4vh",position:"relative","font-weight":"bolder"},style:{display:t.todayBalanceShow<0||0==t.todayBalance?"unset":"none"}},[a("div",{staticStyle:{"font-size":"7vw","line-height":"9vw"}},[t._v("余额:")]),a("div",{staticStyle:{"font-size":"7vw","line-height":"9vw"},style:{color:t.todayBalanceShow<0?"red":"unset"}},[t._v(" "+t._s(t.todayBalance)+" ")])])])])],1),a("van-col",{staticStyle:{height:"55vh","border-left":"1px solid black"},attrs:{span:"16"}},[a("div",{staticStyle:{height:"5vh","line-height":"5vh","border-bottom":"1px solid black"}},[t._v("本日账单")]),a("div",{staticStyle:{height:"50vh"},attrs:{id:"billListOuter"}},[a("div",{attrs:{id:"billListInner"}},t._l(t.bill,(function(e,i){return a("div",[a("van-swipe-cell",{staticStyle:{"margin-bottom":"2vw","border-radius":"2vw"},scopedSlots:t._u([{key:"right",fn:function(){return[a("van-button",{staticClass:"delete-button",attrs:{square:"",text:"删除",type:"danger"},on:{click:function(a){return t.delFun(i,e)}}})]},proxy:!0}],null,!0)},[a("div",{staticStyle:{"line-height":"10vw","background-color":"#ffffff",border:"2px solid #f0ffff",display:"flex"}},[a("span",{staticStyle:{width:"14vw"}},[t._v(" "+t._s(new Date(e.time).getHours())+":"+t._s(new Date(e.time).getMinutes()<10?"0"+new Date(e.time).getMinutes():new Date(e.time).getMinutes())+" ")]),a("span",{staticStyle:{width:"30vw"}},[t._v(t._s(t.checkList[e.id]))]),a("span",{staticStyle:{width:"13vw"}},[t._v("￥"+t._s(e.cost)+" ")]),a("van-icon",{staticClass:"iconfont",attrs:{id:"billList","class-prefix":"icon",name:"left"}})],1)])],1)})),0)])])],1),a("div",{staticStyle:{height:"calc(45vh - 40vw)",display:"flex","flex-direction":"column"},style:{"justify-content":t.height/t.width>1.5?"space-around":"flex-end"},attrs:{id:"addBill"}},[a("div",{staticStyle:{display:"flex","flex-wrap":"wrap","justify-content":"center","line-height":"6vw"},style:{width:t.height/t.width>1.5?"90%":"70%",margin:t.height/t.width>1.5?"0 5%":"0 15%"}},t._l(t.typeList,(function(e,i){return a("div",{staticClass:"item"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.typeId,expression:"typeId"}],attrs:{type:"radio",id:e.id},domProps:{value:e.id,checked:t._q(t.typeId,e.id)},on:{change:function(a){t.typeId=e.id}}}),a("label",{attrs:{for:e.id}},[t._v(t._s(e.name))])])})),0),a("div",{staticStyle:{display:"flex","justify-content":"center","line-height":"8vw"},style:{margin:t.height/t.width>1.5?0:"2vh 0"}},[t._v(" ￥"),a("input",{directives:[{name:"model",rawName:"v-model",value:t.cost,expression:"cost"}],staticStyle:{width:"40vw"},attrs:{type:"number",placeholder:"输入金额"},domProps:{value:t.cost},on:{input:function(e){e.target.composing||(t.cost=e.target.value)}}}),a("span",{staticStyle:{width:"12vw",border:"1px solid #aaa","border-radius":"2vw","margin-left":"2vw","line-height":"8vw"},on:{click:t.addFun}},[t._v("花钱")])])])],1)},m=[],b=(a("a434"),a("a9e3"),a("ade3")),w=(a("4d48"),a("d1e1")),S=(a("81e6"),a("9ffb")),B=(a("c3a6"),a("ad06")),D=(a("4467"),a("c36e")),x=a("1b40");x["a"].use(D["a"]),x["a"].use(B["a"]),x["a"].use(S["a"]),x["a"].use(w["a"]);var _={name:"home",props:{msg:{type:String,default:"test msg"}},data:function(){return{balance:0,todayBalance:0,cost:"",typeId:"a",typeList:[{name:"餐饮",id:"a"},{name:"生活",id:"b"},{name:"服饰",id:"c"},{name:"交通",id:"d"},{name:"购物",id:"e"},{name:"学习",id:"f"},{name:"娱乐",id:"g"},{name:"旅游",id:"h"},{name:"亲子",id:"i"},{name:"宠物",id:"j"},{name:"医疗",id:"k"},{name:"红包",id:"l"},{name:"礼物",id:"m"},{name:"美容",id:"n"},{name:"其他",id:"o"}],checkList:{a:"餐饮",b:"生活",c:"服饰",d:"交通",e:"购物",f:"学习",g:"娱乐",h:"旅游",i:"亲子",j:"宠物",k:"医疗",l:"红包",m:"礼物",n:"美容",o:"其他"},bill:[],todayTime:"",time:"",budjet:400,todayBudjet:0,todayBalanceShow:{100:0,paper:[],coinYuan:0,coinJiao:[]},moneyColor:{100:"red",50:"turquoise",20:"orange",10:"skyblue",5:"violet",1:"#eee",.5:"#ffcc55",.1:"#bbb"},moneyPosition:{4:[{left:0,top:3},{left:5,top:4},{left:10,top:6},{left:13,top:9}],3:[{left:3,top:3},{left:8,top:5},{left:11,top:8}],2:[{left:5,top:4},{left:10,top:7}],1:[{left:8,top:5}]},width:0,height:0}},methods:{addFun:function(){if(this.cost){var t=JSON.parse(localStorage.billData),e=this.time.getFullYear(),a=this.time.getMonth(),i=this.time.getDate(),n=this.todayTime.getFullYear(),o=this.todayTime.getMonth(),l=this.todayTime.getDate();t=T(t,e,a,i,this.budjet),this.todayBudjet=t[e]["list"][a]["list"][i]["data"]["budjet"],t[e]["list"][a]["list"][i]["list"].push({id:this.typeId,cost:Number(this.cost),time:this.time}),this.cost="",t[e]["list"][a]["list"][i]["data"]["dateBalance"]=k(t,e,a,i),t[e]["list"][a]["data"]["monthBalance"]=O(t,e,a),t[e]["data"]["yearBalance"]=N(t,e),this.balance=I(t,n,o,l),this.todayBalance=t[e]["list"][a]["list"][i]["data"]["dateBalance"],this.todayBalanceShow=C(this.todayBalance),localStorage.billData=JSON.stringify(t),this.bill=JSON.parse(localStorage.billData)[e]["list"][a]["list"][i]["list"]}else alert("请输入金额")},delFun:function(t,e){var a=JSON.parse(localStorage.billData),i=this.time.getFullYear(),n=this.time.getMonth(),o=this.time.getDate(),l=this.todayTime.getFullYear(),s=this.todayTime.getMonth(),r=this.todayTime.getDate();a[i]["list"][n]["list"][o]["list"].splice(t,1),a[i]["list"][n]["list"][o]["data"]["dateBalance"]=k(a,i,n,o),a[i]["list"][n]["data"]["monthBalance"]=O(a,i,n),a[i]["data"]["yearBalance"]=N(a,i),this.balance=I(a,l,s,r),this.todayBalance=k(a,i,n,o),this.todayBalanceShow=C(this.todayBalance),localStorage.billData=JSON.stringify(a),this.bill=JSON.parse(localStorage.billData)[i]["list"][n]["list"][o]["list"]},changeTime:function(t){if(this.time=1==t||-1==t?new Date(parseInt(this.time.setDate(this.time.getDate()+t))):0==t?new Date(parseInt((new Date).getTime())):new Date(parseInt(t.setDate(t.getDate()))),j(this.time,1)!=j(this.todayTime,1)){var e=new Date(this.time).getFullYear(),a=new Date(this.time).getMonth(),i=new Date(this.time).getDate();this.time=new Date(parseInt(new Date(e,a,i,"23","59","59").getTime()))}else this.time=this.todayTime;var n=JSON.parse(localStorage.billData),o=this.time.getFullYear(),l=this.time.getMonth(),s=this.time.getDate();n[o]&&n[o]["list"][l]&&n[o]["list"][l]["list"][s]?(this.bill=n[o]["list"][l]["list"][s]["list"],this.todayBudjet=n[o]["list"][l]["list"][s]["data"]["budjet"],this.todayBalance=k(n,o,l,s),this.todayBalanceShow=C(this.todayBalance)):(this.bill=[],this.todayBudjet=0,this.todayBalance=0,this.todayBalanceShow=C(this.todayBalance))},changeTodayBudjet:function(){if(this.todayBudjet>=0){var t=JSON.parse(localStorage.billData),e=this.time.getFullYear(),a=this.time.getMonth(),i=this.time.getDate(),n=this.todayTime.getFullYear(),o=this.todayTime.getMonth(),l=this.todayTime.getDate();t[e]["list"][a]["list"][i]["data"]["budjet"]=this.todayBudjet,t[e]["list"][a]["list"][i]["data"]["dateBalance"]=k(t,e,a,i),t[e]["list"][a]["data"]["monthBalance"]=O(t,e,a),t[e]["data"]["yearBalance"]=N(t,e),this.balance=I(t,n,o,l),this.todayBalance=k(t,e,a,i),this.todayBalanceShow=C(this.todayBalance),localStorage.billData=JSON.stringify(t)}else alert("预算不能为负数哦~")},dayRollBack:function(){var t=JSON.parse(localStorage.userData),e=JSON.parse(localStorage.billData),a=this.todayTime,i=a.getFullYear(),n=a.getMonth(),o=a.getDate();e[i]["list"][n]["list"][o]&&delete e[i]["list"][n]["list"][o],a=new Date(a.setDate(a.getDate()-1)),i=a.getFullYear(),n=a.getMonth(),o=a.getDate(),e[i]["list"][n]["list"][o]&&delete e[i]["list"][n]["list"][o],a=new Date(a.setDate(a.getDate()-1)),t.latestLoginDate=j(a,1),localStorage.userData=JSON.stringify(t),localStorage.billData=JSON.stringify(e)}},beforeCreate:function(){console.log("beforeCreate")},created:function(){console.log("created"),this.width=document.body.clientWidth,this.height=document.body.clientHeight,this.todayTime=new Date(parseInt((new Date).getTime())),this.time=this.todayTime;var t=this.todayTime.getFullYear(),e=this.todayTime.getMonth(),a=this.todayTime.getDate(),i=this.todayTime.getFullYear(),n=this.todayTime.getMonth(),o=this.todayTime.getDate();if(localStorage.userData){var l=JSON.parse(localStorage.userData),s=JSON.parse(localStorage.billData),r=new Date(l.latestLoginDate);l.latestLoginDate=j(this.todayTime,1);var c=new Date(l.latestLoginDate),d=(c-r)/864e5;if(localStorage.userData=JSON.stringify(l),0==d)T(s,t,e,a,l.budjet),console.log("diffValue == 0");else if(d<=7){for(var u=d;u>0;u--){r=new Date(r.setDate(r.getDate()+1));var h=r.getFullYear(),f=r.getMonth(),v=r.getDate();T(s,h,f,v,l.budjet),console.log("----------------测试看出现几次----------------",r),console.log("diffValue <= 7 1111111")}console.log("diffValue <= 7 2222222")}else d>7?(T(s,t,e,a),console.log("太久没登录了，我们没给你更新数据了~"),alert("太久没登录了，我们没给你更新数据了~")):(console.log("时间出错了，请重试"),alert("时间出错了，请重试"));this.todayBudjet=s[t]["list"][e]["list"][a]["data"]["budjet"],this.todayBalance=s[t]["list"][e]["list"][a]["data"]["dateBalance"],this.balance=I(s,i,n,o),this.budjet=l.budjet,this.todayBalanceShow=C(this.todayBalance),localStorage.billData=JSON.stringify(s),this.bill=JSON.parse(localStorage.billData)[t]["list"][e]["list"][a]["list"]}else{localStorage.userData=JSON.stringify({fisrtLoginDate:this.todayTime,name:"default",latestLoginDate:this.todayTime,budjet:400});var p=T({},t,e,a,this.budjet);p[t]["list"][e]["list"][a]["data"]["dateBalance"]=k(p,t,e,a),p[t]["list"][e]["data"]["monthBalance"]=O(p,t,e),p[t]["data"]["yearBalance"]=N(p,t),this.balance=I(p,i,n,o),this.todayBalance=p[t]["list"][e]["list"][a]["data"]["dateBalance"],this.todayBudjet=p[t]["list"][e]["list"][a]["data"]["budjet"],localStorage.billData=JSON.stringify(p),this.bill=JSON.parse(localStorage.billData)[t]["list"][e]["list"][a]["list"]}},beforeMount:function(){console.log("beforeMount")},mounted:function(){console.log("mounted")},beforeUpdate:function(){console.log("beforeUpdate"),this.todayTime=new Date(parseInt((new Date).getTime())),this.width=document.body.clientWidth,this.height=document.body.clientHeight,console.log(this.height,this.width)},updated:function(){console.log("updated")},beforeDestroy:function(){console.log("beforeDestroy")},destroyed:function(){console.log("destroyed")}};function j(t){var e,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=t.getFullYear(),n=t.getMonth()+1,o=t.getDate(),l=t.getHours(),s=t.getMinutes(),r=t.getSeconds();return n<10&&(n="0"+n),o<10&&(o="0"+o),l<10&&(l="0"+l),s<10&&(s="0"+s),r<10&&(r="0"+r),e=1==a?i+"-"+n+"-"+o:i+""+n+o+" "+l+":"+s+":"+r,e}function T(t,e,a,i,n){return t[e]?t[e]["list"][a]?t[e]["list"][a]["list"][i]||(t[e]["list"][a]["list"][i]={data:{budjet:n,dateBalance:n},list:[]}):t[e]["list"][a]={data:{monthBalance:n},list:Object(b["a"])({},i,{data:{budjet:n,dateBalance:n},list:[]})}:t[e]={data:{yearBalance:n},list:Object(b["a"])({},a,{data:{monthBalance:n},list:Object(b["a"])({},i,{data:{budjet:n,dateBalance:n},list:[]})})},t}function k(t,e,a,i){var n=t[e]["list"][a]["list"][i]["data"]["budjet"];for(var o in t[e]["list"][a]["list"][i]["list"])n-=Number(t[e]["list"][a]["list"][i]["list"][o]["cost"]);return n>0?n=parseInt(10*n+.1)/10:n<0&&(n=parseInt(10*n-.1)/10),n}function O(t,e,a){var i=0;for(var n in t[e]["list"][a]["list"])i+=Number(t[e]["list"][a]["list"][n]["data"]["dateBalance"]);return i}function N(t,e){var a=0;for(var i in t[e]["list"])a+=Number(t[e]["list"][i]["data"]["monthBalance"]);return a}function I(t,e,a,i){var n=0;for(var o in t)o<e&&(n+=Number(t[o]["data"]["yearBalance"]));for(var l in t[e]["list"])l<a&&(n+=Number(t[e]["list"][l]["data"]["monthBalance"]));for(var s in t[e]["list"][a]["list"])s<=i&&(n+=Number(t[e]["list"][a]["list"][s]["data"]["dateBalance"]));return n>0?n=parseInt(10*n+.1)/10:n<0&&(n=parseInt(10*n-.1)/10),n}function C(t){var e={100:0,paper:[],1:0,coin:[]};if(t<0)return t;e[100]=parseInt(t/100);var a=t-100*parseInt(t/100);if(0==a)return e;if(parseInt(a/50)&&(e.paper.push(50),a%=50,0==a))return e;for(var i=parseInt(a/20);i>0;i--)e.paper.push(20);if(a%=20,0==a)return e;if(parseInt(a/10)&&(e.paper.push(10),a%=10,0==a))return e;if(parseInt(a/5)&&(e.paper.push(5),a%=5,0==a))return e;if(e[1]=parseInt(a/1),a%=1,0==a)return e;if(parseInt(a/.5)&&(e.coin.push(.5),a%=.5,0==a))return e;for(var n=parseInt(a/.1+.1);n>0;n--)e.coin.push(.1);return e}var M=_,J=(a("21bb"),Object(f["a"])(M,y,m,!1,null,null,null)),F=J.exports;i["a"].use(g["a"]);var L=[{path:"/",name:"Home",component:F},{path:"/funnel",name:"Funnel",component:function(){return Promise.all([a.e("about~funnel"),a.e("funnel")]).then(a.bind(null,"1491"))}},{path:"/mine",name:"Mine",component:function(){return Promise.all([a.e("about~funnel"),a.e("about")]).then(a.bind(null,"0a4e"))}},{path:"/wishlist",name:"WishList",component:function(){return Promise.all([a.e("about~funnel"),a.e("about")]).then(a.bind(null,"57d2"))}}],P=new g["a"]({routes:L}),Y=P,z=a("2f62");i["a"].use(z["a"]);var E=new z["a"].Store({state:{},mutations:{},actions:{},modules:{}});i["a"].config.productionTip=!1,new i["a"]({router:Y,store:E,render:function(t){return t(p)}}).$mount("#app")}});
//# sourceMappingURL=app.28bed004.js.map