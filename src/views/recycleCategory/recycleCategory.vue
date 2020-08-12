<template>
    <div id="recycleCategory">
        <div class="container">
            <!-- <Filters
                :form="searchForm"
                :filterData="filterData()"
                @confirm="changePage(1)"
            >
                <Btns slot="button" :data="btns" />
            </Filters> -->
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
    name: 'recycleCategory',
    data () {
        return {
            // searchForm: {
            //     status: '',
            //     date: [],
            //     searchValue: ''
            // },
            // filterData: () => ({
            //     'status': {
            //         label: '按状态筛选',
            //         type: 'select',
            //         template: {
            //             placeholder: '请选择',
            //             clearable: true,
            //             filterable: true,
            //             options: this.statusList
            //         }
            //     },
            //     'date': {
            //         label: '注册时间',
            //         type: 'datetimerange',
            //         template: {
            //             clearable: true
            //         }
            //     },
            //     'searchValue': {
            //         label: '搜索用户名/手机号',
            //         type: 'input',
            //         template: {
            //             placeholder: '搜索用户名/手机号',
            //             clearable: true
            //         }
            //     }
            // }),
            btns: [
                {
                    label: '新增',
                    icon: 'el-icon-plus',
                    permission: 200,
                    callback: () => {
                        this.$router.push('/recycleCategory/edit?type=add')
                    }
                }
            ],
            Data: [],
            tableColumn: {
                rcId: {
                    label: 'ID'
                },
                rcName: {
                    label: '分类名'
                },
                cover: {
                    label: '图标',
                    template: {
                        type: 'avatar',
                        fit: 'cover'
                    },
                    width: 110
                },
                deviceTypeValue: {
                    label: '设备类型'
                },
                price: {
                    label: '价格(元/公斤)',
                    width: 140,
                    customValue: row => `¥ ${row.price}`
                },
                sort: {
                    label: '排序'
                },
                updateTime: {
                    label: '更新时间'
                },
                operation: {
                    label: '操作',
                    width: 180,
                    template: [
                        {
                            tag: 'router-link',
                            text: '编辑',
                            permission: 201,
                            path: '/recycleCategory/edit',
                            query: {
                                type: 'edit',
                                rcId: ''
                            }
                        },
                        {
                            tag: 'a',
                            text: '删除',
                            permission: 202,
                            confirm: this.delHandle
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
            this.getList()
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
            this.$api.recycleCategoryListFetch(form).then(res => {
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
            this.getList()
        },
        delHandle ({ rcId }) {
            let data = { rcId }
            this.$api.recycleCategoryDelFetch(data).then(res => {
                this.$message.success('删除成功')
                this.getList()
            })
        }
    }
}
</script>

<style lang="scss">

</style>
