<template>
    <div class="common-detail user-info">
        <div class="container">
            <div class="detail-con">
                <div class="detail-item">
                    <div class="item-label">账号：</div>
                    <div class="item-value">{{userInfo.account}}</div>
                </div>
                <div class="detail-item">
                    <div class="item-label">姓名：</div>
                    <div class="item-value">{{userInfo.userName}}</div>
                </div>
                <div class="detail-item">
                    <div class="item-label">角色：</div>
                    <div class="item-value">{{userInfo.roleName}}</div>
                </div>
                <div class="detail-item">
                    <div class="item-label">密码：</div>
                    <div class="item-value">*******<a href="javascript:;" class="link-btn" @click="showEditVisible" v-permission="600">修改密码</a></div>
                </div>
            </div>
        </div>
        <common-dialog
            :rows="rows"
            :form="form"
            :labelWidth="80"
            title="修改密码"
            :visible="editVisible"
            @hideDialog="hideEditVisible"
            @confirm="updateUserPwd" />
    </div>
</template>

<script>
import rules from '@/util/rules'
import md5 from 'js-md5'

export default {
    name: 'user-info',
    data () {
        return {
            editVisible: false,
            userInfo: {},
            form: {
                old_pwd: '',
                new_pwd: ''
            },
            rows: {
                old_pwd: {
                    label: '旧密码',
                    type: 'password',
                    placeholder: '请输入旧密码',
                    rules: [
                        {validator: rules.checkLenInterval(6, 12), trigger: 'blur'},
                        {min: 6, message: '旧密码至少6位数字', trigger: 'blur'},
                        {required: true, message: '旧密码至少6位数字', trigger: 'blur'}
                    ]
                },
                new_pwd: {
                    label: '新密码',
                    type: 'password',
                    placeholder: '请输入新密码',
                    rules: [
                        {validator: rules.checkLenInterval(6, 12), trigger: 'blur'},
                        {min: 6, message: '新密码至少6位数字', trigger: 'blur'},
                        {required: true, message: '新密码至少6位数字', trigger: 'blur'}
                    ]
                }
            }
        }
    },
    mounted () {
    },
    methods: {
        init () {
            this.getPersonalInfo()
        },
        async getPersonalInfo () {
            let res = await this.$api.adminPersonalInfoFetch()
            this.userInfo = res.data
        },
        showEditVisible () {
            this.form = {
                old_pwd: '',
                new_pwd: ''
            }
            this.editVisible = true
        },
        hideEditVisible () {
            this.editVisible = false
        },
        updateUserPwd () {
            let { old_pwd, new_pwd } = this.form
            let data = {
                old_pwd: md5(old_pwd),
                new_pwd: md5(new_pwd)
            }
            this.$api.adminUpdatePwdFetch(data).then(res => {
                this.$message.success('修改成功')
                this.editVisible = false
                this.getPersonalInfo()
            })
        }
    }
}
</script>

<style>

</style>
