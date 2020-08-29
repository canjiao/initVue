/**
 * config                   向外暴露的配置对象
 * apiHost                  接口请求的域名前缀
 * projectType              项目类型  web电脑页面   h5手机页面   用来控制h5页面路由跳转有从左向右的动画  
 */
let config = null;
switch (process.env.NODE_ENV) {
    case 'development':
        config = {
            apiHost:'https://bpsmall-test.zhidianlife.com',
            projectType:'web'
        }
        break;
    case 'production':
        config = {
            apiHost:'https://bpsmall.zhidianlife.com',
            projectType:'web'
        }
        break;
}

export default config