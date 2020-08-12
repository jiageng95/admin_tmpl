<template>
    <div id="deviceOperate">
        <div class="container">
            <el-form ref="form" :model="form" :rules="rules" label-width="150px" class="common-form">
                <el-form-item label="名称" prop="deviceName">
                    <el-input v-model="form.deviceName" size="small" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="mac地址" prop="mac">
                    <el-input v-model="form.mac" size="small" placeholder="请输入mac地址"></el-input>
                </el-form-item>
                <el-form-item label="设备key" prop="deviceKey">
                    <el-input v-model="form.deviceKey" size="small" placeholder="请输入设备key"></el-input>
                </el-form-item>
                <el-form-item label="设备secret" prop="deviceSecret">
                    <el-input v-model="form.deviceSecret" size="small" placeholder="请输入设备secret"></el-input>
                </el-form-item>
                <el-form-item label="位置" prop="location">
                    <el-autocomplete
                        v-model="form.location"
                        :fetch-suggestions="remoteMethod"
                        placeholder="请输入内容"
                        @select="changeLocation"
                        size="small"
                    ></el-autocomplete>
                </el-form-item>
                <el-form-item label="设备类型" prop="deviceType">
                    <el-radio-group v-model="form.deviceType" size="mini">
                        <el-radio-button v-for="(item, index) in deviceTypeList" :key="index" :label="item.value">{{item.label}}</el-radio-button>
                    </el-radio-group>
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
    name: 'deviceOperate',
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
                deviceName: '',
                mac: '',
                deviceKey: '',
                deviceSecret: '',
                deviceType: 0,
                location: '',
                locationId: ''
            },
            rules: {
                deviceName: [ {required: true, message: '请输入名称', trigger: 'blur'} ],
                mac: [ {required: true, message: '请输入mac地址', trigger: 'blur'} ],
                deviceKey: [ {required: true, message: '请输入设备key', trigger: 'blur'} ],
                deviceSecret: [ {required: true, message: '请输入设备secret', trigger: 'blur'} ],
                location: [ {required: true, message: '请选择位置', trigger: 'change'} ],
                deviceType: [ {required: true, message: '请选择设备类型', trigger: 'blur'} ]
            },
            locationOptions: []
        }
    },
    computed: {
        deviceId () {
            return this.$route.query.deviceId
        },
        isEdit () {
            return this.$route.query.type === 'edit'
        }
    },
    mounted () {

    },
    methods: {
        init () {
            this.isEdit && this.getDetail()
        },
        // 详情
        getDetail () {
            let data = { deviceId: this.deviceId }
            this.$api.deviceDetailFetch(data).then(res => {
                Object.assign(this.form, res.data)
            })
        },
        remoteMethod (keyword, cb) {
            let data = { keyword }
            this.locationOptions = [{latitude: '1', longitude: '2', id: 111, value: '减肥第三款积分大家发多少'}]
            cb(this.locationOptions)
            // this.$api.deviceSearchAddressFetch(data).then(res => {
                // this.locationOptions = res.data
            // })
        },
        changeLocation (location) {
            // console.log(this.form, location)
            // location && Object.assign(this.form, {
            //     lng: location.longitude,
            //     lat: location.latitude,
            //     location: location.value
            // })
        },
        submit () {
            this.$refs.form.validate(valid => {
                if (!valid) return this.$message.error('请填写完整');
                let data = Object.assign({}, this.form)
                let apiFetch = this.isEdit ? this.$api.deviceEditFetch : this.$api.deviceAddFetch
                this.isEdit && Object.assign(data, { deviceId: this.deviceId })
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
