export default [
    {
        path: '/',
        name: '/',
        redirect: {
            name: 'home'
        }
    },
    {
        path: '/home',
        meta: {
            title: '首页',
            noLogin: true
        },
        name: 'home',
        component: (resolve) => { require(['@/views/home/home.vue'], resolve); }
    },
    {
        path: '/500',
        meta: {
            title: '500-服务端错误',
            noLogin: true
        },
        name: 'error-500',
        component: (resolve) => { require(['@/views/error-page/500.vue'], resolve); }
    },
    {
        path: '/403',
        meta: {
            title: '403-权限不足',
            noLogin: true
        },
        name: 'error-403',
        component: (resolve) => { require(['@/views/error-page/403.vue'], resolve); }
    },
    {
        path: '/404',
        name: 'error-404',
        meta: {
            title: '404-页面不存在',
            noLogin: true
        },
        component: (resolve) => { require(['@/views/error-page/404.vue'], resolve); }
    },
];
