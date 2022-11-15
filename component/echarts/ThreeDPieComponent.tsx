import echarts from "@/components/Common/echart"
import { useEffect, useRef } from "react"

export default function ThreeDPieComponent() {
    const ref = useRef(null)
    useEffect(() => {
        if (!ref.current) return

        const chart = echarts.init(ref.current!)

        const option = {
            color: ['#A0CE3A', '#31C5C0', '#1E9BD1', '#0F347B', '#585247', '#7F6AAD', '#009D85', "rgba(250,250,250,0.3)"],
            backgroundColor: '#010d3a',
            title: {
                text: '总数',
                subtext: 7789,
                textStyle: {
                    color: '#f2f2f2',
                    fontSize: 20,
                },
                subtextStyle: {
                    fontSize: 20,
                    color: ['#ff9d19']
                },
                x: 'center',
                y: 'center',
            },
            grid: {
                bottom: 150,
                left: 100,
                right: '20%'
            },
            legend: {
                bottom: 50,
                textStyle: {
                    color: '#f2f2f2',
                    fontSize: 12,
                },
                data: data,
            },
            series: [
                // 主要展示层的
                {
                    radius: ['30%', '50%'],
                    center: ['50%', '50%'],
                    type: 'pie',
                    label: {
                        normal: {
                            show: true,
                            formatter: "{c}%",
                            textStyle: {
                                fontSize: 20,

                            },
                            position: 'outside'
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true,
                            length: 15, // 指针一
                            length2: 20, // 指针二
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data: data,

                },
                // 内边框的设置
                {
                    radius: ['30%', '35%'],
                    center: ['50%', '50%'],
                    type: 'pie',
                    hoverAnimation: false,
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    animation: false,
                    tooltip: {
                        show: false
                    },
                    data: [{
                        value: 1,
                        itemStyle: {
                            color: "rgba(250,250,250,0.3)",
                        },
                    }],
                },
                // 外边框
                {
                    name: '外边框',
                    type: 'pie',
                    clockWise: false, //顺时加载
                    hoverAnimation: false, //鼠标移入变大
                    center: ['50%', '50%'],
                    radius: ['55%', '55%'],
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    data: [{
                        value: 9,
                        name: '',
                        itemStyle: {
                            normal: {
                                borderWidth: 2,
                                borderColor: '#0b5263'
                            }
                        }
                    }]
                },
            ]
        };
        chart.setOption(option)

        const resize = () => chart.resize()
        window.addEventListener('resize', resize)
        return () => {
            window.removeEventListener('resize', resize)
            chart.dispose()
        }
    }, [])
    return <div className="pie" ref={ref}></div>
}

const data = [{
    "name": "1",
    "value": 10
}, {
    "name": "2",
    "value": 10
}, {
    "name": "3",
    "value": 10
}, {
    "name": "4",
    "value": 10
}, {
    "name": "5",
    "value": 10
}, {
    "name": "6",
    "value": 20
}, {
    "name": "7",
    "value": 30
},]
