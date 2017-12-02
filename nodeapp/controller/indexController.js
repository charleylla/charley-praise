"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _indexModel = require("../model/indexModel");

var _indexModel2 = _interopRequireDefault(_indexModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const index = {
    index() {
        // 返回一个路由方法，可供 InitController 使用
        return async (ctx, next) => {
            // 渲染 index.html 页面
            // 要使用 render 方法，需要使用 koa-swig 中间件
            ctx.body = await ctx.render("index.html", {
                title: "来点个赞吧！"
            });
        };
    },
    update() {
        return async (ctx, next) => {
            // 新建实例对象
            const indexModel = new _indexModel2.default();
            // 等待数据获取
            ctx.body = await indexModel.update();
        };
    }
}; // 引入 IndexModel
exports.default = index;
