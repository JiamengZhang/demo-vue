define(function (require, exports, module) {
	//var SERVER_URL =  "http://192.168.0.148:8180/orange/";//本地环境
	var SERVER_URL = "http://hncf56.f3322.net:17700/xiaoyou-app/";//测试环境
	// var SERVER_URL =  "http://hncf.ne56erp.com/orange/";//上海测试环境
	// var SERVER_URL = "http://nefile.go724.cn/orange/";//生产环境


	//  appid : "wxc4b057c5b5ffb7ec";//橙久社区测试平台
	//  appsecret : "6bd6be549df58acf9278bfac63bdbe19";//橙久社区测试平台

	var appid = "wxd4011fca43550b08";//橙久社区
	var appsecret = "8a6394cce526e1b052d22b3160493c6a";//橙久社区

	var shopSuffix = ".shopService"
	var expressSuffix = ".rastService"
	//  appid : "wx463c4d0af4790be4";//小熊阿姨
	//  appsecret : "0fa1edde6819ecaf12e61132191dc572";//小熊阿姨
	//--------------------------------我的快递start-------------------------------
	/*我的快递模块url后缀*/
	var urlServer = {

		debug : false,
		
		/*地址编辑保存地址*/
		address_save_url: SERVER_URL + '10400' + expressSuffix,

		/*删除常用地址url*/
		address_delete_url: SERVER_URL + '10700' + expressSuffix,

		/*下单地址*/
		place_order_url: SERVER_URL + '10030' + expressSuffix,

		/*获取物流公司地址*/
		obtain_logistics_url: SERVER_URL + '10010' + expressSuffix,//正式环境获取

		/*获取常用地址列表*/
		address_list_url: SERVER_URL + '10500' + expressSuffix,

		/*订单管理地址*/
		order_manager_url: SERVER_URL + '10300' + expressSuffix,

		/*微信获取jsapi_ticket*/
		obtain_ticket_url: "https://api.weixin.qq.com/cgi-bin/ticket/getticket",//参数?access_token:ACCESS_TOKEN&type:jsapi

		/*地址联动地址--国家*/
		obtain_country_url: SERVER_URL + "10040" + expressSuffix,

		/*地址联动地址--省份*/
		obtain_province_url: SERVER_URL + "10060" + expressSuffix,

		/*地址联动地址--城市*/
		obtain_city_url: SERVER_URL + "10060" + expressSuffix,

		/*地址联动地址--区县*/
		obtain_county_url: SERVER_URL + "10060" + expressSuffix,

		/*获取验证码*/
		url_getCode: SERVER_URL + "10080" + expressSuffix,

		/*注册*/
		url_register: SERVER_URL + "10090" + expressSuffix,

		/*客服反馈*/
		url_feedback: SERVER_URL + "10070" + expressSuffix,

		/*检测是否已经注册*/
		url_isRegister: SERVER_URL + "10100" + expressSuffix,

		/*取消注册*/
		url_unreg: SERVER_URL + "10600" + expressSuffix,

		/*站点查询*/
		url_siteQuery: SERVER_URL + "10020" + expressSuffix,

		/*运单评价*/
		url_pj: SERVER_URL + "10200" + expressSuffix,

		/*小区*/
		url_xq: SERVER_URL + "30000" + expressSuffix,

		/*快件跟踪*/
		trackinfoUrl: SERVER_URL + "10000" + expressSuffix,

		/*修改地址*/
		updateAddressUrl: SERVER_URL + "10800" + expressSuffix,

		/*根据openID查询UserId*/
		getAuthUserIdUrl: SERVER_URL + '10900' + expressSuffix,

		/*省市区模糊查询*/
		addressDataUrl: SERVER_URL + "10040" + expressSuffix,

		/*省市区向上联动查询*/
		linkupAddressDataUrl: SERVER_URL + "10050" + expressSuffix,

		/*省市区向下联动查询*/
		linkdownAddressDataUrl: SERVER_URL + "10060" + expressSuffix,
		//--------------------------------我的快递end---------------------------------




		//--------------------------------网上商城start-------------------------------
		/*网上商城模块url后缀*/


		/*我的订单处理中*/
		MyorderUrl: SERVER_URL + '11020' + shopSuffix,

		/*我的订单已取消*/
		CancelledUrl: SERVER_URL + '11030' + shopSuffix,

		/*我的订单已完成*/
		CompletedUrl: SERVER_URL + '11040' + shopSuffix,

		/*取消订单*/
		SubscribeTypeUrl: SERVER_URL + '11050' + shopSuffix,

		/*确认收货*/
		updateCompletedUrl: SERVER_URL + '11060' + shopSuffix,

		/*订单详情*/
		queryDetailResultUrl: SERVER_URL + '11070' + shopSuffix,

		/*查看购物车*/
		shopcartUrl: SERVER_URL + '10010' + shopSuffix,

		/*结算购物车*/
		calshopcartUrl: SERVER_URL + '10020' + shopSuffix,

		/*便利代购*/
		ConvenientShopInfoUrl: SERVER_URL + '11080' + shopSuffix,

		/*查询便利代购子菜单商品*/
		ConventientShopGoodsUrl: SERVER_URL + '11090' + shopSuffix,

		/*模糊查询城市下的小区信息(网点)*/
		andproidinfoUrl: SERVER_URL + '30000' + shopSuffix,

		/*热卖爆款*/
		queryhotsaleUrl: SERVER_URL + '31000' + shopSuffix,

		/*商品详情页*/
		getmtlshopbyidinfoUrl: SERVER_URL + '31100' + shopSuffix,

		/*结算页查询*/
		querySettlementResultUrl: SERVER_URL + '31120' + shopSuffix,

		/*结算页结算*/
		updateSettlementUrl: SERVER_URL + '31130' + shopSuffix,

		/*banner 首页推荐*/
		querymainpageinfoUrl: SERVER_URL + '31110' + shopSuffix,

		/*首页 便利代购*/
		queryconveniencespageinfoUrl: SERVER_URL + '31111' + shopSuffix,

		/*首页 热卖爆款*/
		queryhsalepageinfoUrl: SERVER_URL + '31211' + shopSuffix,

		/*模糊查询城市，根据名称*/
		querycitybylikepcninfoUrl: SERVER_URL + '31221' + shopSuffix,

		/*加入购物车*/
		addShopCartUrl: SERVER_URL + '10030' + shopSuffix,

		/*编辑购物车完成*/
		editshopcartUrl: SERVER_URL + '10040' + shopSuffix,

		/*我的快递*/
		myExpressUrl: SERVER_URL + '31180' + shopSuffix,

		/*返回微信内置JS所需参数*/
		builtInParameterUrl: SERVER_URL + '31160' + shopSuffix,

		/*微信支付*/
		microchannelpayUrl: SERVER_URL + '31140' + shopSuffix,

		/* 微信服务下单服务类型 */
		onlineorderServiceUrl: SERVER_URL + '31300' + shopSuffix,

		/* 微信服务下单*/
		onlineorderUrl: SERVER_URL + '31400' + shopSuffix,

		/* 微信服务历史订单*/
		onlineorderHistoryUrl: SERVER_URL + '31500' + shopSuffix,

		/* 微信服务历史订单详情*/
		onlineorderHistoryProUrl: SERVER_URL + '31600' + shopSuffix,

		/* 修改订单状态*/
		onlineorderChangeUrl: SERVER_URL + '31700' + shopSuffix,

		/* 微信服务下单服务分类所属类型*/
		onlineorderServiceSecondUrl: SERVER_URL + '31310' + shopSuffix,

		/*获取一元购商品*/
		onepurchaseUrl: SERVER_URL + '32000' + shopSuffix,

		/*查询一元购商品是否超过系统参数配置的数量*/
		onepurchasenumUrl: SERVER_URL + '32100' + shopSuffix,

		/*查询一元购商品是否购买*/
		onepurchasebuyUrl: SERVER_URL + '32200' + shopSuffix,
		//--------------------------------网上商城end---------------------------------

	};

	module.exports = urlServer;
});
