<template>
    <div i="login">
        <div class="login-container">
            <div class="title">
                <div class="logo">
                    <img class="logo-img" src="../../assets/images/LOGO.png">
                </div>
                {{title}}
            </div>
            <!-- 账号密码登录 -->
            <el-form ref="form" class="login-form" :rules="formRules" :model="loginForm">
                <el-form-item prop="account">
                    <div class="form-item">
                        <el-input prefix-icon="el-icon-user" size="medium" v-model="loginForm.account" placeholder="请输入账号"></el-input>
                    </div>
                </el-form-item>
                <el-form-item prop="password">
                    <div class="form-item">
                        <el-input prefix-icon="el-icon-lock" size="medium" v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
                    </div>
                </el-form-item>
                <el-form-item prop="code">
                    <div class="form-item">
                        <el-input prefix-icon="el-icon-bank-card" size="medium" v-model="loginForm.vrifyCode" placeholder="请输入验证码">
                            <template slot="append">
                                <div class="code-img" @click="getImgCode">
                                    <img :src="'data:image/png;base64,'+ checkCode">
                                </div>
                            </template>
                        </el-input>
                    </div>
                </el-form-item>
                <el-switch
                    v-model="isRemember"
                    active-text="记住密码">
                </el-switch>
                <el-form-item>
                    <el-button size="medium" class="login-btn" @click="submitForm" :loading="isSubmit" type="primary">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import util from '@/util/util'
import rules from '@/util/rules'
import md5 from 'js-md5'

export default {
    data () {
        return {
            title: '彩虹站智能垃圾分类管理中台',
            loginForm: {
                account: '',
                password: '',
                vrifyCode: ''
            },
            isRemember: true,
            formRules: {
                account: [{ validator: rules.checkLen(20, '账号不能为空'), trigger: 'blur' }],
                password: [
                    { validator: rules.checkLenInterval(6, 12), trigger: 'blur' },
                    { min: 6, message: '密码至少6位数字', trigger: 'blur' }
                ],
                vrifyCode: [{ validator: rules.checkLen(4, '验证码不能为空'), trigger: 'blur' }]
            },
            checkCode: '',
            isSubmit: false,
            ticket: '',
            token: '' // 图形验证码所得的token
        }
    },
    mounted () {
        this.getImgCode();
        let account = localStorage.getItem('account');
        let password = localStorage.getItem('password');
        if (account && password) {
            Object.assign(this.loginForm, {
                account,
                password
            })
        }
        // 回车提交表单
        document.onkeydown = (event) => {
            var e = event || window.event;
            if (e && e.keyCode === 13 && !this.isSubmit) { // enter 键
                this.submitForm();
            }
        };
    },
    methods: {
        // 获取图形验证码
        getImgCode () {
            this.$api.homeImageVerificationFetch().then(res => {
                this.checkCode = res.data.pic;
                this.token = res.data.token;
            }).catch()
        },
        submitForm () {
            if (this.isSubmit) return;
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    let { account, password, vrifyCode } = this.loginForm
                    let data = {
                        account,
                        password: md5(password),
                        vrifyCode,
                        token: this.token
                    }
                    this.isSubmit = true
                    // 登录
                    this.$api.homeLoginFetch(data).then(res => {
                        this.ticket = res.data.ticket
                        this.getUserInfo()
                    }).catch(() => {
                        this.isSubmit = false
                    })
                } else {
                    this.isSubmit = false
                    this.$message.error('登录失败')
                    return false
                }
            })
        },
        getUserInfo () {
            let data = {
                ticket: this.ticket
            }
            this.$api.homeSessionFetch(data).then(res => {
                let { sessionId, account } = res.data
                let { password } = this.loginForm
                localStorage.setItem('userInfo', JSON.stringify(res.data))
                localStorage.setItem('sessionId', sessionId)
                util.savePermissions(res.data.power_list)
                if (this.isRemember) {
                    localStorage.setItem('account', account)
                    localStorage.setItem('password', password)
                } else {
                    localStorage.removeItem('password')
                }
                this.$message({
                    type: 'success',
                    showClose: true,
                    message: '登录成功'
                })
                this.isSubmit = false
                this.$router.push('/').catch(() => {})
            })
        }
    }
}
</script>

<style lang="scss">
[i="login"] {
    width: 100%;
    height: 100vh;
    min-height: 500px;
    padding: 20px;
    display: flex;
    flex-direction: column;;
    justify-content: center;
    align-items: center;
    background-image: url('images/login_bg.svg');
    background-repeat: no-repeat;
    background-position: center 110px;
    background-size: 100%;
    .login-container{
        width: 378px;
        min-height: 500px;
        display: flex;
        flex-direction: column;;
        justify-content: center;
        align-items: center;
        .title {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 22px;
            margin-bottom: 20px;
        }
        .logo {
            width: 50px;
            height: 50px;
            margin-right: 10px;
            border-radius: 50%;
            overflow: hidden;
            .logo-img {
                width: 100%;
                height: 100%;
            }
        }
        .login-form {
            width: 100%;
            border-radius:6px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            padding-top: 22px;
            .el-input--prefix {
                .el-input__inner {
                    padding-left: 40px;
                    border: none;
                    background: transparent;
                    border-bottom: 1px solid #bacad9;
                }
            }
            .form-item {
                width: 378px;
                max-width: 100%;
                display: flex;
                align-items: center;
                .el-input__prefix {
                    .el-input__icon {
                        font-size: 20px;
                        color: #bacad9;
                    }
                }
                .el-input-group__append {
                    padding: 0;
                    border: none;
                }
                .code-img {
                    cursor: pointer;
                    width: 82px;
                    height: 34px;
                    border-radius: 0 4px 4px 0;
                    overflow: hidden;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .login-btn{
                margin-top: 20px;
                width: 378px;
                letter-spacing: 4px;
                box-shadow: 2px 5px 10px rgba(64, 158, 255, .3);
            }
        }
    }
}
</style>
