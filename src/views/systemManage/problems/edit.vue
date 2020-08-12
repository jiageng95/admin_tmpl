<template>
    <div class="common-detail storeOperate">
        <div class="container">
            <el-form ref="form" :model="form" :rules="formRules" label-width="130px">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="form.title" placeholder="请输入标题内容" />
                </el-form-item>
                <el-form-item label="正文" prop="content">
                    <Ueditor editorId="detailEditor" :defaultMsg="form.content" :config="ueConfig" ref="detailEditor" />
                </el-form-item>
                <el-form-item class="footer">
                    <el-button type="primary" :loading="isSubmit" @click="onSubmit">保存</el-button>
                    <el-button @click="goBack">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import rules from '@/util/rules';

export default {
    data () {
        const _that = this;
        return {
            form: {
                title: '',
                content: '',
                questionId: ''
            },
            formRules: {
                title: [
                    { required: true, message: '请输入姓名', trigger: ['blur', 'change'] }
                ],
                address: [
                    { required: true, message: '请输入联系地址', trigger: ['blur', 'change'] }
                ]
            },
            regionData: {},
            isSubmit: false,
            ueConfig: {
                initialFrameWidth: null,
                initialFrameHeight: 300
            }
        }
    },
    computed: {
        questionId () {
            return this.$route.query.questionId
        }
    },
    methods: {
        init () {
            this.questionId && this.getDetail()
        },
        async getDetail () {
            let res = await this.$api.questionDetailFetch({ questionId: this.questionId })
            Object.assign(this.form, res.data)
        },
        goBack () {
            this.$router.back()
        },
        onSubmit () {
            Object.assign(this.form, {
                content: this.$refs.detailEditor.getUEContent()
            });
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.isSubmit = true;
                    let data = JSON.parse(JSON.stringify(this.form));
                    let apiFetch = this.questionId ? this.$api.questionEditFetch : this.$api.questionAddFetch;
                    apiFetch(data).then(res => {
                        this.$message.success('保存成功');
                        this.goBack();
                    }).finally(() => {
                        this.isSubmit = false;
                    });
                } else {
                    this.$message.error('请按要求填写完整后保存');
                    return false;
                }
            });
        }
    }
}
</script>
<style lang="scss">
.el-scrollbar {
    max-height: 400px;
}
</style>
