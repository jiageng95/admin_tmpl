<template>
    <div class="header">
        <img src="@/assets/images/menu.png" class="fold-btn" :class="{fold: !isFold}" @click="toggleHandle" />
        <div class="header-right">
            <el-tag size="medium">{{new Date().toLocaleString()}}</el-tag>
            <el-popover
            width="300"
            popper-class="message-popper"
            placement="bottom-end"
            trigger="click">
                <div class="header-right-item" slot="reference">
                    <el-badge :value="12" class="item">
                        <i class="el-icon-bell"></i>
                    </el-badge>
                </div>
                <h4 class="popper-tit">消息通知</h4>
                <div class="message-box">
                    <div class="message-item">
                        <div class="message-item-header">
                            <p class="message-tit">任务名称1111</p>
                            <el-tag>标签一</el-tag>
                        </div>
                        <span class="message-date">2020-12-12 13:59:59</span>
                    </div>
                    <div class="message-item">
                        <div class="message-item-header">
                            <p class="message-tit">任务名称1111</p>
                            <el-tag>标签一</el-tag>
                        </div>
                        <span class="message-date">2020-12-12 13:59:59</span>
                    </div>
                    <div class="message-item">
                        <div class="message-item-header">
                            <p class="message-tit">任务名称1111</p>
                            <el-tag>标签一</el-tag>
                        </div>
                        <span class="message-date">2020-12-12 13:59:59</span>
                    </div>
                </div>
                <div class="popper-footer">
                    <div class="popper-btn">清空</div>
                    <div class="popper-btn">查看更多</div>
                </div>
            </el-popover>
            <el-dropdown placement="bottom" size="medium">
                <router-link to="/systemManage/userInfo" tag="a" class="user-name">
                    <span>{{userInfo.roleName ? `[ ${userInfo.roleName} ]` : ''}} {{userInfo.userName || '未知'}}</span>
                    <i class="el-icon-caret-bottom menu-more"></i>
                </router-link>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-user" @click.native="goUserInfo">个人信息</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-switch-button" @click.native="beforeExit" divided>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import util from '@/util/util'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            curIndex: -1,
            userInfo: {},
            isFold: false
        }
    },
    created () {
        this.init()
    },
    computed: {
        ...mapGetters(['pendingCount'])
    },
    methods: {
        // 初始化
        init () {
            this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
        },
        toggleHandle () {
            this.isFold = !this.isFold
            this.$store.commit('toggleSideBar', this.isFold)
        },
        goUserInfo () {
            this.$router.push('/systemManage/userInfo')
        },
        // 退出前
        beforeExit () {
            this.$confirm('是否退出登录？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '退出成功!'
                });
                util.clearStorage();
                this.$router.push('/login');
            }).catch(() => {
            });
        }
    },
    watch: {
        '$route': function () {
            this.init();
        }
    }
}
</script>

<style lang="scss">
    .popper-tit {
        padding: 12px 18px;
        border-bottom: 1px solid #f0f2f5;
    }
    .message-box {
        .message-item {
            padding: 12px 18px;
            display: flex;
            flex-direction: column;
            border-bottom: 1px solid #f0f2f5;
            cursor: pointer;
            &:hover {
                background: #f0f2f5;
            }
            &:last-child {
                border-bottom: none;
            }
            .message-item-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 6px;
                .message-tit {
                    width: 200px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
            }
            .message-date {
                font-size: 12px;
                color: #ccc;
            }
        }
    }
    .message-popper {
        padding: 0 !important;
    }
    .popper-footer {
        border-top: 1px solid #f0f2f5;
        display: flex;
        .popper-btn {
            width: 50%;
            height: 46px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            color: #666;
            cursor: pointer;
            &:hover {
                background: #f0f2f5;
            }
            &:first-child {
                border-right: 1px solid #f0f0f0;
            }
        }
    }
</style>
