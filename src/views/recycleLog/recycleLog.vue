<template>
    <div id="recycleLog">
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
                :tableData="Data"
                :tableColumn="tableColumn"
                :total="total"
                :pageSize="size"
                :currentPage="currentPage"
                @changePage="changePage"
            />
        </div>
    </div>
</template>

<script>
import util from '@/util/util'

export default {
    name: 'recycleLog',
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
            // btns: [
            //     {
            //         label: '新增',
            //         icon: 'el-icon',
            //         callback: () => {
            //             this.$router.push('/device/edit?type=add')
            //         }
            //     }
            // ],
            Data: [],
            tableColumn: {
                recycleLogId: {
                    label: 'ID',
                    width: 130
                },
                portrait: {
                    label: '头像',
                    width: 120,
                    template: {
                        type: 'avatar'
                    }
                },
                nickname: {
                    label: '用户',
                    width: 120
                },
                deviceName: {
                    label: '设备',
                    width: 150
                },
                categoryName: {
                    label: '分类名',
                    width: 100
                },
                price: {
                    label: '价格(元/公斤)',
                    width: 150,
                    customValue: row => `¥ ${row.price}`
                },
                weight: {
                    label: '重量(公斤)',
                    width: 130
                },
                money: {
                    label: '所得(元)',
                    width: 120,
                    customValue: row => `¥ ${row.money}`
                },
                createTime: {
                    label: '投放时间',
                    width: 180
                },
                operation: {
                    label: '操作',
                    width: 180,
                    template: [
                        {
                            tag: 'a',
                            text: '删除',
                            permission: 400,
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
            this.$api.recycleLogListFetch(form).then(res => {
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
        delHandle ({ recycleLogId }) {
            let data = { recycleLogId }
            this.$api.recycleLogDelFetch(data).then(res => {
                this.$message.success('删除成功')
                this.getList()
            })
        }
    }
}
</script>

<style lang="scss">

</style>
