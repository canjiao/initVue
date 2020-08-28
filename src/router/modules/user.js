export default [
    {
        path: '/user',
        meta: {
            title: '用户中心',
            noLogin: true
        },
        name: 'user',
        component: (resolve) => { require(['@/views/user/user.vue'], resolve); },
        children:[
            {
                path: 'orderList',
                meta: {
                    title: '订单列表',
                    noLogin: true,
                    keepAlive:true
                },
                name: 'orderList',
                component: (resolve) => { require(['@/views/user/order-list/orderList.vue'], resolve); }
            },
            {
                path: 'setCenter',
                meta: {
                    title: '设置中心',
                    noLogin: true
                },
                name: 'setCenter',
                component: (resolve) => { require(['@/views/user/set-center/setCenter.vue'], resolve); }
            },
        ]
    },
]