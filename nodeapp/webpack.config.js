// 获取环境变量
const env = process.env.NODE_ENV;
// 根据环境变量导出配置文件
module.exports = require(`./config/webpack.${env}.js`);