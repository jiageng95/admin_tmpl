<template>
    <div class="sidebar" :class="{fold: isFold}">
        <ul class="menu-list">
            <li class="logo"><img src="@/assets/images/LOGO.png" /></li>
            <li class="line"></li>
            <router-link v-if="tab.auth" v-for="(tab, index) in tabsList" :key="index" class="tab-item" :class="{act: index === curTabIndex}" tag="li" :to="{path: tab.path}">
                <i class="menu-icon" :class="tab.icon"></i>
                <span>{{tab.name}}</span>
            </router-link>
        </ul>
        <ul class="sub-menu" v-if="curTab.auth">
            <li class="menu-tit">{{curTab.subTabTitle}}</li>
            <li class="menu-item" v-for="(item, index) in curTab.children" :key="index" v-if="item.auth">
                <span class="sub-menu-tit" v-if="showSubMenu(item.children)">{{item.name}}</span>
                <router-link class="sub-menu-item" v-if="submenu.auth" :class="{act: index === curSubMenu && idx === curSubMenuChild}" v-for="(submenu, idx) in item.children" :key="idx" tag="li" :to="{path: submenu.path, query: submenu.query || {}}">{{submenu.name}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import util from '@/util/util'
export default {
    data () {
        return {
            showList: [],
            permissionList: [],
            tabsList: [
                {
                    name: '仪表盘',
                    subTabTitle: '仪表盘',
                    icon: 'el-icon-s-marketing',
                    path: '/dashboard',
                    children: [
                        {
                            name: '仪表盘',
                            auth: false,
                            children: [
                                {
                                    name: '仪表盘',
                                    path: '/dashboard',
                                    auth: false
                                }
                            ]
                        }
                    ]
                },
                {
                    name: '用户',
                    subTabTitle: '用户管理',
                    icon: 'el-icon-s-custom',
                    path: '/userManage/userList',
                    children: [
                        {
                            name: '用户管理',
                            auth: false,
                            children: [
                                {
                                    name: '用户列表',
                                    path: '/userManage/userList',
                                    auth: false
                                }
                            ]
                        }
                    ]
                },
                {
                    name: '分类',
                    subTabTitle: '回收分类',
                    icon: 'el-icon-menu',
                    path: '/recycleCategory',
                    children: [
                        {
                            name: '回收分类',
                            auth: false,
                            children: [
                                {
                                    name: '分类列表',
                                    path: '/recycleCategory',
                                    auth: false
                                }
                            ]
                        }
                    ]
                },
                {
                    name: '设备',
                    subTabTitle: '设备管理',
                    icon: 'el-icon-s-platform',
                    path: '/device',
                    children: [
                        {
                            name: '设备管理',
                            auth: false,
                            children: [
                                {
                                    name: '设备列表',
                                    path: '/device',
                                    auth: false
                                }
                            ]
                        }
                    ]
                },
                {
                    name: '记录',
                    subTabTitle: '回收记录',
                    icon: 'el-icon-s-order',
                    path: '/recycleLog',
                    children: [
                        {
                            name: '回收记录',
                            auth: false,
                            children: [
                                {
                                    name: '回收记录列表',
                                    path: '/recycleLog',
                                    auth: false
                                }
                            ]
                        }
                    ]
                },
                {
                    name: '文章',
                    subTabTitle: '文章管理',
                    icon: 'el-icon-s-management',
                    path: '/article/banner',
                    children: [
                        {
                            name: '文章管理',
                            auth: false,
                            children: [
                                {
                                    name: '轮播图',
                                    path: '/article/banner',
                                    auth: false
                                },
                                {
                                    name: '文章列表',
                                    path: '/article/articleList',
                                    auth: false
                                },
                                {
                                    name: '文章分类',
                                    path: '/article/articleCategory',
                                    auth: false
                                },
                                {
                                    name: '关于我们',
                                    path: '/article/aboutus',
                                    auth: false
                                }
                            ]
                        }
                    ]
                },
                {
                    name: '系统',
                    subTabTitle: '系统管理',
                    icon: 'el-icon-s-tools',
                    path: '/systemManage/userInfo',
                    children: [
                        {
                            name: '系统管理',
                            auth: false,
                            children: [
                                {
                                    name: '个人信息',
                                    path: '/systemManage/userInfo',
                                    auth: false
                                },
                                {
                                    name: '账号管理',
                                    path: '/systemManage/account',
                                    auth: false
                                },
                                {
                                    name: '权限管理',
                                    path: '/systemManage/permission',
                                    auth: false
                                },
                                {
                                    name: '操作日志',
                                    path: '/systemManage/log',
                                    auth: false
                                },
                                {
                                    name: '帮助中心',
                                    path: '/systemManage/problems',
                                    auth: false
                                },
                                {
                                    name: '意见反馈',
                                    path: '/systemManage/feedBack',
                                    auth: false
                                }
                            ]
                        }
                    ]
                }
            ],
            curTab: {},
            curTabIndex: 0,
            curSubMenu: 0,
            curSubMenuChild: 0
        }
    },
    computed: {
        ...mapGetters(['isFold'])
    },
    mounted () {
        this.init()
    },
    methods: {
        // 初始化
        init () {
            this.initTab()
            // 无权限
            localStorage.setItem('path', '/systemManage/userInfo')
            // 有权限
            // this.checkPermission()
            this.openAllAuth()
        },
        getQuery () {
            let queryStr = location.hash.split('?')[1]
            if (!queryStr) return ''
            let query = queryStr.split('&').map(item => (`"${item.split('=')[0]}":"${item.split('=')[1]}"`))
            return query.join(',')
        },
        initTab () {
            let path = this.$route.path.split('/')
            let query = this.getQuery(this.$route.query)
            let firstName = path[1]
            let secondName = path[1] + '/' + path[2]
            let curTabIndex = this.tabsList.findIndex(item => item.path.includes(firstName))
            let curSubMenu = 0
            let curSubMenuChild = 0
            for (let i = 0; i < this.tabsList.length; i++) {
                let item = this.tabsList[i]
                for (let j = 0; j < item.children.length; j++) {
                    let child = item.children[j].children
                    curSubMenuChild = child && child.findIndex(o => {
                        let isContain = o.path.includes(secondName)
                        let childQuery = o.query ? JSON.stringify(o.query) : ''
                        childQuery = childQuery.substr(0, childQuery.length - 1).substr(1, childQuery.length - 1)
                        return o.query ? (isContain && query.includes(childQuery)) : isContain
                    })
                    if (curSubMenuChild > -1) {
                        curSubMenu = j
                        break;
                    }
                }
                if (curSubMenuChild > -1) break;
            }
            if (curSubMenuChild === -1) curSubMenuChild = 0
            this.curTabIndex = curTabIndex
            this.curSubMenu = curSubMenu
            this.curSubMenuChild = curSubMenuChild
            this.getCurTab()
        },
        // 检查权限
        checkPermission () {
            this.permissionList = JSON.parse(localStorage.getItem('userInfo') || '{}').power_list || [];
            let localPath = localStorage.getItem('path') || ''
            let path = ''
            this.permissionList.forEach((self, index) => {
                this.tabsList[index].auth = self.showMenu
                let flag = true;
                this.tabsList[index].children.forEach(obj => {
                    self.sub_power.forEach(item => {
                        obj.auth = self.showMenu
                        obj.children.forEach(i => {
                            if (item.powerName === i.name && item.showMenu) {
                                i.auth = true;
                                if (!localPath && !path) {
                                    path = i.path
                                    this.$router.replace(i.path)
                                    localStorage.setItem('path', i.path)
                                }
                                if (flag) {
                                    this.tabsList[index].path = i.path;
                                    flag = false;
                                }
                            } else if (i.name === '个人信息') {
                                this.tabsList[index].path = i.path;
                                i.auth = true;
                                flag = false;
                            }
                        })
                    })
                })
                // this.routeList[index][0].path = this.tabsList[index].path;
                flag = true;
            })
        },
        openAllAuth () {
            this.tabsList.forEach(item => {
                item.auth = true
                item.children && item.children.forEach(child => {
                    child.auth = true
                    child.children && child.children.forEach(sub => {
                        sub.auth = true
                    })
                })
            })
        },
        getCurTab () {
            this.curTab = this.tabsList[this.curTabIndex]
            this.changeBreadCrumb()
        },
        changeBreadCrumb () {
            let breadCrumb = this.curTab.children[this.curSubMenu].name + ' / ' + this.curTab.children[this.curSubMenu].children[this.curSubMenuChild].name
            this.$store.commit('changeBreadCrumb', breadCrumb)
        },
        showSubMenu (children) {
            return children.some(item => item.auth)
        }
    },
    watch: {
        '$route': function () {
            this.init()
        }
    }
}
</script>

<style lang="scss">
.menu-icon {
    font-size: 20px;
    margin-left: -6px;
}
</style>
