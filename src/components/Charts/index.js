import commonAreaCharts from './AreaCharts.vue';
import commonPieCharts from './PieCharts.vue';
import commonBarCharts from './BarCharts.vue';
import commonCharts from './Echarts.vue';

const Charts = {
    install: function (Vue) {
        Vue.component('AreaCharts', commonAreaCharts)
        Vue.component('PieCharts', commonPieCharts)
        Vue.component('BarCharts', commonBarCharts)
        Vue.component('Charts', commonCharts)
    }
}

export default Charts;
