<template>
    <div id="articleBanner">
        <div class="container">
            <!-- <Filters
                :form="searchForm"
                :filterData="filterData()"
                @confirm="changePage(1)"
            >
                <Btns slot="button" :data="btns" />
            </Filters> -->
            <!-- <Btns :data="btns" class="mb20" /> -->
            <DataTable
                showPage
                :btns="btns"
                :tableData="Data"
                :tableColumn="tableColumn"
                :total="total"
                :pageSize="size"
                :currentPage="currentPage"
                @changePage="changePage"
            />
        </div>
    </div>
</template>

<script>
import util from '@/util/util';

export default {
    name: 'articleBanner',
    data () {
        return {
            // searchForm: {
            //     name: '',
            //     onlineStatus: ''
            // },
            btns: [
                {
                    label: '新增',
                    icon: 'el-icon-plus',
                    permission: 500,
                    callback: () => {
                        this.$router.push('/article/banner/edit?type=add')
                    }
                }
            ],
            // filterData: () => ({
            //     'name': {
            //         label: '标题名称',
            //         type: 'input',
            //         template: {
            //             placeholder: '搜索标题名称'
            //         }
            //     },
            //     'onlineStatus': {
            //         label: '状态',
            //         type: 'select',
            //         span: 4,
			// 		template: {
			// 			placeholder: '请选择',
			// 			clearable: true,
			// 			options: this.statusList
			// 		}
            //     }
            // }),
            Data: [],
            tableColumn: {
                'banner': {
                    label: '图片',
                    template: {
                        type: 'pic',
                        fit: 'cover'
                    },
                    width: 220
                },
                'type': {
                    label: '链接类型',
                    map: {
                        'ARTICLE': '文章顶部',
                        'INDEX': '首页顶部'
                    }
                },
                'operation': {
                    label: '操作',
                    width: 200,
                    template: [
                        // {
                        //     tag: 'a',
                        //     prop: 'onlineStatus',
                        //     flag: true,
                        //     actText: '下线',
                        //     inactText: '上线',
                        //     confirm: this.handleUpdateStatus
                        // },
                        {
                            tag: 'a',
                            text: '删除',
                            permission: 501,
                            confirm: (row) => this.handleDel(row)
                        },
                        {
                            tag: 'router-link',
                            text: '编辑',
                            permission: 502,
                            path: '/article/banner/edit',
                            query: {
                                bannerId: '',
                                editType: 'edit'
                            }
                        }
                    ]
                }
            },
            currentPage: 1,
            total: 1,
            size: 10,
            statusList: [
                {
                    label: '全部',
                    value: ''
                },
                {
                    label: '下线',
                    value: false
                },
                {
                    label: '上线',
                    value: true
                }
            ]
        }
    },
    methods: {
        init () {
            this.getList()
        },
        getSearchForm () {
            // let { searchForm, currentPage, size } = this;
            // let form = Object.assign({ page: currentPage, size }, searchForm);
            // let [ startTime, endTime ] = util.formatDate(form.date)
            // Object.assign(form, {
            //     startTime,
            //     endTime
            // });
            // delete form.date
            let { currentPage, size } = this;
            let form = { page: currentPage, size }
            return form;
        },
        getList () {
            let form = this.getSearchForm();
            this.$api.bannerArticleListFetch(form).then(res => {
                this.Data = res.data.records;
                this.total = res.data.total;
                if (!this.Data.length && this.currentPage > 1) {
                    --this.currentPage
                    this.getList()
                }
            });
        },
        changePage (val) {
            this.currentPage = val;
            this.getList();
        },
        handleDel ({ bannerId, type }) {
            let data = { bannerId, type }
            this.$api.bannerArticleDelFetch(data).then(res => {
                this.$message.success('删除成功')
                this.getList()
            });
        },
        async handleUpdateStatus (row, index) {
            let { bannerId, onlineStatus, sort } = row;
            if (onlineStatus) {
                await this.$confirm('确定是否下线?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
            }
            this.$api.bannerUpdateOnlineStatusFetch({ sort, bannerId, onlineStatus: !onlineStatus }).then(res => {
                this.$message.success(`${onlineStatus ? '下线' : '上线'}成功`)
                this.getList()
            });
        },
        // 排序
        handleSort (row, index) {
            let data = {
                sort: row.sort,
                bannerId: row.bannerId,
                onlineStatus: row.onlineStatus
            }
            this.$api.bannerUpdateSortFetch(data).then(res => {
                this.$message.success('保存成功')
                this.getList()
            })
        }
    }
}
</script>

<style lang="scss">
#consumersList {
    .avatarImg {
        width: 80px;
        height: 80px;
    }
}
</style>
