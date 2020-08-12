/* eslint-disable */
import Vue from 'vue'
import { MessageBox } from 'element-ui'
let Hub = new Vue();
export default {
    // Event Bus
    Hub () {
        return Hub
    },
    // api接口前缀
    getApiUrl () {
        return process.env.VUE_APP_APIURL
    },
    // session
    getSession () {
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo && userInfo.session_id) {
            return userInfo.session_id;
        }
    },
    // 文件上传api
    uploadURL () {
        return process.env.VUE_APP_UPLOAD_URL
    },
    /**
     * 文件上传前执行函数
     */
    beforeUpload(uploadEl) {
        if (uploadEl) {
            if (Array.isArray(uploadEl)) {
                window.combineHeader(uploadEl[0].headers)
            } else {
                window.combineHeader(uploadEl.headers)
            }
        }
    },
    /**
     * 文件上传失败回调
     */
    uploadError (err, file, fileList) {
        if (err) {
            if (err.status === 403) { // 非法的 sessionId，跳转到登录页
                store.dispatch(storeTypes.USER_SIGN_OUT, 'invalid_session');
                ElementUI.Message({
                    type: 'error',
                    message: '您的登录帐号已发生变化，请重新登录！'
                });
            } else {
                ElementUI.Message({
                    type: 'error',
                    message: err.msg ? err.msg : '操作失败，请重试！'
                });
            }
        }
    },
    // 对象的克隆
    cloneObj (obj) {
        var o;
        if (typeof obj === 'object' && obj !== null) {
            if (Array.isArray(obj)) {
                o = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    o.push(this.cloneObj(obj[i]));
                }
            } else {
                o = {};
                for (var k in obj) {
                    o[k] = this.cloneObj(obj[k]);
                }
            }
        }
        return o;
    },
    // 转换时间日期格式
    addTime (m) {
        return m < 10 ? '0' + m : m
    },
    format (timeTemp) {
        let _self = this;
        let time = new Date(timeTemp);
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        let mm = time.getMinutes();
        let s = time.getSeconds();
        let date = y + '-' + _self.addTime(m) + '-' + _self.addTime(d) + ' ' + _self.addTime(h) + ':' + _self.addTime(mm) + ':' + _self.addTime(s);
        return date
    },
    // 转换日期时间格式（数组）
    formatDate (timeTemp) {
        if (Array.isArray(timeTemp)) {
            if (!timeTemp.length) return ['', '']
            return timeTemp.map(date => this.format(date))
        } else {
            return timeTemp ? this.format(timeTemp) : ''
        }
    },
    /**
     * 获取字符串长度
     */
    lenStr (str) {
        str = str + 'a';
        var str1 = str.match(/[\x00-\xff]/g).length;
        return ((str.length - str1) * 2 + str1 - 1);
    },
    /**
     * 匹配正则
     */
    matchFn (type, value) {
        let match = {
            // 链接
            url: /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/gi,
            // 固话
            phone: /^((\d{8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/gi,
            // 手机号码
            tel: /^1[34578]\d{9}$/gi,
            // 6位数密码验证
            passWord:/^\d{6,}$/gi,
            // 正整数（不包含0）
            positiveInt: /^[1-9]\d*$/gi,
            // 非负整数（包含0）
            nonnegativeInt: /^[1-9]\d*|0$/gi,
            // 浮点
            float: /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/gi,
            // 小数点后不超过两位
            floatFixedTwo: /^\d+(\.\d{1,2})?$/gi,
            // 邮编
            postcode: /^[1-9]\d{5}(?!\d)$/gi,
            // 邮箱
            email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/gi,
            // 字母或数字
            letterOrNum: /^[a-zA-Z\d]+$/gi,
            // 10位，第一个不能为0
            // 可以输入中文，字母，数字
            room: /^[\u4e00-\u9fa5_a-zA-Z1-9_][\u4e00-\u9fa5_a-zA-Z0-9_]{0,10}$/gi,
            // 身份证
            identity_no: /^\d{15}|\d{18}$/gi
        }
        return match[type].test(value);
    },
    /**
     * 获取链接后面的参数
     * @param String name 需要获取的参数名字
     */
    getQueryString (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        var r = window.location.search.substr(1).match(reg)
        return r != null ? unescape(r[2]) : null
    },
    /**
     * 获取文件后缀
     * @param {*} name
     */
    getExtension (name) {
        let ext = null
        let filename = name.toLowerCase()
        let i = filename.lastIndexOf('.')
        if (i > -1) {
            ext = filename.substring(i)
        }
        return ext
    },
    /**
     * str 数据
     */
    toBoole (str) {
        let boole = null
        if (typeof str === 'string') { // 字符串类型
            if (str === 'false') {
                boole = false;
            } else if (str === 'true') {
                boole = true;
            }
        } else if (typeof str === 'boolean') { // 布尔类型
            boole = str;
        }
        return boole; 
    },
    /**
     * 保存权限
     */
    savePermissions (power_list) {
        let permissions = {}
        this.flatten(power_list, 'sub_power').forEach(item => {
            let { powerId, powerName, showMenu } = item
            permissions[powerId] = { powerName, showMenu }
        })
        localStorage.setItem('permissions', JSON.stringify(permissions));
    },
    /**
     * 平铺数组
     */
    flatten (arr, children) {
        if (!arr) return []
        return arr.reduce((prev, item) => prev.concat(item, this.flatten(item[children], children)), []);
    },
    /**
     * 导出Excel
     */
    exportExcelFun (d, urlParams) {
        let session = JSON.parse(localStorage.getItem('userInfo')).sessionId;
        let apiUrl = this.getApiUrl();
        let appkey = '67167560c2424f2c92kxkw3c0af958hj'
        let data = {
            ...d,
            appkey,
            session
        }
        urlParams = urlParams + '?'
        for (let key in data) {
            urlParams += `${key}=${data[key]}&`;
        }
        apiUrl += urlParams.slice(0, -1);
        window.open(apiUrl);
    },
    // 二次确认框
    confirmCallback (title, callback) {
        MessageBox.confirm(title, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
        .then(() => {
            return callback();
        })
        .catch(() => {});
    },
    isBlank (value) {
        return value === null || value === undefined || value === 'null' || value === 'undefined' || value === '';
    },
    clearStorage () {
        localStorage.removeItem('sessionId');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('path');
        localStorage.removeItem('permissions');
    },
    formatTime (s) {
        let min = ~~(s / 60) % 60
        let h = ~~(min / 3600)
        return h ? `${h}h${min}min` : `${min}min`
    }
}
