// 引入 index controller
import index from "./indexController";

// InitController 用来初始化 Controller 配置
// 将其他的 Controller 在此类中进行合并
class InitController{
    constructor(app,router){
        this.app = app;
        this.router = router;
        this.init();
    }

    init(){
        const { app,router } = this;
        app.use(router(_ => {
            _.get("/index/index",index.index());
            _.get("/index/update",index.update());
        }));
    }
}

// 暴露 InitController 类
export default InitController;