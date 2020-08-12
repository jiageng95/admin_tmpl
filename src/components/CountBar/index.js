import commonCountBar from './index.vue';

const CountBar = {
    install: function (Vue) {
        Vue.component('CountBar', commonCountBar)
    }
}

export default CountBar;
