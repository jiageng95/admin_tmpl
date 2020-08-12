<template>
    <div class="common-detail log-detail">
        <div class="container">
            <div class="detail-con">
                <div class="detail-item">
                    <div class="item-label">所在模块：</div>
                    <div class="item-value">{{detailData.moduleName}}</div>
                </div>
                <!-- <div class="detail-item">
                    <div class="item-label">操作类型：</div>
                    <div class="item-value">{{detailData.type}}</div>
                </div> -->
                <div class="detail-item">
                    <div class="item-label">IP：</div>
                    <div class="item-value">{{detailData.ip}}</div>
                </div>
                <div class="detail-item">
                    <div class="item-label">用户：</div>
                    <div class="item-value">{{detailData.userName}}</div>
                </div>
                <div class="detail-item">
                    <div class="item-label">创建时间</div>
                    <div class="item-value">{{detailData.loginTime}}</div>
                </div>
                <div class="detail-item">
                    <div class="item-label">操作：</div>
                    <div class="item-value">{{detailData.operation}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'log-detail',
    data () {
        return {
            detailData: {}
        }
    },
    computed: {
        id () {
            return this.$route.query.id
        }
    },
    mounted () {
    },
    methods: {
        init () {
            this.getLogDetail()
        },
        getLogDetail () {
            let data = {
                id: this.id
            }
            this.$api.systemLoginLogDetailFetch(data).then(res => {
                this.detailData = res.data
            })
        }
    }
}
</script>

<style>

</style>
