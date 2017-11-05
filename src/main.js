import {
    throttle,
} from "./utils.js";

export default class Praise{
    constructor(box,palm,maxCount){
        this.box = box;
        this.palm = palm;
        this.maxCount = maxCount;
        this._praiseCount = 0;
        this._init();
        this.bindEvents();
    }
    
    _init(){
        this.bindEvents = this.bindEvents.bind(this)
        this.clickHander = throttle(this.clickHander.bind(this),300);
        this.callCollection = this.callCollection.bind(this)
    }

    count(){
        ++this._praiseCount;
        /**
         * 数组第一项用来控制手掌是否置灰（1表示置灰，0表示不置灰）
         * 数组第二项用来控制是否显示+1（1表示显示，0表示不显示）
         */
        if(this._praiseCount === this.maxCount){
            console.log(this._praiseCount)
            this._praiseCount = 0;
            return [1,1];
        }

        console.log(this._praiseCount)
        return [0,1];
    }
    
    clickHander(e){
        const [ _disableFlag, _countFlag] = this.count();
        if(_disableFlag){
            this.box.className = "disable";
        }else{
            this.box.className="";
        }

        if(_countFlag){
            const numberEle = createPraiseNumberElement();
            this.box.appendChild(numberEle);
            setTimeout(()=>{
                numberEle.className = "number number-move";
                this.callCollection(numberEle);
            },50);
        }
    }

    callCollection(element){
        setTimeout(()=>{
            removeElement(element,this.box);
        },500)
    }

    bindEvents(){
        this.palm.addEventListener("mouseup",this.clickHander)
    }
}

function createPraiseNumberElement(){
    const box = document.createElement("div");
    box.className = "number";
    box.innerHTML = "+1";
    return box;
}

function removeElement(ele,parentElement){
    parentElement.removeChild(ele);
    ele = null;
}

