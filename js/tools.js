//公共ajax锁
var urlHeader='../..';
/*
 * @options   为ajax需要的参数对象
 */
var Utils = new Object();
Utils.ajax = function(options) {
    options = options || {};
    options.url = urlHeader + options.url;
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || "json";
    options.fail = function (){
    	alerts("请求失败,请重试");// 此处放失败后执行的代码
    }
    var params = options.data?JSON.stringify(options.data):Math.random();

    //创建 - 非IE6 - 第一步
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else { //IE6及其以下版本浏览器
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    //接收 - 第三步
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var status = xhr.status;
            if (status >= 200 && status < 300) {
                options.success && options.success(JSON.parse(xhr.responseText), xhr.responseXML);
            } else {
                options.fail && options.fail(status);
            }
        }
    }

    //连接 和 发送 - 第二步
    if (options.type == "GET") {
        xhr.open("GET", options.url +"?"+ params, true);
        xhr.send(null);
    } else if (options.type == "POST") {
        xhr.open("POST", options.url, true);
        //设置表单提交时的内容类型
        xhr.setRequestHeader('X-Custom-Header', 'alanma');
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.setRequestHeader('x-requested-with', 'XMLHttpRequest');
		xhr.responseType="text/json";
        xhr.send(params);
    }
//  return xhr;
}
// 格式化参数
function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    arr.push(("v=" + Math.random()).replace(".",""));
    return arr.join("&");
}

/*
 * 是否满足手机号码的要求 @num 电话号码值
 * isMob(num);//true 是
 * isMob(num);//false 否
 * 
 */
var isMob = /^(13[0-9]{9}|17[0-9]{9}|15[0-9]{9}|18[0-9]{9}|14[0-9]{9})$/;
function isPhoneNum(num){
	if(!num) return;
	if(isMob.test(num)){
		return true;
	}else{
		return false;
	}
}
//金额（小数 ）
var isMon = /^((\d*)|([0-9]*[.]{1}[0-9]{1,2}))$/;
function isMoney(mon){
	if(!mon) return;
	if(isMon.test(mon)){
		return true;
	}else{
		return false;
	}
}
/*
 * 验证身份证号
 * @Param IDcard：身份证号
 * 15位身份证号和18位
 */
var isID = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
function testID(IDcard){
	if(!IDcard) return;
	var num = IDcard.trim();
	if(isID.test(num)){
		return true;
	}else{
		return false;
	}
}
/*
 * 验证银行卡卡号
 * @Param bCard：身份证号
 * 16位或者19位
 */
var isBC = /^(\d{16}|\d{19})$/;
function testBCard(bCard){
	if(!bCard) return;
	var num = bCard.trim();
	if(isBC.test(num)){
		return true;
	}else{
		return false;
	}
}
/*
 *时间戳转为年月日格式 
 * @Params data为已*1000的时间戳
 */
function formatDate(data){
	var year = data.getFullYear();
	var month = data.getMonth();
	var day = data.getDate();
	return year+"-"+(month<10?"0":"")+month+"-"+(day<10?"0":"")+day;
}
/*
 * 为空提示
 * @Params value:判断值，tips:提示
 */
//function isEmpty(value,tips){
//	if(!value){
//		alert(tips?tips:"请填写");
//		return;
//	}
//}
// 监听缓存中数据变化,当数据发生变化时,同步数据显示
window.onstorage = function(event){
	var status = {}
	status.key = event.key;
	status.oldValue = event.oldValue;
	status.newValue = event.newValue;
	status.url = event.url;
	status.storage = event.storageArea;

//	getStorageItem(); // 数据发生变化时,重新获取数据
}
/*
 *截取时间字符串 
 */
function splitStr(dateTime){
	var date = dateTime.split(" ");
	dateTime = date[0];
	return dateTime;
}
//将字符串20160203格式的转换为2016-02-03格式的
function strFormat(formatedDate){
	if(!formatedDate)return;
	var dateString = formatedDate;
	var pattern = /(\d{4})(\d{2})(\d{2})/;
	formatedDate = dateString.replace(pattern, '$1-$2-$3');
	return formatedDate;
}
/*
 * 倒计时
 * @Params num:开始数字，el:赋值元素
 */
function countDown(num,el){
	var count = setInterval(function(){
		--num;
		$(el).html(num);
		if(num<1){
			clearInterval(count);
		}
	},1000);
}
/*
 * 轮播图
 * @Params oUl(ul)指的是存放轮播图的外层元素，宽度为子元素li的宽度*li的个数，轮播时改变其left值
 * @Params aLi(li)指的是li元素数组对象，存有多张图片
 * @Params oIcon指的是轮播图的小圆点
 * @Params baseWidth指的是一张图片占用的宽度，可用来计算父级ul总的宽度，然后其变化的left值
 */
var iNow = 0;
var curIndex = 0;
var timeInterval = 1000;
var slider = new Object();
slider.show = function(oUl,oIcon,aLi,baseWidth){
	var totalWidth = baseWidth * aLi.length + "px";
	oUl.width(totalWidth);  //父级ul总宽度
	for(var i = 0;i<oIco.length;i++){
		oIco[i].index = i;
		oIco[i].onclick = function(){
			move(this.index);
		}
	}
	//	轮播图
	setInterval(change,timeInterval);
}
function change(){
	if(curIndex == oIco.length){
		curIndex = 0;
	}else{
		move(curIndex);
		curIndex += 1;
	}
}
function move(index){
	if(index>imgArr-1){
		index = 0;
		iNow = index;
	}
	if(index < 0){
		index = imgArr.length - 1;
		iNow = index;
	}
	for(var n = 0;n<oIco.length;n++){
		oIco[n].className = "";
	}
	oIco[index].className = "active";
	oUl[0].style.left = -index * baseWidth + "px";
}
/*
 * 判断密码强度
 * @param pwd是输入的密码值
 * @param el是要改变颜色的元素
 * 
 */
function getElement(el){
	var arr = new Array();
	arr[0] = $(el).next().children()[0];
	arr[1] = $(el).next().children()[1];
	arr[2] = $(el).next().children()[2];
	return arr;
}
function checkPas(pwd,el){
	var Lcolor,Mcolor,Hcolor;
	var Default_color = "#ddd";
	var L_color = "#d51423";
	var M_color = "#f90";
	var H_color = "#3c0";
	if (pwd==null||pwd==''){
		Lcolor = Mcolor = Hcolor = Default_color;
    }
    else{    
        S_level=checkStrong(pwd);    
        switch(S_level) {    
        case 0:    
            Lcolor=Mcolor=Hcolor=Default_color;  
            break;  
        case 1:    
            Lcolor=L_color;  
            Mcolor=Hcolor=Default_color;  
            break;    
        case 2:    
            Lcolor=L_color;
            Mcolor=M_color;
            Hcolor=Default_color;    
            break;    
        default:    
        	Lcolor=L_color;
            Mcolor=M_color;
            Hcolor=H_color;    
    	}
   	}
    $(getElement(el)[0]).css("background",Lcolor);
   	$(getElement(el)[1]).css("background",Mcolor);
    $(getElement(el)[2]).css("background",Hcolor);
}
//判断输入密码的类型    
function charMode(iN){    
    if (iN>=48 && iN <=57) //数字    
        return 1;    
    if (iN>=65 && iN <=90) //大写    
        return 2;    
    if (iN>=97 && iN <=122) //小写    
        return 4;    
    else    
        return 8;     
}
//bitTotal函数    
//计算密码模式    
function bitTotal(num){    
    modes=0;    
    for (i=0;i<4;i++){    
        if (num & 1) modes++;    
        num>>>=1;    
    }  
    return modes;    
}
//返回强度级别    
function checkStrong(sPW){    
    if (sPW.length<6)    
        return 0; //密码太短，不检测级别  
    Modes=0;    
    for (i=0;i<sPW.length;i++){    
        //密码模式    
        Modes|=charMode(sPW.charCodeAt(i));    
    }  
    return bitTotal(Modes);    
}

/*
 * 倒计时 获取验证码
 * el 是点击的这个元素
 */
function countDownReg(el){
	var time = 60;
	var count = setInterval(function(){
		time--;
		$(el).html(time +"s后再获取");
		$(el).css("background","#bebebe");
		if(time < 1){
			clearInterval(count);
			$(el).html("获取验证码");
			$(el).data("lock",false);
			$(el).css("background","#FF5252");
		}
	},1000);
}
//判断是否为空
function isNull(passWd){
    str = passWd;
    if(!str || str=="" || str=="null" || str=="undefined")
        return true;
    return false;
}
//将数字转换为带单位的值
function changeNum(money){
	var monStr;
	if(money > 9999 && money < 99999999){
		money = (money / 10000);
		monStr = money + "万";
	}else if(money > 99999999){
		money = (money / 100000000);
		monStr = money + "亿";
	}else{
		monStr = money;
	}
	return monStr;
}
//判断只能是小键盘和大键盘上的数字
function isNumber(keyCode){
	//数字
	if(keyCode >= 48 && keyCode <= 57)return true;
	//小数字键盘
	if(keyCode >= 96 && keyCode <= 105)return true;
	//backspace,del,左右方向键,小数点
	if(keyCode == 8 || keyCode == 46 || keyCode == 37 || keyCode == 39 || keyCode==190 || keyCode == 110) return true;
	
	return false;
}
/** 
* 禁止空格输入 
* @param e 
* @returns {Boolean} 
*/ 
function banInputSapce(e){ 
	var keynum; 
	if(window.event) // IE 
	{ 
		keynum = e.keyCode ;
	} 
	else if(e.which) // Netscape/Firefox/Opera 
	{ 
		keynum = e.which ;
	} 
	if(keynum == 32){ 
		alerts("不允许输入空格");
		return;
	} 
	return; 
}
/*
 * 密码只能输入数字字母
 * @param value   输入的值
 * @returns {Boolean} 
 */
var testBlank = /^[0-9a-zA-Z]{6,20}$/;
function testPas(value,el){
	if(!value) return;
	if(testBlank.test(value)){
		return true;
	}else{
		alerts("密码为6-20位数字、字母或数字与字母组合");
		$(el).val("");
		return false;
	}
}
/*
 * 判断验证码格式的正则
 * @param value   输入的值
 * @returns {Boolean} 
 */
var isCode = /^[0-9a-zA-Z]{6}$/;
function testCode(value,el){
	if(!value) return;
	if(isCode.test(value)){
		return true;
	}else{
		alerts("验证码输入不正确");
		$(el).val("");
		return false;
	}
}
