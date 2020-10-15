/**
 * config                   向外暴露的配置对象
 * config_com               公共配置
 * config_dif               个性配置
 * apiHost                  接口请求的域名前缀
 * projectType              项目类型  web电脑页面   h5手机页面   用来控制h5页面路由跳转有从左向右的动画  
 */
let config = {}; 
let config_dif = {};

let config_com = {   
    staticDir: '/static',     
    projectType:'web'
};
switch (process.env.NODE_ENV) {
    /** 开发环境  **/
    case 'dev':
        config_dif = {
            apiHost:'https://bpsmall-test.zhidianlife.com',
        }
        break;
    case 'dev-seller':
        config_dif = {
            apiHost:'https://bpsmall-test-seller.zhidianlife.com',
        }
        break;
    /** 正式环境  **/
    case 'build':
        config_dif = {
            apiHost:'https://bpsmall.zhidianlife.com',
        }
        break;
    case 'build-seller':
        config_dif = {
            apiHost:'https://bpsmall-seller.zhidianlife.com',
        }
        break;
}
config = Object.assign(config_com,config_dif);

console.log(process.env)

export default config