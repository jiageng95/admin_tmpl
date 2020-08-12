<template>
    <div i="count-bar">
        <div class="count-con" :style="{ height }">
            <template v-if="labelInTop">
                <div class="count-item" v-for="(item, index) in data" :key="index">
                    <span class="count-item-tit">{{item.label}}</span>
                    <span class="count-item-txt">{{item.value}}</span>
                    <slot name="bottom" :row="item"></slot>
                </div>
            </template>
            <template v-else>
                <div class="count-item" v-for="(item, index) in data" :key="index">
                    <span class="count-item-txt">{{item.value}}</span>
                    <span class="count-item-tit">{{item.label}}</span>
                    <slot name="bottom" :row="item"></slot>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import util from '@/util/util'

export default {
    name: 'count-bar',
    props: {
        data: {
            type: Array,
            default: () => []
        },
        height: {
            type: String,
            default: ''
        },
        labelInTop: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {}
    },
    created () {
        this.initData()
    },
    methods: {
        initData () {
            this.data.forEach((item, index) => {
                this.tween(index, item.value, item.toFixed)
            })
        },
        animate () {
            if (TWEEN.update()) {
                requestAnimationFrame(this.animate)
            }
        },
        tween (index, endValue, toFixed = 0) {
            var vm = this
            new TWEEN.Tween({ tweeningValue: 0 })
                .to({ tweeningValue: endValue }, 600)
                .onUpdate(function () {
                    vm.data[index].value = this.tweeningValue.toFixed(toFixed)
                })
                .start()
            this.animate()
        }
    },
    watch: {
        data: {
            handler () {
                this.initData()
            }
        }
    }
}
</script>
<style lang="scss">
    [i="count-bar"] {
        .count-con {
            display: flex;
            justify-content: space-around;
            align-items: center;
            .count-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                flex: 1;
                padding: 10px 30px;
                border-right: 1px solid #f0f2f5;
                .count-item-txt {
                    font-size: 34px;
                    color: #4c5053;
                }
                .count-item-tit {
                    font-size: 14px;
                    color: #4c5053;
                }
            }
        }
    }
</style>
