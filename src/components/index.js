import DataTable from './DataTable'
import Filters from './Filters'
import Btns from './Btns'
import Upload from './Upload'
import InfoTable from './InfoTable'
import CommonDialog from './CommonDialog'
import CountBar from './CountBar'
import Charts from './Charts'
import Ueditor from './Ueditor'
import DragTable from './DragTable'
import Process from './Process'
import { Header, Sidebar, Breadcrumb, Footer } from './Layout'

const components = {
    install: function (Vue) {
        Vue.use(Sidebar)
        Vue.use(Header)
        Vue.use(Breadcrumb)
        Vue.use(Footer)
        Vue.use(DataTable)
        Vue.use(Filters)
        Vue.use(Btns)
        Vue.use(Upload)
        Vue.use(InfoTable)
        Vue.use(CommonDialog)
        Vue.use(CountBar)
        Vue.use(Charts)
        Vue.use(Ueditor)
        Vue.use(DragTable)
        Vue.use(Process)
    }
}
export default components
