define(function (require, exports, module) {

    //返回顶部
    var floatingNav = function (data) {
        this.data = data;
        refresh.init();
    };

    floatingNav.prototype.navRefresh = function (fn) {
        _clickRefresh.__init.call(this.data, fn);
    };

    floatingNav.prototype.navGoTop = function (time) {
        goTop.__init(time);
    };

    floatingNav.prototype.touchRefresh = function (ele, fn) {
        _touchRefresh.__init.call(this.data, ele, fn);
    };

    floatingNav.prototype.loader = function (fn) {
        return loader.__init.call(this.data, fn);
    };

    //刷新
    var refresh = {
        refreshElement: document.createElement("div"),
        refreshIco: document.createElement("span"),
        get height() {
            return "-" + (this.refreshElement.offsetHeight + 5) + "px";
        },
        init: function () {
            var self = this;
            self.refreshIco.className = "fa fa-spinner";
            self.refreshElement.appendChild(self.refreshIco);
            self.addClass(self.refreshElement, {
                textAlign: "center",
                position: "fixed",
                /* width: 100%; */
                width: "2em",
                height: "2em",
                background: "white",
                margin: "0 auto",
                left: "50%",
                marginLeft: "-.1em",
                borderRadius: "50%",
                boxShadow: "rgba(0, 0, 0, 0.247059) 0px 0px 15px",
                lineHeight: "2em",
                transition: "all .2s",
                WebkitTransition: "all .2s"

            });
            document.querySelector("body").appendChild(self.refreshElement);
            self.refreshElement.style.top = self.height;
        },

        startRefresh: function (_end) {
            this.refreshElement.style.top = _end ? _end : 8 + "rem";
            this.refreshIco.className += " fa-spin";
        },

        overRefresh: function (e) {
            var self = this;
            self.refreshElement.style.top = self.height;
            self.refreshIco.className = self.refreshIco.className.substring(0, 13);
            document.body.scrollTop = 0;
        },

        addClass: function (ele, css) {
            for (var i in css) {
                ele.style[i] = css[i];
            }
        },
    };


    var navDom = Object.create(refresh, {
        //浮动容器
        ele: {
            get: function () {
                var navigation = document.querySelector("#navigation");
                if (!navigation) {
                    navigation = document.createElement("div");
                    navigation.id = "navigation";
                    this.addClass(navigation, {
                        "padding": "0 .5em 0 .5em",
                        "position": "fixed",
                        "bottom": "1em",
                        "right": "1em",
                        "background": "white",
                        "boxShadow": "rgba(0, 0, 0, 0.247059) 0px 0px 15px",
                    });
                    document.body.appendChild(navigation);
                }
                return navigation;
            },
        },
        body: {
            get: function () {
                return document.querySelector("body");
            }
        },

        appendNav: {
            value: function (id) {
                var e = document.createElement("a"),
                    refreshEle = document.querySelector("#refresh");
                e.id = id;
                this.addClass(e, {
                    "display": "block",
                    "textDecoration": "none",
                    "padding": "1em .5em 1em .5em",
                    "color": "#808080",
                });
                switch (id) {
                    case "goTop":
                        e.className = "fa fa-angle-up";
                        break;
                    case "refresh":
                        e.className = "fa fa-repeat";
                        break;
                    default:
                        break;
                }
                if (e.id === "goTop" && refreshEle) {
                    this.ele.insertBefore(e, refreshEle);
                    e.style.borderBottom = "1px solid rgba(128,128,128, .4)";
                } else {
                    this.ele.appendChild(e);
                }
                return e;
            }
        }
    });


    //点击刷新
    var _clickRefresh = Object.create(navDom);
    _clickRefresh.__init = function (fn) {
        var self = _clickRefresh;
        self.appendNav("refresh").addEventListener("click", function () {
            self.startRefresh();
            fn.call(this, self.overRefresh.bind(self));
        }.bind(this));
    };

    //前往顶部
    var goTop = Object.create(navDom);
    var run;
    goTop.__init = function (time) {
        document.body.scrollTop = 0;
        this.appendNav("goTop").addEventListener("click", function () {
            if (run) { clearInterval(run); }
            var top = document.documentElement.scrollTop || document.body.scrollTop;
            var s = Math.floor(top / (time / 10));
            if (top === 0 || !isFinite(s)) { return; }
            run = setInterval(function () {
                top -= s;
                document.body.scrollTop = top;
                if (top < 0) {
                    global.clearInterval(run);
                }
            }, 1);
        });
    };

    //下拉刷新
    var _touchRefresh = Object.create(refresh, {
        height: {
            get: function () {
                return "-" + (this.refreshElement.offsetHeight + 5) + "px";
            },
            enumerable: true,
            configurable: true
        },

        scroll: {
            get: function () {
                return document.documentElement.scrollTop || document.body.scrollTop;
            },
            enumerable: true,
            configurable: true,
        }
    });


    _touchRefresh.touch = 0;

    _touchRefresh.isOver = false;
    _touchRefresh.isStart = false;
    _touchRefresh.__init = function (ele, fn) {
        var self = _touchRefresh;
        self.element = document.querySelector(ele);
        document.querySelector(ele).addEventListener("touchstart", self.start);
        document.querySelector(ele).addEventListener("touchmove", self.move);
        document.querySelector(ele).addEventListener("touchend", self.end.bind(this, fn));
    };

    _touchRefresh.start = function (e) {
        var self = _touchRefresh;
        self.element.removeAttribute("style");
        if (self.scroll === 0) {
            var touch = event.targetTouches[0];
            self.touch = touch.pageY;
        }
    };

    _touchRefresh.move = function (e) {
        var event = e || window.event;
        var self = _touchRefresh;
        var touch = event.targetTouches[0];
        _end = (self.touch - touch.pageY);
        if (self.isStart) {
            e.preventDefault();
            move();
        }
        if (_end < 0 && self.scroll === 0) {
            self.isStart = true;
        }

        function move() {
            if(-(_end / 2) < 0) return;
            self.element.style.transform = "translate3d(0px, " + -(_end / 2) + "px, 0px)";
            if (-_end > 120) {
                self.isOver = true;
                return;
            }
            self.isOver = false;
        }

    };

    _touchRefresh.end = function (fn) {
        var self = _touchRefresh;
        if (self.isOver) {
            self.startRefresh();
            self.addClass(self.element, {
                transition: "-webkit-transform .4s ease 0s",
                transform: "translate3d(0px, 0px, 0px)",
            });
            fn.call(this, self.overRefresh.bind(self));
        } else {
            self.element.style.transform = "translate3d(0px, 0px, 0px)";
        }
        self.isOver = false;
        self.isStart = false;
    };


    var loader = {
        get getScrollTop() {
            var scrolltop = document.body.scrollTop || window.pageYOffset || document.documentElement.scrollTop;
            return scrolltop;
        },

        get getClientHeight() {
            var clientheight = 0;
            if (document.body.clientHeight && document.documentElement.clientHeight) {
                clientheight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
            }
            else {
                clientheight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
            }
            return clientheight;
        },

        get getScrollHeight() {
            return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        },

        __init: function (fn) {
            var self = loader;
            //document.documentElement.scrollTop = 0;
            return function () {
                if (self.getScrollTop + self.getClientHeight == self.getScrollHeight) {
                    fn.call(this);
                }
            }.bind(this);
        }
    };

    exports.refresh = floatingNav;
});
