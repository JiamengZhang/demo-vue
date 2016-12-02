define(function (require, exports, module) {
	module.exports = {
		addCookie: function(objName, objValue, objHours){
			var str = objName + "=" + escape(objValue);
	        if(objHours > 0){//为时不设定过期时间，浏览器关闭时cookie自动消失
	            var date = new Date();
	            var ms = objHours*3600*1000;
	            date.setTime(date.getTime() + ms);
	            str += "; expires=" + date.toGMTString();
	       	}
	       	document.cookie = str;
		},
		setCookie: function(name,value){
			var Days = 30; //此 cookie 将被保存 30 天
	        var exp = new Date();    //new Date("December 31, 9998");
	        exp.setTime(exp.getTime() + Days*24*60*60*1000);
	        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
		},
		getCookie: function(name){
			var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
         	if(arr != null) return unescape(arr[2]); return null;
		},
		delCookie: function(name){
			var exp = new Date();
	        exp.setTime(exp.getTime() - 1);
	        var cval=getCookie(name);
	        if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
		}
		
	}
})