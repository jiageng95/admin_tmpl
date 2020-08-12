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
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: _self.data.key
                },
                yAxis: {
                    type: 'value'
                },
                legend: {},
                grid: {
                    left: '5%',
                    right: '5%',
                    bottom: 40
                },
                series: _self.data.value
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
