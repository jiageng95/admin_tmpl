<template>
    <div i="data-table">
        <div class="table-header">
            <div class="table-btns">
                <Btns :data="btns" justify="flex-start" v-if="btns.length" />
            </div>
            <div class="setting-list" v-if="showConfig">
                <el-popover
                    class="setting-item"
                    placement="bottom"
                    width="200"
                    trigger="click">
                    <div class="setting-menu-item" @click="initColumn"><i class="el-icon-refresh"></i>重置</div>
                    <template v-for="(item, index) in column">
                        <div class="setting-menu-item" :key="index" v-if="item.show !== false"><el-checkbox v-model="item.showColumn" :disabled="item.showColumn && (column.filter(col => col.showColumn).length === 2)">{{item.label}}</el-checkbox></div>
                    </template>
                    <el-tooltip effect="dark" content="列设置" placement="top" slot="reference">
                        <i class="el-icon-setting"></i>
                    </el-tooltip>
                </el-popover>
                <el-tooltip effect="dark" content="刷新" placement="top">
                    <i class="el-icon-refresh" @click="refresh"></i>
                </el-tooltip>
            </div>
        </div>
        <el-table
            ref="table"
            v-loading="loading"
            :data="tableData"
            :height="height"
            :max-height="maxHeight"
            :border="noBorder"
            :lazy="lazy"
            :size="size"
            :row-key="rowKey"
            :tree-props="treeProps"
            :load="handleLoad"
            :show-summary="showSummary"
            :highlight-current-row="highlightCurrentRow"
            @selection-change="handleSelectionChange"
            @current-change="handleCurrentChange"
            @row-click="handleRowClick">
            <el-table-column
                v-if="showSelection"
                type="selection"
                :width="60"
                :selectable="selectable">
            </el-table-column>
            <el-table-column
                v-if="showIndex"
                type="index"
                :label="indexLable"
                :width="indexWidth">
            </el-table-column>
            <template v-for="(item, index) in column">
                <el-table-column
                    :key="index"
                    :prop="item.prop"
                    :label="item.label"
                    :min-width="item.minWidth || 100"
                    :width="item.width"
                    :show-overflow-tooltip="item.showTip || true"
                    :sortable="item.isSort"
                    :align="item.align || 'left'"
                    v-if="column.length && column[index].label !== '操作' && ((typeof column[index].show === 'function' && column[index].show()) || column[index].show === undefined || column[index].show === true) && (!column[index].permission || showPower(column[index].permission)) && column[index].showColumn">
                    <template slot-scope="scope">
                        <!-- 插槽 -->
                        <template v-if="item.slot">
                            <slot :name="scope.column.property" :row="scope.row" :index="scope.$index"></slot>
                        </template>
                        <!-- 自定义内容 -->
                        <div v-else-if="item.customValue">
                            {{item.customValue(scope.row)}}
                        </div>
                        <!-- 图片 or 头像 -->
                        <div v-else-if="item.template && (item.template.type === 'pic' || item.template.type === 'avatar')" :class="[item.template.type === 'avatar' ? 'avatarImg' : 'coverImg', item.class]">
                            <el-image :src="scope.row[item.prop]" :fit="item.template.fit">
                                <div slot="error" class="image-slot">
                                    <i class="el-icon-picture-outline"></i>
                                </div>
                            </el-image>
                            <!-- <img :src="scope.row[item.prop]" :style="`object-fit: ${item.template.fit}`" /> -->
                        </div>
                        <template v-else-if="item.template && item.template.type === 'icon'">
                            <Svgicon :icon="scope.row[item.prop]" />
                        </template>
                        <!-- tag标签 -->
                        <div v-else-if="item.template && item.template.type === 'tag'">
                            <el-tag :type="item.template.tagType[scope.row[item.prop]]">{{item.map ? item.map[scope.row[item.prop]] : scope.row[item.prop]}}</el-tag>
                        </div>
                        <!-- 状态 -->
                        <div v-else-if="item.template && item.template.type === 'status'">
                            <span
                                class="table-status"
                                :class="scope.row[item.prop] === item.flag ? 'success' : 'fail'">
                                {{scope.row[item.prop] === item.flag ? item.template.successTxt : item.template.failTxt}}
                            </span>
                        </div>
                        <!-- 开关 -->
                        <div v-else-if="item.template && item.template.type === 'switch'">
                            <el-switch
                                v-model="scope.row[item.prop]"
                                :active-color="item.template.actColor"
                                @change="item.template.callback && item.template.callback(scope.row, scope.$index)">
                            </el-switch>
                        </div>
                        <!-- 数字输入框 -->
                        <div v-else-if="item.template && item.template.type === 'inputNumber'" class="column-flex">
                            <span v-if="item.template.prefix" class="prefix">{{item.template.prefix}}</span>
                            <el-input-number
                                :style="{width: (item.template.width || 100) + 'px'}"
                                v-model="scope.row[item.prop]"
                                controls-position="right"
                                size="mini"
                                :controls="item.template.controls || false"
                                :precision="item.template.precision || 0"
                                @change="item.template.callback && item.template.callback(scope.row, scope.$index)"
                                :min="item.template.min || 0"
                                :max="item.template.max || Infinity">
                            </el-input-number>
                        </div>
                        <!-- 输入框 -->
                        <div v-else-if="item.template && item.template.type === 'input'">
                            <el-input
                                v-model="scope.row[item.prop]"
                                :placeholder="item.template.placeholder"
                                size="small"
                                @change="item.template.callback && item.template.callback(scope.row, scope.$index)" />
                        </div>
                        <!-- 星级 -->
                        <div v-else-if="item.template && item.template.type === 'rate'" class="rate-box">
                            <el-rate
                                v-if="scope.row[item.prop] > 5"
                                :value="5"
                                disabled>
                            </el-rate>
                            <el-rate
                                v-else
                                v-model="scope.row[item.prop]"
                                disabled>
                            </el-rate>
                            <span class="plus" v-if="scope.row[item.prop] > 5">+</span>
                        </div>
                        <!-- 下拉菜单 -->
                        <div v-else-if="item.template && item.template.type === 'select'">
                            <el-select
                                v-model="scope.row[item.prop]"
                                size="small"
                                class="inline-select"
                                :clearable="item.template.clearable"
                                :filterable="item.template.filterable"
                                :placeholder="item.template.placeholder"
                                :disabled="showPower(item.disabled)"
                                @change="(val) => item.template.callback && item.template.callback(scope.row, scope.$index, 'change', val)"
                            >
                                <el-option
                                    v-for="option in item.template.options"
                                    :key="option[item.template.valueKey || 'value']"
                                    :label="option[item.template.labelKey || 'label']"
                                    :value="option[item.template.valueKey || 'value']">
                                </el-option>
                            </el-select>
                        </div>
                        <!-- 常规 -->
                        <template v-else>
                            <span v-if="item.template && (item.template.prefix || item.template.type)" class="prefix">{{item.template.prefix || '¥'}}</span>
                            {{item.map ? item.map[scope.row[item.prop]] : util.isBlank(scope.row[item.prop]) ? '--' : scope.row[item.prop]}}
                        </template>
                    </template>
                </el-table-column>
            </template>
            <template v-if="showPower(column[column.length - 1].template)">
                <el-table-column
                    v-if="column.length && column[column.length - 1].label === '操作' && column[column.length - 1].show !== false"
                    :label="column[column.length - 1].label"
                    :width="column[column.length - 1].width || 250"
                    :fixed="column[column.length - 1].fixed || 'right'">
                    <template slot-scope="scope">
                        <div class="operation">
                            <template v-for="(item, index) in column[column.length - 1].template">
                                <div
                                    v-if="(typeof item.show === 'function' && item.show(scope.row)) || item.show === undefined || item.show === true"
                                    :key="index"
                                    v-permission="item.permission"
                                >
                                    <!-- 跳转路由 -->
                                    <router-link
                                        v-if="item.tag === 'router-link'"
                                        :to="Object.keys(item.query || {}).reduce((a, b) => { a.query[b] = scope.row[b] || item.query[b]; return a }, { path: typeof item.path === 'function' ? item.path(scope.row,  scope.$index) : item.path, query: {}})"
                                        class="link-btn"
                                        tag="a">
                                        {{item.map ? item.map[scope.row[item.prop]] : item.text}}
                                    </router-link>
                                    <!-- 普通按钮 -->
                                    <template v-if="!item.confirm">
                                        <a
                                            v-if="item.tag === 'a'"
                                            href="javascript:;"
                                            class="link-btn"
                                            @click.stop="item.callback && item.callback(scope.row, scope.$index)">
                                            {{item.map ? item.map[scope.row[item.prop]] : item.text ? item.text : (scope.row[item.prop] === item.flag) ? item.actText : item.inactText}}
                                        </a>
                                        <el-button
                                            v-else-if="item.tag === 'button'"
                                            class="link-btn"
                                            size="mini"
                                            :type="(item.type ? item.type : (scope.row[item.prop] === item.flag) ? item.actType : item.inactType) || ''"
                                            @click.stop="item.callback && item.callback(scope.row, scope.$index)">
                                            {{item.map ? item.map[scope.row[item.prop]] : item.text ? item.text : (scope.row[item.prop] === item.flag) ? item.actText : item.inactText}}
                                        </el-button>
                                    </template>
                                    <!-- 带二次确认的按钮 -->
                                    <el-popconfirm
                                        v-if="item.confirm"
                                        :title="item.confirmTxt || '确定执行该操作吗？'"
                                        @onConfirm="item.confirm(scope.row, scope.$index)">
                                        <a
                                            v-if="item.tag === 'a'"
                                            href="javascript:;"
                                            class="link-btn"
                                            slot="reference">
                                            {{item.map ? item.map[scope.row[item.prop]] : item.text ? item.text : (scope.row[item.prop] === item.flag) ? item.actText : item.inactText}}
                                        </a>
                                        <el-button
                                            v-else-if="item.tag === 'button'"
                                            class="link-btn"
                                            size="mini"
                                            :type="(item.type ? item.type : (scope.row[item.prop] === item.flag) ? item.actType : item.inactType) || ''"
                                            slot="reference">
                                            {{item.map ? item.map[scope.row[item.prop]] : item.text ? item.text : (scope.row[item.prop] === item.flag) ? item.actText : item.inactText}}
                                        </el-button>
                                    </el-popconfirm>
                                </div>
                            </template>
                        </div>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <slot></slot>
        <el-pagination
            class="pagination"
            v-if="showPage"
            @current-change="changePage"
            :current-page.sync="page"
            :layout="layout"
            :total="total"
            :page-size="pageSize">
        </el-pagination>
    </div>
</template>

<script>
import util from '@/util/util';

export default {
    name: 'DataTable',
    props: {
        // 表格数据
        tableData: {
            type: Array,
            default: () => []
        },
        tableColumn: {
            type: Object,
            default: () => ({})
        },
        // 是否无边框
        noBorder: {
            type: Boolean,
            default: true
        },
        // Table 的高度
        height: {
            type: [Number, String],
            default: null
        },
        // Table 的最大高度
        maxHeight: {
            type: [Number, String],
            default: null
        },
        // 是否要高亮当前行
        highlightCurrentRow: {
            type: Boolean,
            default: true
        },
        // 分页组件布局
        layout: {
            type: String,
            default: 'total, prev, pager, next, jumper'
        },
        // 分页总数
        total: {
            type: Number,
            default: 0
        },
        // 序号是否显示
        showIndex: {
            type: Boolean,
            default: false
        },
        // 序号列名
        indexLable: {
            type: String,
            default: '序号'
        },
        // 序号列宽
        indexWidth: {
            type: Number,
            default: 80
        },
        // 显示分页
        showPage: {
            type: Boolean,
            default: false
        },
        lazy: {
            type: Boolean,
            default: false
        },
        rowKey: {
            type: String,
            default: 'id'
        },
        treeProps: {
            type: Object,
            default: () => ({ children: 'children', hasChildren: 'hasChildren' })
        },
        // 每页条数
        pageSize: {
            type: Number,
            default: 10
        },
        // 当前页数
        currentPage: {
            type: Number,
            default: 1
        },
        // 是否显示多选
        showSelection: {
            type: Boolean,
            default: false
        },
        // CheckBox 是否可以勾选
        selectable: {
            type: Function,
            default: () => true
        },
        // 显示合计行
        showSummary: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: ''
        },
        btns: {
            type: Array,
            default: () => []
        },
        showConfig: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            page: this.currentPage,
            column: [],
            loading: false
        }
    },
    computed: {
        // 工具类
        util () {
            return util;
        }
    },
    created () {
        this.initColumn()
    },
    methods: {
        initColumn () {
            this.column = Object.entries(this.tableColumn)
                    .map(item => Object.assign({ prop: item[0] }, item[1]))
                    .map(item => { item.showColumn = true; return item })
                    .sort((a, b) => b.prop === 'operation' ? -1 : 0)
        },
        // 改变页数后
        changePage (page) {
            this.page = page
            this.$emit('changePage', page)
        },
        // 触发多选框后
        handleSelectionChange (val) {
            this.$emit('changeSelection', val)
        },
        handleCurrentChange (val) {
            this.$emit('changeCurrent', val)
        },
        handleRowClick (row, column, event) {
            this.$emit('rowClick', row, column, event)
        },
        handleLoad (tree, treeNode, resolve) {
            this.$emit('load', tree, treeNode, resolve)
        },
        replaceProp (obj, str, prehook) {
            if (prehook) {
                return prehook(obj[str.match(/[a-zA-Z0-9_]+(?=\})/)[0]], str.match(/[a-zA-Z0-9_]+(?=\})/)[0], obj)
            }
            return obj[str.match(/[a-zA-Z0-9_]+(?=\})/)[0]]
        },
        showPower (value = 0) {
            let permissions = JSON.parse(localStorage.getItem('permissions') || '{}')
            if (typeof value === 'number') {
                if (value === 0) return true;
                return permissions[value].showMenu
            }
            if (Array.isArray(value)) {
                let allPass = value.map(item => item.permission || 0).some(item => value > 0 ? permissions[item].showMenu : true)
                return allPass
            }
        },
        refresh () {
            this.loading = true
            this.$emit('refresh')
        }
    },
    watch: {
        currentPage (newVal) {
            this.page = this.currentPage
        },
        tableData () {
            this.loading = false
        },
        tableColumn () {
            this.initColumn()
        }
    }
}
</script>
<style lang="scss">
    [i="data-table"] {
        overflow: hidden;
        // 右侧操作栏fixed后, 对column的隐藏显示有几率出现操作栏对不齐的bug, 所以固定top为表头的高度
        // .el-table__fixed-right .el-table__fixed-body-wrapper {
        //     top: 36px !important;
        //     z-index: 999 !important;
        // }
        .table-header {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            float: left;
            margin-bottom: 20px;
            .table-btns {
                flex: 1;
            }
            .setting-list {
                display: flex;
                align-items: center;
                .el-divider--vertical {
                    margin-left: 20px;
                    margin-right: 0;
                }
                .setting-item {
                    width: 20px;
                    height: 20px;
                    display: flex;
                    margin: 0 20px;
                }
                i {
                    font-size: 20px;
                    cursor: pointer;
                }
            }
        }
        .avatarImg {
            width: 50px;
            height: 50px;
            border-radius: 4px;
            overflow: hidden;
        }
        .coverImg .el-image,
        .avatarImg .el-image {
            width: 100%;
            height: 100%;
        }
        .coverImg {
            width: 160px;
            height: 98px;
        }
        .table-status {
            position: relative;
            left: .6rem;
            &.success::before {
                content: '';
                width: 6px;
                height: 6px;
                position: absolute;
                left: -10px;
                top: 50%;
                transform: translateY(-50%);
                border-radius: 50%;
                background: #a3df85;
            }
            &.fail::before {
                content: '';
                width: 6px;
                height: 6px;
                position: absolute;
                left: -10px;
                top: 50%;
                transform: translateY(-50%);
                border-radius: 50%;
                background: red;
            }
        }
        .column-flex {
            display: flex;
            align-items: center;
            .prefix {
                margin-right: 4px;
            }
        }
        .operation {
            display: flex;
            flex-wrap: wrap;
            > div {
                position: relative;
                display: flex;
                align-items: center;
                padding: 0 10px;
                line-height: 1;
                &::after {
                    position: absolute;
                    content: '';
                    width: 1px;
                    height: 14px;
                    background: #dfe7ec;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                }
                &:first-child {
                    padding-left: 0;
                }
                &:last-child {
                    &::after {
                        display: none;
                    }
                }
            }
        }
    }
    .setting-menu-item {
        line-height: 35px;
        padding: 0 10px;
        i {
            margin-right: 10px;
        }
        &:first-child {
            width: 200px;
            border-bottom: 1px solid #f0f0f0;
            margin-left: -12px;
            padding-left: 20px;
            &:hover {
                cursor: pointer;
                color: #409EFF;
            }
        }
    }
</style>
