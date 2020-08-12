import commonDragTable from './index.vue';

const DragTable = {
    install: function (Vue) {
        Vue.component('DragTable', commonDragTable)
    }
}

export default DragTable;
