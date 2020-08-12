<template>
    <div class="feedback-detail">
        <div class="feedback-container">
            <!-- 基础信息 -->
            <div class="info-title">
                <span class="line"></span>
               <span class="title">基础信息</span>
            </div>
            <!-- 会员基本信息 -->
            <div class="basic-info">
                <ul class="info-data">
                    <li class="one-item">
                        <img :src="detailInfo.userAvatar" alt="">
                        <div class="name">{{detailInfo.userName}}</div>
                    </li>
                    <li class="item">
                        <ul class="all-every">
                            <li class="is-every">用户ID</li>
                            <li class="is-every">反馈类型</li>
                        </ul>
                    </li>
                    <li class="item-is">
                         <ul class="all-every">
                            <li class="is-every">{{detailInfo.userId}}</li>
                            <li class="is-every">{{detailInfo.typeValue}}</li>
                        </ul>
                    </li>
                    <li class="item">
                         <ul class="all-every">
                            <li class="is-every">手机号</li>
                            <li class="is-every">反馈时间</li>
                        </ul>
                    </li>
                    <li class="item-is">
                         <ul class="all-every">
                            <li class="is-every">{{detailInfo.userPhone || '-'}}</li>
                            <li class="is-every">{{detailInfo.createTime}}</li>
                        </ul>
                    </li>
                </ul>
            </div>
            <!-- 反馈内容 -->
            <div class="feedback-content">
                <div class="content-left">反馈内容</div>
                <div class="content-right">
                    <div class="content">{{detailInfo.feedbackContent}}</div>
                    <template v-for="(item, index) in detailInfo.feedbackPic">
                        <div class="content-img" :style="`background-image: url(${item})`" @click="amplification(item)" :key="index">
                        </div>
                    </template>
                </div>
            </div>
            <!-- 处理编辑 -->
             <div class="info-title">
                <span class="line"></span>
               <span class="title">处理编辑</span>
            </div>
            <div class="information">
                <el-form :label-position="labelPosition" label-width="80px" class="remark-form">
                    <el-form-item label="备注">
                        <el-input
                            type="textarea"
                            resize="none"
                            :autosize="{minRows:5}"
                            v-model="detailInfo.remark"
                            placeholder="请输入备注信息(不超过80字)"
                            maxlength="80">
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <el-button v-permission="651" type="primary" class="submit-btn" :loading="isSubmit" :disabled="isSubmit" @click="updateRemark">保存</el-button>
            <!-- 放大图片 -->
            <div class="bigBg"
                @click="hideSale"
                v-show="showScaleImg">
                <div class="imgBox">
                    <img :src="imgurl" class="imgBox-img" alt="" >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import util from '@/util/util'
export default {
    data () {
        return {
            title: '详情',
            showScaleImg: false, // 放大图片
            labelPosition: 'right',
            detailInfo: { remark: '' }, // 详情信息
            imgurl: '',
            typeList: {
                'PRODUCT': '产品问题',
                'FUNCTION': '功能问题',
                'EXPERIENCE': '体验问题',
                'OTHER': '其他问题'
            },
            isSubmit: false
        }
    },
    computed: {
        feedbackId () {
            return this.$route.query.feedbackId
        }
    },
    mounted () {

    },
    methods: {
        // 初始化
        init () {
            this.getCommentDetail();
        },
        // 获取意见反馈详情
        getCommentDetail () {
            let data = {
                feedbackId: this.feedbackId
            }
            this.$api.feedbackDetailFetch(data).then(res => {
                this.detailInfo = res.data
                this.detailInfo.feedbackPic = (this.detailInfo.feedbackPic && this.detailInfo.feedbackPic.split(','))
            }).catch()
        },
        goBack () {
            this.$router.back()
        },
        // 上传备注信息
        updateRemark () {
            this.isSubmit = true
            let data = {
                feedbackId: this.feedbackId,
                remark: this.detailInfo.remark
            }
            this.$api.feedbackHandleFetch(data).then(res => {
                this.isSubmit = false
                this.$message.success('保存成功');
                this.goBack()
            }).catch(() => {
                this.isSubmit = false
            })
        },
        // 放大图片
        amplification (imgUrl) {
            this.showScaleImg = !this.showScaleImg
            this.imgurl = imgUrl
        },
        // 隐藏图片
        hideSale () {
            this.showScaleImg = false;
        }
    }
}
</script>

<style >

</style>
