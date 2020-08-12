import commonDialog from './index.vue';

const dialog = {
    install: function (Vue) {
        Vue.component('CommonDialog', commonDialog)
    }
}

export default dialog;
