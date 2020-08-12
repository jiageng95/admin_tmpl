<template>
    <div id="permission">
        <div class="container">
            <DataTable
                showIndex
                showPage
                :btns="btns"
                :tableData="table.data"
                :tableColumn="table.column"
                :total="table.total"
                :pageSize="table.size"
                :currentPage="table.currentPage"
                @changePage="changePage"
            />
        </div>
        <CommonDialog
            :rows="dialog.rows"
            :form="dialog.form"
            :labelWidth="80"
            title="新增角色"
            :visible="dialog.visible"
            @hideDialog="dialog.visible = false"
            @confirm="handleDialogSubmit" />
    </div>
</template>

<script>
export default {
    name: 'permission',
    data () {
        return {
            btns: [
                {
                    label: '新增角色',
                    icon: 'el-icon-plus',
                    permission: 620,
                    callback: this.showDialog
                }
            ],
            table: {
                data: [],
                column: {
                    roleName: {
                        label: '角色名称',
                        align: 'center'
                    },
                    operation: {
                        label: '操作',
                        width: 230,
                        template: [
                            {
                                tag: 'a',
                                text: '删除',
                                permission: 621,
                                confirm: this.delHandle
                            },
                            {
                                tag: 'router-link',
                                text: '详情',
                                permission: 622,
                                path: '/systemManage/permission/detail',
                                query: {
                                    roleId: '',
                                    roleName: ''
                                }
                            }
                        ]
                    }
                },
                currentPage: 1,
                total: 0,
                size: 10
            },
            dialog: {
                visible: false,
                form: {
                    name: ''
                },
                rows: {
                    name: {
                        label: '角色名',
                        placeholder: '请输入角色名',
                        maxlength: 10,
                        rules: [
                            { required: true, message: '请输入角色名', trigger: 'blur' }
                        ]
                    }
                }
            }
        }
    },
    methods: {
        init () {
            this.getRoleList()
        },
        getRoleList () {
            let data = {
                page: this.table.currentPage,
                size: this.table.size
            }
            this.$api.adminRoleRoleListFetch(data).then(({ data }) => {
                Object.assign(this.table, { data: data.records, total: data.total });
            })
        },
        changePage (val) {
            this.table.currentPage = val
            this.getRoleList()
        },
        showDialog () {
            this.dialog.visible = true
            Object.assign(this.dialog.form, { name: '' })
        },
        handleDialogSubmit () {
            this.$api.adminRoleAddRoleFetch(this.dialog.form).then(res => {
                this.$message.success('新增角色成功')
                this.dialog.visible = false
                this.getRoleList()
            })
        },
        delHandle ({ roleId }) {
            this.$api.adminRoleRoleDeleteFetch({ roleId }).then(res => {
                this.$message.success('删除角色成功')
                this.getRoleList()
            })
        }
    }
}
</script>

<style>

</style>
