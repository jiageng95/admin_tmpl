<template>
    <div class="articleCategory">
        <div class="container">
            <div class="con-table">
                <!-- <Filters
                    :form="searchForm"
                    :filterData="filterData()"
                    @confirm="searchHandle"
                    @clear="clearHandle">
                    <btns slot="button" :data="btns" />
                </Filters> -->
                <!-- <Btns :data="btns" class="mb20" /> -->
                <DataTable
                    showPage
                    :btns="btns"
                    :tableData="Data"
                    :tableColumn="tableColumn"
                    :total="total"
                    :pageSize="size"
                    @changePage="changePage"
                />
            </div>
        </div>
        <CommonDialog
            :rows="rows()"
            :form="form"
            :labelWidth="80"
            :title="dialogType === 'add' ? '新增' : '编辑'"
            :visible="formVisible"
            @hideDialog="hideFormVisible"
            @confirm="confirmHandle" />
    </div>
</template>

<script>
import rules from '@/util/rules'
import md5 from 'js-md5'
export default {
    name: 'crticleCategory',
    data () {
        return {
            // searchForm: {
            //     word: '',
            //     roleId: '',
            //     status: ''
            // },
            btns: [
                {
                    label: '新增',
                    icon: 'el-icon-plus',
                    permission: 520,
                    callback: this.showFormVisible
                }
            ],
            // filterData: () => ({
            //     word: {
            //         label: '账号',
            //         type: 'input',
            //         template: {
            //             placeholder: '请输入账号'
            //         }
            //     },
            //     roleId: {
            //         label: '角色',
            //         type: 'select',
            //         template: {
            //             placeholder: '请选择角色',
            //             clearable: true,
            //             filterable: true,
            //             options: this.roleList
            //         }
            //     },
            //     status: {
            //         label: '状态',
            //         type: 'select',
            //         template: {
            //             placeholder: '请选择状态',
            //             clearable: true,
            //             filterable: true,
            //             options: this.statusList
            //         }
            //     }
            // }),
            Data: [],
            tableColumn: {
                acName: {
                    label: '分类名称'
                },
                sort: {
                    label: '排序'
                },
                createTime: {
                    label: '创建时间'
                },
                operation: {
                    label: '操作',
                    width: 230,
                    template: [
                        {
                            tag: 'a',
                            text: '编辑',
                            permission: 521,
                            callback: this.showEditDialog
                        },
                        {
                            tag: 'a',
                            text: '删除',
                            permission: 522,
                            confirm: this.delHandle
                        }
                    ]
                }
            },
            currentPage: 1,
            total: 0,
            size: 10,
            formVisible: false,
            dialogType: 'add',
            form: {
                acName: '',
                sort: ''
            },
            rows: () => ({
                acName: {
                    label: '分类名称',
                    placeholder: '请输入分类名称',
                    rules: [
                        {required: true, message: '请输入分类名称', trigger: 'blur'}
                    ]
                },
                sort: {
                    label: '排序',
                    placeholder: '请输入排序',
                    rules: [
                        {required: true, message: '请输入排序', trigger: 'blur'}
                    ]
                }
            })
        }
    },
    methods: {
        init () {
            this.getList()
        },
        getList () {
            let data = {
                page: this.currentPage,
                size: this.size
            }
            this.$api.articleCategoryListFetch(data).then(res => {
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
        showFormVisible () {
            this.form = {
                acName: '',
                sort: ''
            }
            this.dialogType = 'add'
            this.formVisible = true
        },
        confirmHandle () {
            let data = { ...this.form }
            let apiFetch = this.dialogType === 'add' ? this.$api.articleCategoryAddFetch : this.$api.articleCategoryEditFetch
            apiFetch(data).then(res => {
                this.$message.success(this.dialogType === 'add' ? '新增成功' : '编辑成功')
                this.formVisible = false
                this.getList()
            }).catch(() => {
            })
        },
        showEditDialog (row) {
            Object.assign(this.form, row)
            this.dialogType = 'edit'
            this.formVisible = true
        },
        hideFormVisible () {
            this.formVisible = false
            this.resetFormVisible = false
        },
        delHandle ({ acId }) {
            let data = { acId }
            this.$api.articleCategoryDelFetch(data).then(res => {
                this.$message.success('删除成功')
                this.getList()
            })
        },
        async handleUpdateStatus (row, index) {
            let { acId, status } = row;
            if (status) {
                await this.$confirm('确定是否冻结?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
            }
            this.$api.adminStatusFetch({ acId, status: !status }).then(res => {
                this.$message.success(`${status ? '冻结' : '正常'}成功`)
                this.getList()
            });
        }
    }
}
</script>

<style>

</style>
