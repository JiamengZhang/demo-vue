/**
 * name : fuzzyQuery
 * version : 1.0.1
 * author : chenlinren
 * dataTime ： 2016-8-8
 */
/**
 * update  : 2016-08-31;
 * message : 新增如果输入的内容为空 或者ajax查找的数据为空， 那么callback里面会返回一个空对象，
 *
 * update  : 2016-08-31;
 * message : 新增context属性, 给ul模糊查询出来的提供下拉框
 * 如下
 * |  姓名                          班级                 | <-----context 部分
 * | 陈琳壬                        13-5     | <li class="ub"><div class="ub ub-con ub-f1">姓名</div><div class="ub ub-con ub-f1">班级</div></li>
 * | 陈某某                        13-4     |
 * |_______________________|
 */
/***
 *输入框下拉模糊查询框
 *
 */
define(function(require, exports, module) {
    return function(e) {
        (function($) {
            var fuzzyQuery = function() {
                function _fuzzQuery(element, options) {
                    this.setting = {
                        height : "10em",
                        width : "auto",
                        listener : "self", // $("#input")  默认是本身 也就是self
                        background : "white",
                        broder : "none",
                        view : null,
                        data : null,
                        trigger : null,
                        callback : null,
                        titles : undefined,
                        context : null,
                    };
                    for (var i in options) {
                        this.setting[i] = options[i];
                    }
                    if (!(this.setting.view)) {
                        console.error("必须指定一个视图");
                    }

                    if (!this.setting.data && !this.setting.trigger) {
                        console.error("至少绑定一个数据来源");
                    }

                    if (this.setting.data && this.setting.trigger) {
                        console.error("请绑定一个数据来源");
                    }
                    if (this.setting.data && !(this.setting.data instanceof Array)) {
                        console.error("请绑定json数组数据源")
                    }
                    this.data = this.setting.data;
                    this.trigger = this.setting.trigger;
                    this.ele = element;
                    //jQuery
                    this.parent = document.createElement("ul");
                    //js
                    this.listener = this.setting.listener == "self" ? element : this.setting.listener;
                    this.init();
                }


                _fuzzQuery.prototype.init = function() {
                    var self = this,
                        par = self.parent;
                    self.listener[0].addEventListener("input", function(event) {
                        var e = event || window.event;
                        $(self.parent).empty();
                        if (this.value == "") {
                            self.parent.style.display = "none";
                            self.setting.callback.call((self.listener == "self" ? self.ele : self.listener), "{}");
                            return;
                        }
                        if (!self.setting.data && self.setting.trigger) {
                            var callback = function(data) {
                                self.data = data;
                                self.viewshow();
                            }.bind(self.listener)
                            self.setting.trigger(callback);
                        } else if (self.setting.data && !self.setting.trigger) {
                            self.viewshow();
                        }
                    }, false);

                    // self.listener[0].addEventListener("focus", function(event){
                    // this.value = "";
                    // })
                    var offset = self.ele.offset();
                    self.addClass(par, {
                        "width" : (self.setting.width == "auto" ? self.ele.width() + "px" : self.setting.width),
                        "height" : self.setting.height,
                        "position" : "absolute",
                        "zIndex" : 20,
                        "background" : self.setting.background,
                        "top" : offset.top + self.ele.height() + "px",
                        "left" : offset.left + "px",
                        "border" : self.setting.border,
                        "overflow-y" : "scroll",
                    });
                };

                _fuzzQuery.prototype.viewshow = function() {
                    var self = this,
                        par = self.parent;
                    this.parent.style.display = "block";
                    try {
                        if (self.data.length == 0) {
                            if (self.setting.titles) {
                                uexWindow.toast(0, 5, self.setting.titles, 2000);
                                self.setting.callback.call((self.listener == "self" ? self.ele : self.listener), "{}");
                                par.style.display = "none";
                                return;
                            } else {
                                par.style.display = "none";
                                return;
                            }
                        }
                        for (var i = 0; i < self.data.length; i++) {
                            var view = this.formart(this.setting.view, self.data[i]);
                            document.getElementsByTagName("body")[0].appendChild(this.parent);
                            $(this.parent).append(view);
                            $(this.parent).find("li").last().data("detail", JSON.stringify(self.data[i]));
                        }
                        document.getElementsByTagName("body")[0].addEventListener("click", function(event) {
                            par.style.display = "none";
                        });

                        var li = par.getElementsByTagName("li");
                        for (var i = 0; i < li.length; i++) {~ function(n) {
                                li[n].addEventListener("click", function(event) {
                                    var e = event || window.event;
                                    self.setting.callback.call((self.listener == "self" ? self.ele : self.listener), $(this).data("detail"));
                                }, false);
                            }(i);
                        }

                        if (self.setting.context) {
                            $(this.parent).prepend(self.setting.context);
                        }
                    } catch (e) {
                        console.log(e)
                        console.error("请检查json数据是否准确");
                    }
                };

                _fuzzQuery.prototype.addClass = function(ele, css) {
                    for (var i in css) {
                        ele.style[i] = css[i];
                    }
                };

                _fuzzQuery.prototype.formart = function(tpl, data) {
                    var re = /{{([a-zA-Z$_][a-zA-Z$_0-9\.]*)}}/g;
                    return tpl.replace(re, function(raw, key, offset, string) {
                        var paths = key.split('.'),
                            lookup =
                            data;
                        while (paths.length > 0) {
                            lookup = lookup[paths.shift()];
                        }
                        return lookup || raw;
                    });
                };
                return _fuzzQuery;
            }();

            $.fn.fuzzyQuery = function(options) {
                return this.each(function() {
                    var self = $(this),
                        instance = self.data("fuzzyQuery");
                    if (!instance) {
                        self.data("fuzzyQuery", ( instance = new fuzzyQuery(self, options)));
                    }
                });
            };

        })(e)
    }
})