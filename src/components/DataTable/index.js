import commonTable from './index.vue';

const DataTable = {
    install: function (Vue) {
        Vue.component('DataTable', commonTable)
    }
}

export default DataTable;
