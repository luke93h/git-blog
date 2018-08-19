# BFC

## 定义

> 块格式化上下文（Block Formatting Context，BFC） 是Web页面的可视化CSS渲染的一部分，是布局过程中生成块级盒子的区域，也是浮动元素与其他元素的交互限定区域。

## 生成方法

>Floats, absolutely positioned elements, inline-blocks, table-cells, table-captions, and elements with ‘overflow’ other than ‘visible’ (except when that value has been propagated to the viewport) establish new block formatting contexts.

浮动，绝对定位，inline-block，table-cells， table-captions，或者overflow不为'visible'都会生成BFC

## 作用

影响浮动定位、清除浮动

1. 只有当元素在同一个BFC中时，垂直方向上的margin
才会clollpase.如果它们属于不同的BFC，则不会有margin collapse.因此我们可以再建立一个BFC去阻止margin collpase的发生。

2. 利用BFC去容纳浮动元素

3. 利用BFC阻止文本换行