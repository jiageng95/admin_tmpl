<template>
    <div id="aboutus">
        <div class="container">
            <el-form ref="form" :model="form" :rules="rules" label-width="150px" class="common-form">
                <el-form-item label="详情介绍" prop="content">
                    <Ueditor editorId="detailEditor" :defaultMsg="form.content" :config="ueConfig" ref="detailEditor" />
                </el-form-item>
            </el-form>
            <div class="footer-btns">
                <el-button type="primary" size="small" @click="submit" v-permission="530">保存</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import rules from '@/util/rules';
export default {
    name: 'aboutus',
    data () {
        return {
            ueConfig: {
                initialFrameWidth: null,
                initialFrameHeight: 300
            },
            form: {
                content: ''
            },
            rules: {
                content: [ {required: true, message: '请输入正文', trigger: 'blur'} ]
            }
        }
    },
    mounted () {

    },
    methods: {
        init () {
            this.getDetail()
        },
        // 详情
        getDetail () {
            this.$api.articleAboutUsInfoFetch().then(res => {
                Object.assign(this.form, { content: res.data })
            })
        },
        submit () {
            Object.assign(this.form, {
                content: this.$refs.detailEditor.getUEContent()
            });
            this.$refs.form.validate(valid => {
                if (!valid) return this.$message.error('请填写完整');
                let data = { ...this.form }
                this.$api.articleAboutUsEditFetch(data).then(res => {
                    this.$message.success('保存成功')
                    this.getDetail()
                })
            })
        }
    }
}
</script>

<style lang="scss">

</style>
