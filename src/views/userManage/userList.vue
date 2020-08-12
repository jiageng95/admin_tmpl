<template>
    <div id="userList">
        <Breadcrumb>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="用户管理" name="first"></el-tab-pane>
                <el-tab-pane label="配置管理" name="second"></el-tab-pane>
                <el-tab-pane label="角色管理" name="third"></el-tab-pane>
                <el-tab-pane label="定时任务补偿" name="fourth"></el-tab-pane>
            </el-tabs>
        </Breadcrumb>
        <Filters
            block
            :form="searchForm"
            :filterData="filterData()"
            @confirm="changePage(1)"
        />
        <div class="container">
            <DataTable
                showPage
                :btns="btns"
                :tableData="Data"
                :tableColumn="tableColumn"
                :total="total"
                :pageSize="size"
                :currentPage="currentPage"
                @changePage="changePage"
                @refresh="getList"
            />
        </div>
    </div>
</template>

<script>
import util from '@/util/util'

export default {
    name: '',
    data () {
        return {
            activeName: 'first',
            searchForm: {
                status: '',
                date: [],
                searchValue: ''
            },
            filterData: () => ({
                status: {
                    // label: '按状态筛选',
                    type: 'select',
                    template: {
                        placeholder: '请选择',
                        clearable: true,
                        filterable: true,
                        options: this.statusList
                    }
                },
                date: {
                    // label: '注册时间',
                    type: 'datetimerange',
                    template: {
                        clearable: true
                    }
                },
                searchValue: {
                    // label: '搜索用户名/手机号',
                    type: 'input',
                    template: {
                        placeholder: '搜索用户名/手机号',
                        clearable: true
                    }
                },
                statu3s: {
                    // label: '按状态筛选',
                    type: 'select',
                    template: {
                        placeholder: '请选择',
                        clearable: true,
                        filterable: true,
                        options: this.statusList
                    }
                },
                statu33s: {
                    // label: '按状态筛选',
                    type: 'select',
                    template: {
                        placeholder: '请选择',
                        clearable: true,
                        filterable: true,
                        options: this.statusList
                    }
                },
                // 'date3': {
                //     // label: '注册时间',
                //     type: 'datetimerange',
                //     template: {
                //         clearable: true
                //     }
                // },
                statu333s: {
                    // label: '按状态筛选',
                    type: 'select',
                    template: {
                        placeholder: '请选择',
                        clearable: true,
                        filterable: true,
                        options: this.statusList
                    }
                }
            }),
            btns: [
                {
                    label: '新增',
                    icon: 'add'
                },
                {
                    label: '下载模板',
                    icon: 'download'
                },
                {
                    label: '导出',
                    icon: 'export'
                }
            ],
            Data: [
                {
                    userId: '23232222222222222222222',
                    portrait: 'http://a1.att.hudong.com/05/00/01300000194285122188000535877.jpg',
                    nickname: '323',
                    mobile: '4444',
                    createTime: '354243',
                    statusValue: '32323',
                    statusValue2: false
                },
                {
                    userId: '23232',
                    portrait: 'http://a1.att.hudong.com/05/00/01300000194285122188000535877.jpg',
                    nickname: '323',
                    mobile: '4444',
                    createTime: '354243',
                    statusValue: '32323',
                    statusValue2: false
                },
                {
                    userId: '23232',
                    portrait: 'http://a1.att.hudong.com/05/00/01300000194285122188000535877.jpg',
                    nickname: '323',
                    mobile: '4444',
                    createTime: '354243',
                    statusValue: '32323',
                    statusValue2: false
                },
                {
                    userId: '23232',
                    portrait: 'http://a1.att.hudong.com/05/00/01300000194285122188000535877.jpg',
                    nickname: '323',
                    mobile: '4444',
                    createTime: '354243',
                    statusValue: '32323',
                    statusValue2: false
                },
                {
                    userId: '23232',
                    portrait: 'http://a1.att.hudong.com/05/00/01300000194285122188000535877.jpg',
                    nickname: '323',
                    mobile: '4444',
                    createTime: '354243',
                    statusValue: '32323',
                    statusValue2: false
                },
                {
                    userId: '23232',
                    portrait: 'http://a1.att.hudong.com/05/00/01300000194285122188000535877.jpg',
                    nickname: '323',
                    mobile: '4444',
                    createTime: '354243',
                    statusValue: '32323',
                    statusValue2: false
                },
                {
                    userId: '23232',
                    portrait: 'http://a1.att.hudong.com/05/00/01300000194285122188000535877.jpg',
                    nickname: '323',
                    mobile: '4444',
                    createTime: '354243',
                    statusValue: '32323',
                    statusValue2: false
                },
                {
                    userId: '23232',
                    portrait: 'http://a1.att.hudong.com/05/00/01300000194285122188000535877.jpg',
                    nickname: '323',
                    mobile: '4444',
                    createTime: '354243',
                    statusValue: '32323',
                    statusValue2: false
                },
                {
                    userId: '23232',
                    portrait: 'http://a1.att.hudong.com/05/00/01300000194285122188000535877.jpg',
                    nickname: '323',
                    mobile: '4444',
                    createTime: '354243',
                    statusValue: '32323',
                    statusValue2: false
                },
                {
                    userId: '23232',
                    portrait: 'http://a1.att.hudong.com/05/00/01300000194285122188000535877.jpg',
                    nickname: '323',
                    mobile: '4444',
                    createTime: '354243',
                    statusValue: '32323',
                    statusValue2: false
                },
                {
                    userId: '23232',
                    portrait: 'http://a1.att.hudong.com/05/00/01300000194285122188000535877.jpg',
                    nickname: '323',
                    mobile: '4444',
                    createTime: '354243',
                    statusValue: '32323',
                    statusValue2: false
                },
                {
                    userId: '23232',
                    portrait: 'http://a1.att.hudong.com/05/00/01300000194285122188000535877.jpg',
                    nickname: '323',
                    mobile: '4444',
                    createTime: '354243',
                    statusValue: '32323',
                    statusValue2: false
                },
                {
                    userId: '23232',
                    portrait: 'http://a1.att.hudong.com/05/00/01300000194285122188000535877.jpg',
                    nickname: '323',
                    mobile: '4444',
                    createTime: '354243',
                    statusValue: '32323',
                    statusValue2: false
                },
                {
                    userId: '23232',
                    portrait: 'http://a1.att.hudong.com/05/00/01300000194285122188000535877.jpg',
                    nickname: '323',
                    mobile: '4444',
                    createTime: '354243',
                    statusValue: '32323',
                    statusValue2: false
                },
                {
                    userId: '23232',
                    portrait: 'http://a1.att.hudong.com/05/00/01300000194285122188000535877.jpg',
                    nickname: '323',
                    mobile: '4444',
                    createTime: '354243',
                    statusValue: '32323',
                    statusValue2: false
                },
                {
                    userId: '23232',
                    portrait: 'http://a1.att.hudong.com/05/00/01300000194285122188000535877.jpg',
                    nickname: '323',
                    mobile: '4444',
                    createTime: '354243',
                    statusValue: '32323',
                    statusValue2: false
                },
                {
                    userId: '23232',
                    portrait: 'http://a1.att.hudong.com/05/00/01300000194285122188000535877.jpg',
                    nickname: '323',
                    mobile: '4444',
                    createTime: '354243',
                    statusValue: '32323',
                    statusValue2: false
                },
                {
                    userId: '23232',
                    portrait: 'http://a1.att.hudong.com/05/00/01300000194285122188000535877.jpg',
                    nickname: '323',
                    mobile: '4444',
                    createTime: '354243',
                    statusValue: '32323',
                    statusValue2: false
                },
                {
                    userId: '23232',
                    portrait: 'http://a1.att.hudong.com/05/00/01300000194285122188000535877.jpg',
                    nickname: '323',
                    mobile: '4444',
                    createTime: '354243',
                    statusValue: '32323',
                    statusValue2: false
                },
                {
                    userId: '23232',
                    portrait: 'http://a1.att.hudong.com/05/00/01300000194285122188000535877.jpg',
                    nickname: '323',
                    mobile: '4444',
                    createTime: '354243',
                    statusValue: '32323',
                    statusValue2: false
                }
            ],
            tableColumn: {
                userId: {
                    label: '用户ID'
                },
                portrait: {
                    label: '用户头像',
                    template: {
                        type: 'avatar',
                        fit: 'cover'
                    },
                    width: 130
                },
                nickname: {
                    label: '用户名'
                },
                mobile: {
                    label: '手机号'
                },
                createTime: {
                    label: '注册时间'
                },
                statusValue: {
                    label: '单价',
                    template: {
                        type: 'price'
                    }
                },
                statusValue2: {
                    label: '状态',
                    template: {
                        type: 'switch'
                    }
                },
                statusValue3: {
                    label: '状态'
                },
                statusValu4e: {
                    label: '状态'
                },
                statusVa5lue: {
                    label: '状态'
                },
                statusV6alue: {
                    label: '状态'
                },
                operation: {
                    label: '操作',
                    width: 180,
                    template: [
                        {
                            tag: 'a',
                            prop: 'status',
                            flag: 1,
                            actText: '冻结',
                            inactText: '取消冻结',
                            permission: 100,
                            confirm: this.handleUpdateStatus
                        },
                        {
                            tag: 'router-link',
                            text: '详情',
                            permission: 101,
                            path: '/userManage/userList/detail',
                            query: {
                                userId: ''
                            }
                        }
                    ]
                }
            },
            currentPage: 1,
            total: 0,
            size: 10,
            statusList: [
                {
                    value: '',
                    label: '全部'
                },
                {
                    value: true,
                    label: '上线'
                },
                {
                    value: false,
                    label: '下线'
                }
            ]
        }
    },
    mounted () {

    },
    methods: {
        init () {
            // this.getList()
        },
        getSearchForm () {
            // let { searchForm, currentPage, size } = this;
            // let form = Object.assign({ page: currentPage, size }, searchForm);
            // let [ startTime, endTime ] = util.formatDate(form.date)
            // Object.assign(form, {
            //     startTime,
            //     endTime
            // });
            // delete form.date
            let { currentPage, size } = this;
            let form = { page: currentPage, size }
            return form;
        },
        getList () {
            let form = this.getSearchForm();
            this.$api.userListFetch(form).then(res => {
                this.Data = res.data.records
                this.total = res.data.total
            })
        },
        changePage (val) {
            this.currentPage = val
            console.log(this.searchForm)
            // this.getList()
        },
        handleUpdateStatus ({ userId, status }) {
            let data = { userId }
            this.$api.userStatusFetch(data).then(res => {
                this.$message.success(`${status === 1 ? '冻结' : '解冻'}成功`)
                this.getList()
            })
        },
        handleClick () {

        }
    }
}
</script>

<style lang="scss">
</style>
