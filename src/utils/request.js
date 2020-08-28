import axios from 'axios'
import {Cookie} from './storage'
import Vue from 'vue'
import Config from './config'
// import store from '../store'

class HttpRequest {
    constructor() {
        this.instance = axios.create({
            baseURL: Config.apiHost,
            timeout: 30000,
            tipFail: false,  //是否提示status!=1时的错误消息
            tipOk: false,  //是否提示status==1时的正确消息
            statusOk: false, //是否只有status==1才执行回调
            onUploadProgress: (progressEvent) => { // 实时进度
                if (progressEvent.lengthComputable && this.options.progress) {
                    this.options.progress(progressEvent)
                }
            }
        })
        this.interceptors();
        this.options = {}
    }
    interceptors() {
        // 请求拦截
        this.instance.interceptors.request.use(config => {
            config.headers = Object.assign({}, {
                sessionId: Cookie.get('sessionId') || '',
            }, (config.headers || {}))
            return config
        }, error => {
            return Promise.reject(error)
        })
        // 响应拦截
        this.instance.interceptors.response.use(res => {
            this.tip(res);
            // if (res.data.status == 5) {
            //     setTimeout(() => {
            //         store.dispatch('logout');
            //     }, 2000)
            // }

            if (res.config.statusOk) {
                if (res.data.status == 1) {
                    return res.data;
                } else if (res.data.type === 'image/jpeg') {
                    const Url = window.URL.createObjectURL(res.data);
                    return Url
                } else {
                    return Promise.reject(new Error(this.errorOutput(res)))
                }
            }
            return res.data;
        }, error => {
            return Promise.reject(error)
        })
    }
    //格式化错误消息
    errorOutput(res) {
        return `api:${res.config.url}|status:${res.data.status}|message:${res.data.message}`
    }
    //接口消息输出
    tip(res) {
        let config = res.config;
        if (config.tipFail && res.data.status != 1) {
            Vue.prototype.$Message.error(res.data.message || '');
        }
        if (config.tipOk && res.data.status == 1) {
            Vue.prototype.$Message.success(res.data.message || '');
        }
    }
    request(options = {}) {
        return this.instance.request(options);
    }
    post(options = {}) {
        if (!options.data) {
            options.data = {};
        }
        this.options = { ...options };
        return this.request({ method: 'post', ...options });
    }
    put(options = {}) {
        if (!options.data) {
            options.data = {};
        }
        return this.request({ method: 'put', ...options });
    }
    get(options = {}) {
        return this.request({ method: 'get', ...options });
    }
}

export default new HttpRequest();

