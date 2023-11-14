# flex

## flex-basis 和 width
+ `flex-basis` 主轴上的宽度
> `flex-direction` 如果是 **row** ，则是 **横向尺寸** ，为 **column** ,则相当于 **纵向尺寸**

+ `width` 元素宽度

不设置width时，可以使用flex-basis；
不设置flex-basis时，可以使用width。
同时设置width和flex-basis时，如果flex-basis大于自身内容宽度，那么不管width是否设置，flex-basis优先级高。

1. `flex-basis` <= `内容宽度` && `width` < `内容宽度` , `容器宽度` = `width`
2. `flex-basis` <= `内容宽度` && `width` > `内容宽度`  , `容器宽度` = `内容宽度`
3. `flex-basis` > `内容宽度` | `width` > `内容宽度` , `容器宽度` = `根据缩放比例计算`

> tips: 如果子项目中有 1、2 两种情况的，其他项目在进行计算的时候 不将其列入计算中

```html
<!-- 
   父容器宽度： 600
   left：width = 150px ，flex-basis：350px，内容宽度：50px （ 符合情况 3 width = 350
   right： width = 500px , ( 情况 3 width = 500
   center：width = 450px ，内容宽度：250px （ 符合情况 2  固定宽度 = 250

   所以 已知的固定宽度为 250，父容器宽度 ：600 - 250 = 350

   left = 350 * （350*1/（350*1+500*1）） = 144.117
   right = 350 * （500*1/（350*1+500*1）） = 205.882
 -->
   <style>
   .container {
      height: 50vh;
      width: 600px;
      background-color: rebeccapurple;
      display: flex;

      >div {
         height: 100px;
         flex-grow: 1;
         box-sizing: border-box;
      }

      .left {
         width: 150px;
         flex-basis: 350px;
         background-color: red;
      }

      .right {
         width: 500px;
         background-color: aliceblue;
      }

      .center {
         width: 450px;
         background-color: bisque;
      }
   }
   </style>

   <div class="container">
      <div class="left">
         <div style="width:50px;height: 50px;background-color: aqua;"></div>
      </div>
      <div class="center">
         <div style="width:250px;height: 50px;background-color: aqua;"></div>
      </div>
      <div class="right"></div>
   </div>
```  

## flex-grow
> （父容器宽度 - 各个子项flex-basis(width)总和）/ 各子项flex-grow总和 * flex-grow + flex-basis(width)

## flex计算

+ flex-grow
+ flex-shrink
+ flex-basis

父容器主轴的长/宽 设置为`900`

所有元素都设置为` flex:1 `
其中`元素1`设置` flex-basis: 30% ` 
`元素2`设置`flex-grow: 2`

1. 先看`flex-basis`，获取到应有的长度
   ```javascript
   // 只有元素1设置了宽度
   width1 = 900*0.3 = 270
     
   ```

2. 因为设置了`flex-grow`，所有元素平分剩余的宽度
   ```javascript
   // 剩余 630
   // 总份数： 1+2+1=4

   // 元素1：占1份 
    width1 = 630*(1/4) + 270 = 427.5
   // 元素2：占2份 
    width2 = 630*(2/4) = 315
   // 元素3：占1份 
    width3 = 630*(1/4) = 157.5
   ```

