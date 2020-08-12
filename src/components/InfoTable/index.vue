<template>
    <div i="info-table">
        <el-row class="row-container">
            <el-col :span="6" class="col-left" v-if="sideData">
                <el-image
                    class="row-item-pic"
                    :style="{width: sideData.width || '140px', height: sideData.height || '100px'}"
                    :src="sideData.url"
                    :preview-src-list="[sideData.url]">
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
                <span>{{sideData.name}}</span>
            </el-col>
            <el-col :span="9">
                <template v-for="(item, index) in data">
                    <el-row class="row-flex" :key="index" v-if="index % 2 === 0">
                        <el-col :span="6">{{item.label}}</el-col>
                        <el-col :span="18">{{item.value}}</el-col>
                    </el-row>
                </template>
            </el-col>
            <el-col :span="9">
                <template v-for="(item, index) in data">
                    <el-row class="row-flex" :key="index" v-if="index % 2 === 1">
                        <el-col :span="6">{{item.label}}</el-col>
                        <el-col :span="18">{{item.value}}</el-col>
                    </el-row>
                </template>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name: 'datatable',
    props: {
        data: {
            type: Array,
            default: () => []
        },
        sideData: {
            type: Object,
            default: () => {}
        }
    },
    data () {
        return {

        }
    },
    methods: {

    }
}
</script>
<style lang="scss">
    [i="info-table"] {
        margin-bottom: 48px;
        .row-container {
            display: flex;
        }
        .col-left {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            border: 1px solid #eee;
            background: #f9fafc;
            .row-item-pic {
                // width: 200px;
                // height: 160px;
                image {
                    object-fit: cover;
                }
                .image-slot {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 30px;
                    background: #f5f7fa;
                }
            }
            // img {
            //     display: block;
            //     object-fit: cover;
            // }
            span {
                display: block;
                line-height: 2;
            }
        }
        .row-flex {
            > div {
                border: 1px solid #eee;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 48px;
                padding: 10px;
                &:first-child {
                    background: #f9fafc
                }
            }
        }
    }
</style>
