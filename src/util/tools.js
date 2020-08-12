import util from './util'
import md5 from 'js-md5'
import components from '../components'
import apiFetch from '../api/apiFetch'

export default (options = {}) => {
    let {
        Vue,
        wx,
        headerConfig = {Appkey: '', AppSecret: ''}
    } = options
    if (Vue) {
        /**
         * 引入公共组件
         */
        Vue.use(components)

        /**
         * 引入全局api
         */
        Vue.prototype.$api = apiFetch

        /**
         * 权限控制(按钮级别)
         * <button v-permission="1"></button>
         * v-permission 接收数值或数组, 数值代表某个权限id, 数组代表多个权限id
         * v-permission:or 接收数组, 代表其中一个权限为true, 则显示
         */
        Vue.directive('permission', {
            inserted: function (el, { value, arg }, vnode) {
                if (!value) return;
                let permissions = JSON.parse(localStorage.getItem('permissions') || '{}')
                if (typeof value === 'number') {
                    if (value === 0) return;
                    !permissions[value].showMenu && el.parentNode.removeChild(el)
                } else {
                    let allPass = arg === 'or' ? value.some(item => permissions[item].showMenu) : value.every(item => permissions[item].showMenu)
                    !allPass && el.parentNode.removeChild(el)
                }
            }
        })
        Vue.mixin({
            /* 记录上一个路由 */
            // beforeRouteEnter (to, from, next) {
            //     localStorage.setItem('prevPage', from.path)
            //     next()
            // },
            // /* 处理keepalive为true的组件 */
            // beforeRouteLeave (to, from, next) {
            //     const fromRootRoute = from.path.split('/')[1]
            //     const toRoutes = to.path.split('/')
            //     const hasSameRoute = toRoutes.includes(fromRootRoute)
            //     const prevPage = localStorage.getItem('prevPage')
            //     /* 进入详情等二级页面 */
            //     if (from.meta.keepAlive && hasSameRoute && !to.meta.isRoot) {
            //         from.meta.keepAlive = true
            //     /* 左侧栏页面进入另一个左侧栏页面 */
            //     } else if (from.meta.keepAlive && hasSameRoute && to.meta.isRoot) {
            //         to.meta.keepAlive = false
            //         to.meta.keepAlive = true
            //     /* 二级页面进入左侧栏 */
            //     } else if (!from.meta.keepAlive && hasSameRoute && to.meta.isRoot && prevPage !== to.path) {
            //         to.meta.keepAlive = false
            //         to.meta.keepAlive = true
            //     }
            //     next()
            // },
            /* 过滤 */
            filters: {
                /* 格式化日期 */
                formatTime (value) {
                    return value ? util.format(+value * 1000) : '/'
                },
                /* 价格转换--保留两位小数 */
                toFixedPrice (value) {
                    return value ? (parseInt(value) / 100).toFixed(2) : '0';
                },
                showPower (value) {
                    let permissions = JSON.parse(localStorage.getItem('permissions') || '{}')
                    if (typeof value === 'number') {
                        if (value === 0) return true;
                        return permissions[value].showMenu
                    } else {
                        let allPass = value.some(item => value > 0 ? permissions[item].showMenu : true)
                        return allPass
                    }
                }
            },
            /* 不被缓存的组件会在mounted自动执行init方法 */
            mounted () {
                this.$route && !this.$route.meta.keepAlive && this.init && this.init()
            },
            /* 被缓存的组件会在activated自动执行init方法 */
            activated () {
                this.$route && this.$route.meta.keepAlive && this.init && this.init()
            }
        })
    }
    /* 微信分享 */
    if (wx) {
        let global = Vue ? Vue.prototype : window
        /**
         * options
         *      debug: 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
         *      appId: 必填，公众号的唯一标识
         *      timestamp: 必填，生成签名的时间戳
         *      nonceStr: 必填，生成签名的随机串
         *      signature: 必填，签名
         * content
         *      title: 分享标题
         *      desc: 分享描述
         *      imgUrl: 分享缩略图
         *      link: 分享路径
         */
        global.wxShare = function (options = {}, content = {}) {
            return new Promise((resolve, reject) => {
                try {
                    let { appId, timestamp, nonceStr, signature, debug = false } = options
                    let { title, desc, imgUrl, link } = content
                    wx.config({
                        debug,
                        appId,
                        timestamp,
                        nonceStr,
                        signature,
                        jsApiList: [
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo'
                        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    })
                    let shareContent = {
                        title,
                        desc,
                        imgUrl,
                        link,
                        success: () => resolve(true),
                        cancel: () => resolve(false)
                    }
                    wx.ready(() => {
                        wx.onMenuShareTimeline(shareContent) // 分享到朋友圈
                        wx.onMenuShareAppMessage(shareContent) // 分享给朋友
                        wx.onMenuShareQQ(shareContent) // 分享到QQ
                        wx.onMenuShareWeibo(shareContent) // 分享到腾讯微博
                    })
                } catch (error) {
                    reject(error)
                }
            })
        }
    }
    /* 合并请求头 */
    function combineHeader (headerConfig) {
        return function (header, opt = {}) {
            let { Appkey, AppSecret } = headerConfig;
            let timeTamp = parseInt(new Date().getTime() / 1000);
            let LcSign = md5(Appkey + timeTamp + AppSecret);
            let sessionId = localStorage.getItem('sessionId') || ''
            if (header.setRequestHeader) {
                header.setRequestHeader('LC-Appkey', Appkey);
                header.setRequestHeader('LC-Sign', LcSign);
                header.setRequestHeader('LC-Timestamp', timeTamp);
                header.setRequestHeader('LC-Session', sessionId);
                for (let key in opt) {
                    header.setRequestHeader(key, opt[key]);
                }
                return;
            }
            header['LC-Appkey'] = Appkey;
            header['LC-Sign'] = LcSign;
            header['LC-Timestamp'] = timeTamp;
            header['LC-Session'] = sessionId;
            for (let key in opt) {
                header[key] = opt[key];
            }
        }
    }
    window.combineHeader = combineHeader(headerConfig)
}
