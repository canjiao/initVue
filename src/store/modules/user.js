import $api from '@/api/index'
import { Local, Session, Cookie } from '@/utils/storage'
const user = {
    state:{
        userInfo: Session.get('user_info') || '',   //初始化的时候从本地存储中获取数据
    },
    mutations:{
        SET_USER_INFO(state,data){
            state.userInfo = data;
        }
    },
    actions:{
        async SetUserInfo({commit,state}, data){
            // let res = await $api.common.login();
            Session.set('user_info',data);      //设置一份数据到本地存储中，解决浏览器刷新，store中数据丢失的问题
            commit('SET_USER_INFO',data);
        }
    },
    getters:{
        totalNum(state,getters){
            return 0;
        }
    }
};
export default user;