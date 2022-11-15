import { CitySelect } from "@/components/Common/RegionSelect"
import { UnixTimeRender } from "@/utils/tools"
import moment from "moment"

interface ITableConfig {
    column: object
    setting: object
    valueType: object
    valueEnum: object
    personalSetting: object
}

const names1: ITableConfig = {
    column: {
        account: "账号",
        actionType: "操作类型",
        createdAt: '开始时间',
        id: 'id',
        ip: 'ip',
        module: "模块",
        note: "备注",
        object: "类型",
        result: '原因',
    },
    setting: {
        search: ['account', 'createdAt'],
        sort: ['createAt'],
        hideInTable: [],
        hideInForm: [],
    },
    valueType: {
        digit: ['id'],
        date: ['createdAt'],
        password: ['account'],
    },
    valueEnum: {
        result: { 1: { status: 1, text: '正常' }, 2: { status: 2, text: '已禁用' } }

    },
    personalSetting: {
        createdAt: {
            renderText: UnixTimeRender,
            search: {
                transform: (v?: [string, string]) => {
                    if (!v) return {}
                    return {
                        createdAt: moment(v).endOf('day').unix(),
                    }
                }
            }
        },
        ip: {
            formItemProps: {
                rules: [{ required: true }, { max: 200 }],
            },
            renderFormItem: () => <CitySelect />
        },
    }
}

const tableList = { names1 }

export function getTableColumns(type: string) {
    let columns: any[] = []
    const { column, setting, valueType, valueEnum, personalSetting } = tableList[type]
    if (!column || columns.length === 1) return []

    Object.keys(column).forEach(item => {
        columns.push({
            title: column[item],
            dataIndex: item,
            key: item,
            ellipsis: true,
            search: setting.search.includes(item),
            valueType: handleValueType(valueType, item),
            valueEnum: valueEnum[item],

            ...setting.sort.includes(item) ? {
                sorter: (a: { [x: string]: number }, b: { [x: string]: number }) => a[item] - b[item]
            } : {},

            ...personalSetting[item] ? { ...personalSetting[item] } : {},
        })
    })
    return columns
}

function handleValueType(config: object, item: string): string {
    for (let i in config) {
        if (config[i].includes(item)) return i
    }
    return 'text'
}


/* 
 password	密码输入框
        money	金额输入框
        textarea	文本域
        date	日期
        dateTime	日期时间
        dateWeek	周
        dateMonth	月
        dateQuarter	季度输入
        dateYear	年份输入
        dateRange	日期区间
        dateTimeRange	日期时间区间
        time	时间
        timeRange	时间区间
        text	文本框
        select	下拉框
        treeSelect	树形下拉框
        checkbox	多选框
        rate	星级组件
        radio	单选框
        radioButton	按钮单选框
        progress	进度条
        percent	百分比组件
        digit	数字输入框
        second	秒格式化
        avatar	头像
        code	代码框
        switch	开关
        fromNow	相对于当前时间
        image	图片
        jsonCode	代码框，但是带了 json 格式化
        color	颜色选择器
        cascader 级联选择器

*/