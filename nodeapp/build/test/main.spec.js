"use strict";

var _main = require("../public/js/main");

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("测试点赞计数功能", () => {
    // 这里进行单元测试,实际上是测试 Praise 对象上的 count 方法
    it("点赞次数少于10次的情况", () => {
        /**
         * 点赞是需要传入 HTML 元素的
         * 由于我们使用的是 Jasmine + PhantomJS 进行测试
         * 并且元素本身和 count 方法的功能无关,因此传入两个任意的元素
         */
        const ele = document.body;
        // 定义点赞的最大次数
        const maxCount = 10;
        const praise = new _main2.default(ele, ele, maxCount);
        for (let i = 0; i < 9; i++) {
            const flag = praise.count();
            // 通过 expect 方法和 toBe 方法来进行单元测试的判断
            // 对于单元测试的代码，最好有一个返回值
            expect(flag).toBe(true);
        }
    });

    it("点赞次数等于10次的情况", () => {
        const ele = document.body;
        const maxCount = 10;
        const praise = new _main2.default(ele, ele, maxCount);
        for (let i = 0; i < 9; i++) {
            praise.count();
        }
        const flag = praise.count();
        expect(flag).toBe(false);
    });
}); // 引入 Praise 类,用来单元测试