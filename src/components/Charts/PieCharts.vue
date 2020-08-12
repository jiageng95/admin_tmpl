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
            type: Array,
            default: null
        },
        name: {
            type: String,
            default: ''
        },
        annular: {
            type: Boolean,
            default: false
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
            this.chart.setOption({
                color: ['#5B8FF9', '#5AD8A6', '#6DC8EC', '#E8684A', '#5D7092'],
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                grid: {
                    left: '5%',
                    right: '5%',
                    bottom: 40
                },
                legend: {},
                series: {
                    name: this.name,
                    type: 'pie',
                    radius: this.annular ? ['40%', '70%'] : '70%',
                    avoidLabelOverlap: false,
                    label: this.annular ? {
                        show: false,
                        position: 'center'
                    } : null,
                    emphasis: this.annular ? {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    } : null,
                    data: this.data
                }
            });
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
