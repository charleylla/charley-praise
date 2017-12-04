"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _koaSimpleRouter = require("koa-simple-router");

var _koaSimpleRouter2 = _interopRequireDefault(_koaSimpleRouter);

var _initController = require("./controller/initController");

var _initController2 = _interopRequireDefault(_initController);

var _koaSwig = require("koa-swig");

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _co = require("co");

var _co2 = _interopRequireDefault(_co);

var _koaStatic = require("koa-static");

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 引入 koa-static，该模块用来为 koa2 提供静态文件支持
/**
 * 定义好静态资源路径后，引用静态资源时不需要加上静态资源所在的目录名
 * 如，我们在 views 中引入 main.js，写这个路径就好了：
 * src="../js/main.js"
 */

// 从 koa-swig 中引入 render 方法
/**
 * 使用 swig 时，一般会使用一个 layout.html 模板文件
 * 然后建立其他的文件来继承此模板文件
 * 
 * 我们在 views 文件夹中创建两个文件：
 * layout.html 和 index.html
 * 
 */

// 引入 router
const app = new _koa2.default();

// 注册 render 函数以渲染模板页面
// 使用 co.wrap 包装中间件

// 引入配置文件

// 引入 co 模块，该模块可以让 koa2 使用 koa1 的中间件
// 这里我们需要对 koa-swig 应用 co 模块

// 引入 InitController
// 使用 ES6 Modules 方式引入
// 使用 import 后，就需要使用 Babel 进行一下编译
// 编译命令：babel app.js -o app_o.js
/**
 * 如果我们 import 的文件中也实用 ES6 Modules 语法
 * 怎么进行处理呢？
 * 如 config/index.js 中使用了 import 语法，我们想正常引入该文件
 * 只需将原来的 index.js 命名为 index.es，然后将 index.es 编译为 index.js 就可以了
 */
app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
  root: _config2.default.get("VIEWS_DIR"),
  autoescape: true,
  cache: "memory",
  ext: "html"
}));

// 配置静态资源路径
app.use((0, _koaStatic2.default)(_config2.default.get("PUBLIC_DIR")));

// 启用路由配置
new _initController2.default(app, _koaSimpleRouter2.default);

app.listen(_config2.default.get("PORT"));

// 暴露出 app 对象，供 mocha 测试使用
exports.default = app;