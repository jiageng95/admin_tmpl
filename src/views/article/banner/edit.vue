<template>
    <div id="bannerOperate">
        <div class="container">
            <el-form ref="form" :model="form" :rules="rules" label-width="150px" class="common-form">
                <el-form-item label="链接类型" prop="type">
                    <el-select
                        v-model="form.type"
                        placeholder="请选择链接类型"
                        size="small">
                        <el-option
                            v-for="item in typeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="排序" prop="sort">
                    <el-input v-model="form.sort" size="small" placeholder="请输入排序"></el-input>
                </el-form-item> -->
                <el-form-item label="图片" prop="banner">
                    <upload
                        ref="uploadForm"
                        list-type="picture-card"
                        accept="image/jpeg,image/png"
                        :limit="1"
                        :default-list="form.banner"
                        @remove="handleImgRemove"
                        @success="handleUploadSuccess"
                    >
                    </upload>
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
    name: 'bannerOperate',
    data () {
        return {
            typeList: [
                { label: '文章顶部', value: 'ARTICLE' },
                { label: '首页顶部', value: 'INDEX' }
            ],
            form: {
                banner: [],
                type: ''
            },
            rules: {
                banner: [ { required: true, validator: rules.checkArrLen('请上传图片'), trigger: 'change' } ],
                type: [ {required: true, message: '请选择链接类型', trigger: 'blur'} ]
            }
        }
    },
    computed: {
        bannerId () {
            return this.$route.query.bannerId
        },
        isEdit () {
            return this.$route.query.editType === 'edit'
        }
    },
    mounted () {

    },
    methods: {
        init () {
            this.isEdit && this.getDetail()
        },
        handleImgRemove (file, fileList) {
            this.form.banner = this.form.banner.filter(item => item.url !== file.url);
        },
        handleUploadSuccess (url) {
            this.form.banner.push({ url });
        },
        // 详情
        getDetail () {
            let data = { bannerId: this.bannerId }
            this.$api.bannerArticleDetailFetch(data).then(res => {
                let { banner } = res.data;
                res.data.banner = banner ? banner.split(',').map(item => ({ url: item })) : [];
                Object.assign(this.form, res.data)
            })
        },
        submit () {
            this.$refs.form.validate(valid => {
                if (!valid) return this.$message.error('请填写完整');
                if (!this.form.banner) return this.$message.error('请上传图片');
                let data = Object.assign({}, this.form)
                let { banner } = data;
                data.banner = banner.map(item => item.url).join(',');
                let apiFetch = this.isEdit ? this.$api.bannerArticleEditFetch : this.$api.bannerArticleAddFetch
                this.isEdit && Object.assign(data, { bannerId: this.bannerId })
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
