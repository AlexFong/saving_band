// 只有export了才能被引用到!!!!!!!
export default{
// 已搬App.vue的function
formatLongDate:function  (date,type=0) {
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
    
// 建立好数据结构,年月日表新建
initBillData:  function (billData,y,m,d,budjet){
    if(!billData['list'][y]){
        billData['list'][y] = {
        data : {yearBalance:budjet},
        list : {
            [m] : {
            data : {monthBalance:budjet},
            list : {
                [d] : {
                data:{budjet : budjet,dateBalance:budjet},
                list : []
                }
            },
            },
        }
        };
    } else if(!billData['list'][y]["list"][m]){
        billData['list'][y]["list"][m] = {
        data : {monthBalance:budjet},
        list : {
            [d] : {
            data:{budjet : budjet,dateBalance:budjet},
            list : []
            }
        },
        }
    } else if(!billData['list'][y]["list"][m]["list"][d]){
        billData['list'][y]["list"][m]["list"][d] = {
        data:{budjet : budjet,dateBalance:budjet},
        list : []
        }
    };
    return(billData);
},
    
// 封装日余额数据更新
calcDateBalance:  function (billData,y,m,d){
    let dateBalance = billData['list'][y]["list"][m]["list"][d]["data"]["budjet"];
    // 直接遍历(正常情况下，初始化后每天都会有数据)
    for (const i in billData['list'][y]["list"][m]["list"][d]["list"]) {
        dateBalance -= Number(billData['list'][y]["list"][m]["list"][d]["list"][i]["cost"]);
    }
    // 消除浮点影响，取小数后一位
    if(dateBalance > 0){
        dateBalance = parseInt(dateBalance * 10 + 0.1)/10;
    }else if(dateBalance < 0){
        dateBalance = parseInt(dateBalance * 10 - 0.1)/10;
    }
    return(dateBalance);
},
    
// 封装月余额数据更新
calcMonthBalance:  function (billData,y,m){
    let monthBalance = 0;
    
    // 直接遍历每天数据
    for (const i in billData['list'][y]["list"][m]["list"]) {
        monthBalance += Number(billData['list'][y]["list"][m]["list"][i]["data"]["dateBalance"]);
    }
    return(monthBalance);
},
    
// 封装年余额数据更新
calcYearBalance: function (billData,y){
    let yearBalance = 0;
    
    // 直接遍历(正常情况下，初始化后每月都会有数据)
    for (const i in billData['list'][y]["list"]) {
        yearBalance += Number(billData['list'][y]["list"][i]["data"]["monthBalance"]);
    }
    return(yearBalance);
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
    if(param[0] == v) console.log('getUrlVar属性值',param[1]); return param[1];
    }
},


// 总余额计算（截至当天）
calcBalance(billData,y,m,d){
    let balance = 0;

    // 加总年表
    for (const i in billData['list']) {
        if(i < y){
        balance += Number(billData['list'][i]["data"]["yearBalance"]);
        }
    }
    // 加总月表
    for (const i in billData['list'][y]["list"]) {
        if(i < m){
        balance += Number(billData['list'][y]["list"][i]["data"]["monthBalance"]);
        }
    }
    // 加总日表
    for (const i in billData['list'][y]["list"][m]["list"]) {
        if(i <= d){
        balance += Number(billData['list'][y]["list"][m]["list"][i]["data"]["dateBalance"]);
        }
    }

    // 消除浮点影响，取小数后一位
    if(balance > 0){
        balance = parseInt(balance * 10 + 0.1)/10;
    }else if(balance < 0){
        balance = parseInt(balance * 10 - 0.1)/10;
    }
    return(balance)
},


// 总余额计算（会计算未来）
calcBalanceFuture(billData){
    let balance = 0;

    // 直接加总年表的总值
    for (const i in billData['list']) {
        balance += billData['list'][i]["data"]["yearBalance"]
    }
    return(balance)
},

// 总余额计算（截至当天）
calcBalance(billData,y,m,d){
    let balance = 0;

    // 加总年表
    for (const i in billData['list']) {
        if(i < y){
        balance += Number(billData['list'][i]["data"]["yearBalance"]);
        }
    }
    // 加总月表
    for (const i in billData['list'][y]["list"]) {
        if(i < m){
        balance += Number(billData['list'][y]["list"][i]["data"]["monthBalance"]);
        }
    }
    // 加总日表
    for (const i in billData['list'][y]["list"][m]["list"]) {
        if(i <= d){
        balance += Number(billData['list'][y]["list"][m]["list"][i]["data"]["dateBalance"]);
        }
    }

    // 消除浮点影响，取小数后一位
    if(balance > 0){
        balance = parseInt(balance * 10 + 0.1)/10;
    }else if(balance < 0){
        balance = parseInt(balance * 10 - 0.1)/10;
    }
    return(balance)
},

// 计算要显示的货币数量
calcTodayBalanceShow(todayBalance){
    let todayBalanceShow = {
        100:0,
        paper:[],
        1:0,
        coin:[]
    };

    if(todayBalance < 0){
        return todayBalance;
    }else if(!todayBalance){
        return 0;
    }

    // 取整，有多少设置多少
    todayBalanceShow[100] = parseInt(todayBalance/100);
    // 余数
    let a = todayBalance - parseInt(todayBalance/100)*100;
    if(a == 0){
        return todayBalanceShow;
    }

    if(parseInt(a/50)){
        todayBalanceShow.paper.push(50);
        a = a%50;
        if(a == 0){
        return todayBalanceShow;
        }
    }

    for (let i = parseInt(a/20); i > 0; i--) {
        todayBalanceShow.paper.push(20);
    }
    a = a%20;
    if(a == 0){
        return todayBalanceShow;
    }

    if(parseInt(a/10)){
        todayBalanceShow.paper.push(10);
        a = a%10;
        if(a == 0){
        return todayBalanceShow;
        }
    }

    if(parseInt(a/5)){
        todayBalanceShow.paper.push(5);
        a = a%5;
        if(a == 0){
        return todayBalanceShow;
        }
    }

    todayBalanceShow[1] = parseInt(a/1);
    a = a%1;
    if(a == 0){
        return todayBalanceShow;
    }

    if(parseInt(a/0.5)){
        todayBalanceShow.coin.push(0.5);
        a = a%0.5;
        if(a == 0){
        return todayBalanceShow;
        }
    }

    // +0.1是为了消除浮点的影响。先进到循环,再减
    for (let i = parseInt(a/0.1+0.1); i > 0; i--) {
        todayBalanceShow.coin.push(0.1);
    }
    return todayBalanceShow;
},

}