<template>
    <div id="articleOperate">
        <div class="container">
            <el-form ref="form" :model="form" :rules="rules" label-width="150px" class="common-form">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="form.title" size="small" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="封面" prop="cover">
                    <upload
                        ref="uploadForm"
                        list-type="picture-card"
                        accept="image/jpeg,image/png"
                        :limit="1"
                        :default-list="form.cover"
                        @remove="handleImgRemove"
                        @success="handleUploadSuccess"
                    >
                    </upload>
                </el-form-item>
                <el-form-item label="文章分类" prop="acId">
                    <el-select
                        v-model="form.acId"
                        placeholder="请选择文章分类"
                        size="small">
                        <el-option
                            v-for="item in acList"
                            :key="item.acId"
                            :label="item.acName"
                            :value="item.acId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="正文" prop="content">
                    <Ueditor editorId="detailEditor" :defaultMsg="form.content" :config="ueConfig" ref="detailEditor" />
                </el-form-item>
            </el-form>
            <div class="footer-btns">
                <el-button type="primary" size="small" @click="submit">保存</el-button>
                <el-button size="small" @click="goBack">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import rules from '@/util/rules';
export default {
    name: 'articleOperate',
    data () {
        return {
            ueConfig: {
                initialFrameWidth: null,
                initialFrameHeight: 300
            },
            acList: [],
            form: {
                cover: [],
                title: '',
                acId: '',
                content: ''
            },
            rules: {
                title: [ {required: true, message: '请输入标题', trigger: 'blur'} ],
                cover: [ { required: true, validator: rules.checkArrLen('请上传封面'), trigger: 'change' } ],
                acId: [ {required: true, message: '请选择文章分类', trigger: 'blur'} ],
                content: [ {required: true, message: '请输入正文', trigger: 'blur'} ]
            }
        }
    },
    computed: {
        articleId () {
            return this.$route.query.articleId
        },
        isEdit () {
            return this.$route.query.type === 'edit'
        }
    },
    mounted () {

    },
    methods: {
        init () {
            this.getOptionArticleCate()
            this.isEdit && this.getDetail()
        },
        handleImgRemove (file, fileList) {
            this.form.cover = this.form.cover.filter(item => item.url !== file.url);
        },
        handleUploadSuccess (url) {
            this.form.cover.push({ url });
        },
        async getOptionArticleCate () {
            let res = await this.$api.optionArticleCateFetch()
            this.acList = res.data
        },
        // 详情
        getDetail () {
            let data = { articleId: this.articleId }
            this.$api.articleDetailFetch(data).then(res => {
                let { cover } = res.data;
                res.data.cover = cover ? cover.split(',').map(item => ({ url: item })) : [];
                Object.assign(this.form, res.data)
            })
        },
        submit () {
            Object.assign(this.form, {
                content: this.$refs.detailEditor.getUEContent()
            });
            this.$refs.form.validate(valid => {
                if (!valid) return this.$message.error('请填写完整');
                if (!this.form.cover) return this.$message.error('请上传封面');
                let data = Object.assign({}, this.form)
                let { cover } = data;
                data.cover = cover.map(item => item.url).join(',');
                let apiFetch = this.isEdit ? this.$api.articleEditFetch : this.$api.articleAddFetch
                this.isEdit && Object.assign(data, { articleId: this.articleId })
                apiFetch(data).then(res => {
                    this.$message.success(this.isEdit ? '编辑成功' : '新增成功')
                    this.goBack()
                })
            })
        },
        goBack () {
            this.$router.back()
        }
    }
}
</script>

<style lang="scss">

</style>
