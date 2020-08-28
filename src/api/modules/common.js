import request from '../../utils/request';
export default {
    //用户登录
    login(data) {
        return request.post(
            {
                url: '/login',
                data,
                tipFail: true,
                tipOk: false,
                statusOk: true
            }
        )
    },
}