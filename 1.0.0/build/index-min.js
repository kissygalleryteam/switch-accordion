KISSY.add("kg/switch-accordion/1.0.0/index",["node","event","anim","kg/switch-accordion/1.0.0/index.css"],function(t,e,i,a){{var n;e("node"),e("event"),e("anim"),e("kg/switch-accordion/1.0.0/index.css")}n=function(){var e=t.Node.all,i=function(t){this.conf={parElem:t.parElem||".accordion_switch_list",tabElem:t.tabElem||".accordion_switch_item",defaultNum:t.defaultNum||0,largeWidth:parseInt(t.largeWidth),timer:t.timer||.3,autoSlide:t.autoSlide||!1,duration:t.duration||4e3,type:t.type||"hover",eventStop:t.eventStop||!0},this.conf.tabNums=e(this.conf.tabElem).length,this.wid=parseInt((e(this.conf.parElem).width()-this.conf.largeWidth)/(+this.conf.tabNums-1)),this.interval=null,this.init()};return i.prototype={init:function(){this.setPos(),this.bindMouse(),this.switchAuto()},bindMouse:function(){var t=this,i=t.conf;"hover"==i.type&&e(i.tabElem).on("mouseover",function(){var a=e(this);i.eventStop&&t.interval&&(clearInterval(t.interval),t.interval=null),e(this).hasClass("item_active")||(e(i.tabElem).stop(),t.judgeCond(a))}),"hover"==i.type&&e(i.tabElem).on("mouseleave",function(){i.eventStop&&!t.interval&&t.switchAuto()}),"click"==i.type&&e(i.tabElem).on("click",function(){var a=e(this);e(this).hasClass("item_active")||(e(i.tabElem).stop(),t.judgeCond(a))})},setPos:function(t){var i=this,a=i.conf;t=t?t:a.defaultNum,t>=a.tabNums&&(t=0);var n=e(a.tabElem),o=n.length,s=i.wid;i.setParStyle(),e(n[t]).addClass("item_active");for(var c=0;o>c;c++){var l;l=t>c?s*c:c>t?s*(c-1)+a.largeWidth:s*t,e(n[c]).css({position:"absolute",left:l+"px"})}},setParStyle:function(){var t=this,i=t.conf;e(i.parElem).css({position:"relative",overflow:"hidden"})},judgeCond:function(t){var i=this,a=i.conf,n=i.wid,o=e(a.tabElem),s=e(a.tabElem).index(t),c=e(".item_active");t.addClass("item_active"),o.each(function(t,e){0===e?t.animate({left:0},a.timer,!1,function(){c.removeClass("item_active")}):e===s?t.animate({left:e*n},a.timer,!1,function(){c.removeClass("item_active")}):s>e?t.animate({left:e*n},a.timer,!1,function(){c.removeClass("item_active")}):e>s&&t.animate({left:a.largeWidth+(e-1)*n},a.timer,!1,function(){c.removeClass("item_active")})})},switchAuto:function(){var t=this,i=t.conf;if("hover"==i.type&&i.autoSlide){{e(i.tabElem).index(e("item_active"))}t.interval=setInterval(function(){var a=(e(i.tabElem).index(e(".item_active"))+1)%i.tabNums;t.judgeCond(e(e(i.tabElem)[a]))},i.duration)}},go:function(t){var i=this;t>=0&&i.judgeCond(e(e(i.conf.tabElem)[t]))}},i}(),a.exports=n});