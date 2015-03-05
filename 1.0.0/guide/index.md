## 综述

SwitchAccordion可以实现图片的手风琴切换效果。

* 版本：1.0.0
* 作者：婳奕
* 标签：动画
* demo: http://kg.kissyui.com/switch-accordion/1.1/demo/index.html

## 功能
可以实现类似于slide的手风琴切换效果，具体可以参考demo，功能说明：

* 双图片切换的效果（类似于双十二的banner展开收起时的大小图片切换效果），单图片切换效果
* 可以指定切换事件，click（点击），hover（鼠标滑过）
* 实现自动切换；
* 跳转到指定的元素（go）
* 为了兼容tms中banner数目不确定的情况，会根据父元素的宽度和展开元素的宽度来自动确定收起时的宽度，因此需要设定父元素的宽度。

## 初始化组件
		
    S.use('kg/switch-accordion/1.0.0/index', function (S, SwitchAccordion) {
         var switch-accordion = new SwitchAccordion({
         	// 配置参数
         });
    })

## API说明

### 基本参数
* parElem * （string）
	包含所有切换节点的父节点，默认值：".accordion_switch_list"
      
* tabElem *（string）
	单个切换节点，默认值：".accordion_switch_item"

* defaultNum * （number）
	默认显示第几个元素，默认值是0

* largeWidth * （number，必填项）
	设定节点展开时的宽度，为必填项

* timer * 
	元素从收起状态到展开状态的切换时间，默认为0.3

* autoSlide *
	自动切换，默认为false，为true时实现自动切换

* duration *
      自动切换的时间，只有设定autoSlide为true时生效，默认值为4000

* type *   
	切换的事件类型：hover、click，默认为hover

* eventStop * 
	鼠标hover时不切换，只在事件是hover时有效，当鼠标离开时会继续实现自动播放，默认为true
### 方法

* go(num) * 
	跳转到某个节点，从0开始。


## 注意：
	使用时必须注明最大宽度（largeWidth），如果是双图片切换的话需要在图片的class中分别加入"accordion_item_big"和"accordion_item_small"，其中accordion_item_big表示的是展开时的图片，accordion_item_small是收起时的图片。
