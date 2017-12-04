webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _main = __webpack_require__(2);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 注册一个 x-praise 点赞组件
xtag.register("x-praise", {
  content: "\n        <!-- \u70B9\u8D5E\u7684 HTML \u9875\u9762 -->\n        <section>\n            <div class=\"main\" id=\"box\">\n                <div class=\"finger\"></div>\n                <div class=\"finger\"></div>\n            </div>\n        </section>\n    ",
  lifecycle: {
    created: function created() {
      console.warn("X-Tag has been created.");
    },
    inserted: function inserted() {
      console.warn("X-Tag has been inserted.");
      var box = document.querySelector("section");
      var palm = document.querySelector(".main");
      // 启用点赞功能
      new _main2.default(box, palm, 10);
    }
  },
  methods: {}
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // 引入 css 文件


// 从 utils 中引入相关的方法


__webpack_require__(3);

var _utils = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 定义点赞类
var Praise = function () {
    // 构造方法，接受三个参数：容器元素、点赞元素和最大点赞数
    function Praise(box, palm, maxCount) {
        _classCallCheck(this, Praise);

        this.box = box;
        this.palm = palm;
        this.maxCount = maxCount;
        // 初始点赞数
        this._praiseCount = 0;
        this._init();
        this.bindEvents();
    }

    // _init 方法用来绑定 this，这是 RN 的经验


    _createClass(Praise, [{
        key: "_init",
        value: function _init() {
            this.bindEvents = this.bindEvents.bind(this);
            // clickHander 用来对点击事件进行处理，使用节流函数包装
            this.clickHander = (0, _utils.throttle)(this.clickHander.bind(this), 500);
            this.callCollection = this.callCollection.bind(this);
            this.update = this.update.bind(this);
        }

        // 用来进行点赞记数

    }, {
        key: "count",
        value: function count() {
            ++this._praiseCount;
            /**
             * 数组第一项用来控制手掌是否置灰（1表示置灰，0表示不置灰）
             * 数组第二项用来控制是否显示+1（1表示显示，0表示不显示）
             */

            // 如果当前点赞数和最大点赞数相等，就将当前的点赞数置为0

            if (this._praiseCount === this.maxCount) {
                this._praiseCount = 0;
                console.log(this._praiseCount);
                return false;
            }

            console.log(this._praiseCount);
            return true;
        }
    }, {
        key: "clickHander",
        value: function clickHander(e) {
            var _this = this;

            // 更新数据
            this.update();
            // flag 是手型是否置灰的标志
            var flag = this.count();
            if (!flag) {
                this.box.className = "disable";
            } else {
                this.box.className = "";
            }

            // 生成一个 +1 的元素
            var numberEle = (0, _utils.createPraiseNumberElement)();
            // 将元素追加到容器中
            this.box.appendChild(numberEle);
            // 50ms 后改变样式，以获取动画效果
            // 如果上来就将 className 设置为 number number-move,是不会有动画效果的
            setTimeout(function () {
                numberEle.className = "number number-move";
                // 元素展示后,将其传入 callCollection 方法,定时回收
                _this.callCollection(numberEle);
            }, 50);
        }

        // 该方法用来定时清除生成的 +1 元素，接受容器元素 box 作为参数
        // 防止页面中的元素过多

    }, {
        key: "callCollection",
        value: function callCollection(element) {
            var _this2 = this;

            setTimeout(function () {
                (0, _utils.removeElement)(element, _this2.box);
            }, 1000);
        }

        // 对 PhantomJS 做出的一些妥协
        // async update(){
        //     try{
        //         const res = await axios.get("/index/update")  
        //         console.log(res.data)
        //     }catch(e){
        //         console.log("更新数据失败！")
        //     }
        // }

    }, {
        key: "update",
        value: function update() {
            axios.get("/index/update").then(function (res) {
                console.log(res.data);
            }).catch(function (err) {
                console.log("更新数据失败！");
            });
        }

        // 绑定事件

    }, {
        key: "bindEvents",
        value: function bindEvents() {
            this.palm.addEventListener("mouseup", this.clickHander);
        }
    }]);

    return Praise;
}();

exports.default = Praise;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// 节流函数
function throttle(fn, delay) {
    var startTime = 0;
    return function () {
        var timeNow = +new Date();
        if (timeNow - startTime >= delay) {
            fn.apply(undefined, arguments);
            startTime = timeNow;
        }
    };
}

// 生成一个元素
function createPraiseNumberElement() {
    var box = document.createElement("div");
    box.className = "number";
    box.innerHTML = "+1";
    return box;
}

// 清理元素
function removeElement(ele, parentElement) {
    parentElement.removeChild(ele);
    ele = null;
}

exports.throttle = throttle;
exports.createPraiseNumberElement = createPraiseNumberElement;
exports.removeElement = removeElement;

/***/ })
],[0]);