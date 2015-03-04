## switch-accordion

* 版本：1.0.0

* demo：[http://gallery.kissyui.com/switch-accordion/1.0.0/demo/index.html](http://gallery.kissyui.com/switch-accordion/1.0.0/demo/index.html)

### V1.0.0

 * 功能：手风琴的切换可以实现类似于slide的手风琴切换效果，具体可以参考demo，功能说明：

 1.双图片切换的效果（类似于双十二的banner展开收起时的大小图片切换效果），单图片切换效果
 2.可以指定切换事件，click（点击），hover（鼠标滑过）
 3.实现自动切换；
 4.跳转到指定的元素（go）
 5.为了兼容tms中banner数目不确定的情况，会根据父元素的宽度和展示元素的宽度来自动确定收起时的宽度，因此需要设定父元素的宽度
 
# 参数说明

```
 {
      parElem: ".accordion_switch_list", // 默认值为accordion_switch_list，可以自己设定
      tabElem : ".accordion_switch_item",   // 单个元素
      defaultNum : 0,             // 默认显示第几个元素，从0开始
      largeWidth : 600,           // 设定显示的元素的宽度
      timer : 0.3,                // 元素从收起状态到展开状态的切换事件
      autoSlide : false,           // 自动切换，默认为false，为true时实现自动切换
      duration : 4000,           // 自动切换的时间，只有设定autoSlide为true时生效
      type: 'hover',              // 事件类型：hover，click
      eventStop : true          // 鼠标hover时不切换，只在事件是hover时有效，当鼠标离开时会继续实现自动播放，默认为true
 }
```

## 注意：使用时必须注明parElem、tabElem和最大宽度（largeWidth），如果是双图片切换的话需要在图片中加入，"accordion_item_big"和"accordion_item_small"，其中accordion_item_big表示的是展开时的图片，accordion_item_small是收起时的图片。

## 提供的方法：
* go(num):接受一个参数num,表示需要跳转到第几个节点。
