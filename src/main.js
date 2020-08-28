// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router/index'
import store from './store'
// 3.4.2 iView版本
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

import * as storage from '@/utils/storage'
Vue.prototype.$storage = storage;

import * as filters from '@/utils/filters';
Object.keys(filters).forEach(key => { Vue.filter(key, filters[key]); });

import api from '@/api';
Vue.prototype.$api = api;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:router,
  store,
  components: { App },
  template: '<App/>',
  data: {
    eventHub: new Vue()
    /**
     * 组件之间事件通信
     * 发送数据：this.$root.eventHub.$emit('事件名称', data);
     * 接收数据：this.$root.eventHub.$on('事件名称', (data)=>{ console.log('接收到data数据') } );
     */
  }
})
