import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    getters:{},
    modules: {
        user,
    }
});

export default store;


/**
 * 在vue中获取state中的数据
 * this.$store.state.user.userInfo
 * 
 * 在vue中触发mutations中的方法同步修改state中的数据
 * this.$store.commit("SET_USER_INFO", data);
 * 
 * 在vue中触发actions中的方法异步修改state中的数据
 * this.$store.dispatch("SetUserInfo", data);
 * 
 */