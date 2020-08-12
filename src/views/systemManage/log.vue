<template>
    <div class="log-manage">
        <div class="container">
            <div class="con-table">
                <filters
                    :form="searchForm"
                    :filterData="filterData"
                    @confirm="searchHandle"
                    @clear="clearHandle"
                />
                <data-table
                    showIndex
                    showPage
                    :tableData="Data"
                    :tableColumn="tableColumn"
                    :total="total"
                    :pageSize="size"
                    @changePage="changePage"
                />
            </div>
        </div>
    </div>
</template>

<script>
import util from '@/util/util'
export default {
    name: 'log-manage',
    data () {
        return {
            searchForm: {
                adminUser: '',
                date: [],
                moduleName: ''
            },
            filterData: {
                moduleName: {
                    label: '模块',
                    type: 'select',
                    template: {
                        placeholder: '请选择模块',
                        clearable: true,
                        filterable: true,
                        options: [
                            {
                                label: '登录',
                                value: '登录'
                            },
                            {
                                label: '文章分类',
                                value: '文章分类'
                            },
                            {
                                label: '文章',
                                value: '文章'
                            },
                            {
                                label: '回收分类',
                                value: '回收分类'
                            },
                            {
                                label: '系统管理',
                                value: '系统管理'
                            },
                            {
                                label: '设备管理',
                                value: '设备管理'
                            },
                            {
                                label: '用户管理',
                                value: '用户管理'
                            },
                            {
                                label: '轮播图',
                                value: '轮播图'
                            },
                            {
                                label: '意见反馈',
                                value: '意见反馈'
                            },
                            {
                                label: '帮助中心',
                                value: '帮助中心'
                            }
                        ]
                    }
                },
                date: {
                    label: '发布时间',
                    type: 'datetimerange',
                    template: {
                        clearable: true
                    }
                },
                adminUser: {
                    label: '用户名',
                    type: 'input',
                    template: {
                        placeholder: '请输入用户名'
                    }
                }
            },
            Data: [],
            tableColumn: {
                moduleName: {
                    label: '所在模块',
                    minWidth: 100
                },
                type: {
                    label: '操作类型',
                    minWidth: 150
                },
                loginTime: {
                    label: '记录时间',
                    minWidth: 180
                },
                userName: {
                    label: '用户',
                    minWidth: 140
                },
                ip: {
                    label: 'IP',
                    minWidth: 140
                },
                operation: {
                    label: '操作',
                    width: 160,
                    template: [
                        {
                            tag: 'router-link',
                            text: '查看详情',
                            permission: 630,
                            path: '/systemManage/log/detail',
                            query: { id: '' }
                        }
                    ]
                }
            },
            currentPage: 1,
            total: 10,
            size: 10
        }
    },
    mounted () {
    },
    methods: {
        init () {
            this.getLogList()
        },
        getLogList () {
            let { adminUser, date, moduleName } = this.searchForm
            let [ startTime, endTime ] = util.formatDate(date)
            let data = {
                adminUser,
                moduleName,
                startTime,
                endTime,
                page: this.currentPage,
                size: this.size
            }
            this.$api.systemLoginLogListFetch(data).then(res => {
                res.data.records.forEach(item => {
                    item.type = item.operation
                })
                this.Data = res.data.records
                this.total = res.data.total
                if (!this.Data.length && this.currentPage > 1) {
                    --this.currentPage
                    this.getList()
                }
            })
        },
        changePage (val) {
            this.currentPage = val
            this.getLogList()
        },
        searchHandle () {
            this.currentPage = 1
            this.getLogList()
        },
        clearHandle () {
            this.searchHandle()
        }
    }
}
</script>

<style>

</style>
