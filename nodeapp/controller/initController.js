const index = require("./indexController")

class InitController{
    constructor(app,router){
        this.app = app;
        this.router = router;
        this.init();
    }

    init(){
        const { app,router } = this;
        app.use(router(_ => {
            _.get("/index/update",index.update());
        }));
    }
}

module.exports = InitController;