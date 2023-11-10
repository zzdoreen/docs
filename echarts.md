+ 2023.04.08 已更新

[可能会用到的文档](https://juejin.cn/post/7299346799210397708)

# ECharts

## 常用配置

## [tooltip 提示框](https://echarts.apache.org/zh/option.html#tooltip)

```javascript
{
   tooltip:{
    confine: true | false, // 是否将tooltip框限制在图表区域内 !!!!
    show: true | false,
    trigger: 'item' | 'axis' | 'none',  // 触发类型
    formatter: '' | ({marker,name,percent,})=>'',  // 浮层自定义内容 marker图标 percent占比 name名称
   } 
}

params = {
    componentType: 'series',
    // 系列类型
    seriesType: string,
    // 系列在传入的 option.series 中的 index
    seriesIndex: number,
    // 系列名称
    seriesName: string,
    // 数据名，类目名
    name: string,
    // 数据在传入的 data 数组中的 index
    dataIndex: number,
    // 传入的原始数据项
    data: Object,
    // 传入的数据值。在多数系列下它和 data 相同。在一些系列下是 data 中的分量（如 map、radar 中）
    value: number|Array|Object,
    // 坐标轴 encode 映射信息，
    // key 为坐标轴（如 'x' 'y' 'radius' 'angle' 等）
    // value 必然为数组，不会为 null/undefied，表示 dimension index 。
    // 其内容如：
    // {
    //     x: [2] // dimension index 为 2 的数据映射到 x 轴
    //     y: [0] // dimension index 为 0 的数据映射到 y 轴
    // }
    encode: Object,
    // 维度名列表
    dimensionNames: Array<String>,
    // 数据的维度 index，如 0 或 1 或 2 ...
    // 仅在雷达图中使用。
    dimensionIndex: number,
    // 数据图形的颜色
    color: string,
    // 饼图，漏斗图的百分比
    percent: number
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