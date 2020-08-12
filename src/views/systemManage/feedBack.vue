<template>
    <div id="consumersList">
        <div class="container">
            <Filters
                :form="searchForm"
                :filterData="filterData()"
                @confirm="changePage(1)"
            >
                <!-- <Btns slot="button" :data="btns" /> -->
            </Filters>
            <DataTable
                :showIndex="showIndex"
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
            showIndex: true,
            searchForm: {
                date: [],
                key: '',
                status: '',
                type: ''
            },
            btns: [
                {
                    label: '导出',
                    type: '',
                    permission: 89,
                    callback: this.exportList
                }
            ],
            filterData: () => ({
                'date': {
                    label: '注册时间',
                    type: 'datetimerange',
                    template: {
                        clearable: true
                    }
                },
                'key': {
                    label: '用户名/手机号',
                    type: 'input',
                    template: {
                        placeholder: '搜索用户名/手机号'
                    }
                },
                'status': {
                    label: '状态',
                    type: 'select',
                    span: 4,
					template: {
						placeholder: '请选择',
						clearable: true,
						options: this.statusList
					}
                },
                'type': {
                    label: '类型',
                    type: 'select',
                    span: 4,
					template: {
						placeholder: '请选择',
						clearable: true,
						options: this.typeList
					}
                }
            }),
            Data: [],
            tableColumn: {
                'userAvatar': {
                    label: '用户头像',
                    template: {
                        type: 'avatar',
                        fit: 'cover'
                    },
                    width: 110
                },
                'userName': {
                    label: '用户名'
                },
                'userPhone': {
                    label: '手机号'
                },
                'typeValue': {
                    label: '反馈类型'
                },
                'status': {
                    label: '状态',
                    map: ['未处理', '已处理']
                },
                'createTime': {
                    label: '反馈时间',
                    width: 170
                },
                'operation': {
                    label: '操作',
                    width: 178,
                    template: [
                        {
                            tag: 'router-link',
                            text: '详情',
                            permission: 650,
                            path: '/systemManage/feedBack/detail',
                            query: {
                                feedbackId: '',
                                _alias: 'detail'
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
                    label: '未处理',
                    value: 0
                },
                {
                    label: '已处理',
                    value: 1
                }
            ],
            typeList: [
                {
                    label: '全部',
                    value: ''
                },
                {
                    label: '产品问题',
                    value: 'PRODUCT'
                },
                {
                    label: '功能问题',
                    value: 'FUNCTION'
                },
                {
                    label: '体验问题',
                    value: 'EXPERIENCE'
                },
                {
                    label: '其他问题',
                    value: 'OTHER'
                }
            ]
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
            this.$api.feedbackListFetch(form).then(res => {
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
        }
        // exportList () {
        //     let form = this.getSearchForm();
        //     util.exportExcelFun(form, FEEDBACK_FEEDBACKEXPORT);
        // }
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
