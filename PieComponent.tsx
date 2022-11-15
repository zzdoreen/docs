import echarts from "@/components/Common/echart"
import { useEffect, useRef } from "react"
import 'echarts-gl'

export default function PieComponent() {
    const ref = useRef(null)
    useEffect(() => {
        if (!ref.current) return
        const chart = echarts.init(ref.current!)
        chart.setOption({ ...option, })
        const resize = () => chart.resize()
        window.addEventListener('resize', resize)

        return () => {
            window.removeEventListener('resize', resize)
            chart.dispose()
        }
    }, [])
    return <div className="pie3d" ref={ref}></div>
}

/*************************
pie3D 尝试

【 getParametricEquation 函数说明 】 :
*************************
    根据传入的
    startRatio（浮点数）: 当前扇形起始比例，取值区间 [0, endRatio)
    endRatio（浮点数）: 当前扇形结束比例，取值区间 (startRatio, 1]
    isSelected（布尔值）:是否选中，效果参照二维饼图选中效果（单选）
    isHovered（布尔值）: 是否放大，效果接近二维饼图高亮（放大）效果（未能实现阴影）
    k（0~1之间的浮点数）：用于参数方程的一个参数，取值 0~1 之间，通过「内径/外径」的值换算而来。
    
    生成 3D 扇形环曲面

*************************
【 getPie3D 函数说明 】 :
*************************
    根据传入的
    pieData（object）：饼图数据
    internalDiameterRatio（0~1之间的浮点数）：内径/外径的值（默认值 1/2），当该值等于 0 时，为普通饼图
    
    生成模拟 3D 饼图的配置项 option
    
    备注：饼图数据格式示意如下
    [{
        name: '数据1',
        value: 10
    }, {
        // 数据项名称
        name: '数据2',
        value : 56,
        itemStyle: {
            // 透明度
            opacity: 0.5,
            // 扇形颜色
            color: 'green'
        },
        label: {
            show: true
        }
    }]
    
*************************
【 鼠标事件监听说明 】 :
*************************
    click： 实现饼图的选中效果（单选）
            大致思路是，通过监听点击事件，获取到被点击数据的系列序号 params.seriesIndex，
            然后将对应扇形向外/向内移动 10% 的距离。
            
    mouseover： 近似实现饼图的高亮（放大）效果
            大致思路是，在饼图外部套一层透明的圆环，然后监听 mouseover 事件，获取
            到对应数据的系列序号 params.seriesIndex 或系列名称 params.seriesName，
            如果鼠标移到了扇形上，则先取消高亮之前的扇形（如果有）,再高亮当前扇形；
            如果鼠标移到了透明圆环上，则只取消高亮之前的扇形（如果有），不做任何高亮。
            
    globalout： 当鼠标移动过快，直接划出图表区域时，有可能监听不到透明圆环的 mouseover，
            导致此前高亮没能取消，所以补充了对 globalout 的监听。

        
*************************/

// 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
function getParametricEquation(startRatio: number, endRatio: number, isSelected: boolean, isHovered: boolean, k: number) {
    // 计算
    let midRatio = (startRatio + endRatio) / 2;

    let startRadian = startRatio * Math.PI * 2;
    let endRadian = endRatio * Math.PI * 2;
    let midRadian = midRatio * Math.PI * 2;

    // 如果只有一个扇形，则不实现选中效果。
    if (startRatio === 0 && endRatio === 1) {
        isSelected = false;
    }

    // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
    k = typeof k !== 'undefined' ? k : 1 / 3;

    // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
    let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
    let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

    // 计算高亮效果的放大比例（未高亮，则比例为 1）
    let hoverRate = isHovered ? 1.05 : 1;

    // 返回曲面参数方程
    return {
        u: {
            min: -Math.PI,
            max: Math.PI * 3,
            step: Math.PI / 32,
        },

        v: {
            min: 0,
            max: Math.PI * 2,
            step: Math.PI / 20,
        },

        x: function (u: number, v: number) {
            if (u < startRadian) {
                return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            if (u > endRadian) {
                return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
        },

        y: function (u: number, v: number) {
            if (u < startRadian) {
                return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            if (u > endRadian) {
                return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
        },

        z: function (u: number, v: number) {
            if (u < -Math.PI * 0.5) {
                return Math.sin(u);
            }
            if (u > Math.PI * 2.5) {
                return Math.sin(u);
            }
            return Math.sin(v) > 0 ? 1 : -1;
        },
    };
}

// 生成模拟 3D 饼图的配置项
function getPie3D(pieData: string | any[], internalDiameterRatio?: number | undefined) {
    let series = [];
    let sumValue = 0;
    let startValue = 0;
    let endValue = 0;
    let legendData = [];
    let k =
        typeof internalDiameterRatio !== 'undefined'
            ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
            : 1 / 3;

    // 新增标签 series @20210613
    let labelSeries = {
        id: 'labelSeries',
        type: 'bar3D',
        //zlevel:-9,
        barSize: [0.1, 0.1],
        data: [],
        label: {
            show: true,
            formatter: function (params: { name: any; value: any[] }) {
                return `${params.name}\n${params.value[3]}`;
            },
            backgroundColor: '#fff',
        },
    };

    // 为每一个饼图数据，生成一个 series-surface 配置
    for (let i = 0; i < pieData.length; i++) {
        sumValue += pieData[i].value;

        let seriesItem = {
            name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
            type: 'surface',
            parametric: true,
            wireframe: {
                show: false,
            },
            pieData: pieData[i],
            pieStatus: {
                selected: false,
                hovered: false,
                k: k,
            },
        };

        if (typeof pieData[i].itemStyle != 'undefined') {
            let itemStyle = {};

            typeof pieData[i].itemStyle.color != 'undefined' ? (itemStyle!.color = pieData[i].itemStyle.color) : null;
            typeof pieData[i].itemStyle.opacity != 'undefined'
                ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
                : null;

            seriesItem.itemStyle = itemStyle;
        }
        series.push(seriesItem);
    }

    // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
    // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
    for (let i = 0; i < series.length; i++) {
        endValue = startValue + series[i].pieData.value;

        series[i].pieData.startRatio = startValue / sumValue;
        series[i].pieData.endRatio = endValue / sumValue;
        series[i].parametricEquation = getParametricEquation(
            series[i].pieData.startRatio,
            series[i].pieData.endRatio,
            false,
            false,
            k
        );

        startValue = endValue;

        legendData.push(series[i].name);
    }

    // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
    series.push({
        name: 'mouseoutSeries',
        type: 'surface',
        parametric: true,
        wireframe: {
            show: false,
        },
        itemStyle: {
            opacity: 0,
        },
        parametricEquation: {
            u: {
                min: 0,
                max: Math.PI * 2,
                step: Math.PI / 20,
            },
            v: {
                min: 0,
                max: Math.PI,
                step: Math.PI / 20,
            },
            x: function (u: number, v: number) {
                return Math.sin(v) * Math.sin(u) + Math.sin(u);
            },
            y: function (u: number, v: number) {
                return Math.sin(v) * Math.cos(u) + Math.cos(u);
            },
            z: function (u: any, v: number) {
                return Math.cos(v) > 0 ? 0.1 : -0.1;
            },
        },
    });

    // 将 labelSeries 添加进去 @20210613
    series.push(labelSeries);

    // 准备待返回的配置项，把准备好的 legendData、series 传入。
    let option = {
        animation: false,
        legend: {
            data: legendData,
            orient: 'vertical',
            right: 0,
            textStyle: {
                color: 'white'
            }
        },
        tooltip: {
            formatter: (params: { seriesName: string; color: any; seriesIndex: string | number }): string => {
                if (params.seriesName !== 'mouseoutSeries') {
                    return `${params.seriesName}<br/>
                    <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color
                        }; "></span>${option.series[params.seriesIndex].pieData.value}`;
                }
                return ''
            },
        },
        // 增加渐变色尝试（手动通过 seriesIndex 指定系列） @20211228
        xAxis3D: {
            min: -1,
            max: 1,
        },
        yAxis3D: {
            min: -1,
            max: 1,
        },
        zAxis3D: {
            min: -1,
            max: 1,
        },
        grid3D: {
            show: false,
            boxHeight: 10,
            height: 220,
            top: -40,
            viewControl: {
                autoRotate: false,
                alpha: 30,
                zoomSensitivity: 0, // 禁止缩放
                rotateSensitivity: 0 // 禁止旋转
            }

        },
        series: series,
    };
    return option;
}

// 传入数据生成 option
const option = getPie3D([
    {
        name: 'aa',
        value: 11,
        itemStyle: {
            opacity: 1,
            color: '#13C2C2'
        },
    },

    {
        name: 'cc',
        value: 33,
        itemStyle: {
            color: '#A5DAFE'
        }
    },
    {
        name: 'bb',
        value: 22,
        itemStyle: {
            color: '#107AFF',
        },
    },
    {
        name: 'ee',
        value: 9,
    },
    {
        name: 'ff',
        value: 9,
    },
], 0.75);

