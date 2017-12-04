"use strict";

var _main = require("./main");

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 注册一个 x-praise 点赞组件
xtag.register("x-praise", {
  content: `
        <!-- 点赞的 HTML 页面 -->
        <section>
            <div class="main" id="box">
                <div class="finger"></div>
                <div class="finger"></div>
            </div>
        </section>
    `,
  lifecycle: {
    created() {
      console.warn("X-Tag has been created.");
    },
    inserted() {
      console.warn("X-Tag has been inserted.");
      const box = document.querySelector("section");
      const palm = document.querySelector(".main");
      // 启用点赞功能
      new _main2.default(box, palm, 10);
    }
  },
  methods: {}
});