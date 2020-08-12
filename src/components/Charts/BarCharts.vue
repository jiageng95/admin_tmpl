<template>
    <div :style="{height: height, width: width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
export default {
    name: 'echarts',
    props: {
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '300px'
        },
        type: {
            type: String,
            default: 'row'
        },
        data: {
            type: Object,
            default: null
        }
    },
    data () {
        return {
            chart: null
        }
    },
    mounted () {
        this.chart = echarts.init(this.$el)
        this.initChart();
        window.addEventListener('resize', this.__resizeHanlder)
    },
    methods: {
        initChart () {
            let _self = this;
            this.option = {
                color: ['#5B8FF9', '#5AD8A6', '#6DC8EC', '#E8684A', '#5D7092'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                xAxis: [
                    {
                        type: 'value'
                    }
                ],
                yAxis: [
                    {
                        type: 'category',
                        data: _self.data.key,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                legend: {},
                grid: {
                    left: '10%',
                    right: '5%',
                    bottom: 40
                },
                /**
                 * {
                        name: '直接访问',
                        type: 'bar',
                        barWidth: '60%',
                        data: _self.data.value
                    }
                */
                series: _self.data.value
            }
            if (this.type !== 'row') {
                this.option.xAxis = {
                    data: _self.data.key
                }
                this.option.yAxis = {}
            }
            this.chart.setOption(_self.option, true);
        },
        __resizeHanlder () {
            if (this.chart) {
                this.chart.resize()
            }
        }
    },
    beforeDestroy () {
        if (!this.chart) {
            return
        }
        this.chart.dispose()
        this.chart = null
    },
    watch: {
        'data': {
            handler (newVal, oldVal) {
                this.data = newVal;
                this.initChart();
            },
            deep: true
        }
    }
}
</script>

<style lang="scss">

</style>
