/* 
 * 这是全局方法的JS文件
 */

// function showMsgBox(title,msg){
// 	let oldTitle = document.title ;
	
// 	document.title = title;
// 	custom_alert(msg);
// 	document.title = oldTitle;
// }

    function showMsgBox(ALERT_TITLE,alert_message) {

        /* You can utilize the web page address
         * for the alert message by doing the following:

         const ALERT_TITLE = "The page at " + document.location.href + " says: ";
         */
        // const ALERT_TITLE = "Alert Message";
        const ALERT_BUTTON_TEXT = "确定";

        // Check if there is an HTML element with
        // an ID of "alert_container".If true, abort
        // the creation of the custom alert.
        let is_alert_container_exist = document.getElementById("alert_container");
        if (is_alert_container_exist) {
            return;
        }

        // Create a div to serve as the alert
        // container. Afterward, attach it to the body
        // element.
        let get_body_element = document.querySelector("body");
        let div_for_alert_container = document.createElement("div");
        let alert_container = get_body_element.appendChild(div_for_alert_container);

        // Add an HTML ID and a class name for the
        // alert container
        alert_container.id = "alert_container";
        alert_container.className = "alert_container"

        // Create the div for the alert_box and attach
        // it to the alert container.
        let div_for_alert_box = document.createElement("div")
        let alert_box = alert_container.appendChild(div_for_alert_box);
        alert_box.className = "alert_box";

        // Set the position of the alert box using
        // scrollTop, scrollWidth, and offsetWidth
        alert_box.style.top = document.documentElement.scrollTop + "px";
        alert_box.style.left = (document.documentElement.scrollWidth - alert_box.offsetWidth) / 2 + "px";

        // Create h1 to hold the alert title
        let alert_header_tag = document.createElement("h1");
        let alert_title_text = document.createTextNode(ALERT_TITLE)
        let alert_title= alert_box.appendChild(alert_header_tag);
        alert_title.appendChild(alert_title_text);

        // Create a paragraph element to hold the
        // alert message
        let alert_paragraph_tag = document.createElement("p");
        let alert_message_container = alert_box.appendChild(alert_paragraph_tag);
        alert_message_container.textContent = alert_message;

        // Create the OK button
        let ok_button_tag = document.createElement("button");
        let ok_button_text = document.createTextNode(ALERT_BUTTON_TEXT)
        let ok_button = alert_box.appendChild(ok_button_tag);
        ok_button.className = "close_btn";
        ok_button.appendChild(ok_button_text);

        // Add an event listener that'll close the
        // custom alert
        ok_button.addEventListener("click", function () {
            remove_custom_alert();
        }, false);
    }

    function remove_custom_alert() {
        let HTML_body = document.querySelector("body");
        let alert_container = document.getElementById("alert_container");
        HTML_body.removeChild(alert_container);
    }
	
//存cookie
function setCookie(name,value){
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() + ";path=/";
}

//取cookie
function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
}
function sleep(n) { //n表示的毫秒数
            var start = new Date().getTime();
            while (true) if (new Date().getTime() - start > n) break;
        }  

//得到一个浮点数的小数点后面保留两位，第三位开始扔掉
function getFloatFloor2(v){
    return Math.floor( (v+0.001) * 100 )/100;
}


function formatDate2Date(date,s,m,d){
    if(undefined==s || null==s || ""==s)s="-";
    if(undefined==m || null==m || ""==m)m="-";
    if(undefined==d || null==d || ""==d)d="";
    var nM = date.getMonth()+1;
    if(nM<10)nM = "0"+nM;
    var nD = date.getDate();
    if(nD<10)nD = "0"+nD;
    return date.getFullYear() + s + nM + m + nD + d;
}
function formatDate2Time(date,s,m,d){
    if(undefined==s || null==s || ""==s)s=":";
    if(undefined==m || null==m || ""==m)m=":";
    if(undefined==d || null==d || ""==d)d="";
    var nM = date.getHours();
    if(nM<10)nM = "0"+nM;
    var nD = date.getMinutes();
    if(nD<10)nD = "0"+nD;
    var nS = date.getSeconds();
    if(nS<10)nS = "0"+nS;
    return nM + s + nD + m + nS + d;
}
function formatDate2DateTime(date,s,m,d,ss,mm,dd){
    return formatDate2Date(date,s,m,d) + " " + formatDate2Time(date,ss,mm,dd);
}


Date.prototype.Format = function (fmt) { 
    var o = { 
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    }; 
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)); 
    for (var k in o){ 
        if (new RegExp("(" + k + ")").test(fmt)){ 
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length))); 
        }
    }
    return fmt; 
};

//得到指定日期月份的最有一天
function getLastMonthDay(dt){
    var y = dt.getFullYear();
    var m = dt.getMonth() + 1;
    var dtR = dt;
    if(m==1 || m==3 || m==5 || m==7 || m==8 || m==10 || m==12){
        dtR.setDate(31);
    }else  if(m==4 || m==6 || m==9 || m==11){
        dtR.setDate(30);
    }else  if(m==2){
        dtR.setDate(28);
        if(y % 400 == 0){
            dtR.setDate(29);
        }else if(y % 100 != 0 && y % 4 == 0){
            dtR.setDate(29);
        }
    }
    return dtR;
}
//字符串转换成日期
function stringToDateTime(dateStr){
     var date = new Date(dateStr);
     return date;
 }

/**
 * 获取url参数
 */
function getUrlParams(para) {
  // 获取URL参数部分
  let queryString = window.location.search.slice(1);
  // 分割参数和值
  let paramsArray = queryString.split('&');
  // 将参数和值存储在对象中
  let params = {};
  paramsArray.forEach(param => {
    let [key, value] = param.split('=');
    params[key] = decodeURIComponent(value);
  });
   
  // 获取指定参数的值
  return params[para];
}
//得到openid，一定要有openid
function getOpenId(){
	// if(rootUrl.indexOf("api.d1-bus.com")<0){
	// 	//本地
		// return "";
	// }
	//openid 缓存在关闭网页就没有了，不做永久缓存
	let openid = getLocalSessionValue("openid_local");
	let accessCode = getLocalSessionValue("accessCode_local");
	let code = getUrlParams("code");
	// alert("openid ==" + openid + "   accessCode == " + accessCode);
	if(code && (!openid || !accessCode)){//这时都要获取一次openid
		//从接口获取openid，这个不用再
		// alert("code ==" + code);
		$.ajax({
		    type: 'POST',
		    url: rootUrl+'member/getOpenIdByTicket',
		    data:{
		        "code" :  code,//
		    },
		    dataType: 'json',
		    async:false,
		    xhrFields:{
		        withCredentials: true
		    },
		    crossDomain: true,
		    error: function (jqXHR, textStatus, errorThrown) {
		        alert(jqXHR);
		    },
		    success: function(data){
		        // console.log(JSON.stringify(data));
				console.log("getOpenIdByTicket",data);
				openid = data.openId;//暂时先用这个
				accessCode = data.accessCode;//暂时先用这个
				setLocalSessionValue("openid_local",openid);
				setLocalSessionValue("memberId_local",data.memberId);
				setLocalSessionValue("accessCode_local",accessCode);
				
				setLocalStorageValue("nickName_local",data.nickName);
				setLocalStorageValue("headIcon_local",data.headIcon);
		    }
		});
	}else if(openid && accessCode){
		//如果已经获取过openid了
		$.ajax({
		    type: 'POST',
		    url: rootUrl+'member/getIsLogin',
		    data:{
		        "openId" :  openid,//
		        "accessCode" :  accessCode,//
		    },
		    dataType: 'json',
		    async:false,
		    xhrFields:{
		        withCredentials: true
		    },
		    crossDomain: true,
		    error: function (jqXHR, textStatus, errorThrown) {
		        alert(jqXHR);
		    },
		    success: function(data){
		        console.log("getIsLogin",data);
				setLocalSessionValue("memberId_local",data.memberId);
				setLocalStorageValue("nickName_local",data.nickName);
				setLocalStorageValue("headIcon_local",data.headIcon);
				
				// alert("memberId ==" + data.memberId);
		    }
		});
	}else{
		showMsgBox("多多互通","您必须先关注“明星球童”公众号！");
	}
	return openid;
}

function checkIsLogin(idx){
	setCurrPageIndex(idx);
	let openid = getOpenId();//获取真实的openid
	let accessCode = getLocalSessionValue("accessCode_local");//获取真实的openid
	let memberId = getLocalSessionValue("memberId_local");
	if(!memberId || 1 > memberId){
		window.location.href=siteRootUrl + "login.html";
	}
}

//直接到注册
function gotoLogin(idx){
	setCurrPageIndex(idx);
	window.location.href=siteRootUrl+"login.html";
}

//跳转到指定页面
function gotoPage(){
	let idx = getCurrPageIndex();
	gotoPageIndex(idx);
	
}

function gotoPageIndex(idx){
	if(idx == 0){
		window.location.href=siteRootUrl+"login.html";
	}else if(idx == 1){
		window.location.href=siteRootUrl+"main.html";
	}else if(idx == 2){
		window.location.href=siteRootUrl+"show.html";
	}else if(idx == 3){
		window.location.href=siteRootUrl+"showvideo.html";
	}
}

//设置当前的页面索引，登录成功后会跳转回来相应页面
function setCurrPageIndex(idx){
    setLocalStorageValue("page_index",idx); 
}
//设置当前的页面索引，登录成功后会跳转回来相应页面
function getCurrPageIndex(){
    return getLocalStorageValue("page_index"); 
}


 /**
 * 设置本地存储的值，由于cookie有大小的限制，因此采用本地存储的机制，好在大部分浏览器都支持
 * @param {type} key
 * @returns {undefined}
 */
function setLocalStorageValue(key,val){
    if (window.localStorage) {   
        window.localStorage.setItem(key, val);   
    } else {   
        alert("不支持此浏览器，请换成谷歌Chrome浏览器访问，谢谢！"); 
    }   
}

/**
 * 读取本地存储的值
 * @param {type} key
 * @returns {undefined}
 */
function getLocalStorageValue(key){
    if (window.localStorage) {   
        return window.localStorage.getItem(key);   
    } else {   
        alert("不支持此浏览器，请换成谷歌Chrome浏览器访问，谢谢！"); 
    }  
}

function setLocalSessionValue(key,val){
    if (window.sessionStorage) {   
        window.sessionStorage.setItem(key, val);   
    } else {   
        alert("不支持此浏览器，请换成谷歌Chrome浏览器访问，谢谢！"); 
    }   
}

/**
 * 读取本地存储的值
 * @param {type} key
 * @returns {undefined}
 */
function getLocalSessionValue(key){
    if (window.sessionStorage) {   
        return window.sessionStorage.getItem(key);   
    } else {   
        alert("不支持此浏览器，请换成谷歌Chrome浏览器访问，谢谢！"); 
    }  
}


/**
 * 获取当前时间到秒的时间戳，主要是用来防止缓存的
 * @returns {Number}
 */
function getNowTimestamp(){//到秒就行
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    return timestamp;
}

