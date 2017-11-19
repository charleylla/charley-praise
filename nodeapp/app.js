const Koa = require("koa");
// 路由系统
const router = require("koa-simple-router");
// 引入 koa2-cors 模块
const cors = require("koa2-cors");
// 引入 CONFIG 配置文件
const CONFIG = require("./config")
const app = new Koa();

// 应用 koa2-cors 中间件
app.use(cors());

// 引入控制器
const InitController = require("./controller/initController");
new InitController(app,router);
app.listen(CONFIG.get("PORT"));

module.exports = app;