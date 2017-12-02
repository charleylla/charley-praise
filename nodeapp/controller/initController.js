"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _indexController = require("./indexController");

var _indexController2 = _interopRequireDefault(_indexController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// InitController 用来初始化 Controller 配置
// 将其他的 Controller 在此类中进行合并
class InitController {
    constructor(app, router) {
        this.app = app;
        this.router = router;
        this.init();
    }

    init() {
        const { app, router } = this;
        app.use(router(_ => {
            _.get("/index/index", _indexController2.default.index());
            _.get("/index/update", _indexController2.default.update());
        }));
    }
}

// 暴露 InitController 类
// 引入 index controller
exports.default = InitController;
