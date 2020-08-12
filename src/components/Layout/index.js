import CommonSidebar from './Sidebar'
import CommonHeader from './Header'
import CommonBreadcrumb from './Breadcrumb'
import CommonFooter from './Footer'
export const Sidebar = {
    install: function (Vue) {
        Vue.component('Sidebar', CommonSidebar)
    }
}
export const Header = {
    install: function (Vue) {
        Vue.component('Header', CommonHeader)
    }
}
export const Breadcrumb = {
    install: function (Vue) {
        Vue.component('Breadcrumb', CommonBreadcrumb)
    }
}
export const Footer = {
    install: function (Vue) {
        Vue.component('Footer', CommonFooter)
    }
}
