"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONFIG = new Map();

// 定义端口
// 配置文件
CONFIG.set("PORT", 3000);
// 定义 views 路径
CONFIG.set("VIEWS_DIR", _path2.default.resolve(__dirname, "../views"));
// 定义静态资源路径
CONFIG.set("PUBLIC_DIR", _path2.default.resolve(__dirname, "../public"));

exports.default = CONFIG;
