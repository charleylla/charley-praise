const IndexModel = require("../model/indexModel");

const index = {
    index(){
        return async(ctx,next) => {
            ctx.body = await ctx.render("index.html",{
                title:"来点个赞吧！"
            })
        }
    },
    update(){
        return async(ctx,next) => {
            const indexModel = new IndexModel();
            ctx.body = await indexModel.update();
        }
    }
}

module.exports = index;