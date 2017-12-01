"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // 从 utils 中引入相关的方法


var _utils = require("./utils.js");

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

            // 以下为原始代码
            // /**
            //  * 注意：
            //  * 事实上这里不用使用一个数组进行条件判断，因为数组最后一项返回的一直是 1
            //  * 也就是说不论手型置灰与否，+1 动画都会展现的
            //  */
            // if(this._praiseCount === this.maxCount){
            //     console.log(this._praiseCount)
            //     this._praiseCount = 0;
            //     return [1,1];
            // }
            // console.log(this._praiseCount)
            // return [0,1];
        }
    }, {
        key: "clickHander",
        value: function clickHander(e) {
            var _this = this;

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

            // 以下为原始代码
            // const [ _disableFlag, _countFlag] = this.count();
            // // _disableFlag 用来判断是否将手型置灰
            // if(_disableFlag){
            //     this.box.className = "disable";
            // }else{
            //     this.box.className="";
            // }

            // // _countFlag 用来判断是否展示 +1 动画
            // // 当点赞数达到最大数目时，需要 +1 动画显示，手型置灰
            // if(_countFlag){
            //     // 生成一个 +1 的元素
            //     const numberEle = createPraiseNumberElement();
            //     // 将元素追加到容器中
            //     this.box.appendChild(numberEle);
            //     // 50ms 后改变样式，以获取动画效果
            //     // 如果上来就将 className 设置为 number number-move,是不会有动画效果的
            //     setTimeout(()=>{
            //         numberEle.className = "number number-move";
            //         // 元素展示后,将其传入 callCollection 方法,定时回收
            //         this.callCollection(numberEle);
            //     },50);
            // }

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
//# sourceMappingURL=main.js.map