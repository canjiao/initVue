'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')


//在开发环境 根据运行命令判断是什么身份运行，比如 buyer:买家端  seller:卖家端   admin:运营端 
let node_env = null;
const systemType = JSON.parse(process.env.npm_config_argv).original[1];
switch (systemType) {
  //运行命令： npm run dev          默认端/公共端
  case 'dev':
    node_env = '"dev"'
    break;

  //运行命令： npm run dev-seller   卖家端
  case 'dev-seller':
    node_env = '"dev-seller"';
    break;
}


module.exports =  merge(prodEnv, {
  NODE_ENV: node_env,
})
