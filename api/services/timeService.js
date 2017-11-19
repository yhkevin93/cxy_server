 /** 
  * 获取本周、本季度、本月、上月的开端日期、停止日期 
  */
 var moment = require('moment')

 function getNow() {
 	var now = new Date(); //当前日期 
 	//var now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')

 	var nowDay = now.getDate(); //当前日 
 	var nowMonth = now.getMonth(); //当前月 
 	var nowYear = now.getYear(); //当前年 
 	nowYear += (nowYear < 2000) ? 1900 : 0; // 

 	var lastMonthDate = new Date(); //上月日期 
 	lastMonthDate.setDate(1);
 	lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
 	var lastYear = lastMonthDate.getYear();
 	var lastMonth = lastMonthDate.getMonth();

 	var time = {};
 	time.nowDay = nowDay;
 	time.nowMonth = nowMonth;
 	time.now = now;
 	time.nowYear = nowYear;
 	time.lastMonthDate = lastMonth;
 	time.lastYear = lastYear;
 	time.lastMonth = lastMonth;

 	return(time);

 }

 //格局化日期：yyyy-MM-dd 
 function formatDate(date) {
 	var myyear = date.getFullYear();
 	var mymonth = date.getMonth() + 1;
 	var myweekday = date.getDate();

 	if(mymonth < 10) {
 		mymonth = "0" + mymonth;
 	}
 	if(myweekday < 10) {
 		myweekday = "0" + myweekday;
 	}
 	// 	var theTime = moment(new Date(date)).format('YYYY-MM-DD HH:mm:ss')
 	var theTime = moment(new Date(date)).format('YYYY-MM-DD')

 	return(theTime);
 }

 //返回月数
 function formatMonth(date) {
 	var theTime = moment(new Date(date)).format('YYYY-MM')

 	return(theTime);
 }

 //获得某月的天数 
 function getMonthDays(myMonth) {
 	var monthStartDate = new Date(nowYear, myMonth, 1);
 	var monthEndDate = new Date(nowYear, myMonth + 1, 1);
 	var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
 	return days;
 }

 //获得本季度的开端月份 
 function getQuarterStartMonth() {
 	var quarterStartMonth = 0;
 	if(nowMonth < 3) {
 		quarterStartMonth = 0;
 	}
 	if(2 < nowMonth && nowMonth < 6) {
 		quarterStartMonth = 3;
 	}
 	if(5 < nowMonth && nowMonth < 9) {
 		quarterStartMonth = 6;
 	}
 	if(nowMonth > 8) {
 		quarterStartMonth = 9;
 	}
 	return quarterStartMonth;
 }
 //获取今天的日期
 function getToday() {

 	var now = getNow().now;
 	var nowYear = getNow().nowYear;
 	var nowMonth = getNow().nowMonth;
 	var nowDay = getNow().nowDay;

 	var todayDate = new Date(nowYear, nowMonth, nowDay);
 	return formatDate(todayDate);
 }

 //获得本周的开端日期 
 function getWeekStartDate() {
 	var now = getNow().now;
 	var nowYear = getNow().nowYear;
 	var nowMonth = getNow().nowMonth;
 	var nowDay = getNow().nowDay;

 	var nowDayOfWeek = now.getDay(); //今天本周的第几天 

 	//把欧美的星期转换成中国的星期
 	if(nowDayOfWeek == 0) {
 		nowDayOfWeek = 6
 	} else {
 		nowDayOfWeek = nowDayOfWeek - 1;
 	}

 	var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
 	return formatDate(weekStartDate);
 }

 //周二~天
 function getWeekDate(day) {
 	var now = getNow().now;
 	var nowYear = getNow().nowYear;
 	var nowMonth = getNow().nowMonth;
 	var nowDay = getNow().nowDay;

 	var nowDayOfWeek = now.getDay(); //今天本周的第几天 
 	var last = day - 1

 	//把欧美的星期转换成中国的星期
 	if(nowDayOfWeek == 0) {
 		nowDayOfWeek = 6
 	} else {
 		nowDayOfWeek = nowDayOfWeek - 1;
 	}

 	var theday = nowDay - nowDayOfWeek + last

 	var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + last);

 	return formatDate(weekStartDate);
 }

 //返回今年的月份
 function getMonthDate(month) {
 	var now = getNow().now;
 	var nowYear = getNow().nowYear;
 	var nowMonth = getNow().nowMonth;
 	var nowDay = getNow().nowDay;

 	var monthDate = new Date(nowYear, month - 1);

 	return formatMonth(monthDate);
 }

 //获得本周的停止日期 
 function getWeekEndDate() {
 	var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
 	return formatDate(weekEndDate);
 }

 //获得本月的开端日期 
 function getMonthStartDate() {
 	var now = getNow().now;
 	var nowYear = getNow().nowYear;
 	var nowMonth = getNow().nowMonth;
 	var nowDay = getNow().nowDay;

 	var monthStartDate = new Date(nowYear, nowMonth, 1);
 	return formatDate(monthStartDate);
 }

 //获得本月的停止日期 
 function getMonthEndDate() {
 	var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
 	return formatDate(monthEndDate);
 }

 //获得上月开端时候 
 function getLastMonthStartDate() {
 	var lastMonthStartDate = new Date(nowYear, lastMonth, 1);
 	return formatDate(lastMonthStartDate);
 }

 //获得上月停止时候 
 function getLastMonthEndDate() {
 	var lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
 	return formatDate(lastMonthEndDate);
 }

 //获得本季度的开端日期 
 function getQuarterStartDate() {

 	var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);
 	return formatDate(quarterStartDate);
 }

 //或的本季度的停止日期 
 function getQuarterEndDate() {
 	var quarterEndMonth = getQuarterStartMonth() + 2;
 	var quarterStartDate = new Date(nowYear, quarterEndMonth, getMonthDays(quarterEndMonth));
 	return formatDate(quarterStartDate);
 }

 module.exports = {
 	//今天
 	getToday: function(option, done) {
 		var today = getToday();
 		done(today);
 	},

 	//获取这周
 	getWeekStart: function(option, done) {
 		var start = getWeekStartDate();
 		done(start);
 	},

 	getMonthStart: function(option, done) {
 		var start = getMonthStartDate();
 		done(start);
 	},
 	getWeekDate: function(option, done) {
 		var week = getWeekDate(option.day);
 		done(week);
 	},
 	getMonthDate: function(option, done) {
 		var month = getMonthDate(option.month);
 		done(month);
 	}
 }