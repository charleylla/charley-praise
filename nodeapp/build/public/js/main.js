"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

require("../css/main.css");

var _utils = require("./utils");

// 定义点赞类
// 引入 css 文件
class Praise {
    // 构造方法，接受三个参数：容器元素、点赞元素和最大点赞数
    constructor(box, palm, maxCount) {
        this.box = box;
        this.palm = palm;
        this.maxCount = maxCount;
        // 初始点赞数
        this._praiseCount = 0;
        this._init();
        this.bindEvents();
    }

    // _init 方法用来绑定 this，这是 RN 的经验
    _init() {
        this.bindEvents = this.bindEvents.bind(this);
        // clickHander 用来对点击事件进行处理，使用节流函数包装
        this.clickHander = (0, _utils.throttle)(this.clickHander.bind(this), 500);
        this.callCollection = this.callCollection.bind(this);
        this.update = this.update.bind(this);
    }

    // 用来进行点赞记数
    count() {
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

    clickHander(e) {
        // 更新数据
        this.update();
        // flag 是手型是否置灰的标志
        const flag = this.count();
        if (!flag) {
            this.box.className = "disable";
        } else {
            this.box.className = "";
        }

        // 生成一个 +1 的元素
        const numberEle = (0, _utils.createPraiseNumberElement)();
        // 将元素追加到容器中
        this.box.appendChild(numberEle);
        // 50ms 后改变样式，以获取动画效果
        // 如果上来就将 className 设置为 number number-move,是不会有动画效果的
        setTimeout(() => {
            numberEle.className = "number number-move";
            // 元素展示后,将其传入 callCollection 方法,定时回收
            this.callCollection(numberEle);
        }, 50);
    }

    // 该方法用来定时清除生成的 +1 元素，接受容器元素 box 作为参数
    // 防止页面中的元素过多
    callCollection(element) {
        setTimeout(() => {
            (0, _utils.removeElement)(element, this.box);
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

    update() {
        axios.get("/index/update").then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log("更新数据失败！");
        });
    }

    // 绑定事件
    bindEvents() {
        this.palm.addEventListener("mouseup", this.clickHander);
    }
}
exports.default = Praise;

// 从 utils 中引入相关的方法