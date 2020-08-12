<template>
    <div v-if="visible">
        <el-dialog
            :title="title"
            :visible.sync="visible"
            :class="['common-dialog', className]"
            :append-to-body="true"
            :width="width"
            :top="top"
            :close-on-click-modal="closeOnClickModal"
            :before-close="beforeClose">
            <el-form ref="form" :model="form" :label-width="labelWidth + 'px'" :label-position="labelPosition" :size="size">
                <template v-for="(item, index) in rowsList">
                    <el-form-item
                        v-if="(typeof item.show === 'function' && item.show(item)) || item.show === undefined || item.show === true"
                        :label="item.label"
                        :prop="item.prop"
                        :key="index"
                        :rules="item.rules"
                        :required="item.required">
                        <el-select
                            v-if="item.el === 'select'"
                            v-model="form[item.prop]"
                            :placeholder="item.placeholder"
                            :disabled="item.showDisabled || false"
                        >
                            <el-option
                                v-for="(option, index) in item.options"
                                :key="index"
                                :label="option[item.optionLabel || 'label']"
                                :value="option[item.optionValue || 'value'] || option[Object.keys(option).find(key => key.toLowerCase().includes('id'))]">
                            </el-option>
                        </el-select>
                        <template v-else-if="item.el === 'ui_select'">
                            <el-select v-model="form[item.prop]"  :remote-method="remoteMethod" :reserve-keyword="item.reserveKeyword" :placeholder="item.placeholder" :filterable="item.filterable" :remote="item.remote" :disabled="item.showDisabled || false" @change="(val) => handleSelectChange(item.prop, val)">
                                <el-option
                                    v-for="(option, index) in item.options"
                                    :key="index"
                                    :label="option[item.optionLabel || 'label']"
                                    :value="option[item.optionValue || 'value']">
                                </el-option>
                            </el-select>
                        </template>
                        <Ueditor
                            v-else-if="item.el === 'ue'"
                            :editorId="editorId"
                            :defaultMsg="form[item.prop]"
                            :config="ueConfig"
                            ref="ue">
                        </Ueditor>
                        <template v-else-if="item.el === 'select_date'">
                            <el-date-picker
                                v-model="form[item.prop]"
                                size="small"
                                type="datetimerange"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                clearable
                                :default-time="['00:00:00', '23:59:59']"
                                :disabled="item.showDisabled || false">
                            </el-date-picker>
                        </template>
                        <template v-else-if="item.el === 'date'">
                            <el-date-picker
                                v-model="form[item.prop]"
                                size="small"
                                type="date"
                                clearable
                                :placeholder="item.placeholder"
                                value-format="yyyy-MM-dd hh:mm:ss"
                                :disabled="item.showDisabled || false">
                            </el-date-picker>
                        </template>
                        <template v-else-if="item.el === 'radio'">
                            <el-radio-group v-model="form[item.prop]" @change="(val) => handleRadioChange(item.prop, val)">
                                <el-radio
                                    v-for="(option, index) in item.options"
                                    :key="index"
                                    :label="option[item.optionValue || 'value']"
                                    :disabled="typeof option.showDisabled === 'function' ? option.showDisabled(item) : (option.showDisabled || false)">
                                    {{ option[item.optionLabel || 'label'] }}
                                </el-radio>
                            </el-radio-group>
                        </template>
                        <template v-else-if="item.slot">
                            <slot :name="item.prop" :index="index"></slot>
                        </template>
                        <el-input
                            v-else
                            v-model="form[item.prop]"
                            :placeholder="item.placeholder" :type="item.type || 'text'"
                            :disabled="item.showDisabled || false"
                            :readonly="item.readonly || false"
                            :maxlength="item.maxlength || Infinity"
                            :rows="item.rows"
                            :show-word-limit="item.showLimit"
                            :show-password="item.showPassword">
                            <template slot="append" v-if="item.append">{{item.append}}</template>
                        </el-input>
                    </el-form-item>
                </template>
            </el-form>
            <div slot="footer" class="dialog-footer" v-if="showButton">
                <el-button size="small"  @click="beforeClose">取 消</el-button>
                <el-button size="small" type="primary" :loading="isSubmit" @click="confirmHandle">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'CommonDialog',
    props: {
        // 是否显示
        visible: {
            type: Boolean,
            default: false
        },
        // 标题
        title: {
            type: String,
            default: ''
        },
        // 表单
        form: {
            type: Object,
            default: () => {}
        },
        // 每行的展示
        rows: {
            type: Object,
            default: () => ({})
        },
        // dialog宽度
        width: {
            type: String,
            default: '520px'
        },
        top: {
            type: String,
            default: '15vh'
        },
        closeOnClickModal: {
            type: Boolean,
            default: false
        },
        // label宽度
        labelWidth: {
            type: Number,
            default: 120
        },
        labelPosition: {
            type: String,
            default: 'right'
        },
        // 组件大小
        size: {
            type: String,
            default: 'small',
            validator (value) {
                return ['medium', 'small', 'mini'].includes(value)
            }
        },
        // 自定义样式
        className: {
            type: String,
            default: ''
        },
        mapIcon: {
            type: String,
            default: ''
        },
        // 服务器搜索数据
        remoteMethod: {
            type: Function,
            default: () => {}
        },
        // 显示按钮
        showButton: {
            type: Boolean,
            default: true
        },
        isSubmit: {
            type: Boolean,
            default: false
        },
        ueConfig: {
            type: Object,
            default: () => ({
                initialFrameWidth: null,
                initialFrameHeight: 300
            })
        }
    },
    data () {
        return {
            editorId: 'editor'
        }
    },
    computed: {
        rowsList () {
            return Object.keys(this.rows).map(key => Object.assign({ prop: key }, this.rows[key]));
        }
    },
    methods: {
        // 确定
        confirmHandle () {
            let isUE = this.rowsList.find(item => item.el && item.el === 'ue')
            if (isUE) this.form[isUE.prop] = Array.isArray(this.$refs.ue) ? this.$refs.ue[0].getUEContent() : this.$refs.ue.getUEContent();
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.$emit('confirm')
                } else {
                    this.$message.error('请按要求填写完整后保存');
                }
            })
        },
        // 关闭dialog前
        beforeClose () {
            this.$emit('hideDialog', false)
        },
        // 选中下拉框的值
        handleSelectChange (prop, val) {
            this.$emit('selectChange', prop, val)
        },
        // Radio绑定值变化时触发的事件
        handleRadioChange (prop, val) {
            this.$emit('radioChange', prop, val)
        },
        resetForm () {
            this.$refs['form'].resetFields();
        }
    },
    watch: {
        visible () {
            this.visible && this.$nextTick(() => {
                this.$refs.form.clearValidate()
            })
        }
    }
}
</script>

<style lang="scss">

</style>
