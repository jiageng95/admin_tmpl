<template>
    <div id="permissionDetail">
        <div class="container">
            <div class="table-wrap">
                <div class="table-right">
                    <div class="group-item">
                        <div class="group-top">
                            <span class="title">角色</span>
                            <span class="edit-btn" @click="showDialog">修改</span>
                        </div>
                        <ul class="group-user">
                            <li>{{ name }}</li>
                        </ul>
                    </div>
                    <div class="group-item">
                        <div class="group-top">
                            <span class="title" style="font-size:16px;">应用角色权限</span>
                        </div>
                        <TreeCascarde
                            :initValue="checks"
                            :menuList="menuList"
                            @submit="changePermissions"
                        />
                    </div>
                </div>
            </div>
        </div>
        <CommonDialog
            title="修改角色"
            :visible="dialog.visible"
            :form="dialog.form"
            :rows="dialog.rows"
            :labelWidth="80"
            @hideDialog="dialog.visible = false"
            @confirm="onDialogSubmit">
        </CommonDialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TreeCascarde from './components/Cascader.vue'
import util from '@/util/util'
// import { logout } from '@/util/auth'

export default {
    name: 'permissionDetail',
    data () {
        return {
            loading: true,
            menuList: [],
            checks: {},
            data: {},
            dialog: {
                visible: false,
                form: { name: '' },
                rows: {
                    'name': {
                        label: '角色名',
                        prop: 'name',
                        rules: [
                            {required: true, message: '请输入文字内容', trigger: 'blur'}
                        ]
                    }
                }
            }
        }
    },
    components: {
        TreeCascarde
    },
    computed: {
        ...mapGetters('app', ['userInfo']),
        roleId () {
            return this.$route.query.roleId
        },
        name () {
            return this.$route.query.roleName
        }
    },
    methods: {
        init () {
            this.getMenuList();
        },
        // 角色权限列表
        async getMenuList () {
            const res = await this.$api.adminRolePowerListFetch({ roleId: this.roleId })
            this.menuList = res.data;
            this.initValue()
            this.loading = false;
        },
        initValue () {
            this.checks = {}
            this.menuList.forEach(item => {
                this.checks[item.powerId] = []
                item.sub_power && item.sub_power.forEach(child => {
                    child.showMenu && child.sub_power && child.sub_power.forEach(sub => {
                        sub.showMenu && !sub.sub_power && this.checks[item.powerId].push([child.powerId, sub.powerId])
                        sub.showMenu && sub.sub_power && sub.sub_power.forEach(power => {
                            power.showMenu && this.checks[item.powerId].push([child.powerId, sub.powerId, power.powerId])
                        })
                    })
                })
            })
        },
        // 修改权限
        changePermissions (value) {
            let userInfo = JSON.parse(localStorage.getItem('userInfo'))
            this.$api.adminRoleUpdatePowerFetch({
                roleId: this.roleId,
                powerIds: value
            }).then(res => {
                this.$message.success('修改角色成功')
                if (this.roleId === userInfo.roleId) {
                    setTimeout(() => {
                        this.$message.info('请重新登录')
                        localStorage.removeItem('userInfo')
                        localStorage.removeItem('sessionId')
                        this.$router.replace('/login')
                    }, 1000);
                }
            })
        },
        // 编辑角色
        showDialog () {
            this.dialog.form.name = this.name
            this.dialog.visible = true
        },
        // 更新
        onDialogSubmit () {
            this.$api.adminRoleUpdateRoleFetch({
                roleId: this.roleId,
                name: this.dialog.form.name
            }).then(res => {
                this.$message.success('修改角色成功')
                this.data.name = this.dialog.form.name
                this.dialog.visible = false
                this.$router.replace({query: {roleId: this.roleId, name: this.dialog.form.name}})
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#permissionDetail {
    .table-wrap {
        padding-top: 5px;
        .table-right {
            .group-item {
                margin: 25px 0;
                padding: 0 0px 10px 10px;
                border-bottom: 1px solid #e7e6eb;
                &::after {
                    content: '';
                    display: block;
                    clear: both;
                }
                .group-top {
                    margin: 0 0 15px;
                    .edit-btn {
                        color: #4b9eed;
                        margin: 0 0 0 20px;
                        cursor: pointer;
                    }
                }
                .group-name {
                    color: grey;
                }
                .group-user {
                    li {
                        float: left;
                        background-color: #eee;
                        height: 24px;
                        line-height: 24px;
                        margin: 0 10px 5px 0;
                        padding: 0 10px;
                    }
                }
                .group-store {
                    li {
                        width: 100%;
                        height: 24px;
                        line-height: 24px;
                        margin: 0 10px 5px 0;
                    }
                }
            }
        }
    }
}
</style>
