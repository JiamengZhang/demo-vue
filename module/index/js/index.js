define(function(require, exports, module) {
	var $ = require("lib/jquery");
	require("vue.min.js");//引入vue.js
	require("./swiper-3.2.7.min.js");//引入轮播查件
	var config = require("config.js");
	var l = require("lib/location.js");//引入location.js
	var m = require('lib/main.js');

    var vm = new Vue({
		el: "#index",
        data: {
        	openid: m.getPageData.openid,
		    siteId: localStorage.getItem("siteId"),
		    city: localStorage.getItem("city") ? localStorage.getItem("city") : "",
		    siteName: localStorage.getItem("siteName") ? localStorage.getItem("siteName") : "",
			servicesCommunity: localStorage.getItem("servicesCommunity") ? localStorage.getItem("servicesCommunity") : "",
      		hotGoods: [],
			bianli: [],
            community: [],
            hotMore: '',//热卖爆款more对应id
            bianliMore: ''//便利代购more对应id
        },
        methods: {
        	show: function(className){
        		$("."+className).removeClass("hide");
        	},
        	openWindow: function(){
        		$("#communityBox").stop().removeClass("hide");
        	},
        	closeWindow: function(){
        		$("#communityBox").stop().addClass("hide");
        	},
        	selectCommunity: function(a,b,c){
        		vm.closeWindow();
        		this.siteId = a;
        		this.siteName = b;
        		this.servicesCommunity = c;
        		localStorage.setItem("siteName", b);
        		localStorage.setItem("siteId", a);
        		localStorage.setItem("servicesCommunity", c);
        		vm.showBanner(a);
				vm.showHot(a);
				vm.showBianli(a);
        	},
        	getCommunity: function(city){
        		var self = this;
        		var databag ={"params":'{"cityName":"' + city + '"}'};
	            //获取数据 ajax
	            $.ajax({
	                url : config.andproidinfoUrl,
	                type : 'post',
	                datatype : 'json',
	                data: databag,
	                async:false,
	                success: function (data) {//获取成功
						m.log("查询成功============================"+JSON.stringify(data));
						var msg = eval('('+data+')');
						self.community = msg.result;

					}
				})
        	},
        	showBanner: function(siteId){
        		$(".bannerBox .swiper-wrapper").html('');
				var databag ={"params":'{"siteId":"' + siteId + '"}'};
	            //获取数据 ajax
	            $.ajax({
	                url : config.querymainpageinfoUrl,
	                type : 'post',
	                datatype : 'json',
	                data: databag,
	                async:false,
	                success: function (data) {//获取成功
		                m.log("图片轮播---------查询成功============================"+JSON.stringify(data));
		                var msg = eval('('+data+')');
		                var bannerlist = '';
		                for( var i = 0; i < msg.result.mainRmds.length; i++){
							var imgurl = msg.result.mainRmds[i].attachUrl ? msg.result.mainRmds[i].attachUrl : 'module/index/img/banner1.png';
							bannerlist += '<div href="javascript:void(0);" class="swiper-slide"><a><img src="'+imgurl+'" class="img-responsive" onclick="bannerGo('+msg.result.mainRmds[i].shopMtlId+')"/></a></div>';
						}
						$(".bannerBox .swiper-wrapper").html(bannerlist);
						vm.show("bannerBox");
					}
	            })
				var swiper = new Swiper('.bannerBox', {
							    autoplay:3000,
								speed:1000,
							    parallax : true,
							    preloadImages:false,
							    effect:'slide',
							    pagination : '.swiper-pagination',
							    paginationClickable: true,
							    autoplayDisableOnInteraction : false///注意此参数，默认为true
				});
        	},
        	shopMtlIdget: function(shopMtlId){
        		localStorage.setItem("shopMtlId", shopMtlId);
                window.location.href="view/shangpingxiangqing/shangpingxiangqing.html?openid="+this.openid+"&shopMtlId="+shopMtlId;
        	},
        	showHotMore: function(id){
        		window.location.href="view/Hotsale/hotsale.html?openid="+this.openid+"&hSaleTypeId="+id+"&type=hot";
          	},
        	showbianli: function(materialId){
        		window.location.href="view/bianlidaigou/bianlidaigou.html?openid="+this.openid+"&materialId="+materialId;
        	},
        	showHot: function(siteId){
        		var self = this;
        		var databag ={"params":'{"siteId":"' + siteId + '"}'};
        		$.ajax({
	                url : config.queryhsalepageinfoUrl,
	                type : 'post',
	                datatype : 'json',
	                data: databag,
	                async:false,
	                success: function (data) {//获取成功
	                	m.log("热卖爆款---------查询成功============================"+JSON.stringify(data));
	                	var msg = eval('('+data+')');
	                	self.hotGoods = msg.result.hSales;
	                	self.hotMore = msg.result.hSaleTypeId;
	                	vm.show("mainContent");
	                }
               })
        	},
        	showBianli: function(siteId){
        		var self = this;
        		var databag ={"params":'{"siteId":"' + siteId + '"}'};
        		$.ajax({
	                url : config.queryconveniencespageinfoUrl,
	                type : 'post',
	                datatype : 'json',
	                data: databag,
	                async:false,
	                success: function (data) {//获取成功
	                	m.log("便利代购-----查询成功============================"+JSON.stringify(data));
		                var msg = eval('('+data+')');
		                self.bianli = msg.result.Conveniences;
		                self.bianliMore = msg.result.Conveniences[0].materialId;//菜单ID
	                	vm.show("mainContent");
	                }
               })
        	}
        }
	});

	
	

    //测试数据
    //vm.openid = 'osTDrvibD4hGAktld5Sc1HZQQEbN';//测试openid
    //vm.city = "上海";//默认城市

    if(vm.city){
		vm.getCommunity(vm.city);
		if(vm.siteId){
			vm.showBanner(vm.siteId);
			vm.showHot(vm.siteId);
			vm.showBianli(vm.siteId);
		}else{
			vm.openWindow();
		}
		
    }


    l.Location(function(data){
			console.log(data);
			var c = data.split("市");
			var cityName = c[0];//当前定位城市
			if(vm.city){
				if(vm.city != cityName){
					m.alert("是否切换当前城市?",["取消","确定"],function(){//切换本地缓存城市为当前城市
						localStorage.setItem("city",cityName);
						vm.city = cityName;
						vm.servicesCommunity = '';
						vm.getCommunity(cityName);
						vm.openWindow();
					});
				}
			}else{
				localStorage.setItem("city",cityName);
				vm.city = cityName;
				vm.getCommunity(cityName);
				vm.openWindow();
//				vm.showBanner(vm.siteId);
//				vm.showHot(vm.siteId);
//				vm.showBianli(vm.siteId);
			}
		}, "上海");

    exports.bannerGo = function(shopMtlId){
    	localStorage.setItem("shopMtlId", shopMtlId);
        window.location.href="view/shangpingxiangqing/shangpingxiangqing.html?openid="+vm.openid+"&shopMtlId="+shopMtlId;
    }












})
