define(function(require, exports, module ) {
    function jsonp(setting) {
        setting.data = setting.data || {};
        setting.key = setting.key || "callback";
        setting.callback = setting.callback ||
        function() {};
        setting.data[setting.key] = "__onGetData__";
        window.__onGetData__ = function(data) {
            setting.callback(data);
        };
        var script = document.createElement("script");
        var query = [];
        for (var key in setting.data) {
            query.push(key + "=" + encodeURIComponent(setting.data[key]));
        }
        script.src = setting.url + "?" + query.join("&");
        document.head.appendChild(script);
        document.head.removeChild(script);
    }
    function getLoction(callback, $default) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var x = position.coords.latitude;
                var y = position.coords.longitude;
                var url = "http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b" + "&callback=__onGetData__" + "&location=" + x + "," + y + "&output=json" + "&pois=0";
                jsonp({
                    url: url,
                    callback: function(json) {
                        callback(json.result.addressComponent.city);
                    }
                });
            },
            function(error) {
                switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert("用户不允许地理定位!请开放定位权限！");
                    callback($default);
                    break;
                case error.POSITION_UNAVAILABLE:
                    callback($default);
                    break;
                case error.TIMEOUT:
                    alert("连接超时");
                    break;
                case error.UNKNOWN_ERROR:
                    alert("未知错误");
                    break;
                }
            });
        }
    }
    exports.Location = getLoction;
});
/***
 * var l  = require("location");
 * @param callback 定位成功回调
 * @param default  默认城市 失败时候使用
 * l.Location(function(city){
 *    //doSomeThing.....
 * }, "上海");
 *
 */
