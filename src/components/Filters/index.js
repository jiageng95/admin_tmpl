import CommonFilters from './index.vue';

const Filters = {
    install: function (Vue) {
        Vue.component('Filters', CommonFilters)
    }
}

export default Filters;
