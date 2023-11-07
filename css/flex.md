# flex计算

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

