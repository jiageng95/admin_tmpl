<template>
    <div i="upload">
        <el-upload
            class="wrap common-upload"
            :class="{'disabled': disabled || imageList.length >= limit }"
            ref="uploadForm"
            :disabled="disabled"
            :accept="accept"
            :multiple="multiple"
            :limit="limit"
            :auto-upload="autoUpload"
            :action="uploadApi"
            :data="uploadData"
            :show-file-list="false"
            :file-list="defaultList"
            :on-preview="uploadPreview"
            :on-remove="uploadRemove"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :on-change="uploadChange"
            :before-upload="beforeUpload"
            v-show="imageList.length < limit">
            <div class="el-icon-box">
                <i class="el-icon-plus common-uploader-icon" />
            </div>
        </el-upload>
        <div class="upload-pics" v-if="defaultList.length">
            <div class="pic-item" v-for="(item, index) in defaultList" :key="index">
                <div class="pic-mask"></div>
                <i class="el-icon-delete" @click="removePic(index)"></i>
                <i class="el-icon-search" @click="uploadPreview(item.url)"></i>
                <img :src="item.url" />
            </div>
        </div>
        <slot name="tip" />

        <CommonDialog
            title="预览"
            :visible="previewDialog.visible"
            :rows="previewDialog.rows"
            :form="previewDialog.form"
            :labelWidth="0"
            @hideDialog="previewDialog.visible = false"
            @confirm="previewDialog.visible = false">
            <img slot="imgUrl" width="100%" :src="previewDialog.form.imgUrl" alt="">
        </CommonDialog>
    </div>
</template>
<script>
import util from '@/util/util'
export default {
    name: 'upload',
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        accept: {
            type: String,
            default: 'image/*'
        },
        multiple: {
            type: Boolean,
            default: false
        },
        limit: {
            type: Number,
            default: null
        },
        autoUpload: {
            type: Boolean,
            default: true
        },
        defaultList: {
            type: Array,
            default: () => []
        },
        maxSize: {
            type: Number,
            default: 2
        },
        type: {
            type: Number,
            default: 1
        }
    },
    data () {
        return {
            uploadApi: '',
            uploadData: {},
            imageList: this.defaultList,
            previewDialog: {
                visible: false,
                form: {
                    imgUrl: ''
                },
                rows: {
                    'imgUrl': {
                        slot: true
                    }
                }
            }
        }
    },
    watch: {
        defaultList (newVal) {
            this.imageList = newVal;
        }
    },
    mounted () {
        this.init();
    },
    methods: {
        init () {
            this.uploadApi = util.uploadURL()
            this.uploadData = {
                type: this.type
            }
        },
        // 上传文件前
        beforeUpload (file) {
            return util.beforeUpload(this.$refs['uploadForm']);
        },
        // 上传文件成功
        uploadSuccess (res, file, fileList) {
            if (res.code === 0) {
                let { accessUrl } = res.data;
                this.$emit('success', accessUrl)
            } else {
                this.uploadError(res, file, fileList)
            }
        },
        // 上传文件失败
        uploadError (err, file, fileList) {
            this.$message.error(err.msg);
            this.$refs.uploadForm.uploadFiles = fileList.slice(0, fileList.length - 1);
            this.$emit('error', err, file, fileList)
        },
        // 改变图片
        uploadChange (file, fileList) {
            if (file.status === 'success') return;
            const isLimit = file.raw.size / 1024 / 1024 < this.maxSize;
            if (!isLimit) {
                this.$message.error(`图片大小不能超过 ${this.maxSize}MB`);
                return false;
            }
            this.$emit('change', file, fileList)
        },
        uploadPreview (imgUrl) {
            let suffix = imgUrl.substring(imgUrl.lastIndexOf('.') + 1, imgUrl.length).toLowerCase();
            let acceptFormats = ['png', 'jpg', 'jpeg', 'gif'];
            if (!acceptFormats.includes(suffix)) {
                window.open(imgUrl);
                return;
            };
            Object.assign(this.previewDialog, {
                visible: true,
                form: {
                    imgUrl
                }
            });
            this.$emit('preview', imgUrl)
        },
        removePic (index) {
            this.defaultList.splice(index, 1)
        },
        uploadRemove (file, fileList) {
            this.$emit('remove', file, fileList)
        }
    }
}
</script>
<style lang="scss">
    [i="upload"] {
        .common-upload {
            display: flex;
            .el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }
            .el-upload:hover {
                border-color: #409EFF;
            }
        }
        &.btn {
            .el-upload-list {
                display: block;
            }
        }
        .el-upload-list {
            display: inline-flex;
            flex-wrap: wrap;
        }
        .disabled {
            .el-upload--btn,
            .el-upload--picture-card {
                display: none;
            }
        }
        .tip {
            color: #adb3b8;
            font-size: 12px;
            line-height: 1;
            word-break: keep-all;
            margin-top: 10px;
        }
        .upload-pics {
            display: flex;
            flex-wrap: wrap;
            .pic-item {
                width: 120px;
                height: 120px;
                border-radius: 6px;
                margin-right: 10px;
                margin-top: 10px;
                overflow: hidden;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                top: 0;
                transition: top .2s linear;
                i {
                    width: 25px;
                    height: 25px;
                    display: block;
                    margin-right: 10px;
                    position: relative;
                    z-index: 1;
                    line-height: 25px;
                    text-align: center;
                    font-size: 18px;
                    color: #fff;
                    opacity: 0;
                    transition: all .2s linear;
                    &:hover {
                        font-size: 20px;
                    }
                    &:last-of-type {
                        margin: 0;
                    }
                }
                img {
                    width: 100%;
                    height: 100%;
                    display: block;
                    object-fit: cover;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 0;
                }
                &:hover {
                    top: -3px;
                    i {
                        // display: block;
                        opacity: 1;
                    }
                    .pic-mask {
                        opacity: 1;
                    }
                }
                .pic-mask {
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, .4);
                    opacity: 0;
                    transition: opacity .3s;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 1;
                }
            }
        }
    }
</style>
