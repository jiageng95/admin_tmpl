<template>
    <div id="recycleCategoryOperate">
        <div class="container">
            <el-form ref="form" :model="form" :rules="rules" label-width="150px" class="common-form">
                <el-form-item label="名称" prop="rcName">
                    <el-input v-model="form.rcName" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="价格(元/公斤)" prop="price">
                    <el-input v-model="form.price" placeholder="请输入价格"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model="form.sort" placeholder="请输入排序"></el-input>
                </el-form-item>
                <el-form-item label="图标" prop="cover">
                    <upload
                        ref="uploadForm"
                        accept="image/jpeg,image/png"
                        :limit="3"
                        :default-list="form.cover"
                        @remove="handleImgRemove"
                        @success="handleUploadSuccess"
                    >
                    </upload>
                </el-form-item>
                <el-form-item label="设备类型" prop="deviceType">
                    <el-radio-group v-model="form.deviceType">
                        <el-radio-button v-for="(item, index) in deviceTypeList" :key="index" :label="item.value">{{item.label}}</el-radio-button>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div class="footer-btns">
                <el-button type="primary" @click="submit">保存</el-button>
                <el-button @click="goBack">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import rules from '@/util/rules';
export default {
    name: 'recycleCategoryOperate',
    data () {
        return {
            deviceTypeList: [
                {
                    label: '大岛',
                    value: 0
                },
                {
                    label: '小岛',
                    value: 1
                }
            ],
            form: {
                cover: [],
                rcName: '',
                price: '',
                deviceType: 0,
                sort: ''
            },
            rules: {
                rcName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
                price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
                cover: [{ required: true, validator: rules.checkArrLen('请上传图标'), trigger: 'change' }],
                deviceType: [{ required: true, message: '请选择设备类型', trigger: 'blur' }]
            }
        }
    },
    computed: {
        rcId () {
            return this.$route.query.rcId
        },
        isEdit () {
            return this.$route.query.type === 'edit'
        }
    },
    mounted () {

    },
    methods: {
        init () {
            let cover = 'https://c-ssl.duitang.com/uploads/item/201509/22/20150922180033_hV43u.thumb.1000_0.jpeg,https://c-ssl.duitang.com/uploads/item/201803/17/20180317215001_TKySv.thumb.700_0.jpeg'
            cover = cover ? cover.split(',').map(item => ({ url: item })) : [];
            Object.assign(this.form, {
                cover
            })
            this.isEdit && this.getDetail()
        },
        handleImgRemove (file, fileList) {
            this.form.cover = this.form.cover.filter(item => item.url !== file.url);
        },
        handleUploadSuccess (url) {
            this.form.cover.push({ url });
        },
        // 详情
        getDetail () {
            let data = { rcId: this.rcId }
            this.$api.recycleCategoryDetailFetch(data).then(res => {
                let { cover } = res.data;
                res.data.cover = cover ? cover.split(',').map(item => ({ url: item })) : [];
                Object.assign(this.form, res.data)
            })
        },
        submit () {
            this.$refs.form.validate(valid => {
                if (!valid) return this.$message.error('请填写完整');
                if (!this.form.cover) return this.$message.error('请上传图标');
                let data = Object.assign({}, this.form)
                let { cover } = data;
                data.cover = cover.map(item => item.url).join(',');
                let apiFetch = this.isEdit ? this.$api.recycleCategoryEditFetch : this.$api.recycleCategoryAddFetch
                this.isEdit && Object.assign(data, { rcId: this.rcId })
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
