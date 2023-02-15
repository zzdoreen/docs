# ECharts

## 常用配置

## [tooltip 提示框](https://echarts.apache.org/zh/option.html#tooltip)

```javascript
{
   tooltip:{
    show: true | false,
    trigger: 'item' | 'axis' | 'none',  // 触发类型
    formatter: '' | ()=>'',  // 浮层自定义内容 
   } 
}
```

## [legend 图例组件](https://echarts.apache.org/zh/option.html#legend)

+ `series`内的数据对象必须要有 `name` 属性

```javascript
{
 legend:{
    ...
    itemStyle:{}, // 图例‘图形’的样式
    lineStyle:{}, // 图例‘线’的样式
    formatter: '{name}' | (name)=>'',  // 图例自定义内容
    icon: 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none' // 图例项的icon

    //  针对多个series进行个性化设置
    data: [
      {
         name:'a',
         ...
      },
      {
         name:'b',
         ...
      }
    ]
 },
 series:[
    {
        name:'a',
        ...
    }
 ]
}
```

## [grid 坐标系网格](https://echarts.apache.org/zh/option.html#grid)

> 文字过长 通过left/bottom的距离设置  eg：`16 + fontSize * maxYLabelLength * 1.2,`

```javascript
{
   grid:{
      // 距离容器 上下左右的距离
      left(right/top/bottom): 20 (具体像素) | '20%'(百分比) |　'left'|'center'|'middle'|'right'|'bottom'|'top',

      // grid组件的宽高
      width(height): string | number | 'auto'
   }
}
```

## [yAxis y轴](https://echarts.apache.org/zh/option.html#yAxis)

+ 多个`y`轴的情况用数组,`name`对应`series`的`name`

```javascript
{
   yAxis:[
      {
         name:'a',
         nameLocation:'center' | 'start' | 'end', // 坐标轴名称显示位置
         nameGap:number, // 坐标轴名称与轴线的距离
         nameRotate:number, // 名称的旋转角度

         type:'value' | 'time' | 'category' | 'log', // 数值轴、时间轴、类目轴、对数轴
         min: number | string | (value)=>number, // 坐标刻度最小值
         max: number | string | (value)=>number, // 坐标刻度最大值
         minInterval: number, // 最小间隔
         splitNumber: number, // 坐标分割段数 配合min、max使用

         // 坐标轴轴线相关
         axisLine:{

         }
      },
   ]
}
```

## [xAxis x轴](https://echarts.apache.org/zh/option.html#xAxis)

+ 和y轴类似

## [dataZoom 区域缩放](https://echarts.apache.org/zh/option.html#dataZoom)

```javascript

 dataZoom: [
        {
          type: 'inside', // 内置
          yAxisIndex: 0,
          startValue: data.length,
          endValue: data.length - 12,
          filterMode: 'filter', // 主轴 'filter'，辅轴 'empty'
          zoomOnMouseWheel: false,
          moveOnMouseWheel: true,
          moveOnMouseMove: false
        },
        {
         type: 'slider', // 滚动条
         ...
        }
      ],
```