<template>
    <div id="articleList">
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
    name: 'articleList',
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
                    permission: 510,
                    callback: () => {
                        this.$router.push('/article/articleList/edit?type=add')
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
                'articleId': {
                    label: 'ID'
                },
                'cover': {
                    label: '封面',
                    template: {
                        type: 'pic',
                        fit: 'cover'
                    },
                    width: 220
                },
                'title': {
                    label: '标题'
                },
                'categoryName': {
                    label: '分类'
                },
                'createTime': {
                    label: '创建时间'
                },
                'operation': {
                    label: '操作',
                    width: 178,
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
                            permission: 511,
                            confirm: this.handleDel
                        },
                        {
                            tag: 'router-link',
                            text: '编辑',
                            permission: 512,
                            path: '/article/articleList/edit',
                            query: {
                                articleId: '',
                                type: 'edit'
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
            this.$api.articleListFetch(form).then(res => {
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
        handleDel ({ articleId }) {
            let data = { articleId }
            this.$api.articleDelFetch(data).then(res => {
                this.$message.success('删除成功')
                this.getList()
            });
        },
        async handleUpdateStatus (row, index) {
            let { articleId, onlineStatus, sort } = row;
            if (onlineStatus) {
                await this.$confirm('确定是否下线?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
            }
            this.$api.bannerUpdateOnlineStatusFetch({ sort, articleId, onlineStatus: !onlineStatus }).then(res => {
                this.$message.success(`${onlineStatus ? '下线' : '上线'}成功`)
                this.getList()
            });
        },
        // 排序
        handleSort (row, index) {
            let data = {
                sort: row.sort,
                articleId: row.articleId,
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
