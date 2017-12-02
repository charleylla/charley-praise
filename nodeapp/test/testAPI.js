"use strict";

var _supertest = require("supertest");

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require("../app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 使用 supertest 进行接口测试
function request() {
    return (0, _supertest2.default)(_app2.default.listen());
}

describe("Test API", () => {
    it("Test update", done => {
        request().get("/index/update").set("Accept", "application/json").expect("Content-Type", /json/).expect(200).end((err, res) => {
            const { body } = res;
            console.log("=========");
            console.log(body);
            console.log("=========");
            if (!body.result) throw "数据返回错误";
            return done();
        });
    });
});
