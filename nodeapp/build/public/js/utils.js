"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// 节流函数
function throttle(fn, delay) {
    let startTime = 0;
    return (...args) => {
        let timeNow = +new Date();
        if (timeNow - startTime >= delay) {
            fn(...args);
            startTime = timeNow;
        }
    };
}

// 生成一个元素
function createPraiseNumberElement() {
    const box = document.createElement("div");
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