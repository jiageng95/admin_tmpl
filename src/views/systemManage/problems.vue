<template>
    <div id="consumersList">
        <div class="container">
            <Filters
                :form="searchForm"
                :filterData="filterData()"
                @confirm="changePage(1)"
            >
                <Btns slot="button" :data="btns" />
            </Filters>
            <DataTable
                showPage
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
    name: 'consumersList',
    data () {
        return {
            searchForm: {
                date: [],
                title: ''
            },
            btns: [
                {
                    label: '新增',
                    icon: 'el-icon-plus',
                    permission: 640,
                    callback: () => {
                        this.$router.push('/systemManage/problems/edit?_alias=add')
                    }
                }
            ],
            filterData: () => ({
                'date': {
                    label: '发布时间',
                    type: 'datetimerange',
                    template: {
                        clearable: true
                    }
                },
                'title': {
                    label: '标题名称',
                    type: 'input',
                    template: {
                        placeholder: '搜索标题名称'
                    }
                }
            }),
            Data: [],
            tableColumn: {
                'title': {
                    label: '标题'
                },
                'createTime': {
                    label: '发布时间'
                },
                'operation': {
                    label: '操作',
                    width: 178,
                    template: [
                        {
                            tag: 'a',
                            text: '删除',
                            permission: 642,
                            confirm: (row) => this.handleDel(row)
                        },
                        {
                            tag: 'router-link',
                            text: '编辑',
                            path: '/systemManage/problems/edit',
                            permission: 641,
                            query: {
                                questionId: '',
                                _alias: 'edit'
                            }
                        }
                    ]
                }
            },
            currentPage: 1,
            total: 1,
            size: 10
        }
    },
    methods: {
        init () {
            this.getList()
        },
        getSearchForm () {
            let { searchForm, currentPage, size } = this;
            let form = Object.assign({ page: currentPage, size }, searchForm);
            let [ startTime, endTime ] = util.formatDate(form.date)
            Object.assign(form, {
                startTime,
                endTime
            });
            delete form.date
            return form;
        },
        getList () {
            let form = this.getSearchForm();
            this.$api.questionListFetch(form).then(res => {
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
        handleDel (row) {
            let params = {
                questionId: row.questionId
            }
            this.$api.questionDelFetch(params).then(res => {
                this.$message.success('删除成功')
                this.getList()
            });
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
