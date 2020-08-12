<template>
    <div id="dashboard">
        <div class="dashboard-con">
            <el-card class="card-item" header="统计" shadow="never">
                <count-bar :data="countData" v-if="countData.length" />
            </el-card>
            <el-row :gutter="20">
                <el-col :span="16">
                    <el-card class="card-item" shadow="never">
                        <div slot="header" class="clearfix">
                            <span class="card-header-tit">访问量</span>
                        </div>
                        <area-charts :data="chartsData" />
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card class="card-item" shadow="never">
                        <div slot="header" class="clearfix">
                            <span class="card-header-tit">性别比例</span>
                        </div>
                        <pie-charts :data="pieChartsData" name="性别比例" />
                    </el-card>
                </el-col>
            </el-row>
            <el-card class="card-item" header="销售额" shadow="never">
                <bar-charts :data="barChartsData" type="column" />
            </el-card>
        </div>
    </div>
</template>

<script>
import util from '@/util/util'
export default {
    name: 'dashboard',
    data () {
        return {
            state: 1,
            countData: [],
            chartsData: {},
            pieChartsData: [],
            barChartsData: {}
        }
    },
    methods: {
        init () {
            this.getUserNewly()
            this.getVisitUserCount()
        },
        // 个人用户注册量
        getUserNewly () {
            this.$api.userUserNewlyFetch().then(res => {
                let data = res.data
                this.chartsData = {
                    key: data.map(item => item.day),
                    value: [
                        {
                            name: '每天新增用户数',
                            type: 'line',
                            data: [332, 454, 657, 333, 123, 534, 988]
                        }
                    ],
                    legend: {
                        data: ['每天新增用户数']
                    }
                }
                this.pieChartsData = [
                    { name: '女', value: 3004 },
                    { name: '男', value: 4004 }
                ]
                this.barChartsData = {
                    key: data.map(item => item.day),
                    value: [
                        {
                            name: '每天新增销售额',
                            type: 'bar',
                            barWidth: '30%',
                            data: [332, 454, 657, 333, 123, 534, 899]
                        }
                    ]
                }
            })
        },
        // 用户总数
        getVisitUserCount () {
            this.$api.userCountFetch().then(res => {
                this.countData = [
                    { label: '用户总数', value: 2333 },
                    { label: '每日新增用户数', value: 333 },
                    { label: '销售收入', value: 4343 },
                    { label: '每日新增销售额', value: 343 }
                ]
            })
        }
    }
}
</script>

<style lang="scss">
#dashboard {
    .dashboard-con {
        margin: 0 20px;
    }
    .card-item {
        margin-bottom: 20px;
        .header-col {
            display: flex;
        }
        .flex-end {
            justify-content: flex-end;
        }
        .mr15 {
            margin-right: 15px;
        }
        .arrow-icon {
            &-top {
                color: #67c23a;
                margin-left: 10px;
            }
            &-bottom {
                color: #FF4400;
                margin-left: 10px;
            }
        }
        .el-card__header {
            font-size: 16px;
            font-weight: 800;
            padding: 14px 18px;
            .el-row--flex.is-justify-space-between {
                align-items: center;
            }
        }
        .card-item-header {
            position: relative;
            &::before {
                content: '';
                display: block;
                width: 4px;
                height: 20px;
                position: absolute;
                top: 50%;
                left: -18px;
                transform: translateY(-50%);
                background: #409eff;
            }

        }
    }
}
</style>
