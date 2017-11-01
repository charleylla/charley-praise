"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Praise = function () {
    function Praise(box, palm) {
        _classCallCheck(this, Praise);

        this.box = box;
        this.palm = palm;
        this._init();
        this.bindEvents();
    }

    _createClass(Praise, [{
        key: "_init",
        value: function _init() {
            this.bindEvents = this.bindEvents.bind(this);
            this.clickHander = throttle(this.clickHander.bind(this), 1000);
            this.callCollection = this.callCollection.bind(this);
        }
    }, {
        key: "clickHander",
        value: function clickHander(e) {
            var _this = this;

            if (Praise._disable) {
                this.box.className = "disable";
                return;
            }
            var numberEle = Praise.createPraiseNumberElement();
            this.box.appendChild(numberEle);
            setTimeout(function () {
                numberEle.className = "number number-move";
                _this.callCollection(numberEle);
                Praise.count();
            }, 50);
        }
    }, {
        key: "callCollection",
        value: function callCollection(element) {
            var _this2 = this;

            setTimeout(function () {
                Praise.removeElement(element, _this2.box);
            }, 500);
        }
    }, {
        key: "bindEvents",
        value: function bindEvents() {
            this.palm.addEventListener("mouseup", this.clickHander);
        }
    }]);

    return Praise;
}();

Praise._praiseCount = 0;
Praise._disable = false;

Praise.createPraiseNumberElement = function () {
    var box = document.createElement("div");
    box.className = "number";
    box.innerHTML = "+1";
    return box;
};

Praise.removeElement = function (ele, parentElement) {
    parentElement.removeChild(ele);
    ele = null;
};

Praise.count = function () {
    if (++Praise._praiseCount >= 9) {
        Praise._disable = true;
    }
};
//# sourceMappingURL=main.js.map