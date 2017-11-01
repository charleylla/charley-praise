class Praise{
    constructor(box,palm){
        this.box = box;
        this.palm = palm;
        this._init();
        this.bindEvents();
    }
    
    _init(){
        this.bindEvents = this.bindEvents.bind(this)
        this.clickHander = throttle(this.clickHander.bind(this),1000);
        this.callCollection = this.callCollection.bind(this)
    }

    clickHander(e){
        if(Praise._disable){
            this.box.className = "disable";
            return;
        }
        const numberEle = Praise.createPraiseNumberElement();
        this.box.appendChild(numberEle);
        setTimeout(()=>{
            numberEle.className = "number number-move";
            this.callCollection(numberEle);
            Praise.count();
        },50);
    }

    callCollection(element){
        setTimeout(()=>{
            Praise.removeElement(element,this.box);
        },500)
    }

    bindEvents(){
        this.palm.addEventListener("mouseup",this.clickHander)
    }

}

Praise._praiseCount = 0;
Praise._disable = false;

Praise.createPraiseNumberElement = () => {
    const box = document.createElement("div");
    box.className = "number";
    box.innerHTML = "+1";
    return box;
}

Praise.removeElement = (ele,parentElement) => {
    parentElement.removeChild(ele);
    ele = null;
}

Praise.count = () => {
    if(++Praise._praiseCount >= 9){
        Praise._disable = true;
        return false;
    }
    return true;
}