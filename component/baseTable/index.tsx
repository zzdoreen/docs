import { addAppVersionService, updateAppVersionService } from '@/services/app'
import { getLogListService } from '@/services/supervise'
import BaseTableComponents from './BaseTable'

export default function BaseTable() {

    return <BaseTableComponents
        addText='新增'
        importSetting={{
            name: 'xx',
            service: updateAppVersionService as any,
            modalName: 'xx信息',
            templateUrl: '/templates/机顶盒管理.xlsx'
        }}
        type='names1'
        listService={getLogListService as any}
        addService={addAppVersionService as any}
        editService={updateAppVersionService as any} />
}