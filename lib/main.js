define(function (require, exports, module) {
    var config = require('config');
    var $      = require('./jquery');
    var main = {
        /**
         * @param ele 元素
         * @param callback 回调
         * @param animation 动画开关
         */
        button: function (ele, callback, animation) {
            if (document.querySelector(ele)) {
                document.querySelector(ele).addEventListener("click", function (e) {
                    var event = e || window.event;
                    if (this.querySelectorAll(".ink").length === 0) {
                        var span = document.createElement("span");
                        span.className = "ink";
                        this.insertBefore(span, this.firstChild);
                    }
                    if (animation) {
                        var ink = document.querySelector(".ink");
                        ink.className = "ink";
                        var top = event.offsetY - ink.offsetHeight / 2, left = event.offsetX - ink.offsetWidth / 2;
                        ink.style.top = top + "px";
                        ink.style.left = left + "px";
                        ink.setAttribute("class", "ink animation");
                    }
                    callback(event);
                });
            }
        },
        //返回前一页
        back : function(){
             history.go(-1);
        },
        //弹窗
        alert : function(context, btn, successCallBack, errorCallBack){
          var element = document.querySelector("#hncf_alert");
          var body = document.querySelector("body");
          var parent  = document.querySelector('#hncf_parent');
          var content = document.querySelector(".hncf_content");
          var error = document.querySelector(".hncf_error");
          var success = document.querySelector(".hncf_success");
          if( !element ){
              parent = document.createElement("div");
              parent.id="hncf_parent";
              element = document.createElement("div");
              element.id = "hncf_alert";
              content = document.createElement("div");
              content.className = "hncf_content";
              var buttonGroup = document.createElement("div");
              buttonGroup.className = "hncf_button";
              error = document.createElement("div");
              error.className = "hncf_error";
              success = document.createElement("div");
              success.className = "hncf_success";
              element.appendChild(content);
              element.appendChild(buttonGroup);
              buttonGroup.appendChild(error);
              buttonGroup.appendChild(success);
              body.appendChild(parent);
              body.appendChild(element);
          }
          content.innerText = context;
          error.style.display = 'block';
          if(btn.length === 1){
            error.style.display = 'none';
            success.innerText = btn[0];
          }else{
            error.innerText = btn[0] || "取消";
            success.innerText = btn[1] || "确定";
          }
          element.style.display = "block";
          parent.style.display = "block";
          element.style.left = "50%";
          element.style.marginLeft = - (element.offsetWidth / 2) + "px";
          element.style.top = "50%";
          element.style.marginTop = - (element.clientHeight / 2) + "px";
          function err(){
            element.style.display = "none";
            parent.style.display = "none";
            errorCallBack ? errorCallBack() : void 0;
            error.removeEventListener("click",err);
            success.removeEventListener("click",suc);
          }
          function suc(){
            element.style.display = "none";
            parent.style.display = "none";
            successCallBack ? successCallBack() : void 0;
            success.removeEventListener("click",suc);
            error.removeEventListener("click",err);
          }
          error.addEventListener("click", err);
          success.addEventListener("click", suc);
        },
        //获取url传递的参数
        get getPageData(){
            var search = window.location.search.substring(1,window.location.search.length).split("&");
            var result = {};
            search.forEach(function(e){
                var stack = e.split("=");
                result[ stack[0] ] = stack[1];
            });
            return result;
        },
        //检查用户是否注册 如果注册就会返回userid 如果没有就是返回undefined
        isLogin : function( call ){
            var self = this;
            $.post(config.getAuthUserIdUrl,{"params":'{"openId":"'+ this.getPageData.openid +'"}'}, function(data, textStatus, xhr) {
                self.log(data);
                var msg = JSON.parse(data);
                var userid = msg.resultCode == "10000" ? msg.result.userID: void 0;
                var userName = msg.resultCode == "10000" ? msg.result.userName: void 0;
                self.log(userid)
                call(userid,userName);
            });
        },

        getBuyCar : function( createdBy, call ){
            var params = '{createdBy:' + createdBy + '}', self= this;
            $.ajax({
                url : config.shopcartUrl,
                type : 'post',
                datatype : 'json',
                data : {'params' :  params},
                success: function (data) {
                    self.log('查看购物车：',data);
                    call ? call( JSON.parse(data).result ) : void 0;
                }
            });
        },


        loading : function( ){
            var loading = document.querySelector(".loading");
            if(!loading){
                loading = document.createElement("div");
                loading.className = "fa fa-spinner fa-spin loading fa-2x";
                loading.style.display = "block";
                document.querySelector("body").appendChild( loading );
            }
            loading.style.display = "block";
        },

        load : function(){
            var loading = document.querySelector(".loading");
            loading.style.display = "none";
        },
        //false 隐藏 true 显示
        noData : function( bool ){
            var par = document.querySelector("#noDataPar");
            var noData = document.querySelector("#noData");
            var p = document.querySelector("#noDataContext");
            if(!par){
                par = document.createElement("div");
                par.id = "noDataPar";
                noData = document.createElement("div");
                noData.id = "noData";
                p = document.createElement("p");
                p.id = "noDataContext";
                p.innerText = "暂无数据！";
                par.appendChild( noData );
                par.appendChild( p );
                document.querySelector("body").appendChild( par );
                par.style.marginTop = - (par.offsetHeight / 2) + 'px';
                par.style.marginLeft = - (par.offsetWidth / 2) + 'px';
            }
            if(!bool && par.style.display === "none"){return;}
            if(bool && par.style.display === "block"){ return; }
            par.style.display = bool ? 'block' : 'none';
        },

        getType : function( obj ){
            if(!obj){ return obj; }
            var type =  Object.prototype.toString.call( obj );
            type = type.slice(8, type.length - 1);
            return type;
        },

        log : function(){
            if(config.debug){
                console.log(Array.prototype.join.call(arguments));
            }
        }
    };

    module.exports = main;
});
