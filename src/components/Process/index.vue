<template>
    <div i="process">
        <svg :width="width" :height="width" class="svg">
            <circle class="process" :cx="r" :cy="r" :r="r" fill="#EDF1FB" />
            <circle class="process stroke" :cx="r" :cy="r" :r="r - 5" stroke="#4D74D5" stroke-width="8" fill="none" :stroke-dashoffset="process" :stroke-dasharray="finish" />
            <circle class="process" :cx="r" :cy="r" :r="r - 9" fill="#fff" />
        </svg>
    </div>
</template>

<script>
import util from '@/util/util';

export default {
    name: 'Process',
    props: {
        r: {
            type: Number,
            default: 17
        },
        count: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            process: 0
        }
    },
    computed: {
        width () {
            return this.r * 2
        },
        d () {
            return (this.r - 5) * 2
        },
        finish () {
            return this.d * Math.PI
        }
    },
    created () {
        this.process = this.finish
    },
    methods: {
        init () {
            let percent = 1 - (this.count / 100)
            this.process = percent * this.finish
        }
    },
    watch: {
        count () {
            this.init()
        }
    }
}
</script>

<style lang="scss">
    [i="process"] {
        display: flex;
        align-items: center;
        svg {
            transform: rotate(90deg) rotateY(180deg);
            &:hover {
                cursor: pointer;
                .stroke {
                    stroke: #5384ff;
                }
            }
        }
        .process {
            transition: stroke-dashoffset .5s linear;
        }
    };
</style>
