<template>
    <div i="btns" :style="{justifyContent: justify}">
        <template v-for="(item, index) in data">
            <el-upload
                class="upload"
                :key="index"
                v-if="item.upload && item.show !== false"
                v-permission="item.permission"
                ref="uploadForm"
                :action="item.action || uploadURL"
                :data="uploadData"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                :show-file-list="false"
                :before-upload="beforeUpload"
                :on-success="item.callback"
            >
                <el-button
                    :icon="item.icon"
                    :type="item.type === '' ? '' : (item.type || 'primary')"
                    size="mini">
                    {{item.label}}
                </el-button>
            </el-upload>
            <el-button
                :key="index"
                v-if="!item.upload && item.show !== false"
                v-permission="item.permission"
                :icon="item.icon | btnIcon"
                :type="item.type === '' ? '' : (item.type || 'primary')"
                plain
                size="mini"
                @click.native="item.callback">
                {{item.label}}
            </el-button>
        </template>
    </div>
</template>

<script>
import util from '@/util/util';

export default {
    name: 'Btns',
    props: {
        data: {
            type: Array,
            default: () => []
        },
        justify: {
            type: String,
            default: 'flex-end'
        }
    },
    data () {
        return {
            uploadURL: '',
            uploadData: {}
        }
    },
    filters: {
        btnIcon (val) {
            let iconMap = {
                add: 'el-icon-plus',
                download: 'el-icon-download',
                export: 'el-icon-upload2'
            }
            return iconMap[val] || val
        }
    },
    methods: {
        init () {
            this.uploadURL = util.uploadURL() || ''
            this.uploadData = {
                type: 2
            }
        },
        beforeUpload (file) {
            return util.beforeUpload(this.$refs['uploadForm']);
        },
        uploadSuccess (...values) {
            this.$emit('uploadSuccess', values)
        }
    }
}
</script>

<style lang="scss">
    [i="btns"] {
        flex: 1;
        display: flex;
        overflow: hidden;
        > * {
            margin-left: 10px;
            &:first-child {
                margin-left: 0;
            }
        }
        .el-button--primary.is-plain {
            border: none;
        }
        button {
            padding: 8px 16px;
        }
        .export-btn {
            float: left;
            margin-left: 20px;
            background: #4F92EA;
            border-color: #4F92EA;
            color: #fff;
            &:hover {
                background: #4F92EA;
                border-color: #4F92EA;
                color: #fff;
                opacity: .8;
            }
        }
        .add-btn {
            float: left;
        }
        .table-right {
            height: 40px;
            line-height: 40px;
            float: right;
        }
    };
</style>
