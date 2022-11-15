/* eslint-disable @typescript-eslint/no-use-before-define */
import echarts from "@/components/Common/echart"
import { useEffect, useRef } from "react"


export default function ThreeDBarComponent() {
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (!ref.current) return
        const chart = echarts.init(ref.current!)

        const cubeList = ['CubeLeft', 'CubeRight', 'CubeTop']
        cubeList.forEach(item => echarts.graphic?.registerShape(item, initCubeShape(item)))

        chart.setOption({
            backgroundColor: '#010d3a',
            title: {
                text: '--',
                textStyle: {
                    color: '#00FFFF',
                    fontWeight: '800',
                    fontSize: `20`,
                },
                left: 'center',
                top: '5%',
            },
            //提示框
            tooltip: {
                trigger: 'axis',
                formatter: '{c1}',
                axisPointer: {
                    // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                },
            },
            /**区域位置*/
            grid: {
                left: '10%',
                right: '10%',
                top: 150,
                bottom: 70,
            },
            xAxis:
            {
                axisTick: {
                    show: false,
                },
                data: xData,
                show: true,
                type: 'category',
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                axisLabel: {
                    show: true,
                    fontSize: 12,
                    textStyle: {
                        fontSize: 25,
                        fontFamily: 'PangMenZhengDao',
                        fontWeight: 'bold',
                        color: '#CEF4FF',
                        lineHeight: 45,
                    },
                },
            },
            // {
            //     axisLine: {
            //         show: false, //不显示坐标轴线
            //     },
            //     axisTick: {
            //         show: false,
            //     },
            //     data: yList, //y轴数据
            //     show: true,
            //     type: 'category',
            //     splitLine: {
            //         show: false,
            //     },
            //     axisLabel: {
            //         show: true,
            //         fontSize: 12,
            //         textStyle: {
            //             fontSize: 25,
            //             fontFamily: 'PangMenZhengDao',
            //             fontWeight: 'bold',
            //             color: '#CEF4FF',
            //             lineHeight: 45,
            //         },
            //     },
            // },
            // ],

            yAxis: {
                show: true,
                splitNumber: 4,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.2)',
                    },
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.2)',
                    },
                },
                axisLabel: {
                    color: '#CEF4FF',
                    textStyle: {
                        fontSize: 15,
                    },
                },
            },

            series: [
                {
                    type: 'custom',
                    renderItem: function (params: any, api: { coord: (arg0: any[]) => any; value: (arg0: number) => any }) {
                        const location = api.coord([api.value(0), api.value(1)]);
                        return {
                            type: 'group',
                            children: [...cubeList].map((item, index) => ({
                                type: item,
                                shape: {
                                    api,
                                    x: location[0],
                                    y: location[1],
                                    xValue: api.value(0),
                                    yValue: api.value(1),
                                    xAxisPoint: api.coord([api.value(0), 0]),
                                    barWidth,
                                },
                                style: {
                                    fill: `rgba(221,221,221,0.${2 + index})`,
                                },
                            }))
                        };
                    },
                    tooltip: {
                        show: false
                    },
                    data: MAX,
                },
                {
                    type: 'bar',
                    barWidth: barWidth,
                    itemStyle: {
                        normal: {
                            color: function (params: { dataIndex: number }) {
                                return colors[params.dataIndex % 7];
                            },
                        },
                    },
                    label: {
                        show: true,
                        position: 'top',
                        color: '#ffffff',
                        fontSize: 12,
                        fontStyle: 'bold',
                        align: 'center',
                    },
                    data: yList,
                },
                {
                    z: 2,
                    type: 'pictorialBar',
                    data: yList,
                    symbol: 'diamond',
                    symbolOffset: [0, '50%'],
                    symbolSize: [barWidth, barWidth * 0.4],
                    itemStyle: {
                        normal: {
                            color: function (params: { dataIndex: number }) {
                                return colors[params.dataIndex % 7];
                            },
                        },
                    },
                },
                {
                    z: 3,
                    type: 'pictorialBar',
                    symbolPosition: 'end',
                    data: yList,
                    symbol: 'diamond',
                    symbolOffset: [0, '-50%'],
                    symbolSize: [barWidth, barWidth * 0.4],
                    itemStyle: {
                        normal: {
                            borderWidth: 0,
                            color: function (params: { dataIndex: number }) {
                                return colors[params.dataIndex % 7].colorStops[0].color;
                            },
                        },
                    },
                },
            ],
        })

        const resize = () => chart.resize()
        window.addEventListener('resize', resize)
        return () => {
            window.removeEventListener('resize', resize)
            chart.dispose()
        }

    }, [])
    return <div ref={ref} className='bar'></div>
}


function initCubeShape(position: string) {
    return echarts.graphic.extendShape({
        shape: {
            x: 0,
            y: 0,
        },
        buildPath: function (ctx, shape) {
            const xAxisPoint = shape.xAxisPoint;
            const scale = shape.barWidth / 2
            const deep = shape.barWidth / 4
            switch (position) {
                case 'CubeLeft': {
                    const c0 = [shape.x, shape.y]
                    const c1 = [shape.x - scale, shape.y - deep]
                    const c2 = [xAxisPoint[0] - scale, xAxisPoint[1] - deep]
                    const c3 = [xAxisPoint[0], xAxisPoint[1]]
                    ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
                }; break;
                case 'CubeRight': {
                    const c1 = [shape.x, shape.y]
                    const c2 = [xAxisPoint[0], xAxisPoint[1]]
                    const c3 = [xAxisPoint[0] + scale, xAxisPoint[1] - deep]
                    const c4 = [shape.x + scale, shape.y - deep]
                    ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
                }; break;
                case 'CubeTop': {
                    const c1 = [shape.x, shape.y]
                    const c2 = [shape.x + scale, shape.y - deep]
                    const c3 = [shape.x, shape.y - scale]
                    const c4 = [shape.x - scale, shape.y - deep]
                    ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
                }; break;
            }

        },
    });
}

const yList = [32, 58, 64, 64],
    MAX = getMaxData(yList),
    xList = ['a', 'b', 'c', 'd'],
    color = ['#CEF4FF', '#CEF4FF', '#CEF4FF', '#CEF4FF'],
    xData = xList.map((item, index) => ({
        value: item,
        textStyle: {
            color: color[index],
        },
    })),
    barWidth = 25,
    colors = [
        {
            type: 'linear',
            x: 0,
            x2: 1,
            y: 0,
            y2: 0,
            colorStops: [
                {
                    offset: 0,
                    color: '#00FFFF',
                },
                {
                    offset: 0.5,
                    color: '#00FFFF',
                },
                {
                    offset: 0.5,
                    color: '#11A6D0',
                },
                {
                    offset: 1,
                    color: '#11A6D0',
                },
            ],
        },
        {
            type: 'linear',
            x: 0,
            x2: 1,
            y: 0,
            y2: 0,
            colorStops: [
                {
                    offset: 0,
                    color: '#FFD05C',
                },
                {
                    offset: 0.5,
                    color: '#FFD05C',
                },
                {
                    offset: 0.5,
                    color: '#DEA821',
                },
                {
                    offset: 1,
                    color: '#DEA821',
                },
            ],
        },
        {
            type: 'linear',
            x: 0,
            x2: 1,
            y: 0,
            y2: 0,
            colorStops: [
                {
                    offset: 0,
                    color: 'rgba(89,253,254,1)',
                },
                {
                    offset: 0.5,
                    color: 'rgba(68,190,255,1)',
                },
                {
                    offset: 0.5,
                    color: 'rgba(53,133,177,1)',
                },
                {
                    offset: 1,
                    color: 'rgba(53,133,177,1)',
                },
            ],
        },
        {
            type: 'linear',
            x: 0,
            x2: 1,
            y: 0,
            y2: 0,
            colorStops: [
                {
                    offset: 0,
                    color: '#89FF5E',
                },
                {
                    offset: 0.5,
                    color: '#3BECA2',
                },
                {
                    offset: 0.5,
                    color: '#2DB47C',
                },
                {
                    offset: 1,
                    color: '#2DB47C',
                },
            ],
        },
    ];

function getMaxData(arr: number[]) {
    const max = Math.ceil(Math.max(...arr) / 10) * 10
    return Array(arr.length).fill(max)
}