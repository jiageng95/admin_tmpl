import commonProcess from './index.vue';

const Process = {
    install: function (Vue) {
        Vue.component('lc-process', commonProcess)
    }
}

export default Process;
