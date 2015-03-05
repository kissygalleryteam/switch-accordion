
KISSY.add(function(S, require){


    var Node = require('node');
    var Event = require('event');
    var Anim = require('anim');
    require('./index.css');
    
    var $ = S.Node.all;

    var switchAccordion = function(conf){

        this.conf = {

            parElem : conf.parElem || ".accordion_switch_list",   // 包含的元素
            tabElem : conf.tabElem || ".accordion_switch_item",   // 每个元素的类
            defaultNum : conf.defaultNum || 0,             // 默认显示第几个
            largeWidth : parseInt(conf.largeWidth),           // 最大宽度
            timer : conf.timer || 0.3,                // 单个元素的动画时间
            autoSlide : conf.autoSlide || false,           // 自动切换
            duration : conf.duration || 4000,           // 自动切换的时间
            type: conf.type || 'hover',              // 事件类型：hover，click（此功能暂时未实现）
            eventStop : conf.eventStop || true          // 鼠标hover时不切换，只在事件是hover时有效
        };

        this.conf.tabNums = $(this.conf.tabElem).length;
        this.wid = parseInt(($(this.conf.parElem).width() - this.conf.largeWidth) / (+this.conf.tabNums - 1));
        this.interval = null;
        this.init();
    }

    switchAccordion.prototype = {

        init: function() {

            this.setPos();
            this.bindMouse();
            this.switchAuto();
        },
        
        /* 绑定事件 */
        bindMouse: function() {

            var _self = this;
            var confg = _self.conf;

            confg.type=='hover' && $(confg.tabElem).on("mouseover",function(){

                var self = $(this);
                
                // 鼠标滑动到某个元素时暂停自动播放
                if(confg.eventStop && _self.interval){

                    clearInterval(_self.interval);
                    _self.interval = null;
                }
                if($(this).hasClass('item_active')){
                    return;
                }

                $(confg.tabElem).stop();

                _self.judgeCond(self);

                
            });

            confg.type=='hover' && $(confg.tabElem).on("mouseleave",function(){

                // 鼠标离开时恢复自动播放
                if(confg.eventStop && !_self.interval){
                    _self.switchAuto();
                }
            });

            confg.type=='click' && $(confg.tabElem).on("click",function(){

                var self = $(this);
               if($(this).hasClass('item_active')){
                    return;
                }

                $(confg.tabElem).stop();

                _self.judgeCond(self);
            });
        },
        /*
        * @info: 页面加载时初始化banner布局
        * @intro : 根据页面的banner数目确定每个banner的位置
        */
        setPos: function(defaultNum) {

            var _self = this;
            var confg = _self.conf;

            defaultNum = defaultNum ? defaultNum : confg.defaultNum;
            
            if(defaultNum >= confg.tabNums) {

                defaultNum = 0;
            }
            /* 获取每个隐藏的元素的宽度 */

            var tabs = $(confg.tabElem),
                len = tabs.length,
                disWid = _self.wid;

             _self.setParStyle();

            /* item_active操作区 */
            $(tabs[defaultNum]).addClass('item_active');

            /* 其他banner操作区 */
            for(var i  = 0;i < len;i++){
                var l;

                if(i < defaultNum){
                    l = disWid * i;

                }else if(i > defaultNum){
                    l = disWid * (i - 1 ) + confg.largeWidth;
                }
                else{
                    l = disWid * defaultNum;
                }

                $(tabs[i]).css({
                    position : "absolute",
                    left : l + 'px'
                });
            }
        },

        setParStyle: function () {

            var _self = this;
            var confg = _self.conf;

            // 设置父元素的css
            $(confg.parElem).css({
                position: 'relative',
                overflow: 'hidden'
            });

        },
        judgeCond : function(elem){
            
            var _self = this,
                confg = _self.conf;

            var dist = 0,
                disWid = _self.wid;

            var tabs = $(confg.tabElem);
            var currentIndex = $(confg.tabElem).index(elem);
            var activeElem = $('.item_active');

            // 为当前要显示的元素设置item_active的类

            elem.addClass('item_active');
            /**
             * 手风琴切换
            */
            tabs.each(function(item, index) {
                if (index === 0) {
                    item.animate({ left: 0 },confg.timer,false,function(){

                        activeElem.removeClass('item_active');

                    });
                }
                else if (index === currentIndex) {
                    item.animate({ left: (index) * disWid },confg.timer,false,function(){

                        activeElem.removeClass('item_active');
                    });
                }
                else if (index < currentIndex) {
                    item.animate({ left: (index) * disWid },confg.timer,false,function(){

                        activeElem.removeClass('item_active');
                    });
                }
                else if (index > currentIndex) {
                    item.animate({ left: confg.largeWidth + (index - 1) * disWid },confg.timer,false,function(){
                        activeElem.removeClass('item_active');
                    });
                }
            });
        },
        /**
         * 自动播放
         * _self.interval来记录自动播放的事件，可以便于以后暂停自动播放
         * 
        */
        switchAuto: function () {

            var _self = this,
                confg = _self.conf;

            if(confg.type=='hover' && confg.autoSlide){

               var index = $(confg.tabElem).index($('item_active'));

               _self.interval = setInterval(function () {

                    var index = ($(confg.tabElem).index($('.item_active')) + 1) % confg.tabNums;

                    _self.judgeCond($($(confg.tabElem)[index]));

               }, confg.duration); 

            }
        },

        // 跳转至某个元素，默认从0开始
        go: function (num) {

            var _self = this;
            num >= 0 && _self.judgeCond($($(_self.conf.tabElem)[num]));
        }
    }

    return switchAccordion;
})