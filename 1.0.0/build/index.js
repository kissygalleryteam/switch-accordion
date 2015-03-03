KISSY.add('kg/switch-accordion/1.0.0/index',["node","event","anim"],function(S ,require, exports, module) {



    var Node = require('node');
    var Event = require('event');
    var Anim = require('anim');
    
    var $ = S.Node.all;

    var switchAccordion = function(conf){

        this.conf = {

            parElem : conf.parElem || ".accordion_switch_list",   
            tabElem : conf.tabElem || ".accordion_switch_item",   
            defaultNum : conf.defaultNum || 0,             
            largeWidth : parseInt(conf.largeWidth),           
            timer : conf.timer || 0.3,                
            autoSlide : conf.autoSlide || false,           
            duration : conf.duration || 4000,           
            type: conf.type || 'hover',              
            eventStop : conf.eventStop || true          
        };

        this.conf.tabNums = $(this.conf.tabElem).length;
        this.wid = parseInt(($(this.conf.parElem).width() - this.conf.largeWidth) / (+this.conf.tabNums - 1));
        this.interval = null;
    }

    switchAccordion.prototype = {

        init: function() {

            this.setPos();
            this.bindMouse();
            this.switchAuto();
        },
        
        
        bindMouse: function() {

            var _self = this;
            var confg = _self.conf;

            confg.type=='hover' && $(confg.tabElem).on("mouseover",function(){

                var self = $(this);
                
                
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
        
        setPos: function(defaultNum) {

            var _self = this;
            var confg = _self.conf;

            defaultNum = defaultNum ? defaultNum : confg.defaultNum;
            
            if(defaultNum >= confg.tabNums) {

                defaultNum = 0;
            }
            

            var tabs = $(confg.tabElem),
                len = tabs.length,
                disWid = _self.wid;

             _self.setParStyle();

            
            $(tabs[defaultNum]).addClass('item_active');

            
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

            

            elem.addClass('item_active');
            
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

        
        go: function (num) {

            var _self = this;
            num >= 0 && _self.judgeCond($($(_self.conf.tabElem)[num]));
        }
    }

    return switchAccordion;
})