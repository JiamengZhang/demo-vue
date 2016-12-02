
var main = {
    /**
     * @param ele 元素
     * @param callback 回调
     * @param animation 动画开关
     */
    button : function(ele, callback, animation){
        if(document.querySelector(ele)){
            document.querySelector(ele).addEventListener("click", function(e){
                var event = e || window.event;
                if(this.querySelectorAll(".ink").length === 0){
                    var span = document.createElement("span");
                    span.className = "ink";
                    this.insertBefore(span, this.firstChild);
                }
                if(animation){
                    var ink = document.querySelector(".ink");
                    ink.className = "ink";
                    var top = event.offsetY - ink.offsetHeight/2,left = event.offsetX - ink.offsetWidth/2;
                    ink.style.top = top + "px";
                    ink.style.left = left + "px";
                    ink.setAttribute("class", "ink animation");
                }
                callback(event);
            });
        }
    }
}