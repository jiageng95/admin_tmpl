<template>
    <div i="filters" :class="{'filter-block': block}">
        <slot name="tabs"></slot>
        <el-row :gutter="10">
            <el-col v-for="(item, index) in setting" :key="index" v-if="item.show !== false" :span="item.span || span(item.type)">
                <!-- <span class="inline-txt">{{item.label}}</span> -->
                <template v-if="item.slot">
                    <slot :name="item.prop"></slot>
                </template>
                <div class="inline-select" v-if="item.type === 'input'">
                    <el-input
                        v-model="form[item.prop]"
                        size="mini"
                        class="inline-select"
                        :placeholder="item.template.placeholder"
                        :clearable="item.template.clearable"
                        @change="val => changeFormValue(val, item.template.callback)"
                    >
                        <el-select v-model="form[item.template.prop]" slot="prepend" placeholder="请选择" v-if="item.template.options">
                            <el-option v-for="option in item.template.options" :key="option.value" :label="option.label" :value="option.value"></el-option>
                        </el-select>
                    </el-input>
                </div>
                <div class="inline-select" v-if="item.type === 'select'">
                    <el-select
                        v-model="form[item.prop]"
                        size="mini"
                        class="inline-select"
                        :clearable="item.template.clearable"
                        :filterable="item.template.filterable"
                        :placeholder="item.template.placeholder"
                        :remote="item.template.remote"
                        :remote-method="item.template.remoteMethod"
                        @change="val => changeFormValue(val, item.template.callback)"
                    >
                        <el-option
                            v-for="option in item.template.options"
                            :key="option[item.template.valueKey || 'value']"
                            :label="option[item.template.labelKey || 'label']"
                            :value="option[item.template.valueKey || 'value']">
                        </el-option>
                    </el-select>
                </div>
                <div
                    v-if="item.type === 'datetimerange' || item.type === 'daterange'"
                    class="inline-date"
                >
                    <el-date-picker
                        v-model="form[item.prop]"
                        size="mini"
                        :type="item.type"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :clearable="item.template.clearable"
                        :default-time="['00:00:00', '23:59:59']"
                        :value-format="item.format || defaultFormat(item.type)"
                        :picker-options="item.pickerOptions"
                        @change="val => changeFormValue(val, item.template.callback)"
                    >
                    </el-date-picker>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name: 'Filters',
    props: {
        form: {
            type: Object,
            default: () => ({})
        },
        filterData: {
            type: Object,
            default: () => ({})
        },
        block: { // 单独一个模块
            type: Boolean,
            default: false
        }
    },
    computed: {
        defaultFormat () {
            return (type) => {
                switch (type) {
                    case 'daterange':
                        return 'yyyy-MM-dd';
                    case 'datetimerange':
                        return 'yyyy-MM-dd HH:mm:ss';
                }
            }
        },
        span () {
            return (type) => {
                return {
                    datetimerange: 6,
                    daterange: 6
                }[type] || 3;
            }
        },
        setting () {
            return Object.entries(this.filterData)
                    .map(item => Object.assign({ prop: item[0] }, item[1]))
        }
    },
    data () {
        return {
            // originForm: {}
        }
    },
    created () {
        // this.originForm = JSON.parse(JSON.stringify(this.form))
    },
    methods: {
        changeFormValue (val, cb) {
            this.$emit('confirm')
            cb && cb()
        }
    }
}
</script>
<style lang="scss">
    [i="filters"] {
        display: flex;
        flex-wrap: wrap;
        // margin-bottom: 30px;
        &.filter-block {
            margin: 0 20px 20px;
            min-width: 960px;
            background: #fff;
            padding: 20px 25px 5px;
        }
        .el-row {
            width: 100%;
            // margin-left: 0 !important;
            // margin-right: 0 !important;
        }
        .el-col {
            margin-bottom: 15px;
        }
        .inline-txt {
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
            margin-bottom: 5px;
            color: rgba(0, 0, 0, .45);
            min-height: 18px;
        }
        .inline-input {
            display: inline-block;
            width: 280px;
            .el-input.el-input--suffix {
                width: auto;
                input {
                    width: 136px;
                }
            }
        }
        .el-input__inner {
            border-radius: 2px;
        }
        .inline-select {
            // display: inline-block;
            .el-input {
                width: 100% !important;
            }
            .el-select {
                width: 100%;
                margin-left: 0 !important;
            }
        }
        .inline-date {
            .el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner {
                width: 100%;
            }
        }
    }
</style>
