<template>
    <div i="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item, index) in path" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-page-header class="breadcrumb-title" @back="goBack" :content="curPageTitle"></el-page-header>
        <slot></slot>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Breadcrumb',
    props: ['title'],
    computed: {
        ...mapGetters(['breadCrumb']),
        path () {
            return this.breadCrumb.split('/')
        },
        curPageTitle () {
            return this.breadCrumb.split('/').pop()
        }
    },
    methods: {
        goBack () {
            this.$router.back()
        }
    }
}
</script>

<style lang="scss">
[i="breadcrumb"] {
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    background: #fff;
    margin-bottom: 20px;
    .el-breadcrumb {
        font-size: 12px;
        color: #333;
        padding-top: 15px;
    }
    .breadcrumb-title {
        font-size: 18px;
        color: #333;
        font-weight: 800;
        line-height: 60px;
    }
    .el-tabs__header {
        margin: 0;
    }
}
</style>
