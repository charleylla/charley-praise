"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
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

exports.throttle = throttle;
//# sourceMappingURL=utils.js.map