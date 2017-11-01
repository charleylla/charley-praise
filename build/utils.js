"use strict";

window.Utils = function () {
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
    return {
        throttle: throttle
    };
}();
//# sourceMappingURL=utils.js.map