<template>
    <div id="app" class="app-wrapper">
        <router-view v-if="noBar" class="main"/>
        <template v-if="!noBar">
            <Sidebar class="sidebar-container" />
            <div class="main-container" :class="{fold: isFold}">
                <Header />
                <transition class="main-content" name="fade-transform" mode="out-in">
                    <keep-alive :max="1">
                        <router-view class="right-side" v-if="$route.meta.keepAlive"/>
                    </keep-alive>
                </transition>
                <transition class="main-content" name="fade-transform" mode="out-in">
                    <router-view class="right-side" v-if="!$route.meta.keepAlive"/>
                </transition>
            </div>
        </template>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'App',
    data () {
        return {
            noBar: false,
            timer: null
        };
    },
    computed: {
        ...mapGetters(['isFold'])
    },
    methods: {
        init () {
        }
    },
    watch: {
        $route: function (oVal, nVal) {
            this.noBar = oVal.path === '/login' || oVal.path === '/error';
        }
    }
};
</script>

<style lang="scss">
html {
    background: #f0f2f5;
}
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    max-width: 100%;
    min-width: 1200px;
    height: 100%;
    &::after {
        content: "";
        display: block;
        clear: both;
    }
}
/*fade-transform*/
.fade-transform-leave-active,
.fade-transform-enter-active {
    transition: all 0.2s linear;
}
.fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
}
.fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
