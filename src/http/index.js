import Axios from 'axios'
import { router } from '../main'
import { Message } from 'element-ui'

Axios.defaults.timeout = 10000;// 响应时间
Axios.defaults.baseURL = process.env.VUE_APP_APIURL;

Axios.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    window.combineHeader(config.headers)
    return config;
}, error => {
    return Promise.reject(error);
});

Axios.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
});

/**
 * 公共请求入口
 * @param param 'object'
 * @param url   'string'
 * @param type  'get || post'
 * @returns {Promise}
 */
export const commonPromise = ({ data, params, url, method = 'get' }) => {
    return new Promise((resolve, reject) => {
        Axios({ url, method, data, params }).then(res => {
            // Message.closeAll();
            if (res.status === 200) { // 成功
                if (res.data.code === 0) {
                    resolve(res.data)
                } else if (res.data.code === 403 || res.data.code === 1004) {
                    util.clearStorage();
                    res.data.msg && Message.error(res.data.msg);
                    router.push('/login');
                    reject(new Error('用户状态变更'));
                } else {
                    Message.error(res.data.msg)
                    reject(res.data.msg)
                }
            } else if (res.status === 403) { // 用户状态变更
                util.clearStorage();
                res.data.msg && Message.error(res.data.msg);
                router.push('/login');
                reject(new Error('用户状态变更'));
            } else {
                res.data.msg && Message.error(res.data.msg);
                reject(new Error('系统出错'));
            }
        }).catch(err => {
            // localStorage.removeItem('sessionId');
            // router.push('/login');
            Message.error('系统出错');
            reject(err.data.msg);
        });
    })
}
