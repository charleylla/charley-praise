"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _requestPromise = require("request-promise");

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// IndexModel 为模型层，用来提供（请求）数据服务
class IndexModel {
    update() {
        // 配置请求路径
        const options = {
            uri: "http://localhost/praise/praise.php",
            method: "GET"

            // Promise 风格
        };return new Promise((res, rej) => {
            (0, _requestPromise2.default)(options).then(data => {
                data = JSON.parse(data);
                if (data.code === 1) {
                    res(data);
                } else {
                    rej(data);
                }
            });
        });
    }
} // 使用 request-premise 库来请求后端的接口
// 使用该库时也需要安装 promise 库
exports.default = IndexModel;