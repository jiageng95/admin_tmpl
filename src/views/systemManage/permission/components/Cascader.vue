<template>
    <div class="permission-cascader">
        <el-tabs v-model="activeName">
            <el-tab-pane
                v-for="(item, index) in menuList"
                :key="index"
                :name="item.powerId">
                <div slot="label" class="label">{{ item.powerName }}</div>
                <el-cascader-panel
                    v-model="checks[activeName]"
                    :options="item.sub_power"
                    :props="props">
                </el-cascader-panel>
            </el-tab-pane>
        </el-tabs>
        <div class="btn-wrap">
            <el-button size="medium" type="primary" @click="submit('yes')" v-permission="106">保存</el-button>
            <el-button size="medium" @click="goBack">取消</el-button>
        </div>
    </div>
</template>

<script>
import util from '@/util/util';

export default {
    props: {
        initValue: {
            type: Object,
            default: () => ({})
        },
        menuList: {
            type: Array,
            default: () => []
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            props: { multiple: true, value: 'powerId', label: 'powerName', children: 'sub_power' },
            activeName: '',
            checks: {}
        }
    },
    watch: {
        menuList (newVal) {
            this.init();
        },
        initValue (newVal) {
            this.checks = newVal;
        }
    },
    methods: {
        init () {
            this.activeName = this.menuList[0] ? this.menuList[0].powerId : '';
        },
        goBack () {
            this.$router.back()
        },
        submit () {
            let checks = [
                ...Object.keys(this.checks)
                .map(key => this.checks[key].length ? key : '')
                .filter(item => item),
                ...new Set(Object.keys(this.checks)
                .map(key => this.checks[key].join(',')).toString().split(','))
            ].filter(item => item)
            this.$emit('submit', checks.toString());
        }
    }
}
</script>

<style lang="scss">
.permission-cascader {
    .el-tabs {
        &__active-bar {
            height: 3px;
            background-color: #409EFF;
        }
        .el-tabs__nav-wrap {
            &::after {
                display: none;
            }
        }
        .el-tabs__item {
            height: 42px;
            padding: 0 10px;
            color: #8391a5;
            &.is-active {
                color: #409EFF;
            }
            .label {
                margin: 0 16px;
                line-height: 42px;
                font-weight: 400;
            }
        }
        .el-tab-pane {
            display: inline-block;
        }
    }
    .el-cascader-panel {
        border: none !important;
        .el-scrollbar {
            margin: 5px 30px 5px 0;
            width: 300px;
            border: 1px solid #ccc;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
            .el-cascader-menu__wrap {
                height: 354px;
                .el-cascader-node {
                    height: 36px;
                    line-height: 36px;
                    &.in-active-path {
                        color: #409EFF;
                    }
                }
            }
        }
    }
    .btn-wrap {
        padding: 25px 0;
    }
}
</style>
