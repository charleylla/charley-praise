"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require("./utils.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Praise = function () {
    function Praise(box, palm, maxCount) {
        _classCallCheck(this, Praise);

        this.box = box;
        this.palm = palm;
        this.maxCount = maxCount;
        this._praiseCount = 0;
        this._init();
        this.bindEvents();
    }

    _createClass(Praise, [{
        key: "_init",
        value: function _init() {
            this.bindEvents = this.bindEvents.bind(this);
            this.clickHander = (0, _utils.throttle)(this.clickHander.bind(this), 500);
            this.callCollection = this.callCollection.bind(this);
        }
    }, {
        key: "count",
        value: function count() {
            ++this._praiseCount;
            /**
             * 数组第一项用来控制手掌是否置灰（1表示置灰，0表示不置灰）
             * 数组第二项用来控制是否显示+1（1表示显示，0表示不显示）
             */
            if (this._praiseCount === this.maxCount) {
                console.log(this._praiseCount);
                this._praiseCount = 0;
                return [1, 1];
            }
            this.updatePraiseNum();
            console.log(this._praiseCount);
            return [0, 1];
        }
    }, {
        key: "clickHander",
        value: function clickHander(e) {
            var _this = this;

            var _count = this.count(),
                _count2 = _slicedToArray(_count, 2),
                _disableFlag = _count2[0],
                _countFlag = _count2[1];

            if (_disableFlag) {
                this.box.className = "disable";
            } else {
                this.box.className = "";
            }

            if (_countFlag) {
                var numberEle = createPraiseNumberElement();
                this.box.appendChild(numberEle);
                setTimeout(function () {
                    numberEle.className = "number number-move";
                    _this.callCollection(numberEle);
                }, 50);
            }
        }
    }, {
        key: "updatePraiseNum",
        value: function updatePraiseNum() {
            axios.get("http://localhost:8080/index/update").then(function (data) {
                console.log(data);
            }).catch(function (err) {
                console.log(err);
            });
        }
    }, {
        key: "callCollection",
        value: function callCollection(element) {
            var _this2 = this;

            setTimeout(function () {
                removeElement(element, _this2.box);
            }, 1000);
        }
    }, {
        key: "bindEvents",
        value: function bindEvents() {
            this.palm.addEventListener("mouseup", this.clickHander);
        }
    }]);

    return Praise;
}();

exports.default = Praise;


function createPraiseNumberElement() {
    var box = document.createElement("div");
    box.className = "number";
    box.innerHTML = "+1";
    return box;
}

function removeElement(ele, parentElement) {
    parentElement.removeChild(ele);
    ele = null;
}
//# sourceMappingURL=main.js.map