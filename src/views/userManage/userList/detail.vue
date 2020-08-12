<template>
    <div class="common-detail" id="userDetail">
        <div class="container">
            <div class="title">基础信息</div>
            <info-table :sideData="sideData" :data="infoTable"></info-table>
        </div>
    </div>
</template>

<script>
import util from '@/util/util';

export default {
    name: 'userDetail',
    data () {
        return {
            sideData: {
                url: '',
                name: ''
            },
            detailData: {},
            infoTable: []
        }
    },
    computed: {
        userId () {
            return this.$route.query.userId
        }
    },
    methods: {
        init () {
            this.getDetail();
        },
        getDetail () {
            this.$api.userDetailFetch({ userId: this.userId }).then(({ data }) => {
                let infoTableCols = {
                    'userId': '用户ID',
                    'mobile': '手机号',
                    'createTime': '注册时间',
                    'statusValue': '状态'
                };
                let infoTable = [];
                Object.keys(infoTableCols).forEach(item => {
                    let infoValue = data[item];
                    switch (item) {
                        case 'sex':
                            infoValue = this.sex(infoValue);
                            break;
                    }
                    infoTable.push({ label: infoTableCols[item], value: infoValue });
                });
                this.infoTable = infoTable;
                let { nickname, portrait } = data;
                Object.assign(this.sideData, {
                    name: nickname,
                    url: portrait
                });
                this.detailData = data
            });
        }
    }
}
</script>

<style lang="scss">
#userDetail {
    .row-flex {
        > div {
            height: 65px;
        }
    }
}
</style>
