<template>
    <div :style="{height: height, width: width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
export default {
    name: 'echarts',
    props: {
        el: {
            type: String,
            default: 'echart'
        },
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '300px'
        },
        option: {
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
        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption(this.option || {});
        window.addEventListener('resize', this.__resizeHanlder)
    },
    methods: {
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
        'option': {
            handler (newVal, oldVal) {
                this.chart.setOption(newVal || {});
            },
            deep: true
        }
    }
}
</script>

<style lang="scss">

</style>
