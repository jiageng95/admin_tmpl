<template>
    <div class="account-manage">
        <div class="container">
            <div class="con-table">
                <Filters
                    :form="searchForm"
                    :filterData="filterData()"
                    @confirm="searchHandle"
                    @clear="clearHandle">
                </Filters>
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
            @confirm="confirmHandle('user')" />
        <CommonDialog
            :rows="resetRows"
            :form="resetForm"
            :labelWidth="80"
            title="重置密码"
            :visible="resetFormVisible"
            @hideDialog="hideFormVisible"
            @confirm="confirmHandle('password')" />
    </div>
</template>

<script>
import rules from '@/util/rules'
import md5 from 'js-md5'
export default {
    name: 'account-manage',
    data () {
        return {
            searchForm: {
                searchValue: '',
                roleId: '',
                status: ''
            },
            btns: [
                {
                    label: '新增',
                    icon: 'el-icon-plus',
                    permission: 610,
                    callback: this.showFormVisible
                }
            ],
            filterData: () => ({
                searchValue: {
                    label: '账号',
                    type: 'input',
                    template: {
                        placeholder: '请输入账号'
                    }
                },
                roleId: {
                    label: '角色',
                    type: 'select',
                    template: {
                        placeholder: '请选择角色',
                        clearable: true,
                        filterable: true,
                        options: this.roleList
                    }
                },
                status: {
                    label: '状态',
                    type: 'select',
                    template: {
                        placeholder: '请选择状态',
                        clearable: true,
                        filterable: true,
                        options: this.statusList
                    }
                }
            }),
            Data: [],
            tableColumn: {
                account: {
                    label: '账号',
                    minWidth: 120
                },
                userName: {
                    label: '姓名',
                    minWidth: 120
                },
                roleName: {
                    label: '角色',
                    minWidth: 100
                },
                createTime: {
                    label: '创建时间',
                    minWidth: 170
                },
                lastTime: {
                    label: '最后登录时间',
                    minWidth: 170
                },
                operation: {
                    label: '操作',
                    width: 230,
                    template: [
                        {
                            tag: 'a',
                            prop: 'status',
                            flag: true,
                            actText: '冻结',
                            inactText: '正常',
                            permission: 612,
                            confirm: this.handleUpdateStatus
                        },
                        {
                            tag: 'a',
                            text: '编辑',
                            permission: 611,
                            callback: this.showEditDialog
                        },
                        {
                            tag: 'a',
                            text: '重置密码',
                            permission: 613,
                            callback: this.showResetDialog
                        }
                    ]
                }
            },
            currentPage: 1,
            total: 10,
            size: 5,
            roleList: [],
            formVisible: false,
            dialogType: 'add',
            form: {
                adminId: '',
                account: '',
                password: '',
                roleId: '',
                userName: '',
                repassword: ''
            },
            rows: () => ({
                account: {
                    label: '账号',
                    placeholder: '请输入账号',
                    showDisabled: this.dialogType !== 'add',
                    rules: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ]
                },
                userName: {
                    label: '姓名',
                    placeholder: '请输入姓名',
                    rules: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ]
                },
                roleId: {
                    label: '角色',
                    el: 'select',
                    placeholder: '请选择角色',
                    options: this.roleList,
                    rules: [
                        { required: true, message: '请选择角色', trigger: 'blur' }
                    ]
                },
                password: {
                    label: '密码',
                    placeholder: '请输入密码',
                    show: this.dialogType === 'add',
                    rules: [
                        { validator: rules.checkLenInterval(6, 12), trigger: 'blur' },
                        { min: 6, message: '密码至少6位数字', trigger: 'blur' },
                        { required: true, message: '旧密码至少6位数字', trigger: 'blur' }
                    ]
                },
                repassword: {
                    label: '确认密码',
                    placeholder: '请输入密码',
                    show: this.dialogType === 'add',
                    rules: [
                        { validator: rules.checkLenInterval(6, 12), trigger: 'blur' },
                        { min: 6, message: '新密码至少6位数字', trigger: 'blur' },
                        { required: true, message: '新密码至少6位数字', trigger: 'blur' },
                        { validator: rules.checkEqual(this, 'form.password', '两次密码不一致'), trigger: 'blur' }
                    ]
                }
            }),
            resetFormVisible: false,
            resetForm: {
                adminId: '',
                password: '',
                repassword: ''
            },
            resetRows: {
                password: {
                    label: '新密码',
                    placeholder: '请输入新密码',
                    rules: [
                        { validator: rules.checkLenInterval(6, 12), trigger: 'blur' },
                        { min: 6, message: '新密码至少6位数字', trigger: 'blur' },
                        { required: true, message: '新密码至少6位数字', trigger: 'blur' }
                    ]
                },
                repassword: {
                    label: '确认密码',
                    placeholder: '请输入密码',
                    rules: [
                        { validator: rules.checkLenInterval(6, 12), trigger: 'blur' },
                        { min: 6, message: '确认密码至少6位数字', trigger: 'blur' },
                        { required: true, message: '确认密码至少6位数字', trigger: 'blur' },
                        { validator: rules.checkEqual(this, 'resetForm.password', '两次密码不一致'), trigger: 'blur' }
                    ]
                }
            },
            statusList: [
                {
                    label: '全部',
                    value: ''
                },
                {
                    label: '正常',
                    value: true
                },
                {
                    label: '冻结',
                    value: false
                }
            ]
        }
    },
    computed: {
        status () {
            return +this.$route.query.status || 0
        }
    },
    mounted () {
    },
    methods: {
        init () {
            this.getDownRole()
            this.getAdminList()
        },
        getAdminList () {
            let { searchValue, roleId, status } = this.searchForm
            let data = {
                searchValue,
                roleId,
                status,
                page: this.currentPage,
                size: this.size
            }
            this.$api.adminAdminUserListFetch(data).then(res => {
                this.Data = res.data.records
                this.total = res.data.total
                if (!this.Data.length && this.currentPage > 1) {
                    --this.currentPage
                    this.getAdminList()
                }
            })
        },
        getDownRole () {
            this.$api.adminDownRoleFetch().then(res => {
                let roleList = res.data.records.map(item => ({ label: item.roleName, value: item.roleId }))
                this.roleList = roleList
            })
        },
        changePage (val) {
            this.currentPage = val
            this.getAdminList()
        },
        showFormVisible () {
            this.form = {
                adminId: '',
                account: '',
                password: '',
                roleId: '',
                userName: '',
                repassword: ''
            }
            this.dialogType = 'add'
            this.formVisible = true
        },
        showResetDialog (row) {
            this.resetForm = {
                adminId: row.adminId,
                password: '',
                repassword: ''
            }
            this.resetFormVisible = true
        },
        confirmHandle (type) {
            if (type === 'user') {
                let data = { ...this.form }
                data.password = md5(data.password)
                data.repassword = md5(data.repassword)
                let apiFetch = this.dialogType === 'add' ? this.$api.adminAddFetch : this.$api.adminUpdateFetch
                apiFetch(data).then(res => {
                    this.$message.success(this.dialogType === 'add' ? '新增成功' : '编辑成功')
                    this.formVisible = false
                    this.getAdminList()
                }).catch(() => {
                })
            } else if (type === 'password') {
                let data = { ...this.resetForm }
                data.password = md5(data.password)
                this.$api.adminResetPwdFetch(data).then(res => {
                    this.$message.success('重置成功')
                    this.resetFormVisible = false
                    this.getAdminList()
                }).catch(() => {
                })
            }
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
        searchHandle () {
            this.currentPage = 1
            this.getAdminList()
        },
        clearHandle () {
            this.searchHandle()
        },
        delHandle ({ adminId }) {
            let data = { adminId }
            this.$api.adminDeleteFetch(data).then(res => {
                this.$message.success('删除成功')
                this.getAdminList()
            })
        },
        async handleUpdateStatus (row, index) {
            let { adminId, status } = row;
            this.$api.adminStatusFetch({ adminId, status: !status }).then(res => {
                this.$message.success(`${status ? '冻结' : '正常'}成功`)
                this.getList()
            });
        }
    }
}
</script>

<style>

</style>
