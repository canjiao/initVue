'use strict'

//在正式环境 根据运行命令判断是什么身份打包，比如 buyer:买家端  seller:卖家端   admin:运营端 
let node_env = null;
const systemType = JSON.parse(process.env.npm_config_argv).original[1];
switch (systemType) {
  //运行命令： npm run build          默认端/公共端
  case 'build':
    node_env = '"build"'
    break;

  //运行命令： npm run build-seller   卖家端
  case 'build-seller':
    node_env = '"build-seller"';
    break;
}

module.exports = {
  NODE_ENV: node_env,
}
